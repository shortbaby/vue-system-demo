

<template>
<div class="messages">
	<div class="search-wrap">
		<div class="input-control long ">
			<label>申请日期</label>
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
		<h3><span class="icon-dangan"></span><span>{{pageDto.count}}</span>条消息记录</h3>
		<div class="opration">
			<span class="btn btn-primary search" @click="read()">设置已读</span>
			<span class="btn btn-primary search" @click="search()">查询</span>
			<span class="btn btn-blue-light reset" @click="reset()">重置</span>
		</div>
	</div>
	<table class="messages-table">
		<tr>
			<td><input type="checkbox" v-model="allCheck" @click="selectAll($event)" class="all-check"></td>
			<td>消息内容</td>
			<td>已读状态</td>
			<td>消息时间</td>
			<!-- <td>操作</td> -->
		</tr>
		<tr v-for="item in list" track-by="$index" @click="go(item)" class="user-select-none">
			<td><input type="checkbox" value="{{item.id}}" v-model="selectIds" @click.stop="selectItem($event, item)" class="td-check"></td>
			<td>{{item.messageInfo.content}}</td>
			<td>{{item.statusStr}}</td>
			<td>{{item.dateStr}}</td>
			<!-- <td>
				<span v-if="item.status == 0" class="btn btn-primary opration" @click.stop="pass(item)">通过</span>
				<span v-if="item.status == 0" class="btn btn-primary opration refuse" @click.stop="refuse(item)">拒绝</span>
			</td> -->
		</tr>
	</table>
	<loading :show="!loading"></loading>
	<div class="none-list" v-if="noRes">
		<span>没有消息记录</span>
	</div>
	<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
</div>
</template>

<script>
	import ListMixins from './listMixins';
	export default {
		mixins: [ListMixins]
	}
</script>
<style lang="sass">
</style>