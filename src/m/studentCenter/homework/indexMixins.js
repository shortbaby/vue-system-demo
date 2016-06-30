'use strict';
import Loading from '../../../common/components/Loading.vue';
import StudentCenterFooter from '../../common/components/StudentCenterFooter.vue';
import {getAssignments} from './request';
let dropload = null;

export default {
	components: {
		StudentCenterFooter: StudentCenterFooter,
		Loading: Loading
	},
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
		this.getAssignments();
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
			getAssignments({
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
			getAssignments({
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
		forward(item) {
			//console.log(item);
			if (item.status == 0) {
				window.router.go('/dohomework/' + item.paperStudentId);
			} else if (item.status == 2){
				window.router.go('/homeworkresult/' + item.paperStudentId);
			} else {
				return false;
			}
		},
		getAssignments(){
			getAssignments({
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
	}
};