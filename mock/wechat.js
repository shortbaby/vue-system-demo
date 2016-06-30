/**
 * @fileOverview api
 * @author xuguanlong
 */

exports.routes = [
	{
		method: 'POST',
		path: '/sms/send.json',
		handler: function (request, reply) {
			return reply({
				"code": 2022030404,
				"msg": "绑定失败，您所填写的手机号不是学员手机号",
				"data": null
			});
			// return reply(
   //      		{
			// 	    "code": 0,
			// 	    "msg": "",
			// 	    "data": {}
			// 	}
			// );	
		}
	},
	{
		method: 'POST',
		path: '/wechat/webauth/bind.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/bind.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/teacher/detail.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/teacher/detail.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/teacher/info.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/teacher/info.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/teacher/myCourse.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/teacher/myCourse.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/teacher/courseDetail.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/teacher/courseDetail.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/teacher/mySchedule.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/teacher/mySchedule.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/student/mySchedule.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/student/mySchedule.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/teacher/scheduleDetail.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/teacher/scheduleDetail.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/teacher/addFeedBack.json',
		handler: function (request, reply) {
			return reply(
        		{
				    "code": 0,
				    "msg": "success",
				    "data": null
				}
			);
		}
	},
	{
		method: 'POST',
		path: '/wechat/teacher/editFeedBack.json',
		handler: function (request, reply) {
			return reply(
        		{
				    "code": 0,
				    "msg": "success",
				    "data": null
				}
			);
		}
	},
	{
		method: 'POST',
		path: '/wechat/teacher/listFeedBack.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/teacher/listFeedBack.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/teacher/afterTimeSchedule.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/teacher/afterTimeSchedule.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/teacher/getCalendar.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/teacher/getCalendar.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/teacher/addCalendar.json',
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
		path: '/wechat/student/info.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/student/info.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/student/afterTimeSchedule.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/student/afterTimeSchedule.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/student/courseDetail.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/student/courseDetail.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/student/getAssignments.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/student/getAssignments.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/student/getQuestions.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/student/getQuestions.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/student/submitQuestion.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/student/submitQuestion.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/student/submitAssignment.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/student/submitAssignment.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/student/getAssignmentDetail.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/student/getAssignmentDetail.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/staff/afterTimeSchedule.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/staff/afterTimeSchedule.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/staff/checkInList.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/staff/checkInList.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/student/msgDetail.json',
		handler: function(request, reply) {
			return reply(require('./json/wechat/student/msgDetail.json'))
		}
	},
	{
		method: 'POST',
		path: '/wechat/staff/lessonDetail.json',
		handler: function (request, reply) {
			return reply(require('./json/wechat/staff/lessonDetail.json'));
		}
	},
	{
		method: 'POST',
		path: '/wechat/staff/manualSign.json',
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
		path: '/wechat/student/scanCodeSign.json',
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
		path: '/wechat/common/getJsticket.json',
		handler: function(request, reply) {
			return reply(
        		{ 
					"code": 0,
					"msg": null,
					"data": {
						"signature": "7a007e87d5e2673b0f16ef5d48095e6b45342267",
						"appId": "wx147deba5eb2bf552",
						"jsapi_ticket": "kgt8ON7yVITDhtdwci0qeXyNhKdjq-2M93qdSrt_yELHR6oTCPe-BddokiRwqtfU1pei3OBGrgs273YxM9BGIA",
						"url": "http://test-virgo.ctest.baijiahulian.com/view/sign.html?openId=oojvsvkv0GOuuZR36XeN3Gr_JDiw",
						"nonceStr": "2ce03609-43d1-4468-8b13-a92d569b7453",
						"timestamp": "1466784192"
					}
				}
			);
		}
	},
	{
		method: 'POST',
		path: '/wechat/common/unbind.json',
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