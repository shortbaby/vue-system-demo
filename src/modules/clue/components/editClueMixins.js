

'use strict';
import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import {disableClue, releaseClue} from '../request';
import config from '../config';
export default {
	data () {
		return {
			reason: ''
		}
	},
	props: {
		show: {
			type: Boolean,
			default: false,
			twoWay: true
		},
		id: {
			type: Number,
			default: 0
		},
		name: {
			type: String,
			default: ''
		},
		valid: {
			type: Boolean,
			default: false
		},
		release: {
			type: Boolean,
			default: false
		}
	},
	components: {
		Modal: Modal
	},
	methods: {
		saveClue (event) {
			var btn = $(event.target);
			var self = this;
			if (this.reason.length < 10) {
				dispatch('TOAST', '请输入原因，字数不少于10!');
				return;
			}
			btn.prop('disabled', true);
			if (this.valid) {
				config
					.getDisableRequest(this.$parent.tab)
				({
					ids: this.id,
					content: this.reason
				})
					.then(function(res) {
						if (res.code == 0) {
							dispatch('TOAST', '标记线索成功', 'success');
							setTimeout(function() {
								self.hideEditClue();
								self.$dispatch('editsuccess');
								//self.$parent.pageChange();
								//self.$dispatch('page-change');
							}, 2000);
						}
					})
					.always(function() {
						btn.prop('disabled', false);
					});
			}
			if (this.release) {
				releaseClue({
					id: this.id,
					content: this.reason
				})
					.then(function(res) {
						if (res.code == 0) {
							dispatch('TOAST', '释放线索成功', 'success');
							setTimeout(function() {
								self.hideEditClue();
								self.$dispatch('editsuccess');
								//self.$dispatch('page-change');
							}, 2000);
						}
					})
					.always(function() {
						btn.prop('disabled', false);
					});
			}

		},
		hideEditClue(event) {
			this.show = false;
			$('body').removeClass('modal-open');
		}
	}
}