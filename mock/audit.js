

exports.routes = [
    {
        method: 'POST',
        path: '/audit/myAudit.json',
        handler: function(request, reply) {
            return reply(require('./json/audit/myAudit.json'));
        }
    },
    {
        method: 'POST',
        path: '/audit/myApply.json',
        handler: function(request, reply) {
            return reply(require('./json/audit/myApply.json'));
        }
    },
    {
        method: 'POST',
        path: '/audit/passed.json',
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
        path: '/audit/refuse.json',
        handler: function(request, reply) {
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