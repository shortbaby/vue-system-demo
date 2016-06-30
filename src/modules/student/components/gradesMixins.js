

'use strict';

import GradeDetail from '../../../common/components/GradeDetail.vue';
import QuitClass from './QuitClass.vue';
import {myClasses} from '../request';
export default {
	computed: {
		noRes() {
			return this.list && !this.list.length;
		}
	},
	data () {
		return {
			hoverId: 0,
			showDetail: false,
			isQuit: false,
			loading: false,
			more: true,
			list: [],
			styleObject: {
				width: '0px'
			},
			pageDto: {
				pageNum: 1,
				count: 0,
				pageSize: 20
			}
		}
	},
	props: {
		id: {
			type: Number
		}
	},
	components: {
		GradeDetail: GradeDetail,
		QuitClass: QuitClass
	},
	events: {
		editsuccess(){
			var self = this;
			let params = {
				id: this.id,
				pageNum: this.pageDto.pageNum
			};
			self.loading = true; 
			myClasses(params)
				.then(function(res) {
					self.list = res.data.list;
					self.pageDto = res.pageDto;
					if (self.pageDto.pageNum * self.pageDto.pageSize < self.pageDto.count) {
						self.more = true;
					} else {
						self.more = false;
					}
				}, function(){
					self.list = [];
				})
				.always(function(){
					self.loading = false;
				})
		}
	},
	watch: {
		hoverId(newVal, oldVal) {
			let oldLi = $('#grade-' + oldVal + ' + .detail');
			let newLi = $('#grade-' + newVal + ' + .detail');
			if (newVal !== undefined && oldVal !== undefined && newVal != oldVal) {
				oldLi.slideUp('slow');
				newLi.slideDown('slow');
			}
			if (newVal == null) {
				oldLi.slideUp('slow');
			}
		}
	},
	methods: {
		loadMore() {
			this.pageDto.pageNum += 1;
			this.getList();
		},
		getList() {
			var self = this;
			let params = {
				id: this.id,
				pageNum: this.pageDto.pageNum
			};
			self.loading = true; 
			myClasses(params)
				.then(function(res) {
					self.list = self.list.concat(res.data.list);
					self.pageDto = res.pageDto;
					if (self.pageDto.pageNum * self.pageDto.pageSize < self.pageDto.count) {
						self.more = true;
					} else {
						self.more = false;
					}
				}, function(){
					self.list = [];
				})
				.always(function(){
					self.loading = false;
				})
		},
		mouseleave(event) {
			let target = $(event.target);
			this.hoverId = null;
		},
		changeHoverId(event) {
			let target = $(event.currentTarget);
			let id = target.attr('data-id');
			if (id != this.hoverId) {
				this.hoverId = id;
			}
		},
		quit(event) {
			let target = $(event.target);
			if (target.hasClass('disabled')) {
				event.stopPropagation();
				return;
			}
			this.isQuit = true;
		},
		sign(event) {
			let target = $(event.target);
			if (target.hasClass('disabled')) {
				event.stopPropagation();
				return;
			}
		},
		showGradeDetail(event) {
			let target = $(event.currentTarget);
			let id = target.attr('data-id');
			if (id != this.hoverId) {
				this.hoverId = id;
			}
			this.showDetail = true;
		}
	},
	created () {
		var self = this;
		self.getList();
		console.log(this.id);
		
	},
	beforeDestroy () {
	}
}