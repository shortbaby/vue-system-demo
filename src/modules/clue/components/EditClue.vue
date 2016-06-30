<!--
	@file tianxiao-virgo-frontend 新建线索
	@author xuguanlong
-->

<template>
	<div class="edit-clue-form">
		<modal :show.sync="show" :width="560">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title" v-if="release">释放线索</h4>
		    	<h4 class="modal-title" v-if="valid">标记无效</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hideEditClue()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
				<p v-if="release"> 请填写释放线索‘{{name}}’原因</p>
				<p v-if="valid"> 请填写线索‘{{name}}’无效原因</p>
				<textarea class="reason" v-model="reason" minlength="10" placeholder="请填写原因，不少于10个字"></textarea>
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<button @click.stop="saveClue($event)" class="btn btn-primary">确定</button>
					<button @click.stop="hideEditClue()" class="btn btn-default">取消</button>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import editClueMixins from './editClueMixins';
	export default {
		mixins: [editClueMixins]
	}
</script>
<style lang="sass">
.edit-clue-form {
	.modal-body {
		padding:30px;
		text-align: center;
		p {
			text-align: left;
			margin-bottom: 24px;
			color: #6f7276;
		}
	}
	textarea {
		width: 500px;
		height: 100px;
		border: 1px solid #ddd;
		outline: none;
	}
}
</style>