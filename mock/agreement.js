/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'POST',
		path: '/agreement/list.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/list.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/query.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/query.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/delete.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/delete.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/modify.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/modify.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/getDetailById.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/detail.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/selectSigner.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/selectSigner.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/getFuzzyName.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/getFuzzyName.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/getFuzzyMobile.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/getFuzzyMobile.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/getParentFuzzyName.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/getParentFuzzyName.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/getParentFuzzyMobile.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/getParentFuzzyMobile.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/getClassInfo.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/getClassInfo.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/getPayType.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/getPayType.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/getAgreementType.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/getAgreementType.json'));
		}
	},
	{
		method: 'POST',
		path: '/roomDetail/schoolNames.json',
		handler: function (request, reply) {
			return reply(require('./json/agreement/schoolNames.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/getAgreementStatus.json',
		handler: function(request, reply) {
			return reply(require('./json/agreement/getAgreementStatus.json'));
		}
	},
	{
		method: 'POST',
		path: '/agreement/getStudentById.json',
		handler: function(request, reply) {
			return reply(require('./json/agreement/student.json'))
		}
	},
	{
		method: 'POST',
		path: '/agreement/getAgreementInfo.json',
		handler: function(request, reply) {
			return reply(require('./json/agreement/getAgreementInfo.json'))
		}
	},
	{
		method: 'POST',
		path: '/agreement/save.json',
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
];