/**
 * @file libra-老师中心-入口文件
 * @author XiaoBin Li (lixiaobin@baijiahulian.com)
 */

'use strict';

import { configRouter } from './route';
import store from './store';
import Toast from '../../common/components/Toast.vue';


window.dispatch =  store.dispatch;
Vue.config.debug = true;

require('../../../dep/date-format');
require('../../../dep/dropload/dropload');

// filters
require('../../common/filters/date');
require('../../common/filters/weektype');
require('../../common/filters/compressImage');
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
			title: '老师中心'
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
