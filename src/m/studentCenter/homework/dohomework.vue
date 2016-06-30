<template>
	<div class="dohomework-wrap clearfix">
		<div class="homework-left">
			<div class="head"></div>
			<div class="top">
				<span class="status done"></span><label>已答</label>
				<span class="status current"></span><label>当前题</label>
				<span class="status none"></span><label>未答</label>
			</div>
			<div class="content clearfix" >
				<span :class="{'done': item.submited == true, 'none': item.submited == false, 'current': index == $index + 1}" v-for="item in list" track-by="$index">
				{{$index + 1}}</span>
			</div>
			<div class="bottom">
				<span class="btn btn-primary" @click="submit($event)">提交作业</span>
			</div>
		</div>
		<div class="homework" :class="{show: showLeft}">
			<div class="top">
				<span class="icon-list" @click="left()"></span>
				<span></span>
			</div>
			<div>
				<component :is="currentView"  :index.sync="index" :question.sync="currentQuestion" transition="fade" transition-mode="out-in" keep-alive>
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
import DoHomeworkMixins from './doHomeworkMixins.js';
	export default {
		mixins: [DoHomeworkMixins]
	};
</script>
<style lang="sass">

</style>