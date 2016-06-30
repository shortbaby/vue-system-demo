

'use strict';
import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import InferenceInput from '../../../common/components/InferenceInput.vue';
import {fansAllot,  queryFuzzyName} from '../request';
export default {
	data () {
		return {
			groupId: -1,
        	groupName: '',
        	queryGroupByName: function() {
        		let param = {
					query: this.query
				}
				return queryFuzzyName(param)
        	},
        	hitGroupName: function(res) {
        		this.$parent.$parent.groupName = res.name;
        		this.$parent.$parent.groupId = res.id;
        	},
			nameTemplate: `<span v-html="item.name"></span>`,
		}
	},
	props: {
		show: {
			type: Boolean,
			default: false,
			twoWay: true
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
			self.list.forEach(function(item) {
				arr.push(item.id);
			})
			if (self.groupName.length == 0 && self.groupId != -1) {
				dispatch('TOAST', '请选择分组');
				return;
			}
			btn.prop('disabled', true);
			fansAllot({
				ids: arr.join(','),
				groupId: self.groupId
			})
				.then((res) => {
					if (res.code == 0) {
						dispatch('TOAST', '分组分配成功', 'success');
						setTimeout(function(){
							self.hide();
							self.$dispatch('success');
						}, 1000);
					}
				})
				.always(function() {
					btn.prop('disabled', false);
				})
		},
		hide(event) {
			this.show = false;
			$('body').removeClass('modal-open');
		}
	},
	components: {
		Modal: Modal,
		InferenceInput: InferenceInput
	}
}