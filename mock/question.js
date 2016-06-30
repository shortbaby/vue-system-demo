/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'POST',
		path: '/question/list.json',
		handler: function (request, reply) {
			return reply(require('./json/question/list.json'));
		}
	},
	{
		method: 'POST',
		path: '/question/detail.json',
		handler: function (request, reply) {
			return reply(require('./json/question/detail.json'));
		}
	},
	{
		method: 'POST',
		path: '/question/getOptions.json',
		handler: function (request, reply) {
			return reply(require('./json/question/getOptions.json'));
		}
	},
	{
		method: 'POST',
		path: '/question/add.json',
		handler: function (request, reply) {
			return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
		}
	},
	{
		method: 'POST',
		path: '/question/edit.json',
		handler: function (request, reply) {
			return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
		}
	},
	{
		method: 'POST',
		path: '/question/down.json',
		handler: function (request, reply) {
			return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
		}
	},
	{
		method: 'POST',
		path: '/question/up.json',
		handler: function (request, reply) {
			return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
		}
	}
];