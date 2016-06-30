

'use strict';

import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import Job from './components/Job.vue';
import Pager from '../../../common/components/Pager.vue';
import Loading from '../../../common/components/Loading.vue';
import {getRoleList, delRole} from './request';

export default {
	created() {
		this.getList();
	},
	data () {
		return {
			list: null,
        	pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 20
        	},
        	showJob: false,
        	jobId: null,
			key: ''
		};
	},
	events: {
		success(){
			this.refresh();
		},
		okcallback() {
			delRole({
				id: this.jobId
			})
				.then((res) => {
					if (res.code == 0) {
						dispatch('TOAST', '删除职位成功', 'success');
						this.$emit('success');
					}
				})
		}
	},
	computed: {
		loading() {
			return !!this.List;
		},
		noRes() {
			return this.list && !this.list.length
		}
	},
	components: {
		Modal: Modal,
		Job: Job,
		Pager: Pager,
		Loading: Loading
	},
	
	methods: {
		getList() {
			var self = this;
			var params = {
				pageNum: this.pageDto.pageNum,
				pageSize: this.pageDto.pageSize,
				name: this.key
			};
			getRoleList(params)
				.then(function (res) {
					var data = res.data;
						self.list =  data.list;
						self.pageDto = res.pageDto;
					}, function () {
						self.list = [];
				});

		},
		edit(item) {
			this.jobId = item.id;
			this.showJob = true;
		},
		del(item) {
			this.jobId = item.id;
			dispatch('SHOW_CONFIRM','你确定删除该职位吗?', 'okcallback');
		},
		add() {
			this.jobId = null;
			this.showJob = true;
		},
		refresh() {
			this.pageDto.pageNum = 1;
			this.getList();
		},
		reset() {
			this.key = '';
		},
		search() {
			this.refresh();
		},
		pageChange: function () {
			//console.log('pageChange');
			this.getList();
		}
	}
}