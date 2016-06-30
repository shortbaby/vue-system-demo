<template>
<div>
	<div class="class-detail-sign">
		<div class="sign-info">
			<p>张老师</p>	
		</div>
		<p>{{classInfo.name}}</p>
		<p>第{{classInfo.index}}节</p>
		<p>{{classInfo.date}} {{classInfo.startTime}} ~ {{classInfo.endTime}}</p>
		<p>{{classInfo.classroom}}</p>
	</div>
	<div class="student-sign-status">
		
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
.student-sign-status {
	background: #fff;
	padding: 3rem 0;
}
</style>