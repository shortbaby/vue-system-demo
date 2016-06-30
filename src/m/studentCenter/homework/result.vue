<template>
	<div class="dohomework-wrap clearfix">
		<div class="homework-left">
			<div class="head">
				<p>答对<i>{{rightNum}}</i>道题 答错<i>{{errorNum}}</i>道题</p>
			</div>
			<div class="top">
				<span class="status done"></span><label>正确</label>
				<span class="status current"></span><label>错误</label>
				<span class="status none"></span><label>未答</label>
			</div>
			<div class="content clearfix">
				<span :class="{'done': item.result == 0, 'current': item.result == 1}" v-for="item in list" track-by="$index">
				{{$index + 1}}</span>
			</div>
		</div>
		<div class="homework" :class="{show: showLeft}">
			<div class="top">
				<span class="icon-list" @click="left()"></span>
				<span class="score">总得分:<i>{{score}}</i>分</span>
			</div>
			<div>
				<component :is="currentView"  :index.sync="index" :question.sync="currentQuestion" type="result" transition="fade" transition-mode="out-in" keep-alive>
				</component>	
			</div>
			<div class="bottom clearfix">
				<div @click="previous($event)" :class="{'disable': index == 1}">
					<span class="icon-left"></span>
					<span>上一题</span>
				</div>
				<div>
					<span>{{index}}/{{list.length}}</span>
				</div>
				<div @click="next($event)" :class="{'disable': index == list.length}">
					<span class="icon-right"></span>
					<span>下一题</span>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script>
import ResultMixins from './resultMixins.js';
	export default {
		mixins: [ResultMixins]
	};
</script>
<style lang="sass">

</style>