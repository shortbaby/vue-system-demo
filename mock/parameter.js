/**
 * @fileOverview 系统配置－基础参数api
 * @author Zhang Chi (zhangchi03@baijiahulian.com)
 */

exports.routes = [
    {
        method: 'POST',
        path: '/system/configList.json',
        handler: function (request, reply) {
            return reply(require('./json/parameter/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/system/modConfig.json',
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