/**
 * @file 天校路由
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

var routesConfig = [
	require('./agreement'),
	require('./assignment'),
	require('./educational'),
	require('./fans'),
	require('./question'),
	require('./refund'),
	require('./report'),
	require('./wechat'),
	require('./api'),
	require('./student'),
	require('./clue'),
	require('./course'),
	require('./subject'),
    require('./teacher'),
    require('./user'),
    require('./school'),
    require('./classroom'),
    require('./channel'),
	require('./parameter'),
	require('./role'),
	require('./checkin'),
	require('./record'),
	require('./audit'),
	require('./agenda'),
	require('./station')
];

var routes = [];

for (var i = 0, l = routesConfig.length; i < l; i++) {
    routes = routes.concat(routesConfig[i].routes);
}

exports.routes = routes;