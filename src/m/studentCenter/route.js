'use strict';

export function configRouter (router) {
	router.map({
		'/': {
			component: require('./index/index.vue'),
			title: '今日课表'
		},
		'/index': {
			component: require('./index/index.vue'),
			title: '今日课表'
		},
		'/classinfo/:id': {
			component: require('./class/info.vue'),
			title: '班级详情'
		},
		'/classsign/:id': {
			component: require('./class/sign.vue'),
			title: '签到记录'
		},
		'/timetable': {
			component: require('./timeTable/index.vue'),
			title: '我的课表'
		},
		'/homework': {
			component: require('./homework/index.vue'),
			title: '我的作业'
		},
		'/dohomework/:id': {
			component: require('./homework/dohomework.vue'),
			title: '作业'
		},
		'/homeworkresult/:id': {
			component: require('./homework/result.vue'),
			title: '作业'
		},
		'/my': {
			component: require('./my/index.vue'),
			title: '我的个人信息'
		}
	});
}