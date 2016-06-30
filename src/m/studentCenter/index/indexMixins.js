/**
 * @fileOverview  飞渡-老师中心-主页
 * @author  
 */

'use strict';

import StudentCenterFooter from '../../common/components/StudentCenterFooter.vue';
import Loading from '../../../common/components/Loading.vue';
import {afterTimeSchedule} from './request';
export default {
	data () {
		return {
			time: new Date().getTime(),
			weekType: new Date().getDay() ? new Date().getDay() : 7,
			list: [],
			unsign: {}
		}
	},
	created () {
		this.getTeacherLessons();
	},
	methods: {
		forward(item) {
			window.router.go('/classinfo/' + item.id);
		},
		getTeacherLessons () {
			afterTimeSchedule()
				.then((res) => {
					var data = res.data;
					this.list = data;
				});
		}
	},
	components: {
		StudentCenterFooter: StudentCenterFooter,
		Loading: Loading
	}
};
