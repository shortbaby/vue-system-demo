/**
 * @author xuguanlonng
 */

exports.routes = [
    {
        method: 'POST',
        path: '/record/getFuncList.json',
        handler: function (request, reply) {
            return reply(require('./json/record/getFuncList.json'));
        }
    },
    {
        method: 'POST',
        path: '/record/fuzzyQuery.json',
        handler: function (request, reply) {
            return reply(require('./json/record/fuzzyQuery.json'));
        }
    },
    {
        method: 'POST',
        path: '/record/list.json',
        handler: function (request, reply) {
            return reply(require('./json/record/list.json'));
        }
    }
]