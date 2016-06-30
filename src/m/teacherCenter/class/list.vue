<!--
	@file 飞渡-老师中心
	@author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
<div class="class-list">
	<div @click="detail(item)" v-for="item in summarys">
		<p>第{{item.index}}节</p>
		<p class="section-time">{{item.day}} {{item.section}}</p>
		<span>{{item.roomName}}</span>
	</div>
</div>	
</template>

<script>
	import ListMixins from './listMixins.js';
	export default {
		mixins: [ListMixins]
	};
</script>
<style lang="sass">
.class-list {
	background: #fff;
	> div {
		position: relative;
		border-bottom: 1px solid #ccc;
		p {
			padding: 0 1rem;
			height: 3rem;
			line-height: 3rem;
			&.section-time {
				font-size: 1.4rem;
			}
		}
		span {
			position: absolute;
			right: 1rem;
			top: 2rem;
			font-size: 1.4rem;
			color: #999;
		}
	}
}
</style>