<!--
	@file libra-老师中心
	@author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
	<div>
		<div class="course-list">
			<ul>
				<li  v-for="item in list" @click="info(item)">
					<p>
						<span>{{item.name}}</span>
						<span>{{item.number}}</span>
					</p>
					<p @click.stop="students(item)">班级学员</p>
					<p>{{item.signLessons}}/{{item.totalLessons}}</p>
				</li>
			</ul>
		</div>
		<loading :show="!list"></loading>
        <div class="none-list" v-if="!list"><span>暂无数据</span></div>
		<teacher-center-footer current="course"></teacher-center-footer>
	</div>
</template>

<script>
	import IndexMixins from './indexMixins.js';
	export default {
		mixins: [IndexMixins]
	};
</script>
<style lang="sass">
.course-list {
	padding: 1rem;
	margin-bottom: 5rem;
	ul {
		li {
			list-style: none;
			border: 1px solid #ccc;
			background: #fff;
			margin-top: 1rem;
			height: 6rem;
			position: relative;
			p {	
				&:first-child {
					height: 6rem;
					line-height: 6rem;
					padding-left: 1rem;
					span {
						&:nth-child(2) {
							color: #999;
							font-size: 1.4rem;
							margin-left: 1rem;
						}
					}
				}
				&:nth-child(2) {
					top: 1rem;
					right: 1rem;
					position: absolute;
					font-size: 1.4rem;
				}
				&:last-child {
					position: absolute;
					font-size: 1.4rem;
					bottom: 1rem;
					right: 1rem;
				}
			}
		}
	}
}
</style>