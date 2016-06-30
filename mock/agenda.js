

exports.routes = [
    {
        method: 'POST',
        path: '/backlog/add.json',
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
        path: '/backlog/list.json',
        handler: function(request,  reply) {
            return reply(require('./json/backlog/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/backlog/mark.json',
        handler: function(request,  reply) {
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