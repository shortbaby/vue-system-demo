/**
 * @file 飞度定制版-store
 * @author xuguanlong
 */

'use strict';

var Vuex = require('vuex');

import mutations from './mutations';
import course from './modules/course/module';
import school from './modules/setting/school/module';
import user from './modules/setting/user/module';
import teacher from './modules/setting/teacher/module';
import classroom from './modules/setting/classroom/module';
import channel from './modules/setting/channel/module';
import parameter from './modules/setting/parameter/module';
import clue from './modules/clue/module';
import student from './modules/student/module';
import educational from './modules/educational/module';
import financial from './modules/financial/module';
import report from './modules/report/module';
import env from './common/plugin/env';
import getCodeUrl from './common/function/codeUrl';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		showToast: false,
		showAlert: false,
		showConfirm: false,
		confirmMessage: '',
		confirmType: '',
		confirmTitle: '',
		command: '',
		alertMessage: '',
		errorTimes: 0,
		alertType: 'success',
		toastType: '',
		env: env,
		toastMessage: '',
		orgInfo: {},
		codeUrl: getCodeUrl(),
		modifyId: 0,
		addClueState: false,
		addStudentState: false,
		checkClueState: false,
		followStepState: false
	},
	strict: false,
	mutations,
	modules: {
		clue,
		student,
		educational,
		course,
		school,
		teacher,
		user,
		financial,
		classroom,
		channel,
		parameter,
		report
	}
});


