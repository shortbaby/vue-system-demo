/**
 * @file 微信-通知详情
 * @author xuguanlong
 */

'use strict';

import getSearch from '../../common/function/getUrlSearch';
import Toast from '../../common/components/Toast.vue';
import {getCookie} from '../../common/function/cookie';

var search = getSearch();
var app = null;

import {getDetail} from './request';

let container =  $('#main');

require('../../common/filters/compressImage');


const alertMsg = (msg, type) => {
	app.$set('showToast', true);
	app.toastMessage = msg;
	if (type) {
		app.toastType = type;
	}
}

const initVue = () => {
	app = new Vue({
		el: '#main',
		data() {
			return {
				showToast: false,
				toastMessage: '',
				toastType: 'warning',
				msg: {
					urls: []
				}
			}
		},
		created() {
			let param = search.param;
			let token = getCookie('FEIDU_COOKIE_ID');
			getDetail({
				param: param,
				token: token
			})
				.then((res) => {
					this.msg = res.data;
					if (this.msg.urls.length > 0) {
						this.msg.urls = this.msg.urls.split(',');
					}
					
				})
		},
		components: {
			Toast: Toast
		}
	});
};


/**
 * 初始化
 */
const init = () => {
	initVue()
};

init();
