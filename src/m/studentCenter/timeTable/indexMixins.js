/**
 * @fileOverview  飞渡-老师中心-主页
 * @author  XiaoBin Li (lixiaobin@baijiahulian.com)
 */

'use strict';

import StudentCenterFooter from '../../common/components/StudentCenterFooter.vue';
import Loading from '../../../common/components/Loading.vue';
import commonConfig from '../../../common/config';
import { getStudentLessons } from './request';
export default {
	data () {
		return {
			list: []
			// firstLessonStartTime: null,
			// lastLessonStartTime: null
		}
	},
	created () {
		this.getStudentLessons();
		// Vue.nextTick(() => {
		// 	this.bindEvent();
		// });
	},
	components: {
		StudentCenterFooter: StudentCenterFooter,
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
			//window.router.go('/classinfo/' + item.id);
		},
		getStudentLessons () {
			getStudentLessons()
				.then((res) => {
					var data = res.data;
					this.list = data;
				});
		}
	}
};
