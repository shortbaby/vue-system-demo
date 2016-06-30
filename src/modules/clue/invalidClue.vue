<!--
	@file 无效线索
-->
<template>
	<div class="clues list-wrapper" v-show="!showDetail">
		<div class="search-wrap">
			<div class="input-control two">
				<v-select :options="searchFieldOptions" :close-on-select="true" :value.sync="searchField"></v-select>
				<input type="text" placeholder="请输入关键词搜索" v-model="key" class="form-control">
			</div>
			<div class="input-control long">
				<label>校区</label>
				<v-select :options="schoolOptions" :close-on-select="true" :value.sync="school | str"></v-select>
			</div>
		</div>
		<div class="option">
			<h3><span class="icon-clue"></span><span>{{pageDto.count}}</span>条线索</h3>
			<div class="center-search">
				<span class="btn btn-primary search" @click="search()">查询</span>
				<span class="btn btn-blue-light reset" @click="reset()">重置</span>
			</div>
			<div class="opration">
				<span class="btn btn-primary" @click="batchValidClue($event)">批量激活无效线索</span>
				<span class="btn-set" @click="setHeader"><span class="icon icon-cog" title="设置">&nbsp;</span></span>
			</div>
		</div>

		<set-header v-if="setHeaderState" :type="2"></set-header>
		<grid v-ref:grid v-if="gridRender"  @sort="sort" :fixed-column-count="3" :data.sync="clueList" @row-click="rowClick">
			<grid-column type="selection" width="50" property="process">
				<input type="checkbox" data-id="{{ row['id'] }}"/>
	        </grid-column>
			<grid-column v-if="!item.hidden" :sortable="item.sort" v-for="item in header" :property="item.name" :field="item.queryProp" :label="item.showName" :type="item.type" :min-width="item.minWidth"></grid-column>

			<grid-column label="操作" :sortable="0" width="160" property="process">
				<span class="process-cell" data-id="{{ row['id'] }}">激活</span>
	        </grid-column>
		</grid>

		<loading :show="!loading"></loading>
		<div class="none-list" v-if="noRes">
			<span v-if="key">没有搜索到招生线索</span>
			<span v-if="!key">没有招生线索</span>
		</div>
		<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
	</div>
</template>

