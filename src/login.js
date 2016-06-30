/**
 * @file 飞度教育-登录文件
 * @author xuguanlong
 */

'use strict';

import store from './store';
import Toast from './common/components/Toast.vue';
import Alert from './common/components/Alert.vue';
import Confirm from './common/components/Confirm.vue';
import Popover from './common/components/Popover.vue';
import VerifyCode from './common/components/VerifyCode.vue';
import Select from '../dep/vue-strap/src/Select.vue';
import {login} from './common/request';
import redirect from './common/function/redirect';
const MAX_ERROR_TIMES = 2;
Vue.config.debug = false;
require('./common/filters/str');
var App = new Vue({
	el: 'body',
	store,
	data: {
		username: '',
		userRoleOptions: [
	        {
	            value: '2',
	            label: '员工'
	        },
	        {
	            value: '1',
	            label: '老师'
	        }
		],
		userRole: 2,
		password: '',
		code: '',
		submitted: false
	},
	computed: {
		userNameCheck() {
			return this.submitted && this.username === '';
		},
		passwordCheck() {
			return this.submitted && this.password === '';
		},
		codeCheck() {
			return this.submitted && this.showVerifyCode && this.code === '';
		},
		params() {
			return {
				mobile: this.username,
				password: this.password,
				userRole: this.userRole,
				code: this.showVerifyCode ? this.code : undefined
			}
		},
		toastMessage() {
			return this.$store.state.toastMessage;
		},
		alertMessage() {
			return this.$store.state.alertMessage;
		},
		showAlert() {
			return this.$store.state.showAlert;
		},
		showConfirm() {
			return this.$store.state.showConfirm;
		},
		alertType() {
			return this.$store.state.alertType;
		},
		showToast() {
			return this.$store.state.showToast;
		},
		showVerifyCode() {
			return this.$store.state.errorTimes > MAX_ERROR_TIMES;
		},
		env() {
			return this.$store.state.env;
		}
	},
	methods: {
		submit(event) {
			var btn = $(event.target);
			if (this.userNameCheck || this.passwordCheck) {
				dispatch('TOAST', '请输入用户名和密码');
				return;
			}
			if (this.codeCheck) {
				dispatch('TOAST', '请输入验证码');
				return;
			}
			btn.prop('disabled', true);
			btn.val('登录中...');
			login(this.params)
				.done(function(res) {
					redirect('/main.do');
				})
				.fail(function(res) {
					if (res.code == 2022030106) {
						dispatch('INCREMENT_ERROR_TIMES');
					}
					if (this.showVerifyCode) {
						dispatch('CHANGE_CODE_URL');
					}
				})
				.always(function() {
					btn.prop('disabled', false);
					btn.val('登录');
				})
		}
	},
	components: {
		Toast: Toast,
		VerifyCode: VerifyCode,
		Alert: Alert,
		Confirm: Confirm,
		Popover: Popover,
		vSelect: Select
	}
});

window.dispatch = store.dispatch;