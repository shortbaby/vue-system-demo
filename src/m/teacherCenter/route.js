/**
 * @file libra-老师中心-路由配置
 * @author XiaoBin Li (lixiaobin@baijiahulian.com)
 */

'use strict';

export function configRouter (router) {
	router.map({
		'/': {
			component: require('./index/index.vue'),
			title: '老师中心'
		},
		'/index': {
			component: require('./index/index.vue'),
			title: '老师中心'
		},
		'/timetable': {
			component: require('./timeTable/index.vue'),
			title: '我的课表'
		},
		'/course': {
			component: require('./course/index.vue'),
			title: '我的班级'
		},
		'/classinfo/:id': {
			component: require('./class/info.vue'),
			title: '班级详情'
		},
		'/classlist/:id': {
			component: require('./class/list.vue'),
			title: '课节列表'
		},
		'/classstudents/:id': {
			component: require('./class/students.vue'),
			title: '班级学员'
		},
		'/classsign/:id': {
			component: require('./class/sign.vue'),
			title: '签到详情'
		},
		'/my': {
			component: require('./my/index.vue'),
			title: '我的个人中心'
		},
		'/mydetail': {
			component: require('./my/detail.vue'),
			title: '我的详细信息'
		},
		'/myunavailable': {
			component: require('./my/unavailable.vue'),
			title: '设置不可上课时间'
		}
	});
}