exports.routes = [
    {
        method: 'POST',
        path: '/subject/listSubject.json',
        handler: function (request, reply) {
            return reply(require('./json/subject/subjectSearch.json'));
        }
    },
    {
        method: 'POST',
        path: '/subject/editSubject.json',
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
        path: '/subject/delSubject.json',
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
        path: '/subject/getSubTypeList.json',
        handler: function (request, reply) {
            return reply(require('./json/subject/getSubTypeList.json'));
        }
    },
    {
        method: 'POST',
        path: '/subject/getSubTypeByClassesId.json',
        handler: function(request, reply) {
            return reply(require('./json/subject/subTypeByClassesId.json'));
        }
    },
    {
        method: 'POST',
        path: '/subject/search.json',
        handler: function (request, reply) {
            return reply(require('./json/course/getCourseCategoryList.json'));
        }
    },
    {
        method: 'POST',
        path: '/subject/add.json',
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
        path: '/subject/list.json',
        handler: function(request, replay) {
            return replay(require('./json/subject/list.json'));
        }
    },
    {
        method: 'POST',
        path: '/subject/del.json',
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
        path: '/subject/edit.json',
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
        path: '/subject/addSubItem.json',
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
