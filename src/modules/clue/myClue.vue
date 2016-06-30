<!--
	@file 我的线索
-->
<template>
	<div class="clues list-wrapper" v-show="!showDetail">
		<div class="search-wrap">
			<div class="input-control two">
				<v-select :options="searchFieldOptions" :close-on-select="true" :value.sync="searchField | str"></v-select>
				<input type="text" placeholder="请输入关键词搜索" v-model="key" class="form-control">
			</div>
			<div class="input-control long">
				<label>跟进状态</label>
				<v-select :options="consultStatusOptions" :close-on-select="true" :value.sync="consultStatus | str"></v-select>
			</div>
			<div class="input-control long">
				<label>校区</label>
				<v-select :options.sync="schoolOptions" :close-on-select="true" :value.sync="school | str"></v-select>
			</div>
			<div class="input-control long">
				<label>咨询顾问</label>
				<v-select :options.sync="adviserOptions" :close-on-select="true" :value.sync="adviser | str"></v-select>
			</div>
			<div class="input-control long">
				<label>线索来源</label>
				<v-select :options.sync="originOptions" :close-on-select="true" :value.sync="origin | str"></v-select>
			</div>
			<div class="input-control long">
				<label>阶段</label>
				<v-select :options.sync="studyPhaseOptions" :close-on-select="true" :value.sync="studyPhase | str"></v-select>
			</div>
			<div class="input-control long">
				<label>咨询课程</label>
				<v-select :options.sync="subjectOptions" :close-on-select="true" :value.sync="subjectId | str"></v-select>
			</div>
			<div class="input-control long">
				<label>可上课时间</label>
				<v-select :options.sync="availableTimeOptions" :close-on-select="true" :value.sync="availableTime | str"></v-select>
			</div>
			<div class="input-control long">
				<label>考试分数</label>
				<input type="text" v-model="score" class="form-control">
			</div>
			<div class="input-control long radio-input">
				<label for="radio-1">7天未跟进线索</label>
				<input type="radio" v-model="outOfSevenDay" value="1" name="outOfSevenDay" id="radio-1">
				<label for="radio-2">全部线索</label>
				<input type="radio" v-model="outOfSevenDay" value="0" name="outOfSevenDay" id="radio-2">

			</div>
		</div>
		<div class="option">
			<h3><span class="icon-clue"></span><span>{{pageDto.count}}</span>条线索</h3>
			<div class="center-search">
				<span class="btn btn-primary search" @click="search()">查询</span>
				<span class="btn btn-blue-light reset" @click="reset()">重置</span>
			</div>
			<div class="opration">
				<span class="btn btn-primary add" @click="add()">新建线索</span>
				<dropdown>
                    <span data-toggle="dropdown" class="btn btn-primary"><span class="icon-down"></span></span>
                   <!--官龙写的，暂时代替掉
                    <ul solt="dropdown-menu" class="dropdown-menu add-clue-menu"> -->
                   <ul solt="dropdown-menu" class="dropdown-menu add-clue-menu">
                        <li @click="showBatchImport()"><span>导入线索</span></li>
                        <li @click="showBatchOutput()"><span>导出线索</span></li>
                    </ul>
                </dropdown>
				<span class="btn-set" @click="setHeader"><span class="icon-cog" title="设置">&nbsp;</span></span>
			</div>
		</div>

		<set-header v-if="setHeaderState" :type="0"></set-header>
		<grid v-if="gridRender"  @sort="sort" :fixed-column-count="3" :data.sync="clueList" @row-click="rowClick">
			<grid-column type="selection" width="50" property="process">
				<input type="checkbox" data-id="{{ row['id'] }}"/>
	        </grid-column>
			<grid-column v-if="!item.hidden" :sortable="item.sort" v-for="item in header" :property="item.name" :field="item.queryProp" :label="item.showName" :type="item.type" :min-width="item.minWidth"></grid-column>
			<!-- <grid-column label="<span class='icon-cog' title='操作列'></span>" width="160" property="process" :sortable="0">
				<span v-cell-process v-bind:option="[{text:'报名', command:'edit'}, {text:'标记无效', command:'invalid'}, {text:'释放线索', command:'release'}]" class="process-cell" data-id="{{ row['id'] }}" data-name="{{ row['name'] }}">操作<span class="icon-down"></span></span>
	        </grid-column> -->

			<grid-column label="操作" :sortable="0" width="160" property="process">
				<span v-cell-process v-bind:option="[{text:'报名', command:'edit'}, {text:'标记无效', command:'invalid'}, {text:'释放线索', command:'release'}]" class="process-cell" data-id="{{ row['id'] }}" data-name="{{ row['name'] }}">操作<span class="icon-down"></span></span>
	        </grid-column>
		</grid>
		<import v-if="batchImportState" :show.sync="batchImportState"></import>
		<edit-clue v-if="showEditClue" :show.sync="showEditClue" :id="clueId" :name="clueName" :release="release" :valid="valid"></edit-clue>
		<loading :show="!loading"></loading>
		<div class="none-list" v-if="noRes">
			<span v-if="key">没有搜索到线索</span>
			<span v-if="!key">没有线索</span>
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
import Import from './components/Import.vue';
import EditClue from './components/EditClue.vue';
import config from './config';
import { getClueList, getSchoolList, getOriginList, getAdviserList, batchDel, getSubjectList, exportClue} from './request';
import getSelectOptions from '../../common/function/getSelectOptions';
let options = getSelectOptions();
export default {
	created () {
		this.getClueListHandler();
		this.getOptions();
		this.$dispatch('showmyclue');
	},
	data () {
		return {
        	header: [],
        	clueList: null,
        	pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 20
        	},
        	orderName: '',
        	orderType: '',
        	name: '',
        	showEditClue: false,
        	release: false,
        	valid: false,
        	clueName: '',
        	clueId: 0,
			searchFieldOptions: options.searchFieldOptions,
			searchField: "name",
			key: '',
			consultStatusOptions: options.consultStatusOptions,
			consultStatus: -1,
			originOptions: [],
			origin: -1,
			schoolOptions: [],
			school: -1,
			adviserOptions: [],
			adviser: -1,
			subjectOptions: [],
			subjectId: -1,
			studyPhaseOptions: options.studyPhaseOptions,
			studyPhase: -1,
			availableTimeOptions: options.availableTimeOptions,
			availableTime: -1,
			score: null,
			outOfSevenDay: 0,
			selectClueIds: [],
			showDetail: false,
			tab: config.my
        }
	},
	computed: {
		modifyId() {
			return this.$store.state.modifyId;
		},
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
			setHeaderState: state => state.clue.setHeaderState,
			batchImportState: state => state.clue.batchImportState
		},
		actions: {
			setHeader ({ dispatch }) {
				dispatch('SET_HEADER');
			},
			showNewClue({dispatch}) {
				dispatch('SHOW_NEW_CLUE');
			},
			showBatchImport({dispatch}) {
				dispatch('BATCH_IMPORT');
			}
		}
	},
	events: {
		edit(id, name) {
			window.router.go({
				path: '/financial/add/' + id
			});
		},
		release(id, name) {
			this.clueId = id;
			this.clueName = name;
			this.release = true;
			this.valid = false;
			this.showEditClue = true;
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
		invalid(id, name) {
			this.clueId = id;
			this.clueName = name;
			this.release = false;
			this.valid = true;
			this.showEditClue = true;
		},
		addcluesuccess() {

			this.refresh();
		},
		editsuccess() {
			this.pageChange();
		},
		roothidedetail() {
			//debugger;
			this.$parent.$emit('showmyclue');
		},
		hidedetail() {
			this.showDetail = false;
		},
		showdetail(row) {
			this.showDetail = true;
			this.$parent.$emit('showdetail', row.id, 'myClue');
		}
	},
	methods: {
		add () {
			this.$root.tab = this.tab;
			this.showNewClue();
		},
		rowClick (event, row, grid) {
			var target = $(event.target);
			var offset = target.offset();
			var self = this;
			var command = target.attr('command');
			if (target.hasClass('process-cell') || target.find('input').length || target.is('input') || target.find('.process-cell').length) {

			} else {
				grid.selected = row;
      			self.$emit('showdetail', row);
			}
		},
		sort (column) {
			debugger;
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
			console.log('pageChange');
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
					name: this.searchField,
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
			if (this.consultStatus != -1) {
				$.extend(params, {
					consultStatus: this.consultStatus
				});
			}
			if (this.origin != -1) {
				$.extend(params, {
					channelId: this.origin
				});
			}
			if (this.studyPhase != -1) {
				$.extend(params, {
					studyPhase: this.studyPhase
				});
			}
			if (this.subjectId != -1) {
				$.extend(params, {
					subjectId: this.subjectId
				});
			}
			if (this.adviser != -1) {
				$.extend(params, {
					adviserId: this.adviser
				});
			}
			if (this.outOfSevenDay == 1) {
				$.extend(params, {
					outOfSevenDay: this.outOfSevenDay
				});
			}
			if (this.availableTime != -1) {
				$.extend(params, {
					availableTime: this.availableTime
				});
			}
			if (this.score !== null) {
				$.extend(params, {
					score: this.score
				});
			}
			getClueList(params)
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
		getOptions() {
			let self = this;
			$.when(getSchoolList(), getOriginList(), getAdviserList(), getSubjectList())
				.then(function(res1, res2, res3, res4) {
					let schoolList = res1.data.list;
					let originList = res2.data.list;
					let adviserList = res3.data.list;
					let subjectList = res4.data.list;
					schoolList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					originList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					adviserList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					subjectList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					self.schoolOptions = schoolList;
					self.schoolOptions.splice(0, 0, options.blankItem);
					self.originOptions = originList;
					self.originOptions.splice(0, 0, options.blankItem);
					self.adviserOptions = adviserList;
					self.adviserOptions.splice(0, 0, options.blankItem);
					self.subjectOptions = subjectList;
					self.subjectOptions.splice(0, 0, options.blankItem);
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
			this.key = '';
			this.searchField = 'name';
			this.consultStatus = -1;
			this.origin = -1;
			this.school = -1;
			this.adviser = -1;
			this.subjectId = -1;
			this.studyPhase = -1;
			this.availableTime = -1;
			this.outOfSevenDay = 0;
			this.score = null;
		},
		showBatchOutput() {
			if (this.selectClueIds.length === 0) {
				dispatch('TOAST', '请先选择需要导出的线索');
				return;
			}
			config.getExportRequest(this.tab)(this.selectClueIds);
		}
	},
	components: {
		Pager: Pager,
		Grid: Grid,
		GridColumn: GridColumn,
		Loading: Loading,
		vSelect: Select,
		SetHeader: SetHeader,
		Dropdown: Dropdown,
		Import: Import,
		EditClue: EditClue

	}
};
</script>
<style lang="sass">
.clues {
	.search-wrap {
		.radio-input {
			label {
				width: 120px;
			}
		}
	}
}
</style>