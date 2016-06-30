<!--
	@file 飞渡-签到
	@author xuguanlong
-->

<template>
<div>
	<div class="class-detail-sign">
		<div class="sign-info">
			<p>签到{{lessonInfo.signStudents}}/{{lessonInfo.totalStudents}}</p>	
		</div>
		<p>{{lessonInfo.name}}</p>
		<p>第{{lessonInfo.index}}节</p>
		<p>{{lessonInfo.startTime | date 'MM月dd日'}} {{lessonInfo.startTime | date 'HH:mm'}} ~ {{lessonInfo.endTime | date 'HH:mm'}}</p>
		<p>{{lessonInfo.roomName}}</p>
	</div>
	<div class="student-list teacher">
		<p v-if="teacherDetail.id">老师签到</p>
		<ul>
			<li>
				<span>{{teacherDetail.name}}</span>
				<span class="status" v-if="teacherDetail.signId"><i class="icon-check"></i>{{teacherDetail.signWayStr}}</span>
				<div class="sign-wrap clearfix">
					<span @click="sign(teacherDetail, 3)" :class="{'active': teacherDetail.status == 3}">缺勤</span>
					<span @click="sign(teacherDetail, 2)" :class="{'active': teacherDetail.status == 2}">请假</span>
					<span @click="sign(teacherDetail, 1)" :class="{'active': teacherDetail.status == 1}">签到</span>
				</div>
				
			</li>
		</ul>
	</div>
	<div class="student-list student">
		<p v-if="list.length">学员签到</p>
		<ul>
			<li v-for="item in list">
				<span>{{item.name}}</span>
				<span class="status" v-if="item.signWayStr"><i class="icon-check"></i>{{item.signWayStr}}</span>
				<div class="sign-wrap clearfix">
					<span @click="sign(item, 3)" :class="{'active': item.status == 3}">旷课</span>
					<span @click="sign(item, 2)" :class="{'active': item.status == 2}">请假</span>
					<span @click="sign(item, 1)" :class="{'active': item.status == 1}">签到</span>
				</div>
			</li>
		</ul>
	</div>
	<div class="footer">
		<ul>
			<li><span @click="signAll()">全部签到</span></li>
			<li><span @click="qrSign()">扫码签到</span></li>
		</ul>
	</div>
</div>	
</template>

<script>
	import {checkInList, manualSign, scanCodeSign} from './request';
	import wechatConfig from './wechatConfig';
	import qrSign from '../../../common/function/qrSign';
	export default {
		data () {
			return {
				list: [],
				lessonInfo: {},
				teacherDetail:{}
			}
		},
		route: {
			data(transition) {
				if (transition.to.params.obj) {
					this.lessonInfo = transition.to.params.obj;
					this.getCheckInList();
				}	
			}
		},
		created () {
			console.log(this.$route.params.id);
		},
		methods: {
			getCheckInList(){
				let param = {
					scheduleId: this.lessonInfo.scheduleId,
					classesId: this.lessonInfo.id,
					subjectId: this.lessonInfo.subjectId,
					subTypeId: this.lessonInfo.subTypeId
				}
				checkInList(param)
					.then((res) => {
						let data = res.data;
						this.list = data.checkinDetail;
						this.teacherDetail = data.teacherDetail;
					})	
			},
			/**
			 * 签到
			 */
			sign (item, signStatus) {
				let status = 0;
				let statusStr = '';
				let signWayStr = '';
				if (signStatus == 1) {
					status = 1;
					statusStr = '已签到';
					signWayStr = '手动签到';
				}
				if (signStatus == 2) {
					status = 2;
					statusStr = '请假';
					signWayStr = '请假';
				}
				if (signStatus == 3) {
					status = 3;
					statusStr = '旷课';
					signWayStr = '旷课';
				}
				let param = {
					isSend: 0,
					scheduleId: this.lessonInfo.scheduleId,
					index: this.lessonInfo.index,
					studentRecord: [{
						id: item.id,
						name: item.name,
						status: status,
						statusStr: statusStr,
						userRole: item.userRole,
						signId: item.signId,
						signWay: 0,
						signWayStr: signWayStr
					}]
				}
				manualSign(param)
					.then((res) => {
						if (res.code == 0) {
							this.getCheckInList();
						}
					})
			},

			/**
			 * 全部签到
			 */
			signAll () {
				if (this.list.length == 0) {
					dispatch('TOAST', '没有可以签到的学生');
					return;
				}
				let status = 1;
				let statusStr = '已签到';
				let signWayStr = '手动签到';
				let param = {
					isSend: 0,
					scheduleId: this.lessonInfo.scheduleId,
					index: this.lessonInfo.index,
					studentRecord: []
				}
				this.list.forEach((item) => {
					let studentSign = {
						id: item.id,
						name: item.name,
						status: 1,
						statusStr: statusStr,
						userRole: item.userRole,
						signId: item.signId,
						signWay: 0,
						signWayStr: signWayStr
					}
					param.studentRecord.push(studentSign);
				})
				manualSign(param)
					.then((res) => {
						if (res.code == 0) {
							this.getCheckInList();
						}
					})
			},
			doSign () {
				var self = this;
				debugger;
				window.wx.scanQRCode({
					needResult: 1,
					scanType: ["qrCode"],
					success: function(res) {
						let token = res.resultStr;
						if(!token) {
							dispatch('TOAST', "读取二维码信息失败");
							return;
						}
						scanCodeSign(
							{	token: token,
								scheduleId: self.lessonInfo.scheduleId,
								index: self.lessonInfo.index,
								status: 1,
							})
							.then(function(res) {
								// 更新一下列表
								self.getCheckInList();
								self.qrSign();
							});
					}
				});
			},

			/**
			 * 二维码签到
			 */
			qrSign () {
				var now = Math.floor(+new Date() / 1000);
				var timestamp = wechatConfig.timestamp;
				if (now - timestamp > 7200) {
					qrSign(wechatConfig).then(this.doSign);
				} else {
					this.doSign();
				}
			}
		}
	};
</script>
<style lang="sass">
.student-list {
	ul {
		li {
			.status {
				font-size: 1.4rem;
				i {
					color: #33cc66;
				}
			}
		}
	}
	&.teacher {
		padding: 1rem;
		margin-bottom: 1rem;
		p {
			margin-bottom: .5rem;
		}
	}
	&.student {
		padding: 1rem;
		p {
			margin-bottom: .5rem;
		}
	}
}
.footer {
	ul {
		li {
			&:first-child {
				background: #66ccff;
				color: #fff;
			}
			&:last-child {
				background: #cccccc;
			}
		}
		
	}
}
</style>