<template>
	<div>
		<ul class="homework-list">
			<li v-for="item in list" @click="forward(item)">
				<p class="text-line text-line-1">
					<span>{{item.name}}</span>
					<span v-if="item.score != null">{{item.score}}</span>
					<span v-else>{{item.remind}}</span>
				</p>
				<p class="text-line text-line-2" v-if="item.submitTime">
					<span>作业提交时间</span>
					<span>{{item.submitTime | date 'yyyy-MM-dd HH:mm'}}</span>
				</p>
				<p class="text-line text-line-3">
					<span v-if="item.status == 2">答对{{item.rightNum}}题 错误{{item.errorNum}}题</span>
					<span>共{{item.questionNum}}道题</span>
					<span class="status" :class="{'complete': item.status == 2, 'unfinished': item.status == 0, 'uncorrect': item.status == 1}">
						{{item.statusStr}}
					</span>
				</p>
			</li>
		</ul>
		<loading :show="!list"></loading>
        <div class="none-list" v-if="!list"><span>暂无数据</span></div>
		<student-center-footer current="homework"></student-center-footer>
	</div>
</template>
<script>
	import IndexMixins from './indexMixins.js';
	export default {
		mixins: [IndexMixins]
	};
</script>
<style lang="sass">
	
</style>