/**
 * @file feidu-签到中心-路由配置
 * @author xuguanlong
 */

'use strict';

export function configRouter (router) {
	router.map({
		'/': {
			component: require('./index/index.vue'),
			title: '签到'
		},
		'/index': {
			component: require('./index/index.vue'),
			title: '签到'
		},
		'/classsign/:id': {
			component: require('./index/sign.vue'),
			title: '签到'
		},
		'/qrsign/:id': {
			component: require('./index/qrsign.vue'),
			title: '签到'
		},
	});
}