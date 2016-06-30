/**
 * @file 微信-绑定手机
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import CodeButton from '../../common/plugin/CodeButton';
import Toast from '../../common/components/Toast.vue';
import getSearch from '../../common/function/getUrlSearch';

var search = getSearch();
var app = null;

import {smsSend, bindTel} from './request';

let container =  $('#main');

const validateMobile = (mobile) => {
	if (!mobile) {
		return '请输入手机号码';
	}

	if (!/^1\d{10}$/.test(mobile)) {
		return '请输入正确的手机号码';
	}
	return true;
};

const validate = () => {

	let mobile = $.trim(container.find('input[name="mobile"]').val());
	let verifyCode = $.trim(container.find('input[name="verify-code"]').val());
	let validateMobileMsg = validateMobile(mobile);

	if ($.type(validateMobileMsg) == 'string') {
		return validateMobileMsg;
	}

	if (!verifyCode) {
		return '请输入验证码';
	}

	if (!/^\d+$/.test(verifyCode)) {
		return '请输入正确的验证码';
	}

	return {
		mobile: mobile,
		code: verifyCode
	};
};

const alertMsg = (msg, type) => {
	app.$set('showToast', true);
	app.toastMessage = msg;
	if (type) {
		app.toastType = type;
	}
}
window.alertMsg = alertMsg;

/**
 * 提交数据
 */
const submit = (event) => {
	let target  = $(event.target);
	let validation =  validate();
	if ($.type(validation) == 'string') {
		alertMsg(validation);
		return;
	}
	let postData = $.extend(validation, {
		openId: search.openId,
		userRole: search.userRole
	});
	target.prop('disabled', true);

	let deferred = null;
	if (window.userType === 'teacher') {
		//postData.
	}
	deferred = bindTel(postData);
	deferred
		.done(function (res) {

			alertMsg('绑定成功', 'success');
			window.location.href = res.data.url;

		})
		.always(function () {
			target.prop('disabled', false);
		});
};

/**
 * 绑定数据
 */
const bindEvent = () => {
	container
		.on('click', '.btn-submit', submit);
};

/**
 * 初始化验证码
 */
const initCodeButton = () => {
	new CodeButton({
		element: $('#verify-code-btn'),
		send: function () {
			let mobileElement = container.find('input[name="mobile"]');
			let mobile = $.trim(mobileElement.val());
			let validateMobileMsg = validateMobile(mobile);

			if ($.type(validateMobileMsg) == 'string') {
				alertMsg(validateMobileMsg);
				return;
			}
			//console.log(search);
			return smsSend({
				mobile: mobile,
				userRole: search.userRole
			});
		}
	});
};

const initVue = () => {
	app = new Vue({
		el: '#main',
		data() {
			return {
				showToast: false,
				toastMessage: '',
				toastType: 'warning'
			}
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
	initCodeButton();
	bindEvent();
};

init();
