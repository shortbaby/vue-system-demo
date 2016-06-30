

'use strict';
import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import {refuse} from '../request';
export default {
	data () {
		return {
			reason: ''	
		}
	},
	props: {
		item: {
			type: Object
		},
		show: {
			type: Boolean,
			default: false,
			twoWay: true
		}
	},
	components: {
		Modal: Modal
	},
	methods: {
		save (event) {
			var btn = $(event.target);
			var self = this;
			if (this.reason.length < 10) {
				dispatch('TOAST', '请输入原因, 内容不少于10字!');
				return;
			}
			btn.prop('disabled', true);
			refuse({
				id: this.item.id,
				remarks: this.reason
			})
				.then(function(res) {
					if (res.code == 0) {
						dispatch('TOAST', '拒绝申请提交成功', 'success');
						setTimeout(function() {
							self.hide();
							self.$dispatch('success');
						}, 2000);
					}
				})
				.fail(function() {
					btn.prop('disabled', false);
				});
			
		},
		hide(event) {
			this.show = false;
			$('body').removeClass('modal-open');
		}
	}
}