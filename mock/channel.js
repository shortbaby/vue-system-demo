/**
 * @fileOverview 系统配置－线索渠道api
 * @author Zhang Chi (zhangchi03@baijiahulian.com)
 */

exports.routes = [
    {
        method: 'POST',
        path: '/channelInfo/list.json',
        handler: function (request, reply) {
            return reply(require('./json/channel/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/channelInfo/detail.json',
        handler: function (request, reply) {
            return reply(require('./json/channel/info.json'));
        }
    },
    {
        method: 'POST',
        path: '/channelInfo/add.json',
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
        path: '/channelInfo/edit.json',
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
        path: '/channelInfo/del.json',
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
        path: '/channelInfo/disable.json',
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