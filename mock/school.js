/**
 * @fileOverview 老师api
 * @author Zhang Chi (zhangchi03@baijiahulian.com)
 */

exports.routes = [
    {
        method: 'POST',
        path: '/school/list.json',
        handler: function (request, reply) {
            return reply(require('./json/school/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/school/getOptions.json',
        handler: function (request, reply) {
            return reply(require('./json/school/options.json'));
        }
    },
    {
        method: 'POST',
        path: '/school/detail.json',
        handler: function (request, reply) {
            return reply(require('./json/school/info.json'));
        }
    },
    {
        method: 'POST',
        path: '/school/add.json',
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
        path: '/school/edit.json',
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
        path: '/school/del.json',
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
        path: '/school/getProvince.json',
        handler: function (request, reply) {
            return reply(require('./json/school/province.json'));
        }
    },
    {
        method: 'POST',
        path: '/school/getCity.json',
        handler: function (request, reply) {
            return reply(require('./json/school/city.json'));
        }
    },
    {
        method: 'POST',
        path: '/school/getCounty.json',
        handler: function (request, reply) {
            return reply(require('./json/school/county.json'));
        }
    },
    {
        method: 'POST',
        path: '/school/getSchools.json',
        handler: function (request, reply) {
            return reply(require('./json/school/getSchools.json'));
        }
    }
]