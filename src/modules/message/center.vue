

<template>
<div class="messages list-wrapper">
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
		<h3><span class="icon-message"></span><span>{{pageDto.count}}</span>条审批记录</h3>
		<div class="opration">
			<span class="btn btn-primary search" @click="search()">查询</span>
			<span class="btn btn-blue-light reset" @click="reset()">重置</span>
		</div>
	</div>
	<table class="messages-table table table-striped">
		<tr>
			<td>班级名称</td>
			<td>申请人</td>
			<td>申请时间</td>
			<td>审批时间</td>
			<td>类型</td>
			<td>审核状态</td>
			<td>备注</td>
			<td>操作</td>
		</tr>
		<tr v-for="item in list" track-by="$index">
			<td>{{item.classesName}}</td>
			<td>{{item.applyName}}</td>
			<td>{{item.applyTime | date 'yyyy-MM-dd HH:mm:ss'}}</td>
			<td>{{item.confirmTime | date 'yyyy-MM-dd HH:mm:ss'}}</td>
			<td>{{item.applyTypeStr}}</td>
			<td>{{item.statusStr}}</td>
			<td>{{item.remark}}</td>
			<td>
				<span v-if="item.status == 0" class="btn btn-primary opration" @click.stop="pass(item)">通过</span>
				<span v-if="item.status == 0" class="btn btn-primary opration refuse" @click.stop="refuse(item)">拒绝</span>
			</td>
		</tr>
	</table>
	<refuse :item.sync="selectItem" :show.sync="showRefuse"></refuse>
	<loading :show="!loading"></loading>
	<div class="none-list" v-if="noRes">
		<span>没有消息记录</span>
	</div>
	<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
</div>
</template>

<script>
	import CenterMixins from './centerMixins';
	export default {
		mixins: [CenterMixins]
	}
</script>
<style lang="sass">
.messages {
	.messages-table {
		width: 100%;
		tr {
			td {
				.opration {
					border: none;
					cursor: pointer;
					background: #66ccff;
					color: #fff;
					padding: 2px 10px;
					cursor: pointer;
					border-radius: 5px;
				}
				.refuse {
					background: #f51e0b;
				}
			}
		}
	}
}
</style>