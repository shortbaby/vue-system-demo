
<template>
	<div class="info-wrap">
		<div class="info-body">
			<form onsubmit="return false" id="clueForm" v-form name="clueForm" class="clearfix">
				<div class="form-group">
					<label >姓名</label>
					<input maxlength="20" placeholder="请输入用户姓名" v-form-ctrl required v-model="form.userName" class="normal" name="userName">
				</div>
				<div class="form-group">
					<label class="required">手机号</label>
					<input maxlength="11" placeholder="请输入11位手机号" v-form-ctrl required name="mobile" v-model="form.mobile" pattern="1\d{10}" class="normal">
				</div>
				<div class="form-group">
					<label>跟进状态</label>
					<v-select :options="searchFieldOptions" :close-on-select="true" :value.sync="searchField"></v-select>
				</div>
				<div class="form-group">
					<label>咨询课程</label>
					<v-select :options="searchFieldOptions" :close-on-select="true" :value.sync="searchField"></v-select>
				</div>
				<div class="form-group">
					<label>下次跟进计划</label>
					<v-select :options="searchFieldOptions" :close-on-select="true" :value.sync="searchField"></v-select>
				</div>
				<div class="form-group">
					<label>线索来源</label>
					<v-select :options="searchFieldOptions" :close-on-select="true" :value.sync="searchField"></v-select>
				</div>
				<div class="form-group">
					<label>来源明细</label>
					<input placeholder="" v-form-ctrl name="mobile" v-model="form.mobile" class="small">
				</div>
				<div class="form-group">
					<label>邮箱</label>
					<input placeholder="请输入邮箱" v-form-ctrl name="email" type="email" v-model="form.mobile" class="small">
				</div>
				<div class="form-group">
					<label>在读学校</label>
					<input placeholder="请输入在读学校" v-form-ctrl name="mobile" v-model="form.mobile" class="small">
				</div>
				<div class="form-group">
					<label>在读年级</label>
					<input placeholder="请输入在读年级" v-form-ctrl name="mobile" v-model="form.mobile" class="small">
				</div>
				<div class="form-group">
					<label>添加日期</label>
					<input placeholder="请输入下次回访时间" type="text" v-model="calendarValue" class="small" @click="showCalendar">
					<calendar :show.sync="calendarShow" :value.sync="calendarValue" :x="calendarX" :y="calendarY" :begin="calendarBegin" :end="end" :range="calendarRange" :type.sync="calendarType"></calendar>
				</div>
				<div class="form-group">
					<label>性别</label>
					<v-select :options="searchFieldOptions" :close-on-select="true" :value.sync="searchField"></v-select>
				</div>
				
				<div class="form-group">
					<label>QQ</label>
					<!-- <span class="red" v-if="clueForm.qq.$error.pattern && (clueForm.qq.$dirty || clueForm.$submitted)">
						请填写正确的QQ
					</span> -->
					<input placeholder="请输入QQ" v-form-ctrl name="qq" v-model="form.mobile" pattern="^[1-9][0-9]{4,14}" class="small">
				</div>
				<div class="form-group large">
					<label>家庭住址</label>
					<input placeholder="请输入家庭详细住址" v-form-ctrl name="address" v-model="form.mobile"  class="normal">
				</div>
				<div class="form-group large">
					<label>备注</label>
					<textarea name="note" v-model="form.mobile">
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