/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'POST',
		path: '/recruitAnalysis/culeSource.json',
		handler: function (request, reply) {
			return reply(require('./json/report/cluesource.json'));
		}
	},
	{
		method: 'POST',
		path: '/recruitAnalysis/conversion.json',
		handler: function (request, reply) {
			return reply(require('./json/report/cluesource.json'));
		}
	},
	{
		method: 'POST',
		path: '/financeReport/income.json',
		handler: function (request, reply) {
			return reply(require('./json/report/income.json'));
		}
	},
	{
		method: 'POST',
		path: '/financeReport/refund.json',
		handler: function (request, reply) {
			return reply(require('./json/report/refund.json'));
		}
	},
	{
		method: 'POST',
		path: '/report/getAdviserReport.json',
		handler: function (request, reply) {
			return reply(require('./json/report/adviserReport.json'))
		}
	},
	{
		method: 'POST',
		path: '/consultantReport/conversion.json',
		handler: function (request, reply) {
			return reply(require('./json/report/consultantConversion.json'));
		}
	},
	{
		method: 'POST',
		path: '/consultantReport/visited.json',
		handler: function (request, reply) {
			return reply(require('./json/report/visited.json'));
		}
	},
	{
		method: 'POST',
		path: '/report/schoolcourse.json',
		handler: function (request, reply) {
			return reply(require('./json/report/schoolCourse.json'));
		}
	},
	{
		method: 'POST',
		path: '/report/schoolstudent.json',
		handler: function (request, reply) {
			return reply(require('./json/report/schoolStudent.json'));
		}
	}
];