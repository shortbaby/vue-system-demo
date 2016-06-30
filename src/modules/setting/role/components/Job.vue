<!--
	@file tianxiao-virgo-frontend
	@author xuguanlong
-->

<template>
	<div class="role-form">
		<modal :show.sync="show" :width="680">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title" v-if="!id">新增职位</h4>
		    	<h4 class="modal-title" v-if="id">编辑职位</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hide()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body roles-body">
		  		<div>
		  			<span class="require">*</span>
		  			<label>职位名称</label>
		  			<input type="text" v-model="roleDetail.name" placeholder="请输入名称" class="normal">
		  		</div>
		  		<div>
		  			<span class="require">*</span>
		  			<label>角色</label><span>(决定该职位的用户所拥有的业务身份)</span>
		  		</div>
		  		<div class="role-list user-select-none">
		  			<input type="checkbox" v-model="roleDetail.types" value="0"  id="role-1">
		  			<label for="role-1">咨询顾问</label>
		  			<input type="checkbox" v-model="roleDetail.types" value="1" id="role-2">
		  			<label for="role-2">班主任</label>
		  			<input type="checkbox" v-model="roleDetail.types" value="2" id="role-3">
		  			<label for="role-3">教务</label>
		  			<input type="checkbox" v-model="roleDetail.types" value="3"  id="role-4">
		  			<label for="role-4">校长</label>
		  		</div>
		  		<div class="tree-list clearfix">
		  			<ul class="user-select-none">
		  				<li v-for="item in roleTree" id="li-{{item.id}}">
		  					<span class="icon-caret-down" v-if="item.children.length > 0" @click="expand(item.id)"></span>
		  					<input type="checkbox" name="{{item.name}}" id="{{item.name}}" value="{{item.id}}" @click="select($event,item)" v-model="roleDetail.permissions">
		  					<label for="{{item.name}}">{{item.display}}</label>
		  					<ul>
		  						<li v-for="t in item.children" id="li-{{t.id}}">
		  							<span class="icon-caret-down" v-if="t.children.length > 0" @click="expand(t.id)"></span>
		  							<input type="checkbox" name="{{t.name}}" id="{{t.name}}"   @click="select($event, t)" value="{{t.id}}" v-model="roleDetail.permissions">
		  							<label for="{{t.name}}">{{t.display}}</label>
		  							<ul>
				  						<li v-for="i in t.children" id="li-{{i.id}}">
				  							<span class="icon-caret-down" v-if="i.children.length > 0" @click="expand(i.id)"></span>
				  							<input type="checkbox" name="{{i.name}}" id="{{i.name}}"  @click="select($event, i)" value="{{i.id}}" v-model="roleDetail.permissions">
				  							<label for="{{i.name}}">{{i.display}}</label>
				  						</li>
				  					</ul>
		  						</li>
		  					</ul> 
		  				</li>
		  			</ul>
		  		</div>
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
	import jobMixins from './jobMixins';
	export default {
		mixins: [jobMixins]
	}
</script>
<style lang="sass">
.roles-body {
	>div {
		padding-bottom: 15px;
		> label {
			margin-right:20px;
			margin-left: 10px;
			+ span {
				color: #999;
			}
		}
		.normal {
			width: 200px;
			&.error {
				border: 1px solid #ff0000;
			}
		}
		.require {
			color: #ff0000;
		}
		&.role-list {
			text-align: center;
			border-bottom: 1px solid #fff;
			label {
				margin-right: 40px;
			}
		}
		&.tree-list {
			ul {
				font-size: 13px;
				margin-left: 40px;
				li {
					list-style: none;
					
					.icon-caret-down {
						font-size: 15px;
					}
				}
			}
			> ul {
				margin-top: 20px;
				> li {
					// display: inline-block;
					// float: left;
					// height: 670px;
					// width: 200px;
					ul {
						display: none;
					}		
				}
			}
		}
	}
}
</style>