<!--
	@file 飞渡-老师中心
	@author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
<div>
	<div class="class-detail">
		<p>{{classInfo.classesName}}</p>
		<p>第{{classInfo.index}}节</p>
		<p>{{classInfo.date}} {{classInfo.section}}</p>
		<p>{{classInfo.roomName}}</p>
	</div>
	<div class="student-list">
		<ul>
			<li v-for="item in list">
				<span>{{item.studentName}}</span>
				<span class="status" v-if="item.status == 1">已写评语</span>
				<span class="btn btn-primary" v-if="item.status == 1" @click="modifyComment(item)">修改评语</span>
				<span class="btn btn-primary" @click="add(item)" v-if="item.status == 0">写评语</span>
			</li>
		</ul>
	</div>
	<comment :comment.sync="comment" :show.sync="showComment" :modify="modify" :info="classInfo" :student.sync="student"></comment>
</div>	
</template>

<script>
	import StudentsMixins from './studentsMixins.js';
	export default {
		mixins: [StudentsMixins]
	};
</script>
<style lang="sass">
.class-detail {
	border-bottom: 1px solid #ccc;
	padding: .5rem;
	> p {
		text-align: center;
		height: 2.5rem;
		line-height: 2.5rem;
		&:nth-child(even) {
			font-size: 1.4rem;
			color: #999;
		}
	}
}
.student-list {
	background: #fff;
	padding: 3rem 0;
	ul {
		li {
			list-style: none;
			margin: 1rem;
			border: 1px solid #eee;
			padding: .8rem 1rem;
			border-radius: .8rem;
			&:first-child {
				margin-top: 0;
			}
			span {
				margin-right: 1rem;
				&.btn {
					font-size: 1.2rem;
					padding: .3rem 0;
					text-align: center;
					float: right;
					width: 5rem;
					border-radius: .5rem;
				}
			}
			.status {
				font-size: 1.4rem;
				color: #999;
			}
		}
	}
}
</style>