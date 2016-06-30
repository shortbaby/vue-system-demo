
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
			summarys: []
		}
	},
	created () {
		this.classesId = this.$route.params.id;
		this.getDetail();
	},
	methods: {
		getDetail() {
			getCourseDetail({
				classesId: this.classesId
			})
				.then((res) => {
					this.classesInfo = res.data.classesInfo;
					this.summarys = res.data.summarys;
				})
		}
	}
}