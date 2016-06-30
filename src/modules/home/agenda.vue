<template> 
	<div class="home-wrap">
		<div class="agenda-wrap list-wrapper">
			<div class="new-agenda">
				<input type="text" v-model="content" placeholder="提交新待办事项">
				<div class="head">
					<div class="time-icon">
						<p><span class="icon-calendar"></span></p>
						<p><span>截止日期</span></p>
					</div>
					<input type="text" v-model="endTime" @click="showCalendar($event, 1)">
					<calendar :show.sync="calendarShow1" :value.sync="endTime" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>

				</div>
				<div class="head">
					<div class="time-icon">
						<p><span class="icon-calendar"></span></p>
						<p><span>提醒日期</span></p>
					</div>
					<input type="text" v-model="noticeTime" @click="showCalendar($event, 2)">
					<calendar :show.sync="calendarShow2" :value.sync="noticeTime" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
				</div>
				<span class="icon-plus" @click="add($event)"></span>
			</div>
			<div class="input-control">
				<label>查看下属</label>
				<v-select :options="userOptions" :close-on-select="true" :value.sync="userId | str"></v-select>		
			</div>
			<div class="agenda-content">
				<div>
					<h3>
						今天到期 ({{todayList.length}}) <span class="icon-right"></span>
					</h3>
					<ul>
						<li v-for="item in todayList" track-by="$index">
							<div>{{$index}}</div>
							<div>
								<p>{{item.content}} </p>
							</div>
							<span>{{item.createTime | date 'yyyy-MM-dd'}}</span>
							<div class="check">
							 	<input type="checkbox" name="check-1" id="check-today-{{$index}}" @click="mark(item)">
							 	<label for="check-today-{{$index}}">标记完成</label>
							</div>
						</li>
					</ul>	
				</div>
				<div>
					<h3>
						即将到期 ({{latestList.length}}) <span class="icon-right"></span>
					</h3>
					<ul>
						<li v-for="item in latestList" track-by="$index">
							<div>{{$index}}</div>
							<div>
								<p>{{item.content}} </p>
							</div>
							<span>{{item.createTime | date 'yyyy-MM-dd'}}</span>
							<div class="check">
							 	<input type="checkbox" name="check-1" id="check-today-{{$index}}" @click="mark(item)">
							 	<label for="check-today-{{$index}}">标记完成</label>
							</div>
						</li>
					</ul>
				</div>
				<div>
					<h3>
						已完成 ({{completeList.length}}) <span class="icon-right"></span>
					</h3>
					<ul>
						<li v-for="item in completeList" track-by="$index">
							<div>{{$index}}</div>
							<div>
								<p>{{item.content}} </p>
							</div>
							<span>{{item.createTime | date 'yyyy-MM-dd'}}</span>
							<!-- <div class="check">
							 	<input type="checkbox" name="check-1" id="check-today-{{$index}}" @click="mark(item)">
							 	<label for="check-today-{{$index}}">标记完成</label>
							</div> -->
						</li>
					</ul>
				</div>
			</div>
		</div>	
	</div>
	

</template>
<script>
import Calendar from '../../common/components/Calendar.vue';
import Select from '../../../dep/vue-strap/src/Select.vue';
import getSelectOptions from '../../common/function/getSelectOptions';
let options = getSelectOptions();
import {getBackLogList, addBackLog, markBackLog, getSubordinateList} from './request';
export default {
	data() {
		return {
			userOptions: [],
			userId: -1,
			content: '',
			noticeTime: '',
        	endTime: '',
        	type: 1,
        	todayList: [],
        	latestList: [],
        	completeList: [],
        	calendarShow1: false,
        	calendarShow2: false,
            calendarType: "datetime",
            calendarX: 0,
            calendarY: 0,
            calendarRange: false
		}
	},
	watch: {
		userId(val) {
			this.refresh();
		}
	},
	created() {
		this.getOptions();
		this.getList();
	},
	methods: {
		showCalendar(event, type) {
			this.type = type;
			event.stopPropagation();
            var that=this;
            if (type == 1) {
        		that.calendarShow1=true;
        		that.calendarShow2=false;

        	} else {
        		that.calendarShow1=false;
        		that.calendarShow2=true;
        	}
            that.calendarX=event.target.offsetLeft;
            that.calendarY=event.target.offsetTop+event.target.offsetHeight+8;
            var bindHide=function(event){
                event.stopPropagation();
                that.calendarShow1=false;
                that.calendarShow2=false;
                document.removeEventListener('click',bindHide,false);
            };
            setTimeout(function(){
                document.addEventListener('click',bindHide,false);
            },500);
		},
		add(event) {
			let target = $(event.target);
			if (this.content.length == 0) {
				dispatch('TOAST', '请填写待办事项内容');
				return;
			}
			if (this.noticeTime.length == 0) {
				dispatch('TOAST', '请输入提醒时间');
				return;
			}
			if (this.endTime.length == 0) {
				dispatch('TOAST', '请输入截止时间');
				return;
			}
			let param = {
				content: this.content.replace(/\s/g, ""),
				expireTime: new Date().fromFormattedString(this.endTime,'yyyy/MM/dd HH:mm:ss').getTime(),
				noticeTime: new Date().fromFormattedString(this.noticeTime,'yyyy/MM/dd HH:mm:ss').getTime(),
			}
			target.prop('disable', true);
			addBackLog(param)
				.then((res) => {
					dispatch('TOAST', '添加待办事项成功', 'success');
					this.refresh();
				})
				.always(() => {
					target.prop('disable', false);
				})
		},
		mark(item) {
			markBackLog({
				id: item.id
			})
				.then((res) => {
					dispatch('TOAST', '待办事项标记成功', 'success');
					this.refresh();
				})
		},
		refresh(){
			this.getList();
		},
		getList() {
			let param1 = {
				type: 0,
				id: this.userId != -1 ? this.userId : null
			};
			let param2 = {
				type: 1,
				id: this.userId != -1 ? this.userId : null
			}
			let param3 = {
				type: 2,
				id: this.userId != -1 ? this.userId : null
			}
			getBackLogList(param1)
				.then((res) => {
					this.todayList = res.data;
				});
			getBackLogList(param2)
				.then((res) => {
					this.latestList = res.data;
				});
			getBackLogList(param3)
				.then((res) => {
					this.completeList = res.data;
				});
		},
		getOptions() {
			getSubordinateList()
				.then((res) => {
					let userList = res.data;
					userList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					this.userOptions = userList;
					this.userOptions.splice(0, 0, options.blankItem);
				})
		}
	},
	components: {
		Calendar: Calendar,
		vSelect: Select
	}
}
</script>
<style lang="sass">
.home-wrap {
	overflow: auto;
}
.agenda-wrap {
	background: #fff;
	padding: 10px 10px 10px 10px;
	position: relative;
	min-width: 1150px;
	.new-agenda {
		border: 1px solid #ccc;
		height: 50px;
		line-height: 50px;
		border-radius: 10px;
		padding-right: 80px;
		position: relative;
		.icon-plus {
			height: 100%;
			width: 60px;
			line-height: 50px;
			position: absolute;
			right: 0;
			top: 0;
			border-top-right-radius: 10px;
			border-bottom-right-radius: 10px;
		}
		> input {
			border: none;
			padding: 0 10px;
			width: 30%;
			max-width: 500px;
			min-width: 200px;
		}
		.head {
			float: right;
			display: inline-block;
			position: relative;
			> input {
				position: relative;
				top: -10px;
				border: 1px solid #ccc;
				border-radius: 5px;
				box-shadow: none;
				outline: none;
				width: 200px;
			}
			.time-icon {
				display: inline-block;
				border-left: 1px solid #ccc;
				padding-left: 20px;
				margin-left: 20px;
				margin-right: 10px;
				p {
					height: 25px;
					line-height: 25px;
					text-align: center;
					> .icon-calendar {
						font-size: 16px;
						position: relative;
						top: 5px;
					}
				}
			}
		}
	}
	> .input-control {
		position: absolute;
		right: 50px;
		top: 100px;
	}
	.agenda-content {
		margin-top: 50px;
		> div {
			h3 {
				color: #66ccff;
				font-weight: 400;
				font-size: 14px;
				margin-bottom: 15px;
			}
			> ul {
				margin-bottom: 30px;
				li {
					height: 52px;
					line-height: 52px;
					margin-left: 20px;
					padding: 0 10px;
					position: relative;
					border-bottom: 1px solid #ccc;
					&:hover {
						background: #eee;
						> span {
							display: none;
						}
						> .check {
							display: inline-block;
						}
					}
					> span {
						float: right;
						color: #999;
					}
					> div {
						display: inline-block;
						&.check {
							height: 51px;
							line-height: 51px;
							padding: 0 10px;
							// background: #d7d7d7;
							text-align: center;
							float: right;
							display: none;
						}
						&:first-child {
							position: absolute;
							left: -20px;
						}
					}
				}
			}
		}
	}
}
</style>