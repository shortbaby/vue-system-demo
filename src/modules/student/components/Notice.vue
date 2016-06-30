<!--
	@file tianxiao-virgo-frontend 发通知
	@author xuguanlong
-->

<template>
	<div class="notice-form">
		<modal :show.sync="show" :width="530">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title">发通知</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hide()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
		  		<div v-if="type == 'multiple'" class="select">
		  			<div>已选学员</div>
		  			<div>{{names}}</div>
		  		</div>
		  		<textarea v-model="message" placeholder="填写通知内容(最多5000字)"></textarea>
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<button @click.stop="ok($event)" class="btn btn-primary">确定</button>
		  			<button @click.stop="hide()" class="btn btn-default">取消</button>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import NoticeMixins from './noticeMixins';
	export default {
		mixins: [NoticeMixins]
	}
</script>
<style lang="sass">
.notice-form {
	.modal-body {
		padding: 40px;
		.select {
			width:448px;
			height: 44px;
			line-height: 44px;
			border-radius: 4px;
			border: 1px solid #ddd;
			margin-bottom: 20px;
			>div {
				float: left;
				padding-left:15px;
				&:last-child {
					margin-left: 97px;
					border-left: 1px solid #e0e0e0;
				}
			}
		}
		textarea {
			margin-top: 10px;
			width: 100%;
			height: 220px;
			padding: 5px 10px;
			border-radius: 8px;
			box-sizing: border-box;
			border: 1px solid #ddd;
			outline: none;
		}
	}
}
</style>