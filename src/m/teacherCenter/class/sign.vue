<!--
	@file 飞渡-老师中心
	@author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
<div>
	<div class="class-detail-sign">
		<div class="sign-info">
			<p>签到2/5</p>	
		</div>
		<p>{{classInfo.name}}</p>
		<p>第{{classInfo.index}}节</p>
		<p>{{classInfo.date}} {{classInfo.startTime}} ~ {{classInfo.endTime}}</p>
		<p>{{classInfo.classroom}}</p>
	</div>
	<div class="student-list">
		<ul>
			<li>
				<span>张三</span>
				<span class="status">已二维码签到</span>
				<div class="sign-wrap clearfix">
					<span>旷课</span>
					<span>请假</span>
					<span>签到</span>
				</div>
				
			</li>
			<li>
				<span>张三</span>
				<span class="status">已手动签到</span>
				<div class="sign-wrap clearfix">
					<span>旷课</span>
					<span>请假</span>
					<span class="active">签到</span>
				</div>
				
			</li>
			<li>
				<span>张三</span>
				<span class="status">已二维码签到</span>
				<div class="sign-wrap clearfix">
					<span>旷课</span>
					<span>请假</span>
					<span>签到</span>
				</div>
				
			</li>
		</ul>
	</div>
</div>	
</template>

<script>
	export default {
		data () {
			return {
				list: [],
				classInfo: {}
			}
		},
		route: {
			data(transition) {
				this.classInfo = transition.to.params.obj;
			}
		},
		created () {
			console.log(this.$route.params.id);
		},
		methods: {
		}
	};
</script>
<style lang="sass">
.class-detail-sign {
	border-bottom: 1px solid #ccc;
	padding: .5rem;
	position: relative;
	.sign-info {
		background: #66ccff;
		color: #fff;
		height: 6rem;
		line-height: 6rem;
		width: 6rem;
		position: absolute;
		border-radius: 3.5rem;
		text-align: center;
		font-size: 1.3rem;
		top: 2rem;
		left: .8rem;
	}
	> p {
		text-align: center;
		height: 2.5rem;
		line-height: 2.5rem;
		font-size: 1.4rem;
		&:nth-child(odd) {
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
			position: relative;
			&:first-child {
				margin-top: 0;
			}
			.sign-wrap {
				position: absolute;
				right: 1rem;
				top: .5rem;
				span {
					background: #66ccff;
					color: #fff;
					width: 4rem; 
					display: inline-block;
					margin-right: 0;
					float: left;
					font-size: 1.4rem;
					text-align: center;
					padding: .3rem .3rem;
					box-sizing: border-box;
					border: 1px solid #66ccff;
					&:first-child {
						border-top-left-radius: .5rem;
						border-bottom-left-radius: .5rem;
					}
					&:last-child {
						border-top-right-radius: .5rem;
						border-bottom-right-radius: .5rem;
					}
					&.active {
						border: 1px solid #eee;
						background: #fff;
						color: #66ccff;
					}
				}
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
				font-size: 1.2rem;
				color: #999;
			}
		}
	}
}
</style>