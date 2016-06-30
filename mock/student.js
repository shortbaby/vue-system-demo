/**
 * @fileOverview 学生档案
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'POST',
        path: '/student/add.json',
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
        path: '/student/edit.json',
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
        path: '/student/del.json',
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
    // 我的学生
	{
		method: 'POST',
        path: '/student/list.json',
        handler: function (request, reply) {
        	return reply(require('./json/student/list.json'));
        }
	},
    // 学生档案
    {
        method: 'POST',
        path: '/student/studentList.json',
        handler: function (request, reply) {
            return reply(require('./json/student/list.json'));
        }
    },
	{
		method: 'POST',
        path: '/student/detail.json',
        handler: function (request, reply) {
        	return reply(require('./json/student/detail.json'));
        }
	},
    {
        method: 'POST',
        path: '/student/getOwnerList.json',
        handler: function (request, reply) {
            return reply(require('./json/student/getOwnerList.json'));
        }
    },
    {
        method: 'POST',
        path: '/student/quitClass.json',
        handler: function(request, reply) {
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
        path: '/student/myClasses.json',
        handler: function(request, reply) {
            return reply(require('./json/student/myClasses.json'));
        }
    },
    {
        method: 'POST',
        path: '/student/courseDetail.json',
        handler: function(request, reply) {
            return reply(require('./json/student/courseDetail.json'));
        }
    },
    {   
        method: 'POST',
        path: '/student/subList.json',
        handler: function(request, reply) {
            return reply(require('./json/student/subList.json'));
        }
    },
    {   
        method: 'POST',
        path: '/student/sendMsg.json',
        handler: function(request, reply) {
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
        path: '/student/classSchedule.json',
        handler: function(request, reply) {
            return reply(require('./json/student/classSchedule.json'));
        }
    },
    {
        method: 'POST',
        path: '/student/editCourseRemark.json',
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
        path: '/student/freezeAccount.json',
        handler: function(request, reply) {
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
        path: '/student/unFreezeAccount.json',
        handler: function(request, reply) {
            return reply(
                {
                    "code": 0,
                    "msg": "",
                    "data": {}
                }
            );
        }
    },
    // {
    //     method: 'POST',
    //     path: '/student/getFuzzyClasses.json',
    //     handler: function(request, reply) {
    //         return reply(require('./json/student/fuzzyClasses.json'))
    //     }
    // },
    {
        method: 'POST',
        path: '/student/getFuzzyClasses.json',
        handler: function(request, reply) {
            return reply(require('./json/student/fuzzyClasses.json'))
        }
    },
    {
        method: 'POST',
        path: '/student/batchAllocation.json',
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