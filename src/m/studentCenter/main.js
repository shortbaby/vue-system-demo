/**
 * @file feidu-学生中心-入口文件
 * @author xuguanlong
 */

'use strict';

import { configRouter } from './route';
import store from './store';
import Toast from '../../common/components/Toast.vue';
import { getGlobalConfig } from '../../common/request';

window.dispatch =  store.dispatch;
Vue.config.debug = true;

require('../../../dep/date-format');
require('../../../dep/dropload/dropload');

// filters
require('../../common/filters/date');
require('../../common/filters/season');
require('../../common/filters/compressImage');
require('../../common/filters/alpha');
require('../../common/filters/str');
require('../../common/filters/weektype');
require('../../common/filters/qrcode');

// create router
const router = new VueRouter({
	history: false,
 	saveScrollPosition: true
});

var App = Vue.extend({
	store,
	data () {
		return {
			title: '学生中心'
		}
	},
	init () {
	},
	vuex: {
		getters: {
			toastMessage: state => state.toastMessage,
			toastType: state => state.toastType
		}
	},
	computed: {
		showToast () {
			return this.$store.state.showToast;
		}
	},
	components: {
		Toast: Toast
	}
});

window.router = router;

// configure router
configRouter(router);

var app = router.start(App, 'html');

router.beforeEach(function(transition) {
	// TODO
	setTitle(transition.to.title);
	// App.$set('title', transition.to.title);
	transition.next();
});


window.setTitle = function (title) {
	document.title = title;
	$('#nav-bar').find('h1').text(title)
}
