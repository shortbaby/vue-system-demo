

<template>
	<div class="grade-detail-modal">
		<modal :show.sync="show" :width="900">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title">班级详情</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hideGradeDetail()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
				<div class="info">
					<ul class="clearfix">
						<li>
							<div class="base-info">
								<p>{{detail.info.name}}</p>
								<p>{{detail.info.number}}</p>
								<p><span class="status">{{detail.info.statusStr}}</span></p>
							</div>
						</li>
						<li>
							<div class="course">
								<p><span>{{detail.info.totalLesson}}</span><span>{{detail.info.signCount}}</span></p>
								<p><span>总课时</span><span>已上课时</span></p>
							</div>
						</li>
						<li>
							<div class="school">
								<p><span>{{detail.info.schoolName}}</span><span>{{detail.info.subjectName}}</span></p>
								<p><span>校区</span><span>课程分类</span></p>
							</div>
						</li>
						<li>
							<div class="subject">
								<div v-for="item in detail.classesDetails">
									<p>
										<span>{{item.finishLesson}}/{{item.totalLesson}}</span>
									</p>
									<p>
										<span>{{item.name}}</span>	
									</p>

								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="list">
					<h3>课节列表({{list.length}}次)</h3>
					<table>
						<tr v-for="item in list">
							<td><div>{{item.day}}</div></td>
							<td><div>{{item.subTypeName}}第{{item.index}}节</div></td>
							<td><div>{{item.section}}</div></td>
							<td><div>{{item.roomName}}</div></td>
							<td><div>{{item.teacherName}}</div></td>
							<td><div>{{item.signStatusStr}}</div></td>
							<td class="tl">
								<div>
									<input v-if="item.editing" type="text" v-model="item.remarks">
									<p v-if="!item.editing">{{item.remarks}}</p>
								</div>
							</td>
							<td>
								<div>
									<span v-disable="!item.checkinId" v-if="!item.remarks && !item.editing" class="btn btn-primary" @click="add($event, item)">添加备注</span>
									<span v-if="item.remarks && !item.editing" class="btn btn-primary" @click="edit(item)">修改备注</span>
									<span v-if="item.editing" class="btn btn-primary" @click="ok(item)">确定</span>
									<span v-if="item.editing" class="btn btn-primary" @click="cancel(item)">取消</span>
								</div>
							</td>
						</tr>
					</table>
					<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
				</div>
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<span @click.stop="hideGradeDetail()" class="btn btn-primary">关闭</span>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import Modal from '../../../dep/vue-strap/src/Modal.vue';
	import Pager from './Pager.vue';
	import {courseDetail, subList, editCourseRemark} from '../../modules/student/request';
	export default {
		props: {
			show: {
				type: Boolean,
				default: false,
				twoWay: true
			},
			id:  [String, Number],
			studentid:  [String, Number]
		},
		created() {
			this.getInfo();
			this.getList();
		},
		data() {
			return {
				list: [],
				detail: {
					info: {},
					classesDetails: []
				},
				pageDto: {
	        		pageNum: 1,
	        		count: 30,
	        		pageSize: 20
	        	}
			}
		},
		methods: {
			getInfo() {
				let self = this;
				courseDetail({
					studentId: this.studentid,
					classesId: this.id
				})
					.then((res) => {
						this.detail= res.data;
					})

			},
			hideGradeDetail() {
				this.show = false;
				$('body').removeClass('modal-open');
			},
			getList() {
				var self = this;
				var params = {
					studentId: this.studentid,
					classesId: this.id,
					pageNum: this.pageDto.pageNum,
					pageSize: this.pageDto.pageSize
				};
				subList(params)
					.then(function (res) {
						var data = res.data;
						self.list =  data.list;
						self.list.forEach(function(item) {
							Vue.set(item, "editing", false);
							Vue.set(item, "tmpMark", "");
						});
						self.pageDto = res.pageDto;
					}, function () {
						self.list = [];
					});
			},
			edit(item) {
				item.editing = true;
				item.tmpMark = item.remarks;


			},
			add(event, item) {
				let target = $(event.target);
				if(target.hasClass('disabled')) {
					event.stopPropagation();
					return;
				}
				item.editing = true;
				item.tmpMark = item.remarks;
			},
			ok(item) {
				let params = {
					studentId: this.studentid,
					checkinId: item.checkinId,
					remarks: item.remarks
				};
				editCourseRemark(params)
					.then((res) => {
						if (res.code == 0) {
							dispatch('TOAST', '修改备注成功', 'success');
						}
						this.getList();
					})
			},
			cancel(item) {
				item.remarks = item.tmpMark;
				item.tmpMark = '';
				item.editing = false;
			},
			pageChange: function () {
				this.getList();
			}
		},
		components: {
			Modal: Modal,
			Pager: Pager
		}
	}
</script>
<style lang="sass">
.grade-detail-modal {
	.info-group {
		display: inline-block;
		width: 280px;
	}
	.info {
		background: #fff;
		padding: 10px;
		ul {
			li {
				list-style: none;
				display: inline-block;
				position: relative;
				float: left;
				height: 120px;
				border-right: 1px solid #edf0f5;
				padding: 0;
				&:last-child {
					border-right: none;
				}
				div {
					p {
						text-align: center;
						&:nth-child(odd) {
							font-weight: 500;
						}
						&:nth-child(even) {
							color: #ccc;
						}
						span {
							display: inline-block;
							overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: nowrap;
						}
					}
				}
				.base-info {
					p {
						width: 140px;
						height: 40px;
						&:first-child {
							font-size: 20px;
						}
						.status {
							font-weight: 400;
							display: inline-block;
							background: #66ccff;
							font-size: 12px;
							padding: 3px 10px;
							color: #fff;
							border-radius: 18px;
						}
					}
				}
				.course {
					p {
						width: 200px;
						height: 32px;
						line-height: 32px;
						position: relative;
						top: 20px;
						&:first-child {
							font-size: 20px;
						}
						span {
							width: 100px;
							overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: nowrap;
						}
					}
				}
				.school {
					p {
						width: 240px;
						height: 32px;
						line-height: 32px;
						position: relative;
						top: 20px;
						&:first-child {
							font-size: 20px;
						}
						span {
							width: 120px;
							overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: nowrap;
						}
					}
				}
				.subject {
					div {
						display: inline-block;
						position: relative;
						span {
							width: 80px;
							overflow: hidden;
						    text-overflow: ellipsis;
						    white-space: nowrap;
						}
					}
				}
			}
		}
	}
	.list {
		margin-top: 10px;
		border-top: 1px solid #66ccff;
		background: #fff;
		padding: 10px;
		h3 {
			font-size: 16px;
			font-weight: 400;
		}
		table {
			width: 100%;
			margin-top: 10px;
			tr {
				border: 1px solid #ccc;
				td {
					border-right: 1px solid #ccc;
					text-align: center;
					&.tl {
						text-align: left;
						> div {
							padding-left: 3px;
							padding-right: 3px;
						}
					}
					div {
						padding: 8px 0;
						p {
							text-align: left;
							font-size: 13px;
						}
						input {
							text-align: left;
							width: 90%;
							padding: 2px 3px;
						}
						.btn {
							font-size: 12px;
							padding: 2px 8px;
							&.disabled {
								background: #999;
								cursor: auto;
								border: none;
							}
						}
					}
				}
			}
		}
	}
	
}
</style>