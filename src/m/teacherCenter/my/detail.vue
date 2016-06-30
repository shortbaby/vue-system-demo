<!--
	@file feidu-老师中心
	@author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
	<div class="my-detail">
		<p>
			<span>姓名</span>
			<span>{{detail.name}}</span>
		</p>
		<p>
			<span>手机号</span>
			<span>{{detail.mobile}}</span>
		</p>
		<p>
			<span>校区</span>
			<span>{{detail.schoolName}}</span>
		</p>
		<p>
			<span>性别</span>
			<span v-if="detail.gender == 0">男</span>
			<span v-if="detail.gender == 1">女</span>
			<span v-if="detail.gender == 2">其他</span>
		</p>
		<!-- <p>
			<span>科目</span>
			<span>{{detail.subjectName}}</span>
		</p> -->
		<p>
			<span>合同类型</span>
			<span v-if="detail.userType == 0">全职</span>
			<span v-if="detail.userType == 1">兼职</span>
			<span v-if="detail.userType == 2">实习</span>
		</p>
		<p>
			<span>入职日期</span>
			<span>{{detail.entryTime | date 'yyyy-MM-dd'}}</span>
		</p>
		<p>
			<span>教龄</span>
			<span>{{detail.schoolAge}}年</span>
		</p>
		<p>
			<span>职称</span>
			<span>高级教师</span>
		</p>
		<p>
			<span>家庭住址</span>
			<span>{{detail.address}}</span>
		</p>
		<!-- <p>
			<span>邮箱</span>
			<span>genshuixue@baijiahulian.com</span>
		</p> -->
	</div>
</template>

<script>
	import {getTeacherDetail} from './request';
	export default {
		data() {
			return {
				detail: {}
			}
		},
		created() {
			this.getTeacherDetail();
		},
		methods: {
			getTeacherDetail() {
				getTeacherDetail()
					.then((res) => {
						this.detail = res.data;
					})
			}
		}
	};
</script>
<style lang="sass">
.my-detail {
	p {
		border-bottom: 1px solid #ccc;
		background: #fff;
		padding: 1rem;
		span {
			display: inline-block;
			&:first-child {
				width: 8rem;
				color: #999;
			}
		}
	}
}
</style>