<script>
import Pager from '../../common/components/Pager.vue';
import Grid from '../../common/components/grid/index.vue';
import GridColumn from '../../common/components/grid/GridColumn.vue';
import SetHeader from '../../common/components/SetHeader.vue';
import Loading from '../../common/components/Loading.vue';
import Select from '../../../dep/vue-strap/src/Select.vue';
import Dropdown from '../../../dep/vue-strap/src/Dropdown.vue';
import config from './config';
import { getInvalidList, getSchoolList, batchDel, activeClue } from './request';
import getSelectOptions from '../../common/function/getSelectOptions';
let options = getSelectOptions();
export default {
	created () {
		this.getClueListHandler();
		this.getOptions();
		this.$dispatch('showcommonclue');
	},
	data () {
		return {
			pageNo: 1,
        	pageSize: 10,
        	count: 100,
        	header: [],
        	clueList: null,
        	detailId: 0,
        	modifyId: 0,
        	pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 20
        	},
        	orderType: '',
        	orderName: '',
        	name: '',
			searchFieldOptions: getSelectOptions().searchFieldOptions,
			searchField: "name",
			key: '',
			schoolOptions: [],
			school: -1,
			selectClueIds: [],
			showDetail: false,
			tab: config.invalid
        }
	},
	computed: {
		loading() {
			return !!this.clueList;
		},
		gridRender() {
			return this.clueList && this.clueList.length;
		},
		noRes() {
			return this.clueList && !this.clueList.length
		}
	},
	vuex: {
		getters:　{
			setHeaderState: state => state.clue.setHeaderState
		},
		actions: {
			setHeader ({ dispatch }) {
				dispatch('SET_HEADER');
			}
		}
	},
	events: {
		edit(id, name) {
			console.log(id);
			console.log(name);
		},
		select(event, row) {
			var self = this;
			if (row.$selected) {
				self.selectClueIds.push(row.id);
			} else {
				var l = self.selectClueIds.length;
				for (var i = 0; i < l; i++) {
					if (row.id == self.selectClueIds[i]) {
						self.selectClueIds.splice(i, 1);
						break;
					}
				};
			}
		},
		selectAll(event, data) {
			var l = data.length;
			var self = this;
			for (var i = 0; i < l; i++) {
				self.$emit('select', event, data[i]);
			};
		},
		roothidedetail() {
			//debugger;
			this.$parent.$emit('showinvalidclue');
		},
		hidedetail() {
			this.showDetail = false;
		},
		showdetail(row) {
			this.showDetail = true;
			this.$parent.$emit('showdetail', row.id, 'invalidClue');
		}

	},
	methods: {
		getOptions() {
			let self = this;
			$.when(getSchoolList())
				.then(function(res) {
					let schoolList = res.data.list;
					schoolList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					self.schoolOptions = schoolList;
					self.schoolOptions.splice(0, 0, options.blankItem);

				});
		},
		rowClick (event, row, grid) {
			var target = $(event.target);
			var offset = target.offset();
			var self = this;
			if (target.find('input').length || target.is('input') || target.find('.process-cell').length) {
				return;
			}
			if (target.hasClass('process-cell')) {
				self.active(target.attr('data-id'));
			} else {
				grid.selected = row;
      			self.$emit('showdetail', row);
			}
		},
		sort (column) {
			if (column) {
				this.orderType = column.direction == 'ascending' ? 0 : 1;
				this.orderName = column.field;
				this.refresh();
			} else {
				this.orderType = '';
				this.orderName = '';
			}
		},
		pageChange: function () {
			this.getClueListHandler();
		},
		getClueListHandler () {
			var self = this;

			var params = {
				pageNum: this.pageDto.pageNum,
				pageSize: this.pageDto.pageSize
			};

			if (this.key) {
				$.extend(params, {
					name: this.searchField.join(''),
					query: this.key
				});
			}

			if (this.orderName) {
				$.extend(params, {
					orderName: this.orderName,
					orderType: this.orderType
				});
			}
			if (this.school != -1) {
				$.extend(params, {
					orgSchoolId: this.school
				});
			}
			getInvalidList(params)
				.then(function (res) {
					var data = res.data;

					data.header.forEach(function (item) {
						if (item.name == 'nextRemindTime' || item.name == 'createTime') {
							item.minWidth = "150";
						}
						if (item.name == 'mobile' || item.name == 'parentMobile' ) {
							item.minWidth = "120";
						}
					});

					if (JSON.stringify(self.header) != JSON.stringify(data.header)) {
						self.header = data.header;
					}
					self.clueList =  data.result;
					self.clueList.forEach((item) => {
						if (item.deposite) {
							item.deposite = item.deposite / 100;
						}
					})
					self.pageDto = res.pageDto;
				}, function () {
					self.clueList = [];
				});
		},
		refresh () {
			this.pageDto.pageNum = 1;
			this.getClueListHandler();
		},
		search () {
			this.refresh();
		},
		reset () {
			this.searchField = "name";
			this.key = '';
			this.school =  -1;
		},
		active(id) {
			let self = this;
			activeClue({
				ids: id
			}).then(function(res) {
				if (res.code == 0) {
					dispatch('SHOW_ALERT', '线索激活成功,可在公共线索内查看', 'success');
					self.selectClueIds = [];
				}
				self.pageChange();
			});
		},
		batchValidClue(event) {
			var self = this;
			var target = $(event.target);
			if (self.selectClueIds.length === 0) {
				dispatch('SHOW_ALERT', '请勾选您需要激活的无效线索', 'warning');
				return;
			}
			target.prop('disable', true);
			activeClue({
				ids: this.selectClueIds.join(',')
			}).then(function(res) {
				if (res.code == 0) {
					dispatch('SHOW_ALERT', '线索激活成功,可在公共线索内查看', 'success');
					self.selectClueIds = [];
					self.$refs.grid.$set('allSelected', false);
				}
				self.pageChange();
			}).always(function() {
				target.prop('disable', false);
			})

		}
	},
	components: {
		Pager: Pager,
		Grid: Grid,
		GridColumn: GridColumn,
		Loading: Loading,
		vSelect: Select,
		SetHeader: SetHeader,
		Dropdown: Dropdown

	}
};
</script>

<style lang="sass">
</style>