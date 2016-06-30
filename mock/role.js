/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'POST',
		path: '/role/getPermissions.json',
		handler: function (request, reply) {
			return reply(require('./json/role/permissions.json'));
		}
	},
	{
		method: 'POST',
		path: '/role/list.json',
		handler: function (request, reply) {
			return reply(require('./json/role/list.json'));
		}
	},
	{
		method: 'POST',
		path: '/role/detail.json',
		handler: function (request, reply) {
			return reply(require('./json/role/detail.json'));
		}
	},
	{
		method: 'POST',
		path: '/role/add.json',
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
		path: '/role/edit.json',
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
		path: '/role/del.json',
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