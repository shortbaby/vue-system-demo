import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import Pager from '../../../common/components/Pager.vue';
import {listGroup, addGroup, editGroup, delGroup} from '../request';
export default {
	props: {
		show: {
			type: Boolean,
			default: false,
			twoWay: true
		}
	},
	computed: {

	},
	data() {
		return {
			name: '',
			list: [],
			pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 6
        	}
		}
	},
	methods: {
		add() {
			if(this.name.length < 0 || this.name.length > 20) {
				dispatch('TOAST', '分组名称不正确, 请重新输入');
				return;
			}
			addGroup({
				name: this.name
			}).then((res) => {
				dispatch('TOAST', '添加分组成功', 'success');
				this.name = '';
				this.refresh();
			})
		},
		hide() {
			this.show = false;
			$('body').removeClass('modal-open');
		},
		modify(item) {
			item.modify = true;
		},
		ok(item) {
			editGroup(item)
				.then((res) => {
					dispatch('TOAST', '修改分组成功', 'success');
					this.refresh();
				})
		},
		del(item) {
			delGroup({
				id: item.id
			})
				.then((res) => {
					dispatch('TOAST', '删除分组成功', 'success');
					this.refresh();
				})
		},
		refresh() {
			this.getList();
		},
		getList() {
			var self = this;
			var params = {
				pageNum: this.pageDto.pageNum,
				pageSize: this.pageDto.pageSize
			};
			listGroup(params)
				.then(function (res) {
					var data = res.data.list;
					
					data.forEach((item) => {
						item.modify = false;
					})
					self.list =  data;
					self.pageDto = res.pageDto;
				}, function () {
					self.list = [];
				});
		},
		pageChange: function () {
			this.getList();
		},
	},
	components: {
		Modal: Modal,
		Pager: Pager
	},
	created() {
		this.getList();
	}
}