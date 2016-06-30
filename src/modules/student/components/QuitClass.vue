<!--
	@file tianxiao-virgo-frontend 
	@author xuguanlong
-->

<template>
	<div class="quit-class-form">
		<modal :show.sync="show" :width="560">
			<div slot="modal-header" class="modal-header">
		    	<h4 v-if="type=='quit'" class="modal-title">退班</h4>
		    	<h4 v-if="type=='refund'" class="modal-title">退费</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hide()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
				<p v-if="type=='quit'"> 请填写学生退班原因</p>
				<p v-if="type=='refund'"> 请填写学生退费原因</p>
				<textarea class="reason" v-model="reason" minlength="10" placeholder="请填写原因，不少于10个字"></textarea>
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<button @click.stop="save($event)" class="btn btn-primary">保存</button>
		  			<button @click.stop="hide()" class="btn btn-default">取消</button>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import quitClassMixins from './quitClassMixins';
	export default {
		mixins: [quitClassMixins]
	}
</script>
<style lang="sass">
.quit-class-form {
	.modal-body {
		text-align: center;
		p {
			text-align: left;
			margin-bottom: 10px;
			padding-left: 10px;
		}
	}
	textarea {
		width: 500px;
		height: 200px;
		border: 1px solid #ddd;
		padding: 5px 10px;
		outline: none;
	}
}
</style>