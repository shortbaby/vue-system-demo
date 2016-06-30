'use strict';
import Select from '../../../dep/vue-strap/src/Select.vue';
import Upload from './Upload.vue';
import getSelectOptions from '../function/getSelectOptions';
import Pager from './Pager.vue';
import AtList from './AtList.vue';
import {
	getCommentList,
	addComment,
	editComment,
	delComment
} from '../request';
const MAX_IMAGES = 5;
let options = getSelectOptions();
const refreshSmallImages = function(del) {
	let smallImages = $('.small-pics').find('.slider-small-img');
	smallImages.each(function(){
		let box = $('#' + $(this).attr('zoomimagebox'));
		if(box[0]) {
			box.remove();
		}
	});
	if (!del) {
		smallImages.zoomimage({replace: true});
	}
}
export default {
	computed: {
		noRes() {
			return this.commentList && !this.commentList.length;
		}
	},
	watch: {
		modifyId(val) {
			let m;
			let l = this.commentList.length;
			this.atUsers = [];
			if (val == 0) {
				refreshSmallImages(true);
				let defaultComment =  {
					commentId: null,
					content: '',
					isMilestone: 0,
					storageIds: [],
					imageList: [],
					urls: [],
					atUserIds:[]
				}
				this.comment = defaultComment;
				return;
			}
			for (var i = 0; i < l; i++) {
				if (this.commentList[i].commentId == val) {
					this.comment = $.extend(true, {}, this.commentList[i]);
					if ($.type(this.comment.storageIds) == 'string') {
						this.comment.storageIds = this.comment.storageIds.length > 0 ? this.comment.storageIds.split(',') : [];	
					}
					if ($.type(this.comment.atUserIds) == 'string') {
						this.comment.atUserIds = this.comment.atUserIds.length > 0 ? this.comment.atUserIds.split(',') : [];
					} else {
						this.comment.atUserIds = [];
					}
					break;
				}
			};
			this.$nextTick(function(){
				refreshSmallImages(false);
			})
			
		}
	},
	data() {
		return {
			mark: false,
			searchMark: false,
			followFieldOptions: options.followFieldOptions,
			followField: 0,
			fileName: '',
			file: null,
			commentList: [],
			pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 20
        	},
			imgList: [],
			loading: false,
			more: true,
			modifyId: 0,
			editType: 'add',
			urls: [],
			addScrollEvent: false,
			sendToStudent: false,
			atUsers: [],
			atX: 0,
			atY: 0,
			atMatesShow: false,
			comment: {
				commentId: 0,
				content: '',
				isMilestone: 0,
				storageIds: [],
				imageList: [],
				urls: [],
				atUserIds:[]
			}
		}
	},
	props: {
		id: {
			type: Number,
			default: 0
		},
		type: {
			type: String,
			default: ''
		}
	},
	events: {
		modify(id) {
			this.editType = 'edit';
			this.modifyId = id;
		},
		del(id) {
			delComment({
				commentId: id,
				studentId: this.id
			})
				.then((res) => {
					if (res.code == 0) {
                		dispatch('TOAST', '删除成功', 'success');
                		this.refresh();
                	} else {
                		dispatch('TOAST', res.msg);
                	}
				})
		},
		at(item) {
			if (this.comment.atUserIds.indexOf(item.id) > -1) {

			} else {
				this.comment.atUserIds.push(item.id);
				this.atUsers.push(item);
			}
		},
		onFileChange(data) {
			this.file = data[0];
			this.fileName = data[0].name;
			var fd = new FormData();
			var self = this;
			if (self.comment.imageList.length > 5) {
				dispatch('TOAST', '上传图片数量超过限制');
				return;
			}
    		fd.append('file', self.file);
			$.ajax({
                url: '/common/upload.json',
                type: 'POST',
                contentType: false,
                data: fd,
                dataType: 'json',
                processData: false,
                error: function () {
                	dispatch('TOAST', '网络异常');
                },
                success: function (res) {
                	if (res.code == 0) {
                		dispatch('TOAST', '上传成功', 'success');
                		self.comment.storageIds.push(res.data.storageId);
                		self.comment.imageList.push(res.data.url);
                		self.$nextTick(function(){
							refreshSmallImages(false);
						})
                		//self.scene = 'process';
                		//self.checkUploadProcessStatusHandler(res.data.taskId);

                	} else {
                		dispatch('TOAST', res.msg);
                	}
                }
            })
		}
	},
	components: {
		vSelect: Select,
		Upload: Upload,
		Pager: Pager,
		AtList: AtList
	},
	vuex: {},
	methods: {
		showAt(event) {
			event.stopPropagation();
            var that=this;
            that.atX=event.target.offsetLeft;
            that.atY=event.target.offsetTop - 208;
            that.atMatesShow = true;
            var bindHide=function(event){
                event.stopPropagation();
                that.atMatesShow=false;
                document.removeEventListener('click',bindHide,false);
            };
            setTimeout(function(){
                document.addEventListener('click',bindHide,false);
            },500);
		},
		delAtUser(event, u) {
			event.preventDefault();
			let target = $(event.target);
			let index = -1;
			for (let i = 0; i < this.comment.atUserIds.length; i++) {
				if (u.id == this.comment.atUserIds[i]) {
					index = i;
					break;
				}
			};
			if (index != -1) {
				this.comment.atUserIds.splice(index, 1);
				this.atUsers.splice(index, 1);
			}
		},
		delImage(event, m) {
			event.preventDefault();
			let target = $(event.target);
			let index = -1;
			for (let i = 0; i < this.comment.imageList.length; i++) {
				if (m == this.comment.imageList[i]) {
					index = i;
					break;
				}
			};
			if (index != -1) {
				this.comment.imageList.splice(index, 1);
				this.comment.storageIds.splice(index, 1);
				let box = $('#' + target.parent().attr('zoomimagebox'));
				if(box[0]) {
					box.remove();
				}
			}
		},
		getFollowStr(type) {
			let str = '';
			this.followFieldOptions.forEach(function(item, index) {
				if (item.value === type.toString()) {
					str= item.label;
				}	
			});
			return str;
		},
		pageChange() {
			// this.loading = true;
			// this.pageDto.pageNum += 1;
			this.getList();
		},
		getList() {
			let self = this;
			let isMilestone = this.searchMark ? 1 : 0;
			let params = {
				id: this.id,
				pageNum: this.pageDto.pageNum,
				pageSize: this.pageDto.pageSize,
				isMilestone: isMilestone
			};
			self.loading = true;
			getCommentList(params)
				.then(function(res) {
					let list = res.data.list;
					list.forEach(function(item) {
						let d = new Date(item.createTime)
						item.zhTime = d.getMonth() + 1 + '月' + d.getDate() + '日';
						item.followStr = self.getFollowStr(item.followType);
						item.imageList = item.urls.length > 0 ? item.urls.split(',') : [];
						item.hasImage = item.imageList.length > 0 ? true: false;
						item.disabled = item.userId == -1 ? true : false;
					});
					//self.commentList = self.commentList.concat(res.data.list);
					$('div.zoomimage').remove();
					self.commentList = res.data.list;
					self.pageDto = res.pageDto;
					if (self.pageDto.pageNum * self.pageDto.pageSize < self.pageDto.count) {
						self.more = true;
					} else {
						self.more = false;
					}
					//滚动跟进记录列表同时关闭图片浏览
					self.$nextTick(function() {
						if (!self.addScrollEvent) {
							let commentWrap = $('.follow-logs');
							if (commentWrap) {
								commentWrap.scroll(function() {
									let zoomImages = $('.slider-log-img');
									zoomImages.each(function(img){
										var el = document.getElementById($(img).attr('zoomimagebox'));
										$(el).zoomimageClear()
									})
								});
							}
							self.addScrollEvent = true;
						}
					});
				}, function() {
					self.commentList = [];
				}).always(function() {
					self.loading = false;
				});
		},
		setMark() {
			this.searchMark = !this.searchMark;
			this.getList();
		},
		refresh() {
			this.pageDto.pageNum = 1;
			this.getList();
		},
		save() {
			let self = this;
			let comment = {};
			comment.studentId = this.id;
			comment.content = this.comment.content;
			comment.storageIds = this.comment.storageIds.join(',');
			comment.isMilestone = this.comment.isMilestone ? 1 : 0;
			comment.atUserIds = this.comment.atUserIds.join(',');
			comment.followType = this.followField;
			comment.isSendWechat = this.sendToStudent ? 1 : 0;
			if (this.editType == 'edit') {
				comment.commentId = this.comment.commentId;
				comment.followType = this.comment.followType;
				editComment(comment)
					.then(function(res) {
						if (res.code == 0) {
							dispatch('TOAST', '修改跟进记录成功', 'success');
						}
						self.refresh();
						self.modifyId = 0;
						self.editType = 'add';
					});
			} else {
				addComment(comment)
					.then(function(res) {
						if (res.code == 0) {
							dispatch('TOAST', '发布跟进记录成功', 'success');
						}
						self.refresh();
					});
			}

		}
	},
	created() {
		var self = this;
		self.getList();
	},
	beforeDestroy() {
		$('div.zoomimage').remove();
	}
}