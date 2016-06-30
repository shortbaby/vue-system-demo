<!--
	@file tianxiao-virgo-frontend 分配班主任
	@author xuguanlong
-->

<template>
	<div class="allocate-form">
		<modal :show.sync="show" :width="530">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title">分配班主任</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hideAllocate()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
		  		<p>选择学员需分配的班主任</p>
		  		<div class="teacher-table">
		  			<table>
						<tr>
							<td width="10%"></td>
							<td>姓名</td>
							<td>职务</td>
						</tr>
						<tr v-for="item in list">
							<td>
								<div><input type="radio" id="{{item.id}}" value="{{item.id}}" v-model="teacher"></div>
							</td>
							<td>{{item.name}}</td>
							<td>班主任</td>
						</tr>
					</table>
					<p v-if="list.length == 0">没有可以分配的老师</p>	
		  		</div>
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<button @click.stop="allocate($event)" class="btn btn-primary">保存</button>
		  			<button @click.stop="hideAllocate()" class="btn btn-default">取消</button>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import allocateStudentMixins from './allocateStudentMixins';
	export default {
		mixins: [allocateStudentMixins]
	}
</script>
<style lang="sass">
.allocate-form {
	.modal-body {
		padding: 40px;
		text-align: center;
		p {
			text-align: left;
			margin-bottom: 14px;
		}
		> div {
			background: #fff;
			max-height: 450px;
			overflow: auto;
			table {
				width: 100%;
				tr {
					border: 1px solid #eee;
					td {
						padding: 5px 5px;
						border-right: 1px solid #eee;
					}
					&:first-child {
						background: #f6f7f9;
					}
				}
			}
			p {
				text-align: center;
				padding: 10px 0;
			}
		}
	}
}
</style>