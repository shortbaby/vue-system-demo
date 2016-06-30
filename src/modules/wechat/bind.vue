<template>
	<div class="wechat-bind">
		<div>
			<span class="btn btn-primary bind">立即绑定微信公众号</span>
		</div>
		<p>说明：绑定微信公众号后如需解绑，请在
		<a href="https://mp.weixin.qq.com/cgi-bin/loginpage?t=wxm2-login&lang=zh_CN">https://mp.weixin.qq.com/cgi-bin/loginpage?t=wxm2-login&lang=zh_CN</a> 取消授权</p>
	</div>
</template>
<script>
	
</script>
<style lang="sass">
.wechat-bind {
	padding-top: 150px;
	> div {
		width: 160px;
		margin: 0 auto;
	}
	> p {
		padding-top: 20px;
		text-align: center;
	}
	.btn {
		&.bind {
			padding: 20px 60px;
			font-size: 16px;
		}
	}
}
</style>