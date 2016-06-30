'use strict';

var Vuex = require('vuex');

import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		showToast: false,
		toastType: '',
		toastMessage: '',
		currentView: 'single',
		globalConfig: {}
	},
	strict: false,
	mutations,
	modules: {}
});