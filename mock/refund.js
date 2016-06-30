/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'POST',
		path: '/refund/operator.json',
		handler: function (request, reply) {
			return reply(require('./json/refund/operator.json'));
		}
	},
	{
		method: 'POST',
		path: '/refund/getFuzzyName.json',
		handler: function (request, reply) {
			return reply(require('./json/refund/getFuzzyName.json'));
		}
	},
	{
		method: 'POST',
		path: '/refund/getFuzzyMobile.json',
		handler: function (request, reply) {
			return reply(require('./json/refund/getFuzzyMobile.json'));
		}
	},
	{
		method: 'POST',
		path: '/refund/list.json',
		handler: function (request, reply) {
			return reply(require('./json/refund/list.json'));
		}
	},
	{
		method: 'POST',
		path: '/refund/query.json',
		handler: function (request, reply) {
			return reply(require('./json/refund/query.json'));
		}
	},
	{
		method: 'POST',
		path: '/refund/selectStudent.json',
		handler: function (request, reply) {
			return reply(require('./json/refund/selectStudent.json'));
		}
	},
	{
		method: 'POST',
		path: '/refund/getSchool.json',
		handler: function (request, reply) {
			return reply(require('./json/refund/getSchool.json'));
		}
	},
	{
		method: 'POST',
		path: '/refund/getClasses.json',
		handler: function (request, reply) {
			return reply(require('./json/refund/getClasses.json'));
		}
	},
	{
		method: 'POST',
		path: '/refund/showClassDetail.json',
		handler: function (request, reply) {
			return reply(require('./json/refund/detail.json'));
		}
	},
	{
		method: 'POST',
		path: '/refund/checkApply.json',
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
		path: '/refund/refund.json',
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
		path: '/refund/refundApplySubmit.json',
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
		path: '/refund/getAgreementNumber.json',
		handler: function (request, reply) {
			return reply(require('./json/refund/agreementNumberList.json'));
		}
	},
	{
		method: 'POST',
		path: '/refund/export.json',
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
		path: '/refund/getDetailAfterPass.json',
		handler: function(request, reply) {
			return reply(require('./json/refund/refundDetail.json'));
		}
	},
	{
		method: 'POST',
		path: '/refund/getRefundDetail.json',
		handler: function(request, reply) {
			return reply(require('./json/refund/refundDetail.json'));
		}
	}
];