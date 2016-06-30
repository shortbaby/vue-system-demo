<!--
	@file 退费记录
-->
<template>
	<div class="financial list-wrapper">
		<div class="search-wrap">
			<div class="input-control long ">
				<label>退费日期</label>
				<input type="text" v-model="startTime" class="time-input form-control" @click="showCalendar($event, 1)">
				<span class="icon-calendar cal-1"></span>
				<calendar :show.sync="calendarShow1" :value.sync="startTime" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
				<span class="step">-</span>
				<input type="text" v-model="endTime" class="time-input form-control" @click="showCalendar($event, 2)">
				<span class="icon-calendar cal-2"></span>
				<calendar :show.sync="calendarShow2" :value.sync="endTime" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
			</div>
			<div class="input-control long">
				<label>校区</label>
				<v-select :options="schoolOptions" :close-on-select="true" :value.sync="school | str"></v-select>
			</div>
			<div class="input-control long">
				<label>操作人姓名</label>
				<v-select :options="selectSignerOptions" :close-on-select="true" :value.sync="selectSigner | str"></v-select>
			</div>
			
			<div class="input-control long">
				<label>学生姓名</label>
				<inference-input placeholder="请输入姓名" :query.sync="username" :request="getFuzzyByName" :limit="10" :on-hit="hitName" :template="nameTemplate"></inference-input>
				
			</div>
			<div class="input-control long">
				<label>学生手机号</label>
				<inference-input placeholder="请输入手机号" :query.sync="mobile" :request="getFuzzyByMobile" :limit="10" :on-hit="hitMobile" :template="mobileTemplate" template-name="mobile"></inference-input>
			</div>
		</div>
		<div class="option">
			<h3><span class="icon-financial"></span><span>{{pageDto.count}}</span>条退费记录</h3>
			<div class="center-search">
				<span class="btn btn-primary search" @click="search()">查询</span>
				<span class="btn btn-blue-light reset" @click="reset()">重置</span>
			</div>
			<div class="opration">
				<span class="btn btn-primary output" @click="output()">导出</span>
				<span class="btn btn-primary" @click="add()">添加退费记录</span>
			</div>
		</div>
		<!-- <set-header v-if="setHeaderState" :type="2"></set-header> -->
		<table class="table table-striped">
			<tr>
				<td><input type="checkbox" v-model="allCheck" @click="selectAll($event)" class="all-check"></td>
				<td>学生</td>
				<td>手机号</td>
				<td>收费项目</td>
				<td>校区</td>
				<td>预估退费</td>
				<td>实际退费</td>
				<td>退费日期</td>
				<td>操作人</td>
				<td>状态</td>
				<td>操作</td>
			</tr>
			<tr v-for="item in list">
				<td><input type="checkbox" value="{{item.id}}" v-model="selectIds" @click.stop="selectItem($event,item)" class="td-check"></td>
				<td>{{item.name}}</td>
				<td>{{item.mobile}}</td>
				<td>{{item.chargeItem}}</td>
				<td>{{item.schoolName}}</td>
				<td>{{item.expectedReturnAmount | money}}</td>
				<td>{{item.returnAmount | money }}</td>
				<td>{{item.createTime | date 'yyyy-MM-dd'}}</td>
				<td>{{item.operator}}</td>
				<td>{{item.statusStr}}</td>
				<td>
					<span class="opration" v-if="item.status == 0" @click.stop="verify(item)">审核</span>
					<span class="opration" v-if="item.status == 2" @click.stop="refund(item)">退费</span>
					<span class="opration" v-if="item.status == 3" @click.stop="detail(item)">详情</span>
					<span class="opration" v-if="item.status == 1" @click.stop="modify(item)">修改</span>
					<span class="opration" v-if="item.status == 1" @click.stop="close(item)">关闭</span>
				</td>
			</tr>
		</table>
		<loading :show="!loading"></loading>
		<new-refund :show.sync="addRefund" v-if="addRefund" :type="type" :id.sync="detailId"></new-refund>
		<div class="none-list" v-if="noRes">
			<span v-if="key">没有搜索到记录</span>
			<span v-if="!key">没有记录</span>
		</div>
		<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
	</div>
</template>

