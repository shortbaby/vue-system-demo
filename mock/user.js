/**
 * @fileOverview 员工api
 * @author Zhang Chi (zhangchi03@baijiahulian.com)
 */

exports.routes = [
    {
        method: 'POST',
        path: '/user/list.json',
        handler: function (request, reply) {
            return reply(require('./json/user/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/user/getOptions.json',
        handler: function (request, reply) {
            return reply(require('./json/user/options.json'));
        }
    },
    {
        method: 'POST',
        path: '/user/userByName.json',
        handler: function (request, reply) {
            return reply(require('./json/user/inferenceResult.json'));
        }
    },
    {
        method: 'POST',
        path: '/user/detail.json',
        handler: function (request, reply) {
            return reply(require('./json/user/info.json'));
        }
    },
    {
        method: 'POST',
        path: '/user/add.json',
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
        path: '/user/edit.json',
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
        path: '/user/del.json',
        handler: function (request, reply) {
            return reply(
                {
                    "code": 6001,
                    "msg": "",
                    "data": {}
                }
            );
        }
    },
    {
        method: 'POST',
        path: '/user/disable.json',
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
        path: '/user/enable.json',
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
        path: '/user/reset.json',
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
        path: '/user/transf.json',
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