<template>
	<div class="financial-add">
		<div class="head">
			<span>学员信息</span>
			<div>
				<span>签约日期:</span>
				<span>{{time | date 'yyyy-MM-dd'}}</span>
				<label class="required">签约人</label>
				<v-select :options="selectSignerOptions" :close-on-select="true" :value.sync="selectSignerId | str"></v-select>
			</div>
		</div>
		<div class="form-wrap">
			<form onsubmit="return false" id="contractForm" v-form name="contractForm">
				<div class="form-group">
					<label class="required">姓名</label>
					<inference-input placeholder="请输入姓名" :query.sync="name" :request="getFuzzyByName" :limit="10" :on-hit="hitName" :template="nameTemplate"></inference-input>
				</div>
				<div class="form-group">
					<label class="required">手机号</label>
					<inference-input placeholder="请输入手机号" :query.sync="mobile" :request="getFuzzyByMobile" :limit="10" :on-hit="hitMobile" :template="mobileTemplate" template-name="mobile"></inference-input>
				</div>
				<div class="form-group">
					<label class="required">合同类型</label>
					<v-select :options="agreementTypeOptions" :close-on-select="true" :value.sync="agreementType | str"></v-select>
				</div>
				<div class="form-group">
					<label class="required">校区</label>
					<v-select :options="schoolOptions" :close-on-select="true" :value.sync="school | str"></v-select>
				</div>
				<div class="form-group">
					<label>家长姓名</label>
					<input placeholder="请输入家长姓名" v-form-ctrl name="parentName" v-model="parentName" class="normal">
				</div>
				<div class="form-group">
					<label>家长手机号</label>
					<!-- <span class="red" v-if="clueForm.mobile.$error.pattern && (clueForm.mobile.$dirty || clueForm.$submitted)">
						请填写正确的手机号码
					</span> -->
					<input maxlength="11" placeholder="请输入11位手机号" v-form-ctrl  name="parentMobile" v-model="parentMobile" pattern="1\d{10}" class="normal">
				</div>
			</form>
		</div>
		<div class="head">
			<span>报读产品</span>
		</div>
		<div class="wrap">
			<div class="left">
				<div class="top">
					<span>招生中课程</span>
					<input type="text" placeholder="请输入课程名称" v-model="courseName">
					<span class="icon-search" @click.stop="search()"></span>
					<span class="add btn btn-primary" @click="add()">快速添加课程</span>
				</div>
				<div class="list-wrap">
					<table>
						<tr v-for="item in clazzList">
							<td>
								<input type="checkbox" id="clazz-{{item.id}}" value="{{item.id}}" v-model="selectClazzIds"><label for="clazz-{{item.id}}" title="{{item.name}}">{{item.name}}</label>
							</td>
							<td><span>{{item.totalLesson}}课次</span></td>
							<td><span>{{item.price | money}}</span></td>
							<td><span>剩余{{item.surplus}}个名额</span></td>
						</tr>
					</table>
					<!-- <ul class="list">
						<li v-for="item in clazzList">
							<p>
								<input type="checkbox" id="clazz-{{item.id}}" value="{{item.id}}" v-model="selectClazzIds"><label for="clazz-{{item.id}}">{{item.name}}</label>
							</p>
							<p><span>{{item.totalLesson}}小时</span></p>
							<p><span>{{item.price | money}}</span></p>
							<p><span>剩余{{item.surplus}}个名额</span></p>
						</li>
					</ul>	 -->
				</div>
			</div>
			<div class="right">
				<div class="contract-content">
					<div class="top">
						<span>已选课程</span>
						<span></span>
					</div>
				</div>
				<div class="pay-content">
					<div class="table">
							<table>
								<tr>
									<td>课程名称</td>
									<td>课程费用</td>
									<td>折扣</td>
									<td>赠送金额</td>
									<td>应收费用</td>
									<td>实收费用</td>
									<td></td>
								</tr>
								<tr v-for="item in selectClasses" track-by="$index" v-if="item.isDel == 0">
									<td>{{item.name}}</td>
									<td>{{item.price | money}}</td>
									<td><input type="number" min="0" max="100" step="5" v-model="item.discount"><span>%</span></td>
									<td><input type="number" min="0" v-model="item.grantAmount"></td>
									<td>{{((parseInt(item.discount || 100)) * item.price / 100 -  parseFloat(item.grantAmount|| 0)) | money}}</td>
									<td><input type="number" v-model="item.realPayAmount" placeholder="实收金额"></td>
									<td><span class="icon-trash" @click="del(item)"></span></td>
								</tr>
							</table>
						</div>

						<p>
							<span class="normal">应收金额:</span><span class="normal">{{totalMoney | money}}</span>
							<span>实收金额:</span><span>{{totalRealPayAmount | money}}</span>
							<span>赠送金额:</span><span>{{totalGrantAmount | money}}</span>
						</p>

						<div class="check-control">
							<input type="radio" name="paytype" id="cash" value="0" v-model="payType"><label for="cash">现金</label>
							<input type="radio" name="paytype" id="translate" value="1" v-model="payType"><label for="translate">转账</label>
							<input type="radio" name="paytype" id="pos" value="2" v-model="payType"><label for="pos">POS</label>
							<input type="radio" name="paytype" id="check" value="3" v-model="payType"><label for="check">支票</label>
							<input type="radio" name="paytype" id="other" value="4" v-model="payType"><label for="other">其他</label>
						</div>

						<div class="remark">
							<textarea placeholder="可在此填写1000字以内的备注，选填" v-model="remark"></textarea>
						</div>

						<div class="bottom">
							<span class="btn btn-primary" @click="save($event)">保存</span>
							<span class="btn btn-default" @click="cancel($event)">取消</span>
						</div>
				</div>
			</div>
		</div>
		<add v-if="addState" :show.sync="addState"></add>
	</div>
</template>

<script>
	import Select from '../../../dep/vue-strap/src/Select.vue';
	import getSelectOptions from '../../common/function/getSelectOptions';
	import InferenceInput from '../../common/components/InferenceInput.vue';
	import Add  from '../course/components/Add.vue';
	import {selectSigner, getFuzzyName, getFuzzyMobile, getSchoolNames, getClassInfo, save, getStudentById, getAgreementInfo, modifyAgreement} from './request';
	let options = getSelectOptions();
    export default {
    	data() {
    		return {
    			time: new Date().getTime(),
    			selectSignerOptions: [],
    			selectSignerId: -1,
    			schoolOptions: [],
    			school: -1,
    			agreementTypeOptions: options.agreementTypeOptions,
    			agreementType: -1,
    			courseName: null,
    			id: null,
    			agreementId: null,
    			name: '',
    			mobile: '',
    			parentName: null,
    			parentMobile: null,
    			clazzList: [],
    			selectClazzIds: [],
    			selectClasses: [],
    			payType: 0,
    			totalMoney: null,
    			totalRealPayAmount: null,
    			totalGrantAmount: null,
    			lastParamJsonStr: '',
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
					this.$parent.name = res.name;
					this.$parent.id = res.id;
					this.$parent.mobile = res.mobile;
					this.$parent.parentName = res.parentName;
					this.$parent.parentMobile = res.parentMobile;
				},
				hitMobile: function(res) {
					this.$parent.name = res.name;
					this.$parent.id = res.id;
					this.$parent.mobile = res.mobile;
					this.$parent.parentName = res.parentName;
					this.$parent.parentMobile = res.parentMobile;
				},
				nameTemplate: `<span v-html="item.name"></span>`,
				mobileTemplate: `<span v-html="item.mobile"></span>`,
				remark: '',
				watcher: true,
				contractForm:{},
				form: {}
    		}
    	},
    	vuex: {
	        getters:　{
	            addState: state => state.course.addState
	        }
	    },
    	watch: {
    		selectClazzIds(val) {
    			let self = this;
    			self.clazzList.forEach(function(item) {
    				if(val.indexOf(item.id.toString()) > -1) {
    					self.appendClazzToSelects(item);
    				} else {
    					self.deleteItemFromSelects(item);
    				}
    			});
    		}
    	},
    	created() {
    		this.getOptions();
    		this.getClassList();
    		if (this.$route.params.id) {
    			this.id = this.$route.params.id;
    			this.getStudent();
    		}
    		if (this.$route.query.agreement) {
    			this.agreementId = this.$route.query.agreement;
    			this.getAgreementDetail();
    		}
    	},
    	methods: {
    		add() {
    			dispatch('ADD');
    		},
    		search() {
    			this.getClassList();
    		},
    		appendClazzToSelects(item) {
    			let l = this.selectClasses.length;
    			let index = -1;
    			for (let i = 0; i < l; i++) {
    				if (this.selectClasses[i].id == item.id) {
    					index = i;
    					Vue.set(this.selectClasses[i], "isDel", 0);
    					break;
    				}
    			};
    			if (index == -1) {
    				Vue.set(item, "isDel", 0);
    				this.selectClasses.push(item);
    			}
    		},
    		deleteItemFromSelects(item) {
    			let l = this.selectClasses.length;
    			let index = -1;
    			for (let i = 0; i < l; i++) {
    				if (this.selectClasses[i].id == item.id) {
    					index = i;
    					Vue.set(this.selectClasses[i], "isDel", 1);
    					break;
    				}
    			}
    		},
    		getAgreementDetail() {
    			getAgreementInfo({
    				id: this.agreementId
    			})
    				.then((res) => {
    					// this.watcher = false;
    					this.name = res.data.studentName;
    					this.id = res.data.studentId;
    					this.mobile = res.data.studentMobile;
    					this.parentName = res.data.parentName;
						this.parentMobile = res.data.parentMobile;
						this.selectSignerId = res.data.signerId;
						this.time = res.data.signTime;
						this.agreementType = res.data.agreementType;
						this.school = res.data.schoolId;
						this.remark = res.data.remark;
						this.payType = res.data.payType;
						this.totalMoney = res.data.totalReceivableExpense / 100;
		    			this.totalRealPayAmount =  res.data.totalRealPayAmount / 100;
		    			this.totalGrantAmount = res.data.totalGrantAmount / 100;
						res.data.detail.forEach((item) => {
							this.selectClazzIds.push(item.id.toString());
							item.realPayAmount = item.realPayAmount / 100;
    						item.grantAmount = item.grantAmount / 100;
    						item.price = item.price / 100;
    						item.receivableExpense = item.receivableExpense / 100;
							this.selectClasses.push(item);
						})
    				})
    		},
    		getStudent() {
    			getStudentById({id: this.id})
    				.then((res) => {
    					this.name = res.data.name;
						this.id = res.data.id;
						this.mobile = res.data.mobile;
						this.parentName = res.data.parentName;
						this.parentMobile = res.data.parentMobile;
    				});
    		},
    		calculateMoney() {
    			let self = this;
    			let totalMoney = 0;
    			let totalRealPayAmount = 0;
    			let totalGrantAmount = 0;
    			self.selectClasses.forEach(function(item) {
    				item.receivableExpense = Math.round((parseInt(item.discount || 100)) * item.price / 100 - parseFloat(item.grantAmount|| 0));

    				totalMoney += item.receivableExpense;
    				totalRealPayAmount += parseFloat(item.realPayAmount);
    				totalGrantAmount += parseFloat(item.grantAmount);
    			});
    			self.totalMoney = totalMoney;
    			self.totalRealPayAmount = totalRealPayAmount;
    			self.totalGrantAmount = totalGrantAmount;
    		},
    		del(item) {
    			let index = -1;
    			let id = item.id;
    			for (var i = 0; i < this.selectClazzIds.length; i++) {
    				if(this.selectClazzIds[i] == id.toString()) {
    					index = i;
    					break;
    				}
    			};
    			Vue.set(item, 'isDel', 1);
    			if (index > -1) {
    				this.selectClazzIds.splice(index, 1);
    			}
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
    		getClassList() {
    			getClassInfo({
    				name: this.courseName
    			})
    				.then((res) => {
    					if(res.code == 0) {
    						this.clazzList = res.data;
    						this.clazzList.forEach((item) => {
    							item.price = item.price / 100;
    						})
    					}
    				});

    		},
    		save(event) {
    			let btn = $(event.target);
    			let self = this;
    			self.calculateMoney();
    			if (!self.id) {
    				dispatch('TOAST', '请先选择学员');
    				return;
    			}
    			if (self.selectSignerId == -1) {
    				dispatch('TOAST', '请先选择签约人');
    				return;
    			}
    			if (self.agreementType == -1) {
    				dispatch('TOAST', '请先选择合同类型');
    				return;
    			}
    			if (self.school == -1) {
    				dispatch('TOAST', '请先选择校区');
    				return;
    			}
    			if (self.selectClasses.length == 0) {
    				dispatch('TOAST', '请先勾选报读课程');
    				return;
    			}
    			let params = {
    				studentId: self.id,
    				signerId: self.selectSignerId,
    				agreementType: self.agreementType,
    				signTime: self.time,
    				schoolId: self.school,
    				payType: self.payType,
    				remarks: self.remark,
    				detail: []
    			}
    			if (this.agreementId) {
    				$.extend(params, {
    					id: this.agreementId
    				})
    			}
    			self.selectClasses.forEach(function(item) {
    				let o = $.extend({}, item);
    				o.realPayAmount = parseFloat(o.realPayAmount || 0) * 100;
    				o.grantAmount = parseFloat(o.grantAmount || 0) * 100;
    				o.receivableExpense = o.receivableExpense * 100;
    				o.price = o.price * 100;
    				o.agreementId = 0;
    				params.detail.push(o);
    			});
    			btn.prop('disable', true);
    			if (this.agreementId) {
    				modifyAgreement({
    					agreementReqDto: JSON.stringify(params)
    				})
    					.then((res) => {
	    					if (res.code == 0) {
	    						dispatch('TOAST', '修改保存成功', 'success');
	    					}
	    				})
	    				.always(function() {
	    					btn.prop('disable', false);
	    				})
    			} else {
    				let newArray = params.detail.filter(function(item){
						return item.isDel == 0;
					});
					params.detail = newArray;
					if (JSON.stringify(params) == this.lastParamJsonStr) {
						dispatch('TOAST', '相同的合同已提交，请勿重复提交');
						return;
					} else {
						this.lastParamJsonStr = JSON.stringify(params);
					}
    				save({
	    				agreementReqDto: this.lastParamJsonStr
	    			})
	    				.then((res) => {
	    					if (res.code == 0) {
	    						dispatch('TOAST', '合同保存成功', 'success');
	    					}
	    				})
	    				.always(function() {
	    					btn.prop('disable', false);
	    				})
    			}
    		}
    	},
        components: {
           vSelect: Select,
           InferenceInput: InferenceInput,
           Add: Add
        }
    }
</script>

<style lang="sass">
.financial-add {
	background: #fff;
	.head {
		height: 58px;
		line-height: 58px;
		background: #f6f7f9;
		border-bottom: 1px solid #e0e0e0;
		&:nth-child(3) {
			border-top: 1px solid #e0e0e0;
		}
		> span {
			font-size: 18px;
			padding-left: 30px;
		}
		> div {
			display: inline-block;
			float: right;
			span {
				color: #6f7276;
				&:nth-child(2) {
					margin-right: 40px;
				}
			}
			.btn-group {
				font-size: 13px;
				&.open {
					.dropdown-toggle {
						box-shadow: none;
					}
				}
				.btn {
					height: 34px;
					width: 128px;
					line-height: 34px;
					padding: 0px;
					margin: 0 30px 0 20px;
				}
				.btn-default {
					background: #fff;
					&:hover {
						background: #fff;
						box-shadow: none;
					}
					&:active {
						background: #fff;
						box-shadow: none;
					}
				}
			}
		}
	}
	.wrap {
		padding: 30px;
		.left {
			width: 620px;
			border: 1px solid #e0e0e0;
			float: left;
			.top {
				text-align: right;
				position: relative;
				background: #f6f7f9;
				height:68px;
				line-height: 68px;
				border-bottom: 1px solid #e0e0e0;
				>span {
					&:first-child{
						font-size: 16px;
						color: #2b3643;
						position: absolute;
						left: 20px;
					}
				}
				.icon-search {
					position: relative;
					left: -60px;
					cursor: pointer;
				}
				.add {
					margin-right: 20px;
					display: inline-block;
					cursor: pointer;
				}
				input {
					width: 280px;
					height: 38px;
					border: 1px solid #e0e0e0;
					border-radius: 58px;
					padding-left: 20px;
				}
			}
			.list-wrap {
				max-height: 500px;
				overflow: auto;
				> table {
					width: 100%;
					tr {
						height: 50px;
						line-height: 50px;
						border-bottom: 1px solid #f2f2f2;
						td {
							label {
								float: left;
								text-overflow: ellipsis;
								max-width: 70px;
								overflow: hidden;
								margin-left: 10px;
								margin-bottom:0px;
							}
							input {
								float: left;
								line-height: 50px;
								height: 50px;
								padding: 0;
								margin: 0;
							}
							&:first-child {
								padding-left: 20px;
							}
						}
					}
				}
			}
			.list {
				font-size: 13px;
				margin-top: 10px;
				li {
					height: 30px;
					line-height: 30px;
					p {
						width: 90px;
						display: inline-block;
						span {
							text-align: center;
						}
					}
				}
			}
		}
		.right {
			margin-left: 650px;
			min-width: 1000px;
			border: 1px solid #e0e0e0;s
			> div {
				margin: 0 10px;
			}
			.contract-content {
				.top {
					height: 48px;
					line-height: 48px;
					background: #f6f7f9;
					border-bottom: 1px solid #eee;
					span {
						&:first-child {
							color: #2b3643;
							margin-left: 20px;
							font-size: 16px;
						}
					}
				}
			}
			.pay-content {
				padding: 20px;
				table {
					width: 100%;
					box-sizing: border-box;
					tr {
						border: 1px solid #eee;
						&:first-child {
							td {
								padding: 5px 0px;
							}
						}
						td {
							border-right: 1px solid #eee;
							text-align: center;
							.icon-trash {
								background: #fff;
								color: #000;
								font-size: 16px;
							}
							input {
								margin: 5px 0;
								width: 80px;
								// height: px;
							}
						}
					}
				}
				p {
					padding: 20px 0 20px 0;
					span {
						color: #e67e22;
						margin-right: 5px;
						&.normal {
							color: #000;
						}
						&:nth-child(even) {
							margin-right: 30px;
						}
					}
				}
				.check-control {
					margin-bottom: 20px;
					label {
						margin: 0 35px 0 5px;
					}
				}
				.remark {
					textarea {
						border: 1px solid #e0e0e0;
						width: 100%;
						height: 120px;
						outline: none;
					}
				}
				.bottom {
					height: 40px;
					width: 100%;
					text-align: right;
					margin-top: 20px;
					text-align: center;
					.btn {
						float: right;
						padding: 0 30px 0 30px;
						height: 40px;
						line-height: 40px;
						margin-left: 20px;
					}
				}
			}
		}
	}
}
.form-wrap {
	padding: 30px 30px 15px 10px;
}
#contractForm {
	.form-group {

		width: 33%;
		float: none;
		display: inline-block;
		label {
			width: 100px;
		}
		.normal {
			width: 160px;
		}
		.btn-group {
			font-size: 13px;
			&.open {
				.dropdown-toggle {
					box-shadow: none;
				}
			}
			.btn {
				padding: 2px 10px;
			}
			.btn-default {
				background: #fff;
				&:hover {
					background: #fff;
					box-shadow: none;
				}
				&:active {
					background: #fff;
					box-shadow: none;
				}
			}
		}
	}
}
</style>