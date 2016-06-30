/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'POST',
		path: '/fans/list.json',
		handler: function (request, reply) {
			return reply(require('./json/fans/list.json'));
		}
	},
	{
		method: 'POST',
		path: '/fans/allot.json',
		handler: function (request, reply) {
			return reply(require('./json/fans/allot.json'));
		}
	},
	{
		method: 'POST',
		path: '/fans/addGroup.json',
		handler: function (request, reply) {
			return reply(require('./json/fans/addGroup.json'));
		}
	},
	{
		method: 'POST',
		path: '/fans/editGroup.json',
		handler: function (request, reply) {
			return reply(require('./json/fans/addGroup.json'));
		}
	},
	{
		method: 'POST',
		path: '/fans/delGroup.json',
		handler: function (request, reply) {
			return reply(require('./json/fans/addGroup.json'));
		}
	},
	{
		method: 'POST',
		path: '/fans/listGroup.json',
		handler: function (request, reply) {
			return reply(require('./json/fans/listGroup.json'));
		}
	},
	{
		method: 'POST',
		path: '/fans/fuzzyQuery.json',
		handler: function(request, reply) {
			return reply(require('./json/fans/fuzzyQuery.json'));
		}
	}
];