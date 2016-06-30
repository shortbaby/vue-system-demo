
<template>
	<div class="info-wrap">
		<div class="info-body">
			<form onsubmit="return false" id="studentForm" v-form name="studentForm" class="clearfix">
				<div class="form-group">
					<label >姓名</label>
					<input maxlength="20" placeholder="请输入用户姓名" v-form-ctrl required v-model="form.name" class="small" name="name">
				</div>
				<div class="form-group">
					<label class="required">手机号</label>
					<input maxlength="11" placeholder="请输入11位手机号" v-form-ctrl required name="mobile" v-model="form.mobile" pattern="1\d{10}" class="small">
				</div>
				<!-- <div class="form-group">
					<label>跟进状态</label>
					<v-select :options="searchFieldOptions" :close-on-select="true" :value.sync="searchField"></v-select>
				</div> -->
				<div class="form-group">
					<label>咨询课程</label>
					<v-select :options="subjectOptions" :close-on-select="true" :value.sync="form.subjectId | str"></v-select>
				</div>
				<div class="form-group">
					<label>咨询顾问</label>
					<input maxlength="20" v-form-ctrl  disabled v-model="form.adviserName" class="small" name="adviserName">
				</div>
				<div class="form-group">
					<label>班主任</label>
					<input maxlength="20" v-form-ctrl  disabled v-model="form.ownerName" class="small" name="ownerName">
				</div>
				<div class="form-group">
					<label>线索来源</label>
					<v-select :options="originOptions" :close-on-select="true" :value.sync="form.channelId | str"></v-select>
				</div>
				<div class="form-group">
					<label>来源明细</label>
					<input placeholder="" v-form-ctrl name="sourceDetail" v-model="form.sourceDetail" class="small">
				</div>
				<div class="form-group">
					<label>家长姓名</label>
					<input placeholder="请输入家长姓名" v-form-ctrl name="parentName" v-model="form.parentName" class="small">
				</div>
				<div class="form-group">
					<label>家长电话</label>
					<input maxlength="11" v-form-ctrl pattern="1\d{10}" placeholder="请输入家长电话" name="parentMobile" v-model="form.parentMobile" class="small">
				</div>
				<div class="form-group">
					<label>邮箱</label>
					<input placeholder="请输入邮箱" v-form-ctrl name="mail" type="email" v-model="form.mail" class="small">
				</div>
				<div class="form-group">
					<label>在读学校</label>
					<input placeholder="请输入在读学校" v-form-ctrl name="school" v-model="form.school" class="small">
				</div>
				<div class="form-group">
					<label>校区</label>
					<v-select :options="schoolOptions" :close-on-select="true" :value.sync="form.orgSchoolId | str"></v-select>
				</div>
				<div class="form-group">
					<label>在读年级</label>
					<input placeholder="请输入在读年级" v-form-ctrl name="grade" v-model="form.grade" class="small">
				</div>
				<div class="form-group">
					<label>添加日期</label>
					<input placeholder="" type="text" readonly value="{{form.transformTime | date 'yyyy-MM-dd'}}" class="small" @click="showCalendar">
					<!-- <calendar :show.sync="calendarShow" :value.sync="time" :x="calendarX" :y="calendarY" :begin="calendarBegin" :end="end" :range="calendarRange" :type.sync="calendarType"></calendar> -->
				</div>
				<div class="form-group">
					<label>性别</label>
					<v-select :options="genderOptions" :close-on-select="true" :value.sync="form.gender | str"></v-select>
				</div>
				<div class="form-group">
					<label>QQ</label>
					<!-- <span class="red" v-if="clueForm.qq.$error.pattern && (clueForm.qq.$dirty || clueForm.$submitted)">
						请填写正确的QQ
					</span> -->
					<input placeholder="请输入QQ" v-form-ctrl name="qq" v-model="form.qq" pattern="^[1-9][0-9]{4,14}" class="small">
				</div>
				<div class="form-group normal">
					<label>家庭住址</label>
					<input placeholder="请输入家庭详细住址" v-form-ctrl name="address" v-model="form.address">
				</div>
				<div class="form-group large">
					<label>备注</label>
					<textarea name="note" v-model="form.remarks">
					</textarea>
				</div>
			</form>
	  	</div>
	  	<div slot="info-footer">
	  		<div class="info-btns">
	  			<span @click.stop="saveAccount($event)" class="btn btn-primary">保存</span>
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
	padding: 30px;
	.form-group {
		margin-bottom: 30px;
		width: 33.3%;
		label {
			width: 100px;
		}
		input.small {
			width: 231px;
			height: 44px;
			line-height: 44px;
			border: 1px solid #e0e0e0;
			border-radius: 4px;
			margin-bottom: 0px;
		}
		.btn-group {
			.btn {
				width: 231px;
				height: 46px;
				line-height: 46px;
				border: 1px solid #e0e0e0;
				border-radius: 4px;
				padding: 0;
			}
		}
		.calendar {
			position: absolute;
		}
		&.normal {
			width: 66.6%;
			input {
				height: 44px;
				line-height: 44px;
				border: 1px solid #e0e0e0;
				border-radius: 4px;
				min-width: 545px;
			}
		}
		&.large {
			width: 90%;
			textarea {
				border-radius:4px;
			}
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
	.info-btns {
		text-align: center;
		.btn {
			font-size: 18px;
			height: 38px;
			line-height: 38px;
			width: 120px;
			border-radius: 70px;
			&:first-child {
				margin-right: 20px;
			}
		}
	}
}
</style>