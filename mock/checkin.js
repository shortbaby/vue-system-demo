/**
 * @fileOverview 系统配置－线索渠道api
 * @author Zhang Chi (zhangchi03@baijiahulian.com)
 */

exports.routes = [
    {
        method: 'POST',
        path: '/checkin/detail.json',
        handler: function(request, reply) {
            return reply(require('./json/checkin/detail.json'));
        }
    }, 
    {
        method: 'POST',
        path: '/checkin/manualSign.json',
        handler: function(request, reply) {
            return reply({
                "code": 0,
                "msg": null,
                "data": null
            })
        }
    },
    {
        method: 'POST',
        path: '/checkin/lessonList.json',
        handler: function(request, reply) {
            return reply(require('./json/checkin/lessonList.json'))
        }
    }
]