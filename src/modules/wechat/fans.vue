<!--
	@file 微信粉丝
-->
<template>
	<div class="wechat-fans list-wrapper">
		<div class="search-wrap">
			<!-- <div class="input-control spec user-select-none">
				<label>类型</label>
				<input type="radio" name="type" id="type-0" value="-1" v-model="fansType"><label for="type-0">不限</label>
				<input type="radio" name="type" id="type-1" value="0" v-model="fansType"><label for="type-1">学员</label>
				<input type="radio" name="type" id="type-2" value="1" v-model="fansType"><label for="type-2">家长</label>
				<input type="radio" name="type" id="type-3" value="2" v-model="fansType"><label for="type-3">普通粉丝</label>
			</div> -->
			<div class="input-control long">
				<label>校区</label>
				<v-select :options="schoolOptions" :close-on-select="true" :value.sync="schoolId | str"></v-select>
			</div>
			<!-- <div class="input-control long">
				<label>班级</label>
				<inference-input placeholder="请输入班级" :query.sync="classesName" :request="queryClassesByName" :limit="10" :on-hit="hitClassesName" :template="nameTemplate"></inference-input>
			</div> -->
			<!-- <div class="input-control long">
				<label>姓名</label>
				<input type="text" placeholder="请输入姓名" v-model="name" class="form-control">
			</div> -->
			<div class="input-control long">
				<label>分组</label>
				<inference-input placeholder="请输入分组名称" :query.sync="groupName" :request="queryGroupByName" :limit="10" :on-hit="hitGroupName" :template="nameTemplate"></inference-input>
			</div>
		</div>
		<div class="option">
			<h3><span class="icon-wechat"></span><span>{{pageDto.count}}</span>条记录</h3>
			<div class="center-search">
				<span class="btn btn-primary search" @click="search()">查询</span>
				<span class="btn btn-blue-light reset" @click="reset()">重置</span>
			</div>
			<div class="opration">
				<span class="btn btn-primary" @click="manageGroup()">分组管理</span>
				<span class="btn btn-primary" @click="editGroup()">粉丝分组</span>
			</div>
		</div>
		<table class="table table-striped">
			<tr>
				<td><input type="checkbox" v-model="allCheck" @click="selectAll($event)" class="all-check"></td>
				<td>微信头像/微信昵称</td>
				<td>学员/家长姓名</td>
				<td>身份</td>
				<td>关注时间</td>
				<td>分组</td>
				<td>地区</td>
			</tr>
			<tr v-for="item in list">
				<td><input type="checkbox" value="{{item.id}}" v-model="selectIds" @click.stop="selectItem($event, item)" class="td-check"></td>
				<!-- <td><div class="avatar"><img :src="item.headImgUrl"></div> <div>{{item.nickName}}</div></td> -->
				<td><img class="avatar" :src="item.headImgUrl"> <span>{{item.nickName}}</span></td>
				<td>{{item.name}}</td>
				<td v-if="item.fansType == 0">学员</td>
				<td v-if="item.fansType == 1">家长</td>
				<td v-if="item.fansType == 2">未认证</td>
				<td>{{item.focusTime | date 'yyyy-MM-dd'}}</td>
				<td>{{item.groupName}}</td>
				<td>{{item.area}}</td>
			</tr>
		</table>
		<loading :show="!loading"></loading>
		<allot-group :show.sync="showAllot" :list="selectFans"></allot-group>
		<manage-group :show.sync="showGroup"></manage-group>
		<div class="none-list" v-if="noRes">
			<span v-if="key">没有搜索到粉丝</span>
			<span v-if="!key">没有粉丝</span>
		</div>
		<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
	</div>
</template>

<script>
import Pager from '../../common/components/Pager.vue';
import Loading from '../../common/components/Loading.vue';
import Select from '../../../dep/vue-strap/src/Select.vue';
import ManageGroup from './components/ManageGroup.vue';
import AllotGroup from './components/allotGroup.vue';
import InferenceInput from '../../common/components/InferenceInput.vue';
import {schoolList, getClassesByName, fansList, queryFuzzyName} from './request';

