
<template>
	<div class="info-wrap">
		<div class="info-body">
			<form onsubmit="return false" id="clueForm" v-form name="clueForm" class="clearfix">
				<div class="form-group">
					<label >姓名</label>
					<input maxlength="20" placeholder="请输入用户姓名" v-form-ctrl required v-model="clue.name" class="normal" name="name">
				</div>
				<div class="form-group">
					<label class="required">手机号</label>
					<input maxlength="11" placeholder="请输入11位手机号" v-form-ctrl required name="mobile" v-model="clue.mobile" pattern="1\d{10}" class="normal">
				</div>
				<div class="form-group">
					<label>跟进状态</label>
					<v-select :options="consultStatusOptions" :close-on-select="true" :value.sync="clue.consultStatus | str"></v-select>
				</div>
				<div class="form-group">
					<label>是否交定金</label>
					<v-select :options="hasDepositeOptions" :close-on-select="true" :value.sync="clue.hasDeposite | str"></v-select>
				</div>
				<div class="form-group">
					<label>定金金额</label>
					<input placeholder="请输入定金金额" :class="{tip: clue.hasDeposite == 1}" v-form-ctrl type="number" name="deposite" v-model="clue.deposite" class="small">
				</div>
				<div class="form-group">
					<label>咨询课程</label>
					<v-select :options="subjectOptions" :close-on-select="true" :value.sync="clue.subjectId | str"></v-select>
				</div>
				<div class="form-group">
					<label>咨询顾问</label>
					<input maxlength="20" v-form-ctrl  disabled v-model="clue.adviserName" class="small" name="adviserName">
				</div>
				<div class="form-group multiple">
					<label>家长姓名</label>
					<input maxlength="20" v-form-ctrl  v-model="clue.parentName" class="small" name="parentName">
					<v-select :options="relationshipOptions" :close-on-select="true" :value.sync="clue.relationship | str"></v-select>
				</div>
				<div class="form-group">
					<label>家长手机</label>
					<input maxlength="20" v-form-ctrl  pattern="1\d{10}" v-model="clue.parentMobile" class="small" name="adviserName">
				</div>
				<div class="form-group">
					<label>学生阶段</label>
					<v-select :options.sync="studyPhaseOptions" :close-on-select="true" :value.sync="clue.studyPhase | str"></v-select>
				</div>
				<div class="form-group">
					<label>下次跟进计划</label>
					<v-select :options="followPlanOptions" :close-on-select="true" :value.sync="clue.followPlan | str"></v-select>
				</div>
				<div class="form-group">
					<label>线索来源</label>
					<v-select :options="originOptions" :close-on-select="true" :value.sync="clue.channelId | str"></v-select>
				</div>
				<div class="form-group">
					<label>推荐留学机构</label>
					<input placeholder="" v-form-ctrl name="recommendedOrg" v-model="clue.recommendedOrg" class="small">
				</div>
				<div class="form-group">
					<label>考试总分</label>
					<input placeholder="" v-form-ctrl name="score" v-model="clue.score" class="small">
				</div>
				<div class="form-group">
					<label>来源明细</label>
					<input placeholder="来源明细" v-form-ctrl name="source" v-model="clue.sourceDetail" class="small">
				</div>
				<div class="form-group">
					<label>可上课时间</label>
					<v-select :options.sync="availableTimeOptions" :close-on-select="true" :value.sync="clue.availableTime | str"></v-select>
				</div>
				<div class="form-group">
					<label>邮箱</label>
					<!-- <span class="red" v-if="clueForm.email.$error.email && (clueForm.email.$dirty || clueForm.$submitted)">
						请填写正确的邮箱地址
					</span> -->
					<input placeholder="请输入邮箱" v-form-ctrl name="email" type="email" v-model="clue.mail" class="small">
				</div>
				<div class="form-group">
					<label>校区</label>
					<v-select :options="schoolOptions" :close-on-select="true" :value.sync="clue.orgSchoolId | str"></v-select>
				</div>
				<div class="form-group">
					<label>在读学校</label>
					<input placeholder="请输入在读学校" v-form-ctrl name="school" v-model="clue.school" class="small">
				</div>
				<div class="form-group">
					<label>在读年级</label>
					<input placeholder="请输入在读年级" v-form-ctrl name="grade" v-model="clue.grade" class="small">
				</div>
				<div class="form-group">
					<label>下次回访时间</label>
					<input placeholder="请输入下次回访时间" type="text" v-model="clue.nextRemindTime | date 'yyyy-MM-dd HH:mm' " class="small" @click="showCalendar">
					<calendar :show.sync="calendarShow" :value.sync="time" :x="calendarX" :y="calendarY" :begin="calendarBegin" :end="end" :range="calendarRange" :type.sync="calendarType"></calendar>
				</div>
				<div class="form-group">
					<label>性别</label>
					<v-select :options="genderOptions" :close-on-select="true" :value.sync="clue.gender | str"></v-select>
				</div>

				<div class="form-group">
					<label>QQ</label>
					<!-- <span class="red" v-if="clueForm.qq.$error.pattern && (clueForm.qq.$dirty || clueForm.$submitted)">
						请填写正确的QQ
					</span> -->
					<input placeholder="请输入QQ" v-form-ctrl name="qq" v-model="clue.qq" pattern="^[1-9][0-9]{4,14}" class="small">
				</div>
				<div class="form-group large">
					<label>家庭住址</label>
					<input placeholder="请输入家庭详细住址" v-form-ctrl name="address" v-model="clue.address"  class="normal">
				</div>
				<div class="form-group large">
					<label>备注</label>
					<textarea name="remarks" v-model="clue.remarks">
					</textarea>
				</div>
			</form>
	  	</div>
	  	<div slot="info-footer">
	  		<div class="info-btns">
	  			<span @click.stop="saveClue($event)" class="btn btn-primary">保存</span>
	  			<!-- <button @click.stop="hideNewClue()" class="btn btn-default">取消</button> -->
	  		</div>
	  	</div>
	</div>
</template>

<script>
import InfoMixins from './infoMixins';
export default {
	mixins: [InfoMixins]
}
</script>

<style lang="sass">
.info-wrap {
	background: #fff;
	padding: 20px 0 100px 0;
	.info-btns {
		text-align: center;
		.btn {
			width: 120px;
			&:first-child {
				margin-right: 20px;
			}
		}
	}
}
</style>