<script>
import Pager from '../../common/components/Pager.vue';
import Grid from '../../common/components/grid/index.vue';
import GridColumn from '../../common/components/grid/GridColumn.vue';
import Loading from '../../common/components/Loading.vue';
import Select from '../../../dep/vue-strap/src/Select.vue';
import Dropdown from '../../../dep/vue-strap/src/Dropdown.vue';
import Calendar from '../../common/components/Calendar.vue';
import NewRefund from './components/NewRefund.vue';
import InferenceInput from '../../common/components/InferenceInput.vue';
import { selectSigner, getSchoolNames, getRefundList, exportRefund, refund, getFuzzyName, getFuzzyMobile} from './request';
import getSelectOptions from '../../common/function/getSelectOptions';
let options = getSelectOptions();
export default {
	created () {
		this.getOptions();
		this.getRefundListHandler();
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
        	allCheck: false,
        	startTime: '',
        	endTime: '',
        	time: '',
        	type: 'add',
        	username: null,
        	mobile: null,
        	student: null,
        	studentMobile: null,
        	getFuzzyByName: function() {
				let param = {
					name: this.query
				}
				return getFuzzyName(param);
			},
			getFuzzyByMobile: function() {
				let param = {
					mobile: this.query
				}
				return getFuzzyMobile(param)
			},
			hitName: function(res) {
				this.$parent.student = res;
				this.$parent.username = res.name;
			},
			hitMobile: function(res) {
				this.$parent.studentMobile = res;
				this.$parent.mobile = res.mobile;
			},
			nameTemplate: `<span v-html="item.name"></span>`,
			mobileTemplate: `<span v-html="item.mobile"></span>`,
        	schoolOptions: [],
        	school: -1,
        	selectSignerOptions: [],
        	selectSigner: -1,
			selectIds: [],
			addRefund: false,
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
		edit(id, name) {
			this.detailId = id;
		},
		del(id, name) {
			this.detailId = id;
			dispatch('SHOW_CONFIRM','你确定删除学生“张三FD102939929123”的合同吗?', 'okcallback');	
		},
		select(item, selected) {
			var self = this;
			if (selected) {
				if (self.selectIds.indexOf(item.id.toString()) < 0) {
					self.selectIds.push(item.id.toString());
				}	
			} else {
				let index = self.selectIds.indexOf(item.id.toString());
				if (index > -1) {
					self.selectIds.splice(index, 1);
				}
			}
		},
		success() {
			this.refresh();
		}
	},
	watch: {
		time(newVal, oldVal) {
			if (this.type === 1){
				this.startTime = newVal;
			} else if(this.type === 2) {
				this.endTime = newVal;
			}
		},
		selectIds(val) {
			//debugger;
			//let allCheckBox = $('.all-check')
			let tdChecks = $('.td-check');
			let checkedBoxes = $(".td-check:checked");
			//let tdChecksLength = tdChecks.length;
			if (checkedBoxes.length == tdChecks.length) {
				this.allCheck = true;
			} else {
				this.allCheck = false;
			}
		}
	},
	methods: {
		selectItem(event, item) {
			let target = $(event.target);
			let self = this;
			let check = target.prop('checked');
			self.$emit('select', item, check);
		},
		selectAll(event) {
			
			let target = $(event.target);
			let self = this;
			let check = target.prop('checked');
			self.list.forEach((item) => {
				self.$emit('select', item, check);
			})
		},
		verify(item) {
			this.type = 'verify';
			this.detailId = item.id;
			this.addRefund = true;
		},
		refund(item) {
			refund({
				id: item.id,
				status: 3
			})
				.then((res) => {
					if (res.code == 0) {
						dispatch('TOAST', '退费成功', 'success');
						this.refresh();
					}
				})
		},
		detail(item) {
			this.type = 'detail';
			this.detailId = item.id;
			this.addRefund = true;
		},
		modify(item) {
			this.type = 'modify';
			this.detailId = item.id;
			this.addRefund = true;
		},
		close(item) {
			refund({
				id: item.id,
				status: 4
			})
				.then((res) => {
					if (res.code == 0) {
						dispatch('TOAST', '关闭退费记录成功', 'success');
						this.refresh();
					}
				})
		},
		getOptions() {
			let self = this;
			$.when(selectSigner(), getSchoolNames())
				.then(function(res1, res2) {
					let signerList = res1.data;
					let schoolList = res2.data;
					signerList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					schoolList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					self.selectSignerOptions = signerList;
					self.selectSignerOptions.splice(0, 0, options.blankItem);
					self.schoolOptions = schoolList;
					self.schoolOptions.splice(0, 0, options.blankItem);
				})
		},
		showCalendar(event, type) {
			this.type = type;
			event.stopPropagation();
            var that=this;
            if (that.type == 1) {
            	that.calendarShow2=false;
            	that.calendarShow1=true;
            } 
            if (that.type == 2) {
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
			this.getRefundListHandler();
		},
		getRefundListHandler () {
			var self = this;

			var params = {
				pageNum: this.pageDto.pageNum,
				pageSize: this.pageDto.pageSize
			};

			if (this.startTime) {
				$.extend(params, {
					start: new Date().fromFormattedString(this.startTime, 'yyyy/MM/dd').getTime()
				});
			}
			if (this.endTime) {
				$.extend(params, {
					end: new Date().fromFormattedString(this.endTime, 'yyyy/MM/dd').getTime()
				});
			}
			if (this.school != -1) {
				$.extend(params, {
					schoolId: this.school
				});
			}
			if (this.selectSigner != -1) {
				$.extend(params, {
					selectSignerId: this.selectSigner
				})
			}
			if (this.username) {
				$.extend(params, {
					studentName: this.username
				})
			}
			if (this.mobile) {
				var patternRegExp = /^1\d{10}$/;
				if (patternRegExp.test(this.mobile)) {
					$.extend(params, {
						studentMobile: this.mobile
					})
				} else {
					dispatch('TOAST', '请输入正确的手机号码');
					return;
				}
			}
			getRefundList(params)
				.then(function (res) {
					var data = res.data;
					self.list =  data.list;
					self.list.forEach((item) => {
						item.expectedReturnAmount = item.expectedReturnAmount / 100;
						item.returnAmount = item.returnAmount / 100;
					})
					self.pageDto = res.pageDto;
				}, function () {
					self.list = [];
				});
		},
		refresh () {
			this.pageDto.pageNum = 1;
			this.getRefundListHandler();
		},
		search () {
			this.refresh();
		},
		reset () {
			this.startTime = '';
			this.endTime = '';
			this.school = -1;
			this.selectSigner = -1;
			this.username = '';
			this.mobile = '';
			this.student = null;
			this.studentMobile = null;
		},
		add() {
			this.detailId = null;
			this.type = 'add';
			this.addRefund = true;
		},
		output() {
			exportRefund(this.selectIds);
		}
	},
	components: {
		Pager: Pager,
		Loading: Loading,
		vSelect: Select,
		Dropdown: Dropdown,
		Calendar: Calendar,
		NewRefund: NewRefund,
		InferenceInput: InferenceInput
	}
};
</script>
<style lang="sass">
</style>