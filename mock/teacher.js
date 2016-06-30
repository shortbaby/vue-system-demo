/**
 * @fileOverview 老师api
 * @author Zhang Chi (zhangchi03@baijiahulian.com)
 */

exports.routes = [
    {
        method: 'POST',
        path: '/teacher/list.json',
        handler: function (request, reply) {
            return reply(require('./json/teacher/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/teacher/getOptions.json',
        handler: function (request, reply) {
            return reply(require('./json/teacher/options.json'));
        }
    },
    {
        method: 'POST',
        path: '/teacher/detail.json',
        handler: function (request, reply) {
            return reply(require('./json/teacher/info.json'));
        }
    },
    {
        method: 'POST',
        path: '/teacher/add.json',
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
        path: '/teacher/availableTeacherList.json',
        handler: function(request, reply) {
            return reply(require('./json/teacher/availableTeacherList.json'))
        }
    },
    {
        method: 'POST',
        path: '/teacher/edit.json',
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
        path: '/teacher/del.json',
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
        path: '/teacher/disable.json',
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
        path: '/teacher/enable.json',
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
        path: '/teacher/reset.json',
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
        path: '/teacher/transf.json',
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
        path: '/teacher/teacherByName.json',
        handler: function (request, reply) {
            return reply(require('./json/teacher/teacherByName.json'));
        }
    },
    {
        method: 'POST',
        path: '/teacher/viewAttendances.json',
        handler: function (request, reply) {
            return reply(require('./json/teacher/viewAttendances.json'));
        }
    },
    {
        method: 'POST',
        path: '/teacher/export.json',
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
]