

<template>
<div class="logs list-wrapper">
	<div class="search-wrap">
		<div class="input-control long">
			<label>记录类型</label>
			<v-select :options="typeOptions" :close-on-select="true" :value.sync="opType | str"></v-select>
		</div>
		<div class="input-control long">
			<label>功能</label>
			<v-select :options="funcOptions" :close-on-select="true" :value.sync="func | str"></v-select>
		</div>
		<div class="input-control long">
			<label>操作人</label>
			<inference-input placeholder="请输入姓名" :query.sync="name" :request="queryUserByName" :limit="10" :on-hit="hitName" :template="nameTemplate"></inference-input>
		</div>
		<div class="input-control long ">
			<label>记录日期</label>
			<input type="text" v-model="startTime" class="time-input form-control" @click="showCalendar($event, 1)">
			<span class="icon-calendar cal-1"></span>
			<calendar :show.sync="calendarShow1" :value.sync="startTime" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
			<span class="step">-</span>
			<input type="text" v-model="endTime" class="time-input form-control" @click="showCalendar($event, 2)">
			<span class="icon-calendar cal-2"></span>
			<calendar :show.sync="calendarShow2" :value.sync="endTime" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
		</div>
	</div>
	<div class="option">
		<h3><span class="icon-dangan"></span><span>{{pageDto.count}}</span>条操作记录</h3>
		<div class="opration">
			<span class="btn btn-primary search" @click="search()">查询</span>
			<span class="btn btn-blue-light reset" @click="reset()">重置</span>
		</div>
	</div>
	<table class="table table-striped">
			<tr>
				<td>功能</td>
				<td>记录类型</td>
				<td>记录时间</td>
				<td>操作人</td>
				<td>操作内容</td>
			</tr>
			<tr v-for="item in list" track-by="$index">
				<td>{{item.funcType}}</td>
				<td>{{item.opType}}</td>
				<td>{{item.createTime | date 'yyyy-MM-dd HH:mm:ss'}}</td>
				<td><p>{{item.userName}}</p></td>
				<td><p>{{item.content}}</p></td>
			</tr>
		</table>
	<!-- <loading :show="!loading"></loading> -->
	<div class="none-list" v-if="noRes">
		<span v-if="key">没有搜索到操作记录</span>
		<span v-if="!key">没有操作记录</span>
	</div>
	<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
</div>
</template>

<script>
	import HistoryMixins from './historyMixins';
	export default {
		mixins: [HistoryMixins]
	}
</script>
<style lang="sass">
.logs {
	.input-control {
		> div {
			display: inline-block;
		}
	}
}
</style>