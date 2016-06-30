/**
 * @fileOverview  飞渡-老师中心-主页
 * @author  XiaoBin Li (lixiaobin@baijiahulian.com)
 */

'use strict';

import TeacherCenterFooter from '../../common/components/TeacherCenterFooter.vue';
import Loading from '../../../common/components/Loading.vue';
import {getTeacherCourse} from './request';
var dropload = null;
export default {
	data() {
		return {
			list: [],
			pageDto: {
				"pageNum": 1,
        		"pageSize": 20,
			}
		}
	},
	created() {
		this.getTeacherCourse();
		Vue.nextTick(() => {
			this.bindEvent();
		});
	},
	methods: {
		hasMoreData (pageDto) {
			if (Math.ceil(pageDto.count / pageDto.pageSize) > 1) {
				return true;
			}
			return false;
		},
		loadUpFn (me) {
			dropload = me;
			getTeacherCourse({
				pageNum: 1
			})
				.then((res) => {
					var list = res.data;
					// 更新第一条数据的时间，下次加载上面数据时使用
					if (list.length) {
						this.list = list.concat(this.list);
					}
					this.loadSucess(res);
				});
		},
		loadDownFn (me) {
			dropload = me;
			getTeacherCourse({
				pageNum: this.pageDto.pageNum + 1
			})
				.then((res) => {
					var list = res.data;
					// 更新第一条数据的时间，下次加载上面数据时使用
					if (list.length) {
						this.list = this.list.concat(list);
					}
					this.loadSucess(res);
				});
		},
		bindEvent () {
			dropload = $('#main').dropload({
				scrollArea: window,
				autoLoad: false,
				loadDownFn: this.loadDownFn
				//loadUpFn: this.loadUpFn
			});
		},
		loadSucess (res) {
			// 没有更多数据就lock
			if (!this.hasMoreData(res.pageDto)) {
				dropload.lock();
			} else {
				dropload.unlock();
			}
			this.pageDto = res.pageDto;
			dropload.resetload();
		},
		info(item) {
			window.router.go('/classinfo/' + item.id);
		},
		students(item) {
			window.router.go('/classlist/' + item.id);
		},
		getTeacherCourse(){
			getTeacherCourse({
				pageNum: 1
			})
				.then((res) => {
					var list = res.data.list;
					// 更新第一条数据的时间，下次加载上面数据时使用
					if (list.length) {
						this.list = this.list.concat(list);
					}
					this.loadSucess(res);
				});
		}
	},
	components: {
		TeacherCenterFooter: TeacherCenterFooter,
		Loading: Loading
	}
};
