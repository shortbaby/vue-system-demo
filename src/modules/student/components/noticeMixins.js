

'use strict';
import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import {sendMsg} from '../request';
export default {
	data () {
		return {
			message: ''
		}
	},
	props: {
		id: {
			type: Number
		},
		show: {
			type: Boolean,
			default: false,
			twoWay: true
		},
		type: {
			type: String,
			default: 'multiple'
		},
		list: {
			type: Array
		}
	},
	computed: {
		names() {
			let str = '';
			this.list.forEach(function(item) {
				str += item.name + '、';
			})
			if (str == '') {
				return str;
			} else {
				return str.substring(0, str.length - 1);
			}
			
		}
	},
	methods: {
		ok(event) {
			var btn = $(event.target);
			var self = this;
			let arr = [];
			if (this.type == 'multiple') {
				this.list.forEach(function(item) {
					arr.push(item.id);
				})
			} else {
				arr.push(this.id);
			}
			if (this.message == '') {
				dispatch('TOAST', '请输入通知信息');
				return;
			}
			btn.prop('disabled', true);
			sendMsg({
				ids: arr.join(','),
				content: this.message
			})
				.then((res) => {
					if (res.code == 0) {
						dispatch('TOAST', '发送通知成功', 'success');
						setTimeout(function(){
							self.hide();
						}, 1000);
					}
				})
				.always(function() {
					btn.prop('disabled', false);
				})
		},
		hide(event) {
			this.show = false;
			this.message = '';
			$('body').removeClass('modal-open');
		}
	},
	components: {
		Modal: Modal
	}
}