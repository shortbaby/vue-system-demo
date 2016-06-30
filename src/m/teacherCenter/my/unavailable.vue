<!--
	@file feidu-老师中心
	@author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
<div>
	<div v-show="!selectTime">
		<ul class="week-f">
	        <li>一</li>
	        <li>二</li>
	        <li>三</li>
	        <li>四</li>
	        <li>五</li>
	        <li class="wk">六</li>
	        <li class="wk">日</li>
	    </ul>
	    <div id="calendar"></div>

	    <p class="act">
	        <span class="btn btn-primary" id="prevMonth">上一月</span>
	        <span class="btn btn-primary" id="nextMonth">下一月</span>
	    </p>
	    <p class="select-time" @click="showSelectTime()">
	    	<span class="icon-pie-graph"></span>
	    	<span v-if="hasTime">已选不可上课时间</span>
	    	<span v-if="!hasTime">选择不可上课时间</span>
	    	<span class="icon-right"></span>
	    </p>
	    <div v-if="hasTime" class="selected-time">
	    	<p v-for="item in selectDate.invalidTimeList">
	    		<span>
	    		{{item.startTimeStr}} ~ {{item.endTimeStr}}
	    		</span>
	    	</p>
	    </div>  
	    <p v-if="hasTime">
			<span class="btn btn-primary" @click="modify()">修改</span>
		</p>
	</div>
	<div v-show="selectTime" class="time-select-wrap">
		<div v-for="item in selectDate.invalidTimeList" track-by="$index">
			<input type="text" v-model="item.startTimeStr" class="{{$index}}-start">
			<input type="text" v-model="item.endTimeStr" class="{{$index}}-end">
			<span v-if="$index == 0" class="icon-plus" @click="add()"></span>
			<span v-if="$index != 0" class="icon-trash" @click="del($index)"></span>
		</div>
		<p>
			<span class="btn btn-primary" @click="save()">保存</span>
			<span class="btn btn-default" @click="back()">返回</span>
		</p>
	</div>
</div>
</template>
<script>
require('../../../../dep/calendar/calendar');
const TIME_PATTEN = /^(?:[01]\d|2[0-3])(?::[0-5]\d)$/;
let calendarIns = null;
import {getTeacherCalendar, addTeacherCalendar} from  './request';
export default {
	data() {
		return {
			selectTime: false,
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			dateList:[],
			selectDate: {
	            "invalidTimeList": [
	            ]
			}
		}
	},
	computed: {
		hasTime() {
			let res = false;
			this.selectDate.invalidTimeList.forEach(function(item) {
				if (item.startTime && TIME_PATTEN.test(item.startTime) && item.endTime && TIME_PATTEN.test(item.endTime)) {
					res = true;
				}
			});
			return res;
		}
	},
	created() {
		Vue.nextTick(() => {
			this.init();
		});
	},
	methods: {
		init() {
			let self = this;
			calendarIns = new calendar.calendar( {
	            count: 1,
	            selectDate: new Date(),
	            selectDateName: '已选',
	            select: 'multiple',
	            isShowHoliday: true,
	            isShowWeek: false,
	            afterSelectDate: function(event) {
	            	var curItem = event.curItem,
	                date = event.date,
	                dateName = event.dateName;
	            	calendarIns.setSelectDate( date );
	            	self.select(date);
	            }
	        } );
			self.getCalendar();
	        $('#prevMonth').on( 'click', function() {
	            calendarIns.prevMonth();
	            self.month = self.month - 1;
	            if (self.month == 0) {
	            	self.month = 12;
	            	self.year = self.year - 1;
	            }
	            self.getCalendar();
	            // self.dateList.forEach(function(item) {
	            // 	calendarIns.select(item);
	            // })
	            
	        });
	        $('#nextMonth').on( 'click', function() {
	            calendarIns.nextMonth();
	            self.month = self.month + 1;
	            if (self.month == 13) {
	            	self.month = 1;
	            	self.year = self.year + 1;
	            }
	            self.getCalendar();
	            // self.dateList.forEach(function(item) {
	            // 	calendarIns.select(item);
	            // })
	        });
		},
		getCalendar() {
			getTeacherCalendar({
				year: this.year,
				month: this.month
			})
				.then((res) => {
					let list = res.data;
					list.forEach((item) => {
						item.date = new Date(item.time).toFormattedString('yyyy-MM-dd');
						if (item.invalidTimeList && item.invalidTimeList.length > 0) {
							item.invalidTimeList.forEach((time) => {
								time.startTimeStr = new Date(time.startTime).toFormattedString('HH:mm');
								time.endTimeStr = new Date(time.endTime).toFormattedString('HH:mm');
							})
						}
						calendarIns.select(item.date);
					})
					this.dateList = list;
				})
		},
		select(date) {
			let index = -1;
			let item = null;
			for (var i = 0; i < this.dateList.length; i++) {
				 item = this.dateList[i];
				 if (item.date == date) {
				 	this.selectDate = item;
				 	index = i;
				 }
			} 
			if (index == -1) {
				let item = {
					startTimeStr: '',
					endTimeStr: '',
					starTime: null,
					endTime: null
				}
				this.selectDate = {
		            invalidTimeList: []
				}
				this.selectDate.invalidTimeList.push(item);
			}
		},
		showSelectTime() {
			this.selectTime = true;
		},
		add() {
			let item = {
				startTimeStr: '',
				endTimeStr: '',
				starTime: null,
				endTime: null
			};
			// debugger;
			this.selectDate.invalidTimeList.push(item);
		},
		del(index) {
			this.selectDate.invalidTimeList.splice(index, 1);
		},
		save() {
			let back = true;
			let self = this;
			this.selectDate.invalidTimeList.forEach(function(item, index) {
				if(!TIME_PATTEN.test(item.startTimeStr)) {
					$('.' + index + '-start').addClass('error');
					dispatch('TOAST', '请输入正确的时间');
					back = false;
					return;
				} 
				if (TIME_PATTEN.test(item.startTimeStr)) {
					$('.' + index + '-start').removeClass('error');
				}
				if (!TIME_PATTEN.test(item.endTimeStr)) {
					$('.' + index + '-end').addClass('error');
					dispatch('TOAST', '请输入正确的时间');
					back = false;
					return;
				}
				if (TIME_PATTEN.test(item.endTimeStr)) {
					$('.' + index + '-end').removeClass('error');
				}
				item.startTime = new Date().fromFormattedString(self.selectDate.date + ' ' + item.startTimeStr + ':00', 'yyyy-MM-dd HH:mm:ss').getTime();
				item.endTime = new Date().fromFormattedString(self.selectDate.date + ' ' + item.endTimeStr + ':00', 'yyyy-MM-dd HH:mm:ss').getTime();
			})
			addTeacherCalendar(this.selectDate)
				.then((res) => {
					dispatch('TOAST', '设置成功');
					if (back) {
						this.getCalendar();
						this.selectTime = false;
					}
				})
			
		},
		back() {
			this.selectTime = false;
		},
		modify() {
			this.selectTime = true;
		}
	}
};
</script>
<style lang="sass">
@import "../../../../dep/calendar/calendar.css";
.act {
    margin-top: 3rem;
    margin-bottom: 2rem;
    text-align: center;
    span {
    	margin-right: 2rem;
    	background: #66ccff;
    	color: #fff;
    	border: none;
    }
}
.select-time {
	padding: 1rem;
	background: #fff;
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	.icon-pie-graph {
		font-size: 2rem;
		position: relative;
		top: .3rem;
	}
	.icon-right {
		float: right;
		position: relative;
		top: .3rem;
	}
}
.selected-time {
	background: #fff;
	padding: 1rem;
	p {
		text-align: left;
	}
	+ p {
		background: #fff;
		padding-bottom: 4rem;
		text-align: center;
		padding-top: 1rem;
		.btn {
			padding: .5rem 5rem;
			border: none;
		}
	}
}
.week-f {
    position: fixed;
    width: 100%;
    top: 6rem;
    height: 2rem;
    line-height: 2rem;
    background-color: #F7F7F7;
    border-bottom: 1px solid #CDCDCD;
    font-size: 1.2rem;
    z-index: 2;
    overflow: hidden;
    li {
    	float: left;
    	box-sizing: border-box;
   		width: 14.28%;
    	text-align: center;
    	list-style: none;
    	&.wk {
    		color: #FF902D;	
    	}
    }
}
#calendar {
	font-size: 1.4rem;
}
.time-select-wrap {
	div {
		text-align: center;
		margin-top: 1.5rem;
		input {
			width: 10rem;
			margin-right: 1rem;
		}
	}
	p {	
		text-align: center;
		margin-top: 2rem;
		.btn {
			color: #fff;
			background: #66ccff;
			padding: .8rem 5rem;
			border: none;
		}
	}
}
</style>