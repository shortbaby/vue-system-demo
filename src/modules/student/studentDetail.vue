
<template>
	<div class="detail-base " v-show="show">
		<ul class="base-info-ul student-detail">
			<li>
				<div class="code">
				</div>
			</li>
			<li>
				<div class="name line-top">{{student.name}}</div>
				<div class="phone line-bottom">{{student.mobile}}</div>
			</li>
			<li>
				<div class="line-top">
					<p>{{student.parentName}}</p>
					<p>家长姓名</p>
				</div>
				<div class="line-bottom">
					<p>{{student.parentMobile}}</p>
					<p>家长电话</p>
				</div>
			</li>
			<li>
				<div class="line-top">
					<p>{{student.ownerName}}</p>
					<p>班主任</p>
				</div>
				<div class="line-bottom">
					<p>{{student.adviserName}}</p>
					<p>咨询顾问</p>
				</div>
			</li>
			<li>
				<div class="line-top">
					<p>{{student.totalPay | money}}</p>
					<p>收款金额</p>
				</div>
				<div class="line-bottom">
					<p>{{student.balance | money}}</p>
					<p>剩余金额</p>
				</div>
			</li>
			<li>
				<div class="line-top">
					<p>{{student.totalClasses}}</p>
					<p>已报班级</p>
				</div>
			</li>
			<li class="spec">
				<span class="btn btn-primary" @click="notice()">发通知</span>
				<br/>
				<span class="btn btn-primary" @click="unforzen()" v-if="student.accountStatus == 0">解冻</span>
				<span class="btn btn-primary" @click="forzen()" v-if="student.accountStatus == 1">冻结</span>
			</li>

		</ul>
		<ul class="info-tabs">
			<li :class="{current: isCurrent('follow')}" @click="changeTabs('follow')" >
				<div>跟进记录</div>
			</li>
			<li :class="{current: isCurrent('grades')}" @click="changeTabs('grades')">
				<div>班级</div>
			</li>
			<li :class="{current: isCurrent('schedule')}" @click="changeTabs('schedule')">
				<div>课表</div>
			</li>
			<li :class="{current: isCurrent('info')}" @click="changeTabs('info')">
				<div>基本资料</div>
			</li>
			<li :class="{current: isCurrent('survey')}" @click="changeTabs('survey')">
				<div>问卷调查</div>
			</li>
		</ul>
		<notice :list="selectStudents" :show.sync="sendMsg" :id="id" :type="messageType"></notice>
		<component :is="currentView" :type="type" :id="id" transition="fade" transition-mode="out-in" keep-alive>
		</component>
	</div>
</template>

<script>
import Follow from '../../common/components/Follow.vue';
import Grades from './components/Grades.vue';
import Schedule from './components/Schedule.vue';
import Info from './components/Info.vue';
import Survey from '../../common/components/Survey.vue';
import Notice from './components/Notice.vue';
import {getStudentDetail, freezeStudent, unFreezeStudent} from './request';
export default {
	props: {
		show: {
			type: Boolean,
			default: false,
			twoWay: true
		},
		id: {
			type: Number
		}
	},
	data() {
		return {
			student: {},
			type: 'student',
			sendMsg: false,
			messageType: 'single'
		}
	},
	created: function() {
		this.getDetail();
	},
	events: {
		resetpassword() {
			console.log(this.student.id);
		},
		unforzen() {
			unFreezeStudent({
				studentId: this.student.id
			})
				.then((res) => {
					if (res.code == 0) {
						dispatch('TOAST', '解冻学生成功', 'success');
					}
				})
		},
		forzen() {
			freezeStudent({
				studentId: this.student.id
			})
				.then((res) => {
					if (res.code == 0) {
						dispatch('TOAST', '冻结学生成功', 'success');
					}
				})
		}
	},
	methods: {
		resetPassword() {
			dispatch('SHOW_CONFIRM',`你确定要重置学生"${this.student.name}"的密码吗?`, 'resetpassword');
		},
		unforzen() {
			dispatch('SHOW_CONFIRM',`你确定要解冻学生"${this.student.name}"吗?`, 'unforzen');
		},
		forzen() {
			dispatch('SHOW_CONFIRM',`你确定要冻结学生"${this.student.name}"吗?`, 'forzen');
		},
		notice() {
			this.sendMsg = true;
		},
		isCurrent(view) {
			return view === this.currentView;
		},
		getDetail() {
			let self = this;
			getStudentDetail({id: this.id})
				.then(function(res) {
					self.student = res.data;
					self.student.totalPay = self.student.totalPay ? self.student.totalPay / 100 : 0;
					self.student.balance = self.student.balance ? self.student.balance / 100 : 0;
				})
		}
	},
	vuex: {
		getters:　{
			currentView: state => state.student.currentView
		},
		actions: {
			changeTabs({dispatch}, currentView) {
				dispatch('CHANGE_TAB', currentView);
			}
		}
	},
	components: {
		 Follow: Follow,
		 Info: Info,
		 Survey: Survey,
		 Grades: Grades,
		 Schedule: Schedule,
		 Notice: Notice
	}
};
</script>

<style lang="sass">
.detail-base {
	padding: 30px;
	background: #f6f7f9;
	.base-info-ul {
		background: #fff;
		height: 100px;
		padding: 20px;
		li {
			list-style: none;
			float: left;
			height: 100px;
			vertical-align: middle;
			padding: 0 1.5%;
			border-right: 2px solid #e0e0e0;
			&:first-child {
				border-right: none;
				padding: 0px;
				margin: 0px;
			}
			&:last-child {
				border-right: none;
				height: 100px;
				padding: 0 0 0 30px;
			}
			.code {
				width: 100px;
				height: 100px;
				border-radius: 50px;
				background: #edf0f5;
			}
			.btn {
				width: 70px;
				margin-bottom: 5px;
			}
			.line-top,.line-bottom {
				height: 50px;
				text-align: center;
				&.name {
					color: #2b3643;
					font-size: 20px;
				}
				&.phone {
					color:#6f7276;
					font-size: 28px;
				}
				>p {
					&:first-child {
						color: #2b3643;
						font-size: 18px;
					}
					&:last-child {
						color:#6f7276;
						font-size: 10px;
					}
				}
			}
		}
	}
	.info-tabs {
		margin: 20px;
		li {
			list-style:none;
			display: inline-block;
			margin-right: 80px;
			font-size: 28px;
			color: #bfbfbf;
			cursor: pointer;
			&:hover {
				color: #0093ff;
			}
			&.current {
				padding-bottom: 5px;
				color: #0093ff;
				border-bottom: 4px solid #0093ff;
			}
		}
	}
}
</style>