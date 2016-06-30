/**
 * @file 飞度定制版-路由配置
 * @author xuguanlong
 */

'use strict';

export function configRouter (router) {

	router.map({
		'/home': {
			tab: 'home',
			component: require('./modules/home/index.vue'),
			subRoutes: {
				'/agenda': {
					name: 'agenda',
					component: require('./modules/home/agenda.vue')
				}
			}
		},
		'/report': {
			tab: 'report',
			component: require('./modules/report/index.vue'),
			subRoutes: {
				'/student': {
					name: 'studentReport',
					component: require('./modules/report/student.vue')
				},
				'/analysis': {
					name: 'analysisReport',
					component: require('./modules/report/analysis.vue')
				},
				'/financial': {
					name: 'financialReport',
					component: require('./modules/report/financial.vue')
				},
				'/teacher': {
					name: 'teacherReport',
					component: require('./modules/report/teacher.vue')
				},
				'/adviser': {
					name: 'adviserReport',
					component: require('./modules/report/adviser.vue')
				}
			}
		},
		'/message': {
			tab: 'message',
			component: require('./modules/message/index.vue'),
			subRoutes: {
				'/center': {
					name: 'message',
					component: require('./modules/message/center.vue')
				},
				'/apply': {
					name: 'apply',
					component: require('./modules/message/apply.vue')
				},
				'/list': {
					name: 'msglist',
					component: require('./modules/message/list.vue')
				}
			}
		},
		'/clue': {
			tab: 'clue',
			component: require('./modules/clue/index.vue'),
			subRoutes: {
				'/my': {
					name: 'myClue',
					component: require('./modules/clue/myClue.vue')
				},
				'/common': {
					name: 'commonClue',
					component: require('./modules/clue/commonClue.vue')
				},
				'/invalid': {
					name: 'invalidClue',
					component: require('./modules/clue/invalidClue.vue')
				}
			}
		},
		'/student': {
			tab: 'student',
			component: require('./modules/student/index.vue'),
			subRoutes: {
				'/my': {
					name: 'myStudent',
					component: require('./modules/student/myStudent.vue')
				},
				'/common': {
					name: 'commonStudent',
					component: require('./modules/student/commonStudent.vue')
				}
			}
		},
		'/course': {
			component: require('./modules/course/index.vue'),
			subRoutes: {
				'/list': {
					name: 'list',
					component: require('./modules/course/list.vue')
				},
				'/category': {
					name: 'category',
					component: require('./modules/course/category.vue')
				}
			}
		},
		'/educational': {
			tab: 'educational',
			component: require('./modules/educational/index.vue'),
			subRoutes: {
				'/course': {
					name: 'course',
					component: require('./modules/educational/course.vue')
				},
				'/timetable': {
					name: 'timetable',
					component: require('./modules/educational/timetable.vue')
				},
				'/sign': {
					name: 'sign',
					component: require('./modules/educational/sign.vue')
				},
				'/schedule': {
					name: 'schedule',
					component: require('./modules/educational/schedule.vue')
				}
			}
		},
		'/setting': {
			tab: 'setting',
			component: require('./modules/setting/index.vue'),
			subRoutes: {
				'/attendance': {
					name: 'attendance',
					component: require('./modules/setting/teacher/attendance.vue')
				},
				'/attendance/:id/:name': {
					name: 'attendance',
					component: require('./modules/setting/teacher/attendance.vue')
				},
				'/school': {
					name: 'school',
					component: require('./modules/setting/school/list.vue')
				},
				'/role': {
					name: 'role',
					component: require('./modules/setting/role/index.vue')
				},
				'/user': {
					name: 'user',
					component: require('./modules/setting/user/list.vue')
				},
				'/teacher': {
					name: 'teacher',
					component: require('./modules/setting/teacher/list.vue')
				},
				'/classroom': {
					name: 'classroom',
					component: require('./modules/setting/classroom/list.vue')
				},
				'/channel': {
					name: 'channel',
					component: require('./modules/setting/channel/list.vue')
				},
				'/parameter': {
					name: 'parameter',
					component: require('./modules/setting/parameter/list.vue')
				},
			}
		},
		'/financial': {
			tab: 'financial',
			component: require('./modules/financial/index.vue'),
			subRoutes: {
				'/add': {
					name: 'add',
					component: require('./modules/financial/add.vue')
				},
				'/add/:id': {
					name: 'add',
					component: require('./modules/financial/add.vue')
				},
				'/list': {
					name: 'list',
					component: require('./modules/financial/list.vue')
				},
				'/refund': {
					name: 'refund',
					component: require('./modules/financial/refund.vue')
				}
			}
		},
		'/homework': {
			tab: 'homework',
			component: require('./modules/homework/index.vue'),
			subRoutes: {
				'/question': {
					name: 'question',
					component: require('./modules/homework/question.vue')
				},
				'/arrangement': {
					name: 'arrangement',
					component: require('./modules/homework/arrangement.vue')
				},
				'/list': {
					name: 'list',
					component: require('./modules/homework/list.vue')
				}
			}
		},
		'/wechat': {
			tab: 'wechat',
			component: require('./modules/wechat/index.vue'),
			subRoutes: {
				// '/bind': {
				// 	name: 'bind',
				// 	component: require('./modules/wechat/bind.vue')
				// },
				'/fans': {
					name: 'fans',
					component: require('./modules/wechat/fans.vue')
				}
			}
		},
		'/log': {
			tab: 'log',
			component: require('./modules/log/index.vue'),
			subRoutes: {
				'/history': {
					name: 'history',
					component: require('./modules/log/history.vue')
				}
			}
		},
		'*': {
			tab: '',
			component: require('./modules/not-found.vue')
		}
	});
	router.redirect({
	   '/': '/home/agenda',
	   '/home': '/home/agenda'
	})
}