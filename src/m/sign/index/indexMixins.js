/**
 * @fileOverview  飞渡-签到-主页
 * @author  
 */

'use strict';

import Loading from '../../../common/components/Loading.vue';
import wechatConfig from './wechatConfig';
import {afterTimeSchedule} from './request';
export default {
	data () {
		return {
			time: new Date().getTime(),
			weekType: new Date().getDay() ? new Date().getDay() : 7,
			list: [],
			lesson: null
		}
	},
	created () {
		this.getStaffSignList();
	},
	route: {
	    deactivate: function (transition) {
	    	if (this.lesson) {
				transition.to.params.obj = {};
				// transition.to.params.obj['classesId'] = this.classesInfo.info.id;
				// transition.to.params.obj['classesName'] = this.classesInfo.info.name;
	    		$.extend(transition.to.params.obj, this.lesson); 
	    	} 	
			transition.next();
	    }
	},
	methods: {
		forward(item) {
			this.lesson = item;
			window.router.go('/classsign/' + item.id);
		},
		getStaffSignList () {
			afterTimeSchedule()
				.then((res) => {
					var data = res.data;
					this.list = data;
				});
		}
	},
	components: {
		Loading: Loading
	}
};
