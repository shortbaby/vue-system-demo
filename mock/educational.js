/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'POST',
		path: '/edu/apply/search.json',
		handler: function (request, reply) {
			return reply(require('./json/edu/apply/search.json'));
		}
	},
	{
		method: 'POST',
		path: '/edu/apply/applySchedule.json',
		handler: function (request, reply) {
			return reply(require('./json/edu/apply/applySchedule.json'));
		}
	},
	{
		method: 'POST',
		path: '/edu/apply/release.json',
		handler: function (request, reply) {
			return reply(require('./json/edu/apply/release.json'));
		}
	},
	{
		method: 'POST',
		path: '/edu/apply/receive.json',
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
		path: '/edu/schedule/getMyCourse.json',
		handler: function (request, reply) {
			return reply(require('./json/edu/schedule/getMyCourse.json'));
		}
	},
	{
		method: 'POST',
		path: '/edu/schedule/classesDetail.json',
		handler: function (request, reply) {
			return reply(require('./json/edu/schedule/classesDetail.json'));
		}
	},
	{
		method: 'POST',
		path: '/edu/schedule/addSchedule.json',
		handler: function(request, reply) {
			return reply({
				"code": 0,
				"msg": "",
				"data": {}
			})
		}
	},
	{
		method: 'POST',
		path: '/edu/schedule/edit.json',
		handler: function(request, reply) {
			return reply({
				"code": 0,
				"msg": "",
				"data": {}
			})
		}
	},
	{
		method: 'POST',
		path: '/edu/schedule/delete.json',
		handler: function(request, reply) {
			return reply({
				"code": 0,
				"msg": "",
				"data": {}
			})
		}
	},
	{
		method: 'POST',
		path: '/edu/schedule/search.json',
		handler: function(request, reply) {
			return reply(require('./json/edu/schedule/timetable.json'));
		}
	},
	{
		method: 'POST',
		path: '/edu/schedule/getScheduledCourseList.json',
		handler: function (request, reply) {
			return reply(require('./json/edu/schedule/getScheduledCourseList.json'));
		}
	},
	{
		method: 'POST',
		path: '/edu/schedule/scheduleRecordDetail.json',
		handler: function(request, reply) {
			return reply(require('./json/edu/schedule/scheduleRecordDetail.json'))
		}
	}
	
];