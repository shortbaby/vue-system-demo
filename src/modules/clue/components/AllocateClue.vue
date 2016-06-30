<!--
	@file tianxiao-virgo-frontend 新建线索
	@author xuguanlong
-->

<template>
	<div class="allocate-clue-form">
		<modal :show.sync="show" :width="800">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title">分配线索</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hideAllocateClue()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
		  		<p>选择线索需分配的咨询顾问</p>
		  		<div class="teacher-table">
		  			<table>
						<tr>
							<td width="13%"></td>
							<td>姓名</td>
							<!-- <td>职务</td> -->
						</tr>
						<tr v-for="item in list">
							<td>
								<div><input type="radio" id="{{item.id}}" value="{{item.id}}" v-model="teacher"></div>
							</td>
							<td>{{item.name}}</td>
							<!-- <td>咨询顾问</td> -->
						</tr>
					</table>
					<p v-if="list.length == 0">没有可以分配的老师</p>	
		  		</div>
		  		<!-- <pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager> -->
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<button @click.stop="allocateClue($event)" class="btn btn-primary">保存</button>
		  			<button @click.stop="hideAllocateClue()" class="btn btn-default">取消</button>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import allocateClueMixins from './allocateClueMixins';
	export default {
		mixins: [allocateClueMixins]
	}
</script>
<style lang="sass">
.allocate-clue-form {
	.modal-body {
		text-align: center;
		p {
			text-align: left;
		}
		> div {
			background: #fff;
			padding: 10px;
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