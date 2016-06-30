/**
 * @fileOverview 系统配置－教室api
 * @author Zhang Chi (zhangchi03@baijiahulian.com)
 */

exports.routes = [
    {
        method: 'POST',
        path: '/roomDetail/list.json',
        handler: function (request, reply) {
            return reply(require('./json/classroom/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/roomDetail/detail.json',
        handler: function (request, reply) {
            return reply(require('./json/classroom/info.json'));
        }
    },
    {
        method: 'POST',
        path: '/roomDetail/add.json',
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
        path: '/roomDetail/availableRoomList.json',
        handler: function(request, reply) {
            return reply(require('./json/classroom/availableRoomList.json'))
        }
    },
    {
        method: 'POST',
        path: '/roomDetail/edit.json',
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
        path: '/roomDetail/getRoomsBySchoolId.json',
        handler: function(request, reply) {
            return reply(require('./json/classroom/roomsBySchoolId.json'))
        }
    },
    {
        method: 'POST',
        path: '/roomDetail/del.json',
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
        path: '/roomDetail/disable.json',
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