<template>
	<div class="roles-wrap list-wrapper">
		<div class="search-wrap">
			<div class="input-control">
				<!-- <inference-input placeholder="请输入职位名称查询" :query.sync="key"  :request="getFuzzyByName" :limit="10" :on-hit="hitName" :template="nameTemplate"></inference-input> -->
				<input type="text" placeholder="请输入职位名称查询" v-model="key" class="form-control">
			</div>
			<span class="btn btn-primary search" @click="search()">查询</span>
			<span class="btn btn-blue-light reset" @click="reset()">重置</span>
			<span class="btn btn-primary add" @click="add()">新增职位</span>
		</div>
		<div class="option">
			<h3><span class="icon-dangan"></span><span>{{pageDto.count}}</span>个职位</h3>
		</div>
		<table class="table table-striped">
			<tr>
				<td>职位名称</td>
				<td>职位用户数量</td>
				<td>添加人</td>
				<td>操作</td>
			</tr>
			<tr v-for="item in list">
				<td>{{item.name}}</td>
				<td>{{item.members}}</td>
				<td>{{item.creatorName}}</td>
				<td>
					<span v-if="item.type != 4" class="opration" @click.stop="edit(item)">编辑</span>
					<span v-if="item.type != 4 && item.creatorId != -1" @click.stop="del(item)" class="del">删除</span>
				</td>
			</tr>
		</table>

		<!-- <loading :show="!loading"></loading> -->
		<job :id="jobId" :show.sync="showJob" v-if="showJob"></job>
		<div class="none-list" v-if="noRes">
			<span v-if="key">没有搜索到职位</span>
			<span v-if="!key">没有职位</span>
		</div>
		<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
	</div>
</template>
<script>
	import indexMixins from './indexMixins';
	export default {
		mixins: [indexMixins]
	}
</script>
<style lang="sass">
.roles-wrap {
	background: #fff;
	padding: 0 10px 10px 10px;
	> table {
		width: 100%;
		tr {
			td {
				span {
					border-radius: 5px;
				}
				.opration {
					background: #66ccff;
					color: #fff;
					padding: 5px 12px;
					cursor: pointer;
				}
				.del {
				    background: #ff9900;
				    color: #fff;
				    padding: 5px 12px;
				    cursor: pointer;
				}
			}
		}
	}
	.search-wrap {
		.input-control {
			width: auto;
		}
		.add {
			margin-left: 20px;
		}
	}
}
</style>