export default {
	created () {
		this.getOptions();
		this.getListHandler();
	},
	data () {
		return {
        	list: null,
        	pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 20
        	},
        	fansType: -1,
        	schoolOptions: [],
        	schoolId: -1,
        	name: '',
        	// classesName: '',
        	// clazz: null,
        	groupId: -1,
        	groupName: '',
        	queryGroupByName: function() {
        		let param = {
					query: this.query
				}
				return queryFuzzyName(param)
        	},
        	hitGroupName: function(res) {
        		this.$parent.groupName = res.name;
        		this.$parent.groupId = res.id;
        	},
			nameTemplate: `<span v-html="item.name"></span>`,
			showGroup: false,
			allCheck: false,
			selectIds: [],
			selectFans: [],
			showAllot: false
        }
	},
	computed: {

		loading() {
			return !!this.list;
		},
		gridRender() {
			return this.list && this.list.length;
		},
		noRes() {
			return this.list && !this.list.length
		}
	},
	watch: {
		selectIds(val) {
			let tdChecks = $('.td-check');
			let checkedBoxes = $(".td-check:checked");
			if (checkedBoxes.length == tdChecks.length) {
				this.allCheck = true;
			} else {
				this.allCheck = false;
			}
		}
	},
	events: {
		select(item, selected) {
			var self = this;
			if (selected) {
				if (self.selectIds.indexOf(item.id.toString()) < 0) {
					self.selectIds.push(item.id.toString());
					self.selectFans.push(item);
				}	
			} else {
				let index = self.selectIds.indexOf(item.id.toString());
				if (index > -1) {
					self.selectIds.splice(index, 1);
					self.selectFans.splice(index, 1);
				}
			}
		},
		success() {
			this.refresh();
		}
	},
	methods: {
		selectItem(event, item) {
			let target = $(event.target);
			let self = this;
			let check = target.prop('checked');
			self.$emit('select', item, check);
		},
		selectAll(event) {
			
			let target = $(event.target);
			let self = this;
			let check = target.prop('checked');
			self.list.forEach((item) => {
				self.$emit('select', item, check);
			})
		},
		pageChange: function () {
			//console.log('pageChange');
			this.getListHandler();
		},
		getListHandler () {
			var self = this;
			var params = {
				pageNum: this.pageDto.pageNum,
				pageSize: this.pageDto.pageSize
			};

			if (this.schoolId != -1) {
				$.extend(params, {
					schoolId: this.schoolId
				});
			}
			// if (this.clazz) {
			// 	$.extend(params, {
			// 		classesId: this.clazz.id
			// 	});
			// }
			// if (this.fansType != -1) {
			// 	$.extend(params, {
			// 		fansType: this.fansType
			// 	});
			// }
			if (this.groupName.length == 0) {
				this.groupId = -1;
			}
			if (this.groupId != -1) {
				$.extend(params, {
					groupId: this.groupId
				});
			}
			// if (this.name) {
			// 	$.extend(params, {
			// 		name: this.name
			// 	});
			// }
			// if (this.groupName.length > 0) {
			// 	$.extend(params, {
			// 		groupName: this.groupName
			// 	});
			// }

			fansList(params)
				.then(function (res) {
					var data = res.data;
					self.list =  data.list;
					self.pageDto = res.pageDto;
				}, function () {
					self.list = [];
				});
		},
		getOptions() {
			let self = this;
			$.when(schoolList())
				.then(function(res) {
					let schoolList = res.data;
					// signerList.forEach(function(item) {
					// 	item.value = item.id.toString();
					// 	item.label = item.name;
					// });
					schoolList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					// self.selectSignerOptions = signerList;
					// self.selectSignerOptions.splice(0, 0, options.blankItem);
					self.schoolOptions = schoolList;
					self.schoolOptions.splice(0, 0, {value: '-1', label: '请选择'});
				})
		},
		editGroup() {
			if (this.selectIds.length == 0 ) {
				dispatch('TOAST', '请先勾选粉丝');
				return;
			}
			this.showAllot = true;
		},
		manageGroup() {
			this.showGroup = true;
		},
		refresh () {
			//this.pageDto.pageNum = 1;
			this.getListHandler();
		},
		search () {
			this.refresh();
		},
		reset () {
			this.fansType =  -1;
        	this.schoolId = -1;
        	this.name = '';
        	this.classesName = '';
        	this.clazz = null;
        	this.groupId = -1;
        	this.groupName = '';
		}
	},
	components: {
		Pager: Pager,
		Loading: Loading,
		vSelect: Select,
		ManageGroup: ManageGroup,
		InferenceInput: InferenceInput,
		AllotGroup: AllotGroup
	}
};
</script>
<style lang="sass">
.wechat-fans {
	.search-wrap {
		.input-control {
			> div {
				display: inline-block;
			}
			label {
				&:first-child {
					width: 60px;
				}
			}
		}
		.icon-search {
			position: relative;
			left: -30px;
			top: 2px;
		}
		> .spec {
			width: 400px;
			label {
				margin: 0 20px 0 5px;
				&:first-child {
					width: 60px;
    				text-align: right;
    				padding-right: 5px;
    				margin: 0;
				}
			}
		}
	}
	table {
		width: 100%;
		tr {
			td {
				.avatar {
					width: 50px;
					height: 50px;
				}
				.opration {
					background: #66ccff;
					color: #fff;
					padding: 5px 12px;
					cursor: pointer;
					border-radius: 5px;
				}
			}
		}
	}
}
</style>