/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'GET',
		path: '/',
		handler: function (request, reply) {
			return reply.file('tianxiao-virgo-frontend/main.html');
		}
	},
	{
		method: 'GET',
		path: '/main.do',
		handler: function (request, reply) {
			return reply.file('tianxiao-virgo-frontend/main.html');
		}
	},
	{
		method: 'GET',
		path: '/login.html',
		handler: function (request, reply) {
			return reply.file('tianxiao-virgo-frontend/login.html');
		}
	},
	{
		method: 'POST',
		path: '/login.do',
		handler: function (request, reply) {
			return reply(require('./json/api/login.json'));
		}
	},
	{
		method: 'GET',
		path: '/code/getVerifyCode.do',
		handler: function (request, reply) {
			return reply({});
		}
	},
	{
		method: 'POST',
        path: '/org/info.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/orgInfo.json'));
  		}
	},
	{
		method: 'POST',
        path: '/common/getConfig.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/headerConfig.json'));
        }
	},
	{
		method: 'POST',
        path: '/common/setConfig.json',
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
        path: '/comment/list.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/commentList.json'));
        }
	},
	{
		method: 'POST',
        path: '/comment/add.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/commentAdd.json'));
        }
	},
	{
		method: 'POST',
        path: '/comment/edit.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/commentEdit.json'));
        }
	},
	{
		method: 'POST',
        path: '/comment/del.json',
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
		path: '/common/getModules.json',
		handler: function(request, reply) {
			return reply(require('./json/api/getModules.json'))
		}
	},
	{
		method: 'POST',
        path: '/common/saveQuestionnaire.json',
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
        path: '/common/getQuestionnaire.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/getQuestionnaire.json'));
        }
	},
	{
		method: 'POST',
        path: '/common/importClue.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/importClue.json'));
        }
	},
    {
        method: 'POST',
        path: '/common/importClueMy.json',
        handler: function (request, reply) {
            return reply(require('./json/api/importClue.json'));
        }
    },
	{
		method: 'POST',
        path: '/common/exportClue.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/exportClue.json'));
        }
	},
    {
        method: 'POST',
        path: '/common/exportClueMy.json',
        handler: function (request, reply) {
            return reply(require('./json/api/exportClue.json'));
        }
    },
	{
		method: 'POST',
        path: '/common/importStudent.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/importStudent.json'));
        }
	},
	{
		method: 'POST',
        path: '/common/exportStudent.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/exportStudent.json'));
        }
	},
	{
		method: 'POST',
        path: '/common/exportError.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/exportError.json'));
        }
	},
	{
		method: 'POST',
		path: '/common/getFuzzyInfo.json',
		handler: function(request, reply) {
			return reply(require('./json/api/fuzzyInfo.json'))
		}
	},
	{
		method: 'POST',
        path: '/common/import/progress.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/progress.json'));
        }
	},
	{
		method: 'POST',
		path: '/common/getColleagueList.json',
		handler: function(request, reply) {
			return reply(require('./json/api/colleagueList.json'));
		}
	},
	{
		method: 'POST',
        path: '/common/import/result.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/importResult.json'));
        }
	},
	{
		method: 'POST',
		path: '/common/getSubordinateList.json',
		handler: function(request, reply) {
			return reply(require('./json/api/getSubordinateList.json'));
		}
	}
];