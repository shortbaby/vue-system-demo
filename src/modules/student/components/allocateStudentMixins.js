

'use strict';
import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import {batchAllocation, getOwnerList} from '../request';
export default {
	data () {
		return {
			teacher: '',
			list: []
		}
	},
	created() {
		let self = this;
		getOwnerList({ type: 0 })
			.then(function(res) {
				let ownerList = res.data.list;
				self.list = ownerList;
			})
	},
	props: {
		show: {
			type: Boolean,
			default: false,
			twoWay: true
		},
		selectlist: {
			type: Array
		}
	},
	components: {
		Modal: Modal
	},
	methods: {
		allocate (event) {
			var btn = $(event.target);
			var self = this;
			if (this.teacher === '') {
				dispatch('TOAST', '请选择需分配的老师!');
				return;
			}
			btn.prop('disabled', true);
			batchAllocation({
				id: this.teacher,
				ids: this.selectlist.join(',')
			})
				.then(function(res) {
					if (res.code == 0) {
						dispatch('TOAST', '分配班主任成功', 'success');
						self.$dispatch('allocatesuccess', self.teacher);
						setTimeout(function() {
							self.hideAllocate();
						}, 1000);

					}
				})
				.always(function() {
					btn.prop('disabled', false);
				});


		},
		hideAllocate(event) {
			this.show = false;
			$('body').removeClass('modal-open');
		}
	}
}