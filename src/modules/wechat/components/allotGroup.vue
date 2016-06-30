<!--
	@file tianxiao-virgo-frontend 发通知
	@author xuguanlong
-->

<template>
	<div class="allot-group-form">
		<modal :show.sync="show" :width="640">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title">粉丝分组</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hide()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
		  		<div class="select">
		  			<span>已选粉丝</span>
		  			<div>{{names}}</div>
		  		</div>
		  		<div class="allot">
		  			<label>选择分组:</label>
		  			<inference-input placeholder="请输入分组名称" :query.sync="groupName" :request="queryGroupByName" :limit="10" :on-hit="hitGroupName" :template="nameTemplate"></inference-input>
		  		</div>
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
	import allotGroupMixins from './allotGroupMixins';
	export default {
		mixins: [allotGroupMixins]
	}
</script>
<style lang="sass">
.allot-group-form {
	.allot {
		text-align: center;
		margin: 30px 0;
		label {
			width: 100px;
		}
		> div {
			display: inline-block;
			input {
				height: 24px;
				width: 240px;
			}
		}
	}
	.select {
		background: #fff;
		height: 60px;
		position: relative;
		border-radius: 8px;
		border: 1px solid #ddd;
		> span {
			position: absolute;
			top: 20px;
			left: 5px;
		}
		> div {
			margin-left: 80px;
			padding: 0 5px 0 5px;
			height: 60px;
			border-left: 1px solid #ddd;
			overflow: auto;

		}
	}
}
</style>