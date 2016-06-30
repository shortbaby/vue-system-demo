

'use strict';
import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import {quitClass} from '../request';
export default {
	data () {
		return {
			reason: ''	
		}
	},
	props: {
		studentid: [String, Number],
		show: {
			type: Boolean,
			default: false,
			twoWay: true
		},
		id: [String, Number],
		type: {
			type: String,
			default: 'quit',
			twoWay: true
		}
	},
	components: {
		Modal: Modal
	},
	created() {
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
			if (this.type == 'quit') {
				quitClass({
					studentId: this.studentid,
					classId: this.id,
					content: this.reason
				})
					.then(function(res) {
						if (res.code == 0) {
							dispatch('TOAST', '退班成功', 'success');
							setTimeout(function() {
								self.hide();
								self.$dispatch('editsuccess');

							}, 2000);
						}
					})
					.fail(function() {
						btn.prop('disabled', false);
					});
			}
			// if (type == 'refund') {
			// 	setClueStatus({
			// 		ids: this.id,
			// 		type: 0,
			// 		content: this.reason
			// 	})
			// 		.then(function(res) {
			// 			if (res.code == 0) {
			// 				dispatch('TOAST', '退费成功', 'success');
			// 				setTimeout(function() {
			// 					self.hideEditClue();
			// 					self.$dispatch('editsuccess');
			// 					//self.$parent.pageChange();
			// 					//self.$dispatch('page-change');
			// 				}, 2000);
			// 			}
			// 		})
			// 		.always(function() {
			// 			btn.prop('disabled', false);
			// 		});	
			// }
			
		},
		hide(event) {
			this.show = false;
			$('body').removeClass('modal-open');
		}
	}
}