<!--
	@file 学生中心-component-学生中心底部
	@author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
	<div class="fixed-footer">
		<ul>
			<li :class="{'active': current == 'index'}" v-link="{path: '/index'}"><a href="javascript:void(0)">首页</a></li>
			<li :class="{'active': current == 'timetable'}" v-link="{path: 'timetable'}"><a href="javascript:void(0)">课表</a></li>
			<li :class="{'active': current == 'homework'}" v-link="{path: 'homework'}"><a href="javascript:void(0)">作业</a></li>
			<li :class="{'active': current == 'my'}" v-link="{path: '/my'}"><a href="javascript:void(0)">我</a></li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			current: {
				type: String,
				default: 'index'
			}
		}
	};
</script>