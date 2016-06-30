<!--
	@file 我的线索
-->
<template>
	<div class="financial list-wrapper">
		<div class="search-wrap">
			<div class="input-control long ">
				<label>签订日期</label>
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
				<label>合同类型</label>
				<v-select :options="agreementTypeOptions" :close-on-select="true" :value.sync="agreementType | str"></v-select>
			</div>

			<div class="input-control long">
				<label>学生姓名</label>
				<inference-input placeholder="请输入姓名" :query.sync="username" :request="getFuzzyByName" :limit="10" :on-hit="hitName" :template="nameTemplate"></inference-input>
				<!-- <span class="icon-search"></span> -->
			</div>
			<div class="input-control long">
				<label>学生手机号</label>
				<inference-input placeholder="请输入手机号" :query.sync="mobile" :request="getFuzzyByMobile" :limit="10" :on-hit="hitMobile" :template="mobileTemplate" template-name="mobile"></inference-input>
				<!-- <span class="icon-search"></span> -->
			</div>
			<div class="input-control long">
				<label>合同状态</label>
				<v-select :options="agreementStatusOptions" :close-on-select="true" :value.sync="agreementStatus | str"></v-select>
			</div>
			<div class="input-control long">
				<label>签单人姓名</label>
				<v-select :options="selectSignerOptions" :close-on-select="true" :value.sync="selectSigner | str"></v-select>
			</div>
		</div>
		<div class="option">
			<h3><span class="icon-financial"></span><span>{{pageDto.count}}</span>条合同记录</h3>
			<div class="center-search">
				<span class="btn btn-primary search" @click="search()">查询</span>
				<span class="btn btn-blue-light reset" @click="reset()">重置</span>
			</div>
			<div class="opration">
				<span class="btn btn-primary output" @click="output()">导出</span>
			</div>
		</div>
		<!-- <set-header v-if="setHeaderState" :type="2"></set-header> -->
		<table class="table table-striped">
			<tr>
				<td><input type="checkbox" v-model="allCheck" @click="selectAll($event)" class="all-check"></td>
				<td>合同编号</td>
				<td>学生</td>
				<td>手机号</td>
				<td>应收总额</td>
				<td>实收总额</td>
				<td>合同类型</td>
				<td>合同状态</td>
				<td>签订日期</td>
				<td>签单人</td>
				<td>操作</td>
			</tr>
			<tr v-for="item in list" @click="rowClick($event, item)">
				<td><input type="checkbox" value="{{item.id}}" v-model="selectIds" @click.stop="selectItem($event, item)" class="td-check"></td>
				<td>{{item.number}}</td>
				<td>{{item.studentName}}</td>
				<td>{{item.studentMobile}}</td>
				<td>{{item.price | money}}</td>
				<td>{{item.realPayAmount | money}}</td>
				<td>{{item.typeStr}}</td>
				<td>{{item.statusStr}}</td>
				<td>{{item.signTime | date 'yyyy-MM-dd'}}</td>
				<td>{{item.sigener}}</td>
				<td>
					<span v-down v-bind:option="[{text:'修改', command:'edit'}, {text:'删除', command:'del'}]" class="process-cell" data-id="{{item.id}}">操作<span class="icon-down"></span></span>
				</td>
			</tr>
		</table>
		<loading :show="!loading"></loading>
		<contract-detail v-if="showDetail" :show.sync="showDetail" :id.sync="detailId"></contract-detail>
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
import Select from '../../../dep/vue-strap/src/Select.vue';
import Dropdown from '../../../dep/vue-strap/src/Dropdown.vue';
import Calendar from '../../common/components/Calendar.vue';
import ContractDetail from './components/ContractDetail.vue';
import InferenceInput from '../../common/components/InferenceInput.vue';
import { selectSigner, getSchoolNames, getAgreementList, exportAgreement, delAgreement, getFuzzyName, getFuzzyMobile} from './request';
import getSelectOptions from '../../common/function/getSelectOptions';
let options = getSelectOptions();
export default {
	created () {
		this.getOptions();
		this.getContractListHandler();

	},
	data () {
		return {
        	list: null,
        	detailId: 0,
        	allCheck: false,
        	pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 20
        	},
        	type: 1,
        	startTime: '',
        	endTime: '',
        	time: '',
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
        	agreementTypeOptions: options.agreementTypeOptions,
        	agreementType: -1,
        	agreementStatusOptions: options.agreementStatusOptions,
        	agreementStatus: -1,
        	selectSignerOptions: [],
        	selectSigner: -1,
			selectIds: [],
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
		gridRender() {
			return this.list && this.list.length;
		},
		noRes() {
			return this.list && !this.list.length
		}
	},
	events: {
		edit(id) {
			this.detailId = id;
			window.router.go({
				path: '/financial/add?agreement=' + this.detailId
			});
		},
		okcallback() {
			delAgreement({
				ids: this.detailId
			})
				.then((res) => {
					if (res.code == 0) {
						dispatch('TOAST', '删除合同成功', 'success');
						this.refresh();
					}
				})
		},
		del(id) {
			this.detailId = id;
			dispatch('SHOW_CONFIRM','你确定删除该合同吗?', 'okcallback');
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
		showdetail(row) {
			this.detailId = row.id;
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
		},
		selectIds(val) {
			let tdChecks = $('.td-check');
			let checkedBoxes = $(".td-check:checked");
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
		rowClick (event, row) {
			var target = $(event.target);
			var offset = target.offset();
			var self = this;
			var command = target.attr('command');
			self.$emit('showdetail', row);
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
            if (type == 1) {
            	that,calendarShow2 = false;
            	that.calendarShow1=true;
            } else {
            	that.calendarShow1 = false;
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
			this.getContractListHandler();
		},
		getContractListHandler () {
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
			if (this.agreementType != -1 ) {
				$.extend(params, {
					agreementType: this.agreementType
				});
			}
			if (this.agreementStatus != -1 ) {
				$.extend(params, {
					agreementStatus: this.agreementStatus
				});
			}
			if (this.school != -1) {
				$.extend(params, {
					schoolId: this.school
				})
			}
			if (this.selectSigner != -1) {
				$.extend(params, {
					signerId: this.selectSigner
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
			getAgreementList(params)
				.then(function (res) {
					var data = res.data;
					self.list =  data.list;
					self.list.forEach((item) => {
						item.price = item.price / 100;
						item.realPayAmount = item.realPayAmount / 100;
					})
					self.pageDto = res.pageDto;
				}, function () {
					self.list = [];
				});
		},
		refresh () {
			this.pageDto.pageNum = 1;
			this.getContractListHandler();
		},
		search () {
			this.refresh();
		},
		reset () {
			this.startTime = '';
			this.endTime = '';
			this.school = -1;
			this.agreementType = -1;
			this.username = '';
			this.mobile = '';
			this.student = null;
			this.studentMobile = null;
			this.agreementStatus = -1;
			this.selectSigner = -1;
		},
		output() {
			exportAgreement(this.selectIds);
		}
	},
	components: {
		Pager: Pager,
		Loading: Loading,
		vSelect: Select,
		Dropdown: Dropdown,
		Calendar: Calendar,
		ContractDetail: ContractDetail,
		InferenceInput: InferenceInput
	}
};
</script>
<style lang="sass">
.financial {
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
			> div {
				display: inline-block;
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
					border-radius: 5px;
				}
			}
		}
	}
}
</style>