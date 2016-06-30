<!--
	@file tianxiao-virgo-frontend 新建线索
	@author xuguanlong
-->

<template>
	<div>
		<modal :show.sync="show" :width="830">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title" v-if="!id">新增学员</h4>
		    	<h4 class="modal-title" v-if="id">编辑学员</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hideNewStudent()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
				<form onsubmit="return false" id="studentForm" v-form name="studentForm" class="clearfix">
					<div class="form-group">
						<label class="required">姓名</label>
						<span class="red" v-if="studentForm.name.$error.required && (studentForm.name.$dirty || studentForm.$submitted)">
						姓名为必填项</span>
						<input maxlength="20" placeholder="请输入用户姓名" v-form-ctrl required v-model="form.name" class="normal" name="name">
					</div>
					<div class="form-group">
						<label class="required">手机号</label>
						<span class="red" v-if="studentForm.mobile.$error.required && (studentForm.mobile.$dirty || studentForm.$submitted)">
							手机号必填
						</span>
						<span class="red" v-if="studentForm.mobile.$error.pattern && (studentForm.mobile.$dirty || studentForm.$submitted)">
							请填写正确的手机号码
						</span>
						<input maxlength="11" placeholder="请输入11位手机号" v-form-ctrl required name="mobile" v-model="form.mobile" pattern="1\d{10}" class="normal">
					</div>
					<div class="form-group">
						<label>咨询课程</label>
						<v-select :options="searchFieldOptions" :close-on-select="true" :value.sync="form.subjectId | str"></v-select>
					</div>
					<div class="form-group">
						<label>线索来源</label>
						<v-select :options="originOptions" :close-on-select="true" :value.sync="form.origin | str"></v-select>
					</div>
					<div class="form-group">
						<label>来源明细</label>
						<input placeholder="请输入线索来源明细" v-form-ctrl name="sourceDetail" v-model="form.sourceDetail" class="small">
					</div>
					<div class="form-group">
						<label>咨询顾问</label>
						<v-select :options="searchFieldOptions" :close-on-select="true" :value.sync="form.adviserId | str"></v-select>
					</div>
					<div class="form-group">
						<label>跟进状态</label>
						<v-select :options="consultStatusOptions" :close-on-select="true" :value.sync="form.consultStatus | str"></v-select>
					</div>
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
						<input placeholder="请输入定金金额" v-form-ctrl name="deposite" v-model="form.deposite" class="small">
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
						<label>下次回访时间</label>
						<input placeholder="请输入下次回访时间" type="text" v-model="form.nextRemindTime" class="small" @click="showCalendar">
						<calendar :show.sync="calendarShow" :value.sync="time" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
					</div>
					<div class="form-group">
						<label>所在校区</label>
						<v-select :options="searchFieldOptions" :close-on-select="true" :value.sync="form.orgSchoolId | str"></v-select>
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
						<input placeholder="请输入邮箱" v-form-ctrl name="email" type="email" v-model="form.email" class="small">
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
						<input placeholder="请输入家庭详细住址" v-form-ctrl name="address" v-model="form.address"  class="small">
					</div>
					<div class="form-group large">
						<label>备注</label>
						<textarea name="note" v-model="form.remarks">
						</textarea>
					</div>
				</form>
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<button @click.stop="save($event)" class="btn btn-primary">保存</button>
		  			<button @click.stop="hideNewStudent()" class="btn btn-default">取消</button>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import newStudentMixins from './newStudentMixins';
	export default {
		mixins: [newStudentMixins]
	}
</script>
<style lang="sass">
	#studentForm {
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
	}
</style>