/**
 * @file 飞度定制版 gobal mutations
 * @author xuguanlong
 */

'use strict';
import getCodeUrl from './common/function/codeUrl';

export default {
	'TOAST' (state, message, type) {
		state.showToast = true;
		state.toastMessage = message;
		if (type) {
			state.toastType = type;
		} else {
			state.toastType = 'warning';
		}
	},
	'HIDE_TOAST' (state) {
		state.showToast = false;
		state.toastMessage = '';
	},
	'SET_ORG_INFO' (state, orgInfo) {
		state.orgInfo = orgInfo;
	},
	'SHOW_ALERT' (state, message, type) {
		state.showAlert = true;
		state.alertMessage = message;
		if (type) {
			state.alertType = type;
		}else {
			state.alertType = 'success';
		}
	},
	'SHOW_CONFIRM' (state, message, command) {
		state.showConfirm = true;
		// state.confirmTitle = title | '提示';
		// state.confirmType = type | 'warning';
		state.confirmMessage = message;
		state.command = command;
	},
	'HIDE_CONFIRM' (state, title, message, type) {
		state.showConfirm = false;
	},
	'HIDE_ALERT' (state) {
		state.showAlert = false;
		state.alertMessage = '';
	},
	'SHOW_NEW_CLUE' (state) {
		state.addClueState = true;
	},
	'HIDE_NEW_CLUE' (state) {
		state.addClueState = false;
		// TODO
		$('body').removeClass('modal-open');
	},
	'SHOW_CHECK_CLUE' (state) {
		state.checkClueState = true;
	},
	'HIDE_CHECK_CLUE' (state) {
		state.checkClueState = false;
		// TODO
		$('body').removeClass('modal-open');
	},
	'SHOW_FOLLOW_STEP' (state) {
		state.followStepState = true;
	},
	'HIDE_FOLLOW_STEP' (state) {
		state.followStepState = false;
		$('body').removeClass('modal-open');
	},
	'INCREMENT_ERROR_TIMES' (state) {
		state.errorTimes = 3;
	},
	'CHANGE_CODE_URL' (state) {
		state.codeUrl = getCodeUrl();
	}
}
