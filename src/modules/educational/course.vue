<!--
	@file 我的线索
-->
<template>
	<div class="educational list-wrapper" v-show="!schedule">
		<div class="search-wrap">
			<div class="input-control">
				<v-select :options="searchFieldOptions" :close-on-select="true" :value.sync="searchField"></v-select>
				<input type="text" placeholder="请输入关键词搜索" v-model="key" class="form-control spec" >
			</div>
			<div class="input-control long">
				<label>校区</label>
				<v-select :options="schoolOptions" :close-on-select="true" :value.sync="school | str"></v-select>
			</div>
			<div class="input-control long">
				<label>课程类型</label>
				<v-select :options="subjectOptions" :close-on-select="true" :value.sync="subject | str"></v-select>
			</div>
			<div class="input-control long">
				<label>班级班制</label>
				<v-select :options="classesTypeOptions" :close-on-select="true" :value.sync="classesType | str"></v-select>
			</div>
			<div class="input-control long">
				<label>开课日期</label>
				<input type="text" v-model="startTime" class="time-input form-control" @click="showCalendar($event, 1)">
				<span class="icon-calendar cal-1"></span>
				<span class="step">-</span>
				<input type="text" v-model="endTime" class="time-input form-control" @click="showCalendar($event, 2)">
				<span class="icon-calendar"></span>
				<calendar :show.sync="calendarShow" :value.sync="time" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
			</div>
			
			<div class="input-control long">
				<label>状态</label>
				<v-select :options="statusOptions" :close-on-select="true" :value.sync="status | str"></v-select>
			</div>
		</div>
		<div class="option">
			<h3><span class="icon-educational"></span><span>{{pageDto.count}}</span>条待排课班级</h3>
			<div class="opration">
				<span class="btn btn-primary search" @click="search()">查询</span>
				<span class="btn btn-blue-light reset" @click="reset()">重置</span>
			</div>
		</div>
		<!-- <set-header v-if="setHeaderState" :type="2"></set-header> -->
		<table class="table table-striped">
			<tr>
				<td>课程</td>
				<td>班号</td>
				<td>课程类型</td>
				<td>人数</td>
				<td>班级班制</td>
				<td>要求开课时间</td>
				<td>已排课节/总课节</td>
				<td>操作</td>
			</tr>
			<tr v-for="item in list" @click="rowClick($event, item)">
				<td>{{item.classesName}}</td>
				<td>{{item.classesNumber}}</td>
				<td>{{item.subjectName}}</td>
				<td>{{item.totalStudent}}</td>
				<td>{{item.classesTypeName}}</td>
				<td>{{item.startTime | date 'yyyy-MM-dd'}}</td>
				<td>{{item.scheduledCount}}/{{item.totalLessons}}</td>
				<td>
					<span v-if="item.status == 0" class="opration" @click.stop="receive(item)">领取</span>
					<span v-if="item.status == 1" class="release" @click.stop="release(item)">释放</span>
					<span v-if="item.status == 1" class="opration" @click.stop="apply(item)">排课</span>
					<span v-if="item.status == 2">{{item.rcvName}}已领取</span>
				</td>
			</tr>
		</table>
		<loading :show="!loading"></loading>
		<grade-detail v-if="showDetail" :show.sync = "showDetail" :id.sync = "detailId"></grade-detail>
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
import GradeDetail from './components/GradeDetail.vue';
import Select from '../../../dep/vue-strap/src/Select.vue';
import Dropdown from '../../../dep/vue-strap/src/Dropdown.vue';
import Calendar from '../../common/components/Calendar.vue';
import getSelectOptions from '../../common/function/getSelectOptions';
import { search, getSchoolList, getSubjectList, receive, release, applySchedule} from './request';
let options = getSelectOptions();
export default {
	created () {
		this.getOptions();
		this.getListHandler();
	},
	data () {
		return {
        	list: null,
        	detailId: 0,
        	pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 20
        	},
        	startTime: '',
        	endTime: '',
        	time: '',
        	type: 1,
			searchFieldOptions: [
				{
					label: '班号',
					value: 'number'
				},
				{
					label: '课程名称',
					value: 'name'
				}
			],
			searchField: "number",
			key: '',
			schoolOptions: [],
			school: -1,
			subjectOptions: [],
			subject: -1,
			classesTypeOptions: [
				{
					label: '请选择',
					value: '-1'
				},
				{
					label: 'VIP',
					value: '0'
				},
				{
					label: '班课',
					value: '1'
				}
				
			],
			classesType: -1,
			statusOptions: [
				{
					label: '请选择',
					value: '-1'
				},
				{
					label: '待领取',
					value: '0'
				},
				{
					label: '已领取',
					value: '1'
				}
			],
			status: -1,
			showDetail: false,
			schedule: false,
			calendarShow: false,
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
		edit(id, name) {
			this.schedule = true;
			this.$parent.$emit('schedule', id, 'course');
		},
		hideschedule() {
			this.schedule = false;
		},
		hidedetail() {
			this.showDetail = false;
		},
		showdetail(row) {
			this.detailId = row.classesId;
			this.showDetail = true;
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
		receive(item) {
			receive({
				classesId: item.classesId,
				applyId: item.id
			})
				.then((res) => {
					if (res.code == 0) {
						dispatch('TOAST', '领取成功', 'success');
						this.getListHandler();
					}
				})
		},
		release(item) {
			release({
				classesId: item.classesId,
				applyId: item.id
			})
				.then((res) => {
					if (res.code == 0) {
						dispatch('TOAST', '释放成功', 'success');
						this.getListHandler();
					}
				})
		},
		apply(item) {
			let classesId = item.classesId;
			let subjectId = item.subjectId;
			let schoolId = item.schoolId;
			window.router.go({
				name: 'schedule',
				query: {
					class: classesId,
					subject: subjectId,
					school: schoolId
				}
			});
		},
		getOptions() {
			$.when(getSchoolList(), getSubjectList())
				.then((res1, res2) => {
					let schoolList = res1.data.list;
					let subjectList = res2.data.list;
					schoolList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					subjectList.forEach(function(item) {
						item.value = item.id.toString(); 
						item.label = item.name;
					});
					this.schoolOptions = schoolList;
					this.schoolOptions.splice(0, 0, options.blankItem);
					this.subjectOptions = subjectList;
					this.subjectOptions.splice(0, 0, options.blankItem);
				})
		},
		showCalendar(event, type) {
			this.type = type;
			event.stopPropagation();
            var that=this;
            that.calendarShow=true;
            that.calendarX=event.target.offsetLeft;
            that.calendarY=event.target.offsetTop+event.target.offsetHeight+8;
            var bindHide=function(event){
                event.stopPropagation();
                that.calendarShow=false;
                document.removeEventListener('click',bindHide,false);
            };
            setTimeout(function(){
                document.addEventListener('click',bindHide,false);
            },500);
		},
		rowClick (event, row) {
			var target = $(event.target);
			var offset = target.offset();
			var self = this;
			var command = target.attr('command');
			if (target.hasClass('process-cell') || target.find('input').length || target.is('input') || target.find('.process-cell').length) {
			} else {
				self.$emit('showdetail', row);
			}
		},
		pageChange: function () {
			this.getListHandler();
		},
		getListHandler () {
			var self = this;

			var params = {
				pageNum: this.pageDto.pageNum,
				pageSize: this.pageDto.pageSize
			};

			if (this.searchField == 'number') {
				$.extend(params, {
					classesNumber: this.key
				});
			}
			if (this.searchField == 'name') {
				$.extend(params, {
					classesName: this.key
				});
			}

			if (this.school != -1) {
				$.extend(params, {
					schoolId: this.school
				});
			}
			if (this.subject != -1) {
				$.extend(params, {
					subjectId: this.subject
				});
			}
			if (this.classesType != -1) {
				$.extend(params, {
					classesType: this.classesType
				});
			}
			if (this.status != -1) {
				$.extend(params, {
					status: this.status
				});
			}
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

			search(params)
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
			this.getListHandler();
		},
		search () {
			this.refresh();
		},
		reset () {
			this.searchField = 'number';
			this.school = -1;
			this.key = '';
			this.subject = -1;
			this.classesType = -1;
			this.status = -1;
			this.startTime = '';
			this.endTime = '';
		}
	},
	components: {
		Pager: Pager,
		Loading: Loading,
		vSelect: Select,
		Dropdown: Dropdown,
		Calendar: Calendar,
		GradeDetail: GradeDetail
	}
};
</script>
<style lang="sass">
.educational {
	.search-wrap {
		.input-control {
			.form-control {
				margin-left: 4px;
			}
			.spec {
				position: relative;
				left: -4px;
				margin-left: 0;
				// width: 244px;
			}
			.time-input {
				width: 100px;
				font-size: 12px;
				border-left: 1px solid #ccc;
			}
			.step {
				margin-right: 5px;
			}
			&:first-child {
				// width: 410px;
				position: relative;
			}
			&:nth-child(5) {
				width: 410px;
				position: relative;
				.icon-calendar {
					position: absolute;
					right: 55px;
					top: 10px;
					&.cal-1 {
						right: 200px;
					}
				}
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
					border-radius: 4px;
				}
				.release {
					background: #ff9900;
					color: #fff;
					padding: 5px 12px;
					cursor: pointer;
					border-radius: 4px;
				}
			}
			&:first-child {
				&:hover {
					background: #f6f7f9;
				}
			}
		}
	}
}
</style>