/**
 * @file 飞渡定制版-入口文件
 * @author xuguanlong
 */

'use strict';

import {
	configRouter
} from './route';
import store from './store';
import Toast from './common/components/Toast.vue';
import Alert from './common/components/Alert.vue';
import Confirm from './common/components/Confirm.vue';
import Popover from './common/components/Popover.vue';
import SideBar from './common/components/SideBar.vue';
import NewClue from './modules/clue/components/NewClue.vue';
import ClueCheck from './common/components/ClueCheck.vue';
import FollowStep from './common/components/FollowStep.vue';
import Dropdown from '../dep/vue-strap/src/Dropdown.vue';
// import getSideBarConfig from './common/function/getSideBarConfig';
import {getModules, queryNewCount, queryBatch, queryNewById, readBatch } from './common/request';
import {getSys} from './common/util/ua';
// directives
require('./common/directives/disable');
require('./common/directives/cellProcess');
require('./common/directives/down');
require('./common/directives/checked');
require('../dep/date-format');
require('./common/directives/zoomimage');
// 缩略图点击浏览
require('../dep/zoomimage/js/eye');
require('../dep/zoomimage/js/utils');
require('../dep/zoomimage/js/zoomimage');
// 时间点选择
require('../dep/timepicker/index.js');
// filters
require('./common/filters/date');
require('./common/filters/season');
require('./common/filters/compressImage');
require('./common/filters/str');
require('./common/filters/money');
require('./common/filters/alpha');
require('./common/filters/minute');
require('./common/filters/qrcode');
require('./common/filters/barcode');

var vueForm = require('../dep/vue-form');

// Vue.use(VueRouter);
Vue.use(vueForm);
Vue.config.debug = false;
var App = Vue.extend({
	store,
	data() {
		return {
			tab: null,
			pageDto: {
				pageSize: 1,
				pageNum: 20
			},
			timer: null,
			count: null,
			messages: []
		}
	},
	methods: {
		showNewClue() {
			dispatch('SHOW_NEW_CLUE');
		},
		showCheckClue() {
			dispatch('SHOW_CHECK_CLUE');
		},
		showFollowStep() {
			dispatch('SHOW_FOLLOW_STEP');
		},
		more() {
			this.$refs.popover.$emit('hide');
			window.router.go('/message/list');
		},
		startListenMessage() {
			let self = this;
			let listening = function() {
				queryNewCount()
					.then((res) => {
						self.count = res.data;
					});
				queryBatch({
					read: 0,
					pageNum: 1,
					pageSize: 20
				})
					.then((res) => {
						self.messages = res.data.list
					})
			}
			this.timer = setInterval(function() {
				listening();
			}, 60000);
			listening();
		}
	},
	computed: {
		newCount() {
			if (this.count == null || this.count == 0) {
				return '0';
			} else if (this.count > 99) {
				return '99+'
			} else {
				return this.count;
			}
		},
		modifyId() {
			return this.$store.state.modifyId;
		},
		checkClueState() {
			return this.$store.state.checkClueState;
		},
		addClueState() {
			return this.$store.state.addClueState;
		},
		followStepState() {
			return this.$store.state.followStepState;
			//return true;
		},
		currentTab() {
			return this.$store.state.currentTab;
		},
		toastMessage() {
			return this.$store.state.toastMessage;
		},
		toastType() {
			return this.$store.state.toastType;
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
		confirmMessage() {
			return this.$store.state.confirmMessage;
		},
		confirmType() {
			return this.$store.state.confirmType;
		},
		confirmTitle() {
			return this.$store.state.confirmTitle;
		},
		command() {
			return this.$store.state.command;
		},
		alertType() {
			return this.$store.state.alertType;
		},
		showToast() {
			return this.$store.state.showToast;
		},
		orgInfo() {
			return this.$store.state.orgInfo;
		},
		env() {
			return this.$store.state.env;
		}
	},
	events: {
		addcluesuccess() {
			this.$broadcast('addcluesuccess');
		}
	},
	ready() {
		this.startListenMessage();
	},
	components: {
		Toast: Toast,
		SideBar: SideBar,
		Alert: Alert,
		Confirm: Confirm,
		Popover: Popover,
		Dropdown: Dropdown,
		NewClue: NewClue,
		ClueCheck: ClueCheck,
		FollowStep: FollowStep
	}
});
const router = new VueRouter();
configRouter(router);
window.vueRoot = router.start(App, 'body');
window.router = router;
window.dispatch = store.dispatch;
window.Sys = getSys();
window.router.afterEach(function (transition) {
  window.router.app.$refs.sidebar.$emit('setstatus');
})
const $body = $('body');
window.removeBodyModalOpen = function() {
	$body.removeClass('modal-open');
};
