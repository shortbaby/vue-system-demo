

'use strict';
import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import Pager from '../../../common/components/Pager.vue';
import {batchAllocation, getAdviserList} from '../request';
export default {
	data () {
		return {
			// pageDto: {
   //      		pageNum: 1,
   //      		count: 0,
   //      		pageSize: 20
   //      	},
			teacher: '',
			list: []
		}
	},
	created() {
		let self = this;
		this.getListHandler();
	},
	props: {
		show: {
			type: Boolean,
			default: false,
			twoWay: true
		}
	},
	components: {
		Modal: Modal,
		Pager: Pager
	},
	methods: {
		pageChange: function () {
			this.getListHandler();
		},
		getListHandler() {
			var self = this;

			// var params = {
			// 	pageNum: this.pageDto.pageNum,
			// 	pageSize: this.pageDto.pageSize
			// };
			getAdviserList()
				.then(function(res) {
					let adviserList = res.data.list;
					// self.pageDto = res.pageDto;
					self.list = adviserList;
				}, function () {
					self.list = [];
				});
		},
		allocateClue (event) {
			var btn = $(event.target);
			var self = this;
			if (this.teacher === '') {
				dispatch('TOAST', '请选择需分配的老师!');
				return;
			}
			btn.prop('disabled', true);
			batchAllocation({
				id: this.teacher,
				ids: self.$parent.selectClueIds.join(',')
			})
				.then(function(res) {
					if (res.code == 0) {
						dispatch('TOAST', '分配线索成功', 'success');
						self.$dispatch('allocatesuccess', self.teacher);
						setTimeout(function() {
							self.hideAllocateClue();
						}, 1000);
								
					}
				})
				.always(function() {
					btn.prop('disabled', false);
				});
		

		},
		hideAllocateClue(event) {
			this.show = false;
			$('body').removeClass('modal-open');
		}
	}
}