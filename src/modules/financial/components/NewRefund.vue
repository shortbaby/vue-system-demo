<!--
	@file tianxiao-virgo-frontend 
	@author xuguanlong
-->
<template>
	<div>
		<modal :show.sync="show" :width="600">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title" v-if="type=='add'">新增退费记录</h4>
		    	<h4 class="modal-title" v-if="type=='modify'">修改退费记录</h4>
		    	<h4 class="modal-title" v-if="type=='detail'">退费详情</h4>
		    	<h4 class="modal-title" v-if="type=='verify'">退费审核</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hide()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
				<form onsubmit="return false" id="refundForm" v-form name="refundForm" class="clearfix">
					<div class="form-group">
						<label>退费学生</label>
						<inference-input v-if="type=='add'" placeholder="请输入姓名" :query.sync="name" :request="queryStudent" :limit="10" :on-hit="hitName" :template="nameTemplate"></inference-input>
						<!-- <inference-input v-if="type=='modify'" placeholder="请输入姓名" :query.sync="form.studentName" :request="queryStudent" :limit="10" :on-hit="hitName" :template="nameTemplate"></inference-input> -->
						<input type="text" maxlength="20" v-if="type=='detail' || type=='verify' || type=='modify'" disabled v-model="form.studentName" class="small" name="name">
					</div>
					<div class="form-group">
						<label>退费校区</label>
						<v-select v-if="type=='add'" :options="schoolOptions" :close-on-select="true" :value.sync="school | str"></v-select>
						<v-select v-if="type=='modify'" :options="schoolOptions" :close-on-select="true" :value.sync="form.schoolId | str"></v-select>
						<input type="text" v-if="type=='detail' || type=='verify'" readonly disabled value="{{form.schoolName}}" class="small" name="school">
					</div>
					<div class="form-group">
						<label>退费合同</label>
						<v-select v-if="type=='add'" :options="agreementNumberOptions" :close-on-select="true" :value.sync="agreementId | str"></v-select>
						<v-select v-if="type=='modify'" :options="agreementNumberOptions" :close-on-select="true" :value.sync="agreementId | str"></v-select>
						<input type="text" v-if="type=='detail' || type=='verify'" readonly disabled value="{{form.agreementNumber}}" class="small" name="agreementNumber">
					</div>
					<div class="form-group">
						<label>退费项目</label>
						<v-select v-if="type=='add'" :options="subjectOptions" :close-on-select="true" :value.sync="subject | str"></v-select>
						<v-select v-if="type=='modify'" :options="subjectOptions" :close-on-select="true" :value.sync="subject | str"></v-select>
						<input type="text" v-if="type=='detail' || type=='verify'" readonly disabled value="{{form.className}}" class="small" name="className">
					</div>
					<div class="detail">
						<p>详情</p>
						<p><span>课程费用:</span><span>{{form.price | money}}</span><span>折扣:</span><span>{{form.discount}}%</span></p>
						<p><span>赠送金额:</span><span>{{form.grantAmount | money}}</span><span>应收费用:</span><span>{{form.receivalbleExpense | money}}</span></p>
						<p><span>实收费用:</span><span>{{form.realPayAmount | money}}</span><span>已上课时/总课时:</span><span>{{form.finishedCount}}/{{form.totalLesson}}</span></p>
						<p><span>需退费课时:</span><span>{{form.totalLesson - form.finishedCount}}</span></p>
					</div>
					<div class="form-group">
						<label>预估退费</label>
						<input type="text" readonly  disabled value="{{form.expectedReturnAmount | money}}" class="small" name="name">
						<p class="tip-msg">系统给出扣除课销和赠送金额后的退款金额，只做参考</p>
					</div>
					<div class="form-group">
						<label>实际退费金额</label>
						<input v-if="type=='add'" type="number" v-model="money" class="small" name="money">
						<input v-if="type=='modify'" type="number" v-model="form.realReturnAmount" class="small" name="money">
						<input v-if="type=='detail' || type=='verify'" readonly disabled type="text" value="{{form.realReturnAmount | money}}" class="small" name="money">
					</div>
					<div class="form-group large">
						<label>备注</label>
						<textarea v-if="type=='add'" name="remarks" v-model="remarks" placeholder="请填写退费原因">
						</textarea>
						<textarea v-if="type=='modify'" name="remarks" v-model="form.remark" placeholder="请填写退费原因">
						</textarea>
						<textarea v-if="type=='detail' || type=='verify'" disabled name="remarks" v-model="form.remark">
						</textarea>
					</div>
					<div v-if="type=='detail' || type=='verify'" class="form-group large">
						<label>审核说明</label>
						<textarea v-if="type=='detail'" disabled name="review" v-model="form.illustration" placeholder="请填写审核说明"></textarea>
						<textarea v-if="type=='verify'" name="review" v-model="form.illustration" placeholder="请填写审核说明">
						</textarea>
					</div>
				</form>
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<button v-if="type=='verify'" @click.stop="refuse($event)" class="btn btn-primary">拒绝</button>
		  			<button v-if="type!='detail'" @click.stop="save($event)" class="btn btn-primary">确定</button>
		  			<button @click.stop="hide()" class="btn btn-default">取消</button>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import newRefundMixins from './newRefundMixins';
	export default {
		mixins: [newRefundMixins]
	}
</script>
<style lang="sass">
	#refundForm {
		.btn-group {
			&.open {
				.dropdown-toggle {
					box-shadow: none;
				}
			}
			.btn-default {
				background: #fff;
				width: 293px;
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
		.detail {
			background: #fff;
			margin: 10px 60px 20px 20px;
			padding: 10px;
			color: #999;
			p {
				margin: 5px 0;
				&:first-child{
					border-bottom: 1px solid #ccc;
				}
				span {
					display: inline-block;
					width: 120px;
					&:nth-child(even) {
						width: 90px;	
					}
					
				}
			}
		}
		.form-group {
			width: 100%;
			float: none;
			label {
				width: 100px;
			}
			input {
				width: 280px;
				&.small {
					width: 281px;
					height: 31px;
					line-height: 31px;
					margin-bottom: 0;
				}
			}
			.tip-msg {
				font-size: 12px;
				color: #999;
				padding-left: 110px;
			}
			
		}
	}
</style>