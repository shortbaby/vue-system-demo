/**
 * @fileOverview  飞渡-老师中心-主页
 * @author  XiaoBin Li (lixiaobin@baijiahulian.com)
 */

'use strict';

import TeacherCenterFooter from '../../common/components/TeacherCenterFooter.vue';
import Loading from '../../../common/components/Loading.vue';
import commonConfig from '../../../common/config';
import { getTeacherSchedule } from './request';
var dropload = null;
export default {
	data () {
		return {
			list: []
			// firstLessonStartTime: null,
			// lastLessonStartTime: null
		}
	},
	created () {
		this.getTeacherSchedule();
		// Vue.nextTick(() => {
		// 	this.bindEvent();
		// });
	},
	components: {
		TeacherCenterFooter: TeacherCenterFooter,
		Loading: Loading
	},
	methods: {
		adaptList (data) {
			var result = this.list || {};
			// 将课节进行分组
			data.forEach(function (item) {
				if (result[item.date]) {
					if (direction == 'up') {
						result[item.date].unshift(item);
					} else {
						result[item.date].push(item);
					}
				} else {
					result[item.date] = [].concat(item);
				}
			});
			return result;
		},
		forward(item) {
			window.router.go('/classinfo/' + item.id);
		},
		getTeacherSchedule () {
			getTeacherSchedule()
				.then((res) => {
					var data = res.data;
					this.list = data;
				});
		}
	}
};
