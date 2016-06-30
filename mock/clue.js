
exports.routes = [
	{
		method: 'POST',
		path: '/clue/list.json',
		handler: function (request, reply) {
			if (request.payload.searchKey) {
				return reply(require('./json/clue/searchList.json'));
			}
			return reply(require('./json/clue/list.json'));;
		}
	},
	{
		method: 'POST',
		path: '/clue/commonList.json',
		handler: function (request, reply) {
			if (request.payload.searchKey) {
				return reply(require('./json/clue/searchList.json'));
			}
			return reply(require('./json/clue/list.json'));;
		}
	},
	{
		method: 'POST',
		path: '/clue/invalidList.json',
		handler: function (request, reply) {
			if (request.payload.searchKey) {
				return reply(require('./json/clue/searchList.json'));
			}
			return reply(require('./json/clue/list.json'));;
		}
	},
	{
		method: 'POST',
		path: '/clue/add.json',
		handler: function (request, reply) {
			return reply(require('./json/clue/clueAdd.json'));
		}
	},
	{
		method: 'POST',
		path: '/clue/addMy.json',
		handler: function (request, reply) {
			return reply(require('./json/clue/clueAdd.json'));
		}
	},
	{
		method: 'POST',
		path: '/clue/edit.json',
		handler: function (request, reply) {
			return reply(
        		{
				    "code": 0,
				    "msg": "succ",
				    "data": null
				}
			);
		}
	},
	{
		method: 'POST',
		path: '/clue/editMy.json',
		handler: function (request, reply) {
			return reply(
        		{
				    "code": 0,
				    "msg": "succ",
				    "data": null
				}
			);
		}
	},
	{
		method: 'POST',
		path: '/clue/editInvalid.json',
		handler: function (request, reply) {
			return reply(
        		{
				    "code": 0,
				    "msg": "succ",
				    "data": null
				}
			);
		}
	},
	{
		method: 'POST',
		path: '/clue/detail.json',
		handler: function(request, reply) {
			return reply(require('./json/clue/clueDetail.json'));
		}
	},
	{
		method: 'POST',
		path: '/clue/detailMy.json',
		handler: function(request, reply) {
			return reply(require('./json/clue/clueDetail.json'));
		}
	},
	{
		method: 'POST',
		path: '/clue/detailInvalid.json',
		handler: function(request, reply) {
			return reply(require('./json/clue/clueDetail.json'));
		}
	},
	{
		method: 'POST',
		path: '/clue/duplicate.json',
		handler: function (request, reply) {
			return reply(require('./json/clue/clueDuplicate.json'));
		}
	},
	{
		method: 'POST',
		path: '/clue/activateClue.json',
		handler: function(request, reply) {
			return reply(
				{
					"code": 0,
				    "msg": "succ",
				    "data": null
				}
			)
		}
	},
	{
		method: 'POST',
		path: '/clue/disableClue.json',
		handler: function(request, reply) {
			return reply(
				{
					"code": 0,
				    "msg": "succ",
				    "data": null
				}
			)
		}
	},
	{
		method: 'POST',
		path: '/clue/disableClueMy.json',
		handler: function(request, reply) {
			return reply(
				{
					"code": 0,
				    "msg": "succ",
				    "data": null
				}
			)
		}
	},
	{
		method: 'POST',
		path: '/clue/batchAllocation.json',
		handler: function(request, reply) {
			return reply(
				{
					"code": 0,
				    "msg": "succ",
				    "data": null
				}
			)
		}

	},
	{
		method: 'POST',
		path: '/clue/del.json',
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
		path: '/clue/release.json',
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
		path: '/clue/getSchoolList.json',
		handler: function (request, reply) {
			return reply(require('./json/clue/getSchoolList.json'));
		}
	},
	{
		method: 'POST',
		path: '/clue/getOriginList.json',
		handler: function (request, reply) {
			return reply(require('./json/clue/getOriginList.json'));
		}
	},
	{
		method: 'POST',
		path: '/clue/getAdviserList.json',
		handler: function (request, reply) {
			return reply(require('./json/clue/getAdviserList.json'));
		}
	},
	{
		method: 'POST',
		path: '/clue/getSubjectList.json',
		handler: function (request, reply) {
			return reply(require('./json/clue/getSubjectList.json'));
		}
	},
	{
		method: 'POST',
		path: '/clue/getBelongOption.json',
		handler: function (request, reply) {
			return reply(require('./json/clue/getBelongOption.json'));
		}
	}
];