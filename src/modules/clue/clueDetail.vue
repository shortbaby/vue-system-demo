
<template>
	<div class="clue-base" v-show="show">
		<ul class="base-info-ul">
			<li>
				<div class="remind-days">剩余跟进<span>{{clue.leftFollowTime}}</span>天
				</div>
				<div class="triangle-down"></div>
			</li>
			<li>
				<div class="name line-top">{{clue.name}}</div>
				<div class="phone line-bottom">{{clue.mobile}}</div>
			</li>
			<li>
				<div class="parent-name line-top">
					<p>{{clue.parentName}}</p>
					<p class="sign">家长姓名</p>
				</div>
				<div class="parent-phone line-bottom">
					<p>{{clue.parentMobile}}</p>
					<p class="sign">家长电话</p>
				</div>
			</li>
			<li>
				<div class="zixun-name line-top">
					<p>{{clue.adviserName}}</p>
					<p class="sign">咨询顾问</p>
				</div>
				<div class="zixun-class line-bottom">
					<p>{{clue.subjectName}}</p>
					<p class="sign">咨询课程</p>
				</div>
			</li>
			<li>
				<div class="zixun-name line-top">
					<p>{{clue.consultStatusStr}}</p>
					<p class="sign">跟进状态</p>
				</div>
				<div class="zixun-class line-bottom">
					<p>{{clue.orgSchoolName}}</p>
					<p class="sign">校区</p>
				</div>
			</li>
			<li>
				<div class="zixun-name line-top">
					<span class="datetime">{{clue.nextRemindTime | date 'yyyy-MM-dd HH:mm'}}</span>
					<span class="icon-calendar" @click="showCalendar"></span>
					<calendar :show.sync="calendarShow" :value.sync="remindTime" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
					<p class="sign">下次跟进时间</p>
				</div>
				<div class="zixun-class line-bottom">
					<p v-if="clue.hasDeposite == 1">{{clue.deposite | money}}</p>
					<p v-if="clue.hasDeposite == 0">未交定金</p>
					<p class="sign">定金</p>
				</div>
			</li>
			<li v-if="isFromClueInvalid()">
				<span class="btn btn-primary" @click="active()">激活</span>
			</li>
			<li v-else>
				<span class="btn btn-primary" @click="assign()">报名</span>
				<br/>
				<span class="btn btn-primary" @click="invalidClue()">标记无效</span>
				<br/>
				<span v-if="isFromClueMy()" class="btn btn-primary" @click="releaseClue()">释放线索</span>
			</li>
		</ul>
		<ul class="info-tabs">
			<li :class="{current: isCurrent('follow')}" @click="changeTabs('follow')" >
				<div>跟进记录</div>
			</li>
			<li :class="{current: isCurrent('info')}" @click="changeTabs('info')">
				<div>基本资料</div>
			</li>
			<li :class="{current: isCurrent('survey')}" @click="changeTabs('survey')">
				<div>问卷调查</div>
			</li>
		</ul>
		<edit-clue v-if="showEditClue" :show.sync="showEditClue" :id="clue.id" :name="clue.name" :release="release" :valid="valid"></edit-clue>
		<component :is="currentView" transition="fade" :id.sync="id" transition-mode="out-in" keep-alive>
		</component>
	</div>
</template>

<script>
import Follow from '../../common/components/Follow.vue';
import Info from './components/Info.vue';
import Survey from '../../common/components/Survey.vue';
import EditClue from './components/EditClue.vue';
import Calendar from '../../common/components/Calendar.vue';
import config from './config';
import { getCommonDetail, getMyDetail, getInvalidDetail, editClue, activeClue } from './request';
import getSelectOptions from '../../common/function/getSelectOptions';
let options = getSelectOptions();
export default {
	props: {
		show: {
			type: Boolean,
			default: false,
			twoWay: true
		},
		id: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			clue: {},
			calendarShow:false,
            calendarType:"datetime",
            calendarX:0,
            calendarY:0,
            calendarRange:false,
            showEditClue: false,
        	release: false,
        	valid: false,
            remindTime: '',
            request: null
		}
	},
	watch: {
		remindTime(val) {
			this.clue.nextRemindTime = Date.parseFormatted(val, 'yyyy/MM/dd HH:mm:ss').getTime();
			editClue(this.clue)
				.then(function(res) {
					dispatch('TOAST', '修改下次跟进时间成功', 'success');
				});
		}
	},
	created: function() {
		this.getDetail();
	},
	events: {
		editsuccess() {
			// this.pageChange();
			//console.log('editsuccess');
			this.getDetail();
		}
	},
	methods: {
		active () {
			let self = this;
			activeClue({
				ids: this.id
			}).then(function(res) {
				if (res.code == 0) {
					dispatch('SHOW_ALERT', '线索激活成功,可在公共线索内查看', 'success');
					self.selectClueIds = [];
				}
				self.pageChange();
			});
		},
		isFromClueMy () {
			return this.$parent.tab === config.my;
		},
		isFromClueInvalid () {
			return this.$parent.tab === config.invalid;
		},
		isCurrent(view) {
			return view === this.currentView;
		},
		getDetail(request) {
			let self = this;
			config
				.getDetailRequest(this.$parent.tab)
				({id: this.id})
					.then(function(res) {
						self.clue = res.data;
						self.clue.deposite = self.clue.deposite ? self.clue.deposite / 100 : 0;
					})
		},
		assign() {
			window.router.go({
				path: '/financial/add/' + this.id
			});
		},
		invalidClue() {
			console.log(this.time);
			this.release = false;
			this.valid = true;
			this.showEditClue = true;
		},
		releaseClue() {
			this.release = true;
			this.valid = false;
			this.showEditClue = true;
		},
		showCalendar:function(e){
            e.stopPropagation();
            var that=this;
            that.calendarShow=true;
            that.calendarX=e.target.offsetLeft - 200;
            that.calendarY=e.target.offsetTop+e.target.offsetHeight+8;
            var bindHide=function(e){
                e.stopPropagation();
                that.calendarShow=false;
                document.removeEventListener('click',bindHide,false);
            };
            setTimeout(function(){
                document.addEventListener('click',bindHide,false);
            },500);
        }
	},
	vuex: {
		getters:　{
			currentView: state => state.clue.currentView
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
		 Calendar: Calendar,
		 EditClue: EditClue
	}
};
</script>

<style lang="sass">
.clue-base {
	// background: #fff;
	margin-top: 10px;
	margin-left: 10px;
	.base-info-ul {
		background: #fff;
		li {
			list-style: none;
			display: inline-block;
			height: 120px;
			position: relative;
			border-right: 1px solid #edf0f5;
			margin-top: 10px;
			padding: 0 25px;
			.remind-days {
				width: 24px;
				text-align: center;
				font-size: 14px;
				color: #fff;
				background: #66ccff;
				padding: 5px 5px;
				line-height: 18px;
				span {
					font-size: 16px;
				}

			}
			.triangle-down {
				height: 0px;
				width: 0px;
				border-left: 17px solid transparent;
        		border-right: 17px solid transparent;
        		border-top: 16px solid #66ccff;
        		font-size: 0px;
        		line-height: 0px;
			}
			.btn {
				width: 70px;
				margin-bottom: 10px;
			}
			.calendar-button {
				.btn {
					width: inherit;
				}
			}
			.line-top {
				height: 60px;
				text-align: center;
			}
			.line-bottom {
				height: 60px;
				text-align: center;
			}
			.name {
				font-size: 24px;
				font-weight: 500;
			}
			.phone {
				font-size: 18px;
			}
			.sign {
				color: #ccc;
				font-size: 12px;
			}
			.parent-name {
				font-size: 20px;
				font-weight: 500;
			}
			.parent-phone {
				font-size: 16px;
				font-weight: 500;
			}
			.zixun-name {
				font-size: 20px;
				font-weight: 500;
			}
			.zixun-class {
				font-size: 16px;
				font-weight: 500;
			}
			.order-state {
				font-size: 20px;
				font-weight: 500;
			}
			.follow {
				.datetime {
					font-size: 20px;
					margin-right: 10px;
					+ span {
						font-size: 20px;
					}
				}
			}
			&:first-child {
				border-right: 0;
				height: 140px;
				margin-top: 0;
				padding: 0;
			}
			&:last-child {
				border-right: 0;
			}
			&:nth-child(2) {
				top: -16px;
			}
		}
	}
	.info-tabs {
		border-top: 2px solid #66ccff;
		margin-top: 20px;
		margin-bottom: 20px;
		li {
			list-style:none;
			display: inline-block;
			margin-right: 40px;
			padding: 8px 0;
			font-size: 16px;
			font-weight: 600;
			color: #868686;
			cursor: pointer;
			&:hover {
				color: #66ccff;
			}
			&.current {
				color: #66ccff;
				border-bottom: 3px solid #66ccff;
			}
		}
	}
}
</style>