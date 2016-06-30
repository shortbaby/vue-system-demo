<!--
	@file 我的线索
-->
<template>
	<div class="homework list-wrapper" v-show="!showDetail">
		<div class="search-wrap">
			<div class="input-control long ">
				<label>作业布置日期</label>
				<input type="text" v-model="startTime" class="time-input form-control" @click="showCalendar($event, 1)">
				<span class="icon-calendar cal-1"></span>
				<calendar :show.sync="calendarShow1" :value.sync="startTime" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
				<span class="step">-</span>
				<input type="text" v-model="endTime" class="time-input form-control" @click="showCalendar($event, 2)">
				<span class="icon-calendar cal-2"></span>
				<calendar :show.sync="calendarShow2" :value.sync="endTime" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
			</div>
			<div class="input-control long inference">
				<label>老师</label>
				<inference-input placeholder="请输入老师姓名" :query.sync="name"  :request="getFuzzyByName" :limit="10" :on-hit="hitName" :template="nameTemplate"></inference-input>
			</div>
			<div class="input-control long">
				<label>作业名称</label>
				<input type="text" placeholder="请输入作业名称" v-model="title" class="form-control">
				<!-- <span class="icon-search"></span> -->
			</div>
		</div>
		<div class="option">
			<h3><span class="icon-homework"></span><span>{{pageDto.count}}</span>条作业信息</h3>
			<div class="opration">
				<span class="btn btn-primary search" @click="search()">查询</span>
				<span class="btn btn-blue-light reset" @click="reset()">重置</span>
			</div>
		</div>
		<table class="table table-striped">
			<tr>
				<td>作业名称</td>
				<td>布置日期</td>
				<td>最后交作业日期</td>
				<td>已批改/未批改</td>
				<td>操作</td>
			</tr>
			<tr v-for="item in list">
				<td>{{item.name}}</td>
				<td>{{item.createTime | date 'yyyy-MM-dd'}}</td>
				<td>{{item.latestTime | date 'yyyy-MM-dd HH:mm'}}</td>
				<td>{{item.hasCorrect}}/{{item.total}}</td>
				<td>
					<span v-if="item.hasCorrect < item.total" class="opration" @click="correct(item)"> 批改</span>
					<span v-if="item.hasCorrect == item.total" class="opration" @click="detail(item)"> 详情</span>
				</td>
			</tr>
		</table>

		<loading :show="!loading"></loading>
		<div class="none-list" v-if="noRes">
			<span v-if="key">没有搜索到记录</span>
			<span v-if="!key">没有记录</span>
		</div>
		<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
	</div>
</template>

<script>
import Pager from '../../common/components/Pager.vue';
import Loading from '../../common/components/Loading.vue';
import InferenceInput from '../../common/components/InferenceInput.vue';
import Calendar from '../../common/components/Calendar.vue';
import { getAssignments, getSchoolList, getTeacherByName } from './request';
import getSelectOptions from '../../common/function/getSelectOptions';
let options = getSelectOptions();
export default {
	created () {
		this.getHomeworkListHandler();
	},
	ready() {
		this.$dispatch('showlist');
	},
	data () {
		return {
        	list: null,
        	detailId: 0,
        	teacher: null,
        	pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 20
        	},
        	startTime: '',
        	endTime: '',
        	time: '',
        	type: 1,
        	name: '',
        	getFuzzyByName: function() {
				let param = {
					name: this.query
				}
				return getTeacherByName(param);
			},
			hitName: function(res) {
				this.$parent.teacher = res;
			},
			nameTemplate: `<span v-html="item.name"></span>`,
			showDetail: false,
			calendarShow1: false,
			calendarShow2: false,
            calendarType: "date",
            calendarX: 0,
            calendarY: 0,
            calendarRange: false
        }
	},
	computed: {
		loading() {
			return !!this.list;
		},
		noRes() {
			return this.list && !this.list.length
		}
	},
	events: {
		hidedetail() {
			this.showDetail = false;
		},
		showdetail(item) {
			this.showDetail = true;
			this.$parent.$emit('showdetail', item.id, 'list');
		}
	},
	watch: {
		time(newVal, oldVal) {
			if (this.type === 1){
				this.startTime = newVal;
			} else if(this.type === 2) {
				this.endTime = newVal;
			}
		}
	},
	methods: {
		correct(item) {
			this.$emit('showdetail', item);
		},
		detail(item) {
			this.$emit('showdetail', item);
		},
		showCalendar(event, type) {
			this.type = type;
			event.stopPropagation();
            var that=this;
            if (this.type == 1) {
            	that.calendarShow2=false;
            	that.calendarShow1=true;
            }
            if (this.type == 2) {
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
		pageChange: function () {
			this.getHomeworkListHandler();
		},
		getHomeworkListHandler () {
			var self = this;

			var params = {
				pageNum: this.pageDto.pageNum,
				pageSize: this.pageDto.pageSize
			};

			if (this.startTime) {
				$.extend(params, {
					startTime: new Date().fromFormattedString(this.startTime, 'yyyy/MM/dd').getTime()
				});
			}
			if (this.endTime) {
				$.extend(params, {
					endTime: new Date().fromFormattedString(this.endTime, 'yyyy/MM/dd').getTime()
				});
			}
			if (this.title) {
				$.extend(params, {
					name: this.title
				});
			}
			if (this.teacher && this.teacher.id) {
				$.extend(params, {
					teacherId: this.teacher.id
				});
			}
			if (params.startTime && params.endTime) {
				if (params.startTime > params.endTime) {
					dispatch('TOAST', '开始时间不能大于结束时间');
					return;
				}
			}
			getAssignments(params)
				.then(function (res) {
					var data = res.data;
					self.list =  data.list;
					self.pageDto = res.pageDto;
				}, function () {
					self.list = [];
				});
		},
		refresh () {
			this.pageDto.pageNum = 1;
			this.getHomeworkListHandler();
		},
		search () {
			this.refresh();
		},
		reset () {
			this.startTime = '';
			this.endTime = '';
			this.title = '';
			this.name = '';
			this.teacherId = null;
		}
	},
	components: {
		Pager: Pager,
		Loading: Loading,
		InferenceInput: InferenceInput,
		Calendar: Calendar
	}
};
</script>
<style lang="sass">
.homework {
	.search-wrap {
		.input-control {
			position: relative;
			.form-control {
				margin-left: 4px;
				border-left: 1px solid #ccc;
			}
			.icon-search {
				position: absolute;
				right: 15px;
				top: 10px;
			}
			.spec {
				position: relative;
				left: -4px;
				margin-left: 0;
				width: 244px;
			}
			.time-input {
				width: 100px;
				font-size: 12px;
				border-left: 1px solid #ccc;
			}
			.icon-calendar {
				position: absolute;
				right: 200px;
				top: 10px;
				&.cal-2 {
					right: 60px;
				}
			}
			.step {
				margin-right: 5px;
			}
			&:first-child {
				width: 410px;
				position: relative;
			}
		}
	}
	> table {
		width: 100%;
		tr {
			td {
				.opration {
					background: #66ccff;
					color: #fff;
					padding: 5px 12px;
					cursor: pointer;
				}
			}
		}
	}
}
</style>