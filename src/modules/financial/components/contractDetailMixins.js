import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import Pager from '../../../common/components/Pager.vue';
import {getDetailById} from '../request';
export default {
	props: {
		show: {
			type: Boolean,
			default: false,
			twoWay: true
		},
		id: {
			type: Number,
			default: '',
			twoWay: true
		}
	},
	data() {
		return {
			agreement: {},
			pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 20
        	}
		}
	},
	methods: {
		getDetail() {
			getDetailById({
				id: this.id
			})
				.then((res) => {
					if (res.code == 0) {
						this.agreement = res.data;
					}
				})
		},
		hide() {
			this.show = false;
			$('body').removeClass('modal-open');
		},
		getList() {
			var self = this;
			var params = {
				pageNum: this.pageDto.pageNum,
				pageSize: this.pageDto.pageSize
			};
			getClassList(params)
				.then(function (res) {
					var data = res.data;
					self.list =  data.result;
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
		this.getDetail();
	}
}