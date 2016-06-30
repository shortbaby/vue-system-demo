/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'POST',
		path: '/assignment/getClassesMap.json',
		handler: function (request, reply) {
			return reply(require('./json/assignment/getClassesMap.json'));
		}
	},
	{
		method: 'POST',
		path: '/assignment/getStudentsMap.json',
		handler: function (request, reply) {
			return reply(require('./json/assignment/getStudentsMap.json'));
		}
	},
	{
		method: 'POST',
		path: '/assignment/assign.json',
		handler: function (request, reply) {
			return reply(require('./json/assignment/assign.json'));
		}
	},
	{
		method: 'POST',
		path: '/assignment/getAssignments.json',
		handler: function (request, reply) {
			return reply(require('./json/assignment/getAssignments.json'));
		}
	},
	{
		method: 'POST',
		path: '/assignment/getClasses.json',
		handler: function (request, reply) {
			return reply(require('./json/assignment/getClasses.json'));
		}
	},
	{
		method: 'POST',
		path: '/assignment/getStudents.json',
		handler: function (request, reply) {
			return reply(require('./json/assignment/getStudents.json'));
		}
	},
	{
		method: 'POST',
		path: '/assignment/getQuestions.json',
		handler: function (request, reply) {
			return reply(require('./json/assignment/getQuestions.json'));
		}
	},
	{
		method: 'POST',
		path: '/assignment/correct.json',
		handler: function (request, reply) {
			return reply(require('./json/assignment/correct.json'));
		}
	},
	{
		method: 'POST',
		path: '/assignment/getOptions.json',
		handler: function (request, reply) {
			return reply(require('./json/assignment/getOptions.json'));
		}
	}
];