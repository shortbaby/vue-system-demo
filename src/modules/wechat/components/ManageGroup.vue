

<template>
	<div class="manage-group-modal">
		<modal :show.sync="show" :width="600">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title">分组管理</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hide()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
		  		<div>
		  			<label>新建分组</label>
		  			<input text="text" v-model="name" placeholder="请输入组名称,不超过20个字">
		  			<span class="btn btn-primary" @click="add()">添加分组</span>
		  		</div>
				<div class="list">
					<h3>分组列表</h3>
					<table>
						<tr>
							<td>组名称</td>
							<td>操作</td>
						</tr>
						<tr v-for="item in list" track-by="$index">
							<td>
								<input type="text" v-model="item.name" v-if="item.modify == true">
								<span v-if="item.modify == false"> {{item.name}}</span>
							<td>
								<span class="icon-edit" @click="modify(item)" v-if="item.modify == false"></span>
								<span class="btn btn-primary small" @click="ok(item)" v-if="item.modify == true">确定</span>
								<span class="icon-trash" @click="del(item)"></span>
							</td>
						</tr>
					</table>
					<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
				</div>
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<span @click.stop="hide()" class="btn btn-primary">关闭</span>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import manageGroupMixins from './manageGroupMixins';
	export default {
		mixins: [manageGroupMixins]
	}
</script>
<style lang="sass">
.manage-group-modal {
	.modal-body {
		> div {
			background: #fff;
			&:first-child {
				padding: 20px 10px 20px 10px;
				input {
					width: 300px;
					margin: 0 10px;
					padding: 4px 5px;
				}
			}
		}
	}
	.list {
		border-top: 1px solid #66ccff;
		background: #fff;
		padding: 10px;
		h3 {
			font-size: 16px;
			font-weight: 400;
		}
		table {
			width: 100%;
			margin-top: 10px;
			tr {
				border: 1px solid #ccc;
				td {
					border-right: 1px solid #ccc;
					text-align: center;
					padding: 3px 0;
					input {
						width: 220px;

					}
					.icon-edit {
						cursor: pointer;
						font-size: 24px;
						vertical-align: top;
					}
					.icon-trash {
						cursor: pointer;
						background: #fff;
						color: #000;
						font-size: 20px;
						vertical-align: baseline;
					}
					.small {
						padding: 2px 5px;
					}
				}
			}
		}
	}
	
}
</style>