<!--
	@file feidu-老师中心
	@author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
	<div class="my-info-wrap">
		<div class="my-info">
			<div class="qrcode">
				<img :src="info.token | qrcode 2">
				<!-- <img src="http://m.genshuixue.com/static/qrcode?size=2&margin=0&url=A34lbGgmPjo5NzIoe3pseVp3dG4rQzqH" /> -->
			</div>
			<div @click="detail()">
				<p>{{info.name}}</p>	
				<p>{{info.schoolName}}</p>
				<span class="icon-right"></span>
			</div>
		</div>
		<div @click="set()">
			<span>我的可上课时间</span>
			<span class="icon-right"></span>
		</div>
		<p class="btn-p">
			<span class="btn btn-primary remove" @click="unbind()">解除绑定</span>
		</p>
	</div>
	<teacher-center-footer current="my"></teacher-center-footer>
</template>

<script>
	import IndexMixins from './indexMixins.js';
	export default {
		mixins: [IndexMixins]
	};
</script>
<style lang="sass">
.btn-p {
	position: absolute;
	width: 100%;
	text-align: center;
	bottom: 6rem;
}
.btn {
	&.remove {
		color: #fff;
		background: #ff0000;
		padding: .8rem 5rem;
		border: none;
	}
}
.my-info {
	position: relative;
	background: #fff;
	padding: 2.5rem 0 3.5rem 1rem;
	> div {
		background: #edf0f5;
		margin-left: 8.5rem;
		position: relative;
		height: 6rem;
		top: 1rem;
		p {
			padding-left: 3rem;
			position: relative;
			top: 1rem;
			font-size: 1.4rem;
		}
	}
	.qrcode {
		position: absolute;
		height: 10rem;
		width: 10rem;
		border-radius: 5rem;
		margin-left: 0;
		top: 1.5rem;
		img {
			position: relative;
			top: 2.4rem;
			left: 2.4rem;	
		}
		+ div {
			.icon-right {
				position: relative;
				top: -1.5rem;
				right: 1rem;
				float: right;
			}
		}
		
	}
	+ div {
		background: #fff;
		padding: 1rem;
		margin-top: 1.5rem;
		.icon-right {
			float: right;
		}
	}
}
</style>