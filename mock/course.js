/**
 * @fileOverview 课程api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'POST',
		path: '/course/search.json',
		handler: function (request, reply) {
			if (request.payload.searchKey) {
				return reply(require('./json/course/searchList.json'));
			} else {
				return reply(require('./json/course/list.json'));
			}
		}
	},
	{
		method: 'POST',
		path: '/course/detail.json',
		handler: function (request, reply) {
			return reply(require('./json/course/info.json'));
		}
	},
	{
		method: 'POST',
		path: '/course/add.json',
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
		path: '/course/edit.json',
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
		path: '/course/del.json',
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
		path: '/course/fuzzyQuery.json',
		handler: function(request, reply) {
			return reply(require('./json/course/fuzzyQuery.json'))
		}
	},
	{
		method: 'POST',
		path: '/course/close.json',
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