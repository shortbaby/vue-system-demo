
'use strict';
import {getCourseDetail} from './request';
export default {
	data () {
		return {
			classesId: null,
			classesInfo: {
				info: {},
				classesDetails: [],
			},
			summary: null,
			summarys: []
		}
	},
	created () {
		this.classesId = this.$route.params.id;
		this.getDetail();
	},
	route: {
	    deactivate: function (transition) {
	    	if (this.summary) {
				transition.to.params.obj = {};
				transition.to.params.obj['classesId'] = this.classesInfo.info.id;
				transition.to.params.obj['classesName'] = this.classesInfo.info.name;
	    		$.extend(transition.to.params.obj, this.summary); 
	    		//console.log(obj);
	    	} 	
			transition.next();
	    }
	},
	methods: {
		detail(item) {
			this.summary = item;
			window.router.go('/classstudents/' + item.id);
		},
		getDetail() {
			getCourseDetail({
				classesId: this.classesId
			})
				.then((res) => {
					this.classesInfo = res.data.classesInfo;
					this.summarys = res.data.summarys;
					setTitle(this.classesInfo.info.name);
				})
		}
	}
}