<!--
	@file tianxiao-virgo-frontend 新建线索
	@author xuguanlong
-->

<template>
	<div>
		<modal :show.sync="show" :width="860">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title" v-if="!id">新增线索</h4>
		    	<h4 class="modal-title" v-if="id">编辑线索</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hideNewClue()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
				<form onsubmit="return false" id="clueForm" v-form name="clueForm" class="clearfix">
					<div class="form-group">
						<label class="required">姓名</label>
						<input maxlength="10" placeholder="请输入用户姓名(10字以内)" v-form-ctrl required v-model="form.name" class="small" name="name">
					</div>
					<div class="form-group">
						<label class="required">手机号</label>
						<input maxlength="11" placeholder="请输入11位手机号" v-form-ctrl required name="mobile" v-model="form.mobile" pattern="1\d{10}" class="small">
					</div>
					<div class="form-group">
						<label class="required">所在校区</label>
						<v-select :options="schoolOptions" :close-on-select="true" :value.sync="form.orgSchoolId | str"></v-select>
					</div>
					<div v-show="isFromClueMy()" class="form-group">
						<label class="required">线索归属</label>
						<v-select :options="belongToOptions" :close-on-select="true" :value.sync="form.belongTo | str"></v-select>
					</div>
					<div class="form-group">
						<label>咨询课程</label>
						<v-select :options="subjectOptions" :close-on-select="true" :value.sync="form.subjectId | str"></v-select>
					</div>
					<div class="form-group">
						<label>线索来源</label>
						<v-select :options="originOptions" :close-on-select="true" :value.sync="form.channelId | str"></v-select>
					</div>
					<div class="form-group">
						<label>来源明细</label>
						<input placeholder="请输入线索来源明细(20字以内)" maxlength="20" v-form-ctrl name="sourceDetail" v-model="form.sourceDetail" class="small">
					</div>
					
					<div class="form-group">
						<label>跟进状态</label>
						<v-select :options="consultStatusOptions" :close-on-select="true" :value.sync="form.consultStatus | str"></v-select>
					</div>
					<div class="form-group">
						<label>学生阶段</label>
						<v-select :options="studyPhaseOptions" :close-on-select="true" :value.sync="form.studyPhase | str"></v-select>
					</div>
					<!-- <div class="form-group">
						<label>下一步跟进计划</label>
						<v-select :options="consultStatusOptions" :close-on-select="true" :value.sync="form.consultStatus | str"></v-select>
					</div> -->
					<div class="form-group">
						<label>学员可上课时间</label>
						<v-select :options="availableTimeOptions" :close-on-select="true" :value.sync="form.availableTime | str"></v-select>
					</div>
					<div class="form-group">
						<label>是否交定金</label>
						<v-select :options="hasDepositeOptions" :close-on-select="true" :value.sync="form.hasDeposite | str"></v-select>
					</div>
					<div class="form-group">
						<label>定金金额</label>
						<input placeholder="请输入定金金额" :class="{tip: form.hasDeposite == 1}" v-form-ctrl type="number" name="deposite" v-model="form.deposite" class="small">
					</div>
					<div class="form-group multiple">
						<label>家长姓名</label>
						<input placeholder="请输入家长姓名" v-form-ctrl name="parentName" v-model="form.parentName" class="smaller">
						<v-select :options="relationshipOptions" :close-on-select="true" :value.sync="form.relationship | str"></v-select>
					</div>
					<div class="form-group">
						<label>家长手机号</label>
						<!-- <span class="red" v-if="clueForm.mobile.$error.pattern && (clueForm.mobile.$dirty || clueForm.$submitted)">
							请填写正确的手机号码
						</span> -->
						<input maxlength="11" placeholder="请输入11位手机号" v-form-ctrl  name="parentMobile" v-model="form.parentMobile" pattern="1\d{10}" class="small">
					</div>
					
					<div class="form-group">
						<label>考试总分</label>
						<input placeholder="请输入分数" min="0" v-form-ctrl type="number" name="score" v-model="form.score" class="small">
					</div>
					<div class="form-group">
						<label>推荐留学机构</label>
						<input placeholder="请输入推荐留学机构" v-form-ctrl name="score" v-model="form.recommendedOrg" class="small">
					</div>
					<div class="form-group">
						<label>下次回访时间</label>
						<input placeholder="请输入下次回访时间" type="text" readonly v-model="form.nextRemindTimeStr" class="small" @click="showCalendar">
						<calendar :show.sync="calendarShow" :value.sync="form.nextRemindTimeStr" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
					</div>
					<div class="form-group">
						<label>下一步跟进计划</label>
						<v-select :options="followPlanOptions" :close-on-select="true" :value.sync="form.followPlan | str"></v-select>
					</div>
					
					<div class="form-group">
						<label>在读学校</label>
						<input placeholder="请输入在读学校" v-form-ctrl name="school" v-model="form.school" class="small">
					</div>
					<div class="form-group">
						<label>在读年级</label>
						<input placeholder="请输入在读年级" v-form-ctrl name="grade" v-model="form.grade" class="small">
					</div>
					<div class="form-group">
						<label>性别</label>
						<v-select :options="genderOptions" :close-on-select="true" :value.sync="form.gender | str"></v-select>
					</div>
					<div class="form-group">
						<label>邮箱</label>
						<!-- <span class="red" v-if="clueForm.email.$error.email && (clueForm.email.$dirty || clueForm.$submitted)">
							请填写正确的邮箱地址
						</span> -->
						<input placeholder="请输入邮箱" v-form-ctrl name="email" type="email" v-model="form.mail" class="small">
					</div>
					<div class="form-group">
						<label>QQ</label>
						<!-- <span class="red" v-if="clueForm.qq.$error.pattern && (clueForm.qq.$dirty || clueForm.$submitted)">
							请填写正确的QQ
						</span> -->
						<input placeholder="请输入QQ" v-form-ctrl name="qq" v-model="form.qq" pattern="^[1-9][0-9]{4,14}" class="small">
					</div>
					<div class="form-group">
						<label>家庭住址</label>
						<input placeholder="请输入家庭详细住址" maxlength="50" v-form-ctrl name="address" v-model="form.address"  class="small">
					</div>
					<div class="form-group large">
						<label>备注</label>
						<textarea v-form-ctrl name="note" v-model="form.remarks" placeholder="请输入备注信息(200字以内)">
						</textarea>
					</div>
				</form>
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<button @click.stop="saveClue($event)" class="btn btn-primary">保存</button>
		  			<button @click.stop="hideNewClue()" class="btn btn-default">取消</button>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import newClueMixins from './newClueMixins';
	export default {
		mixins: [newClueMixins]
	}
</script>
<style lang="sass">
	#clueForm {
		.btn-group {
			&.open {
				.dropdown-toggle {
					box-shadow: none;
				}
			}
			.btn-default {
				background: #fff;
				width: 243px;
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
		.form-group {
			label {
				width: 120px;
				color: #6f7276;
			}
			input.small {
				width: 231px;
				height: 31px;
				line-height: 31px;
				margin-bottom: 0;
			}
			.tip {
				border: 1px solid #66ccff;
			}
			.calendar {
				position: absolute;
			}
			&.large {
				width: 97%;
			}
			&.multiple {
				.smaller {
					width: 137px;
					height: 30px;
					line-height: 30px;
					margin-bottom: 0;
					position: relative;
					// top: 1px;
				}
				.btn-default {
					width: 90px;
					height: 32px;
				}
			}
		}
	}
</style>