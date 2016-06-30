/**
 * @file libra-store
 * @author XiaoBin Li (lixiaobin@baijiahulian.com)
 */

'use strict';

var Vuex = require('vuex');

import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		showToast: false,
		toastType: '',
		toastMessage: '',
		globalConfig: {}
	},
	strict: false,
	mutations,
	modules: {}
});
