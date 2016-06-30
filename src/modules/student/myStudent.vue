<!--
	@file 我的线索
-->
<template>
	<div class="students list-wrapper" v-show="!showDetail">
		<div class="search-wrap">
			<div class="input-control two">
				<v-select :options="searchFieldOptions" :close-on-select="true" :value.sync="searchField | str"></v-select>
				<input type="text" placeholder="请输入关键词搜索" v-model="key" class="form-control">
			</div>
			<div class="input-control long">
				<label>是否冻结</label>
				<v-select :options="accountStatusOptions" :close-on-select="true" :value.sync="accountStatus | str"></v-select>
			</div>
			<div class="input-control long">
				<label>班主任</label>
				<v-select :options="ownerOptions" :close-on-select="true" :value.sync="ownerId | str"></v-select>
			</div>
			<div class="input-control long inference">
				<label>班级</label>
				<inference-input placeholder="请输入班级名称" :query.sync="classesName" :request="getFuzzyByName" :limit="10" :on-hit="hitName" :template="nameTemplate"></inference-input>
			</div>
			<div class="input-control long">
				<label>校区</label>
				<v-select :options="schoolOptions" :close-on-select="true" :value.sync="orgSchoolId | str"></v-select>
			</div>
			<div class="input-control long">
				<label>查看范围</label>
				<v-select :options="studentBrowseTypeOptions" :close-on-select="true" :value.sync="browseType | str"></v-select>
			</div>
			<div class="input-control long radio-input">
				<label for="radio-1">今日待跟进</label>
				<input type="radio" v-model="hasClassToday" value="1" name="hasClassToday" id="radio-1">
				<label for="radio-2">全部学员</label>
				<input type="radio" v-model="hasClassToday" value="0" name="hasClassToday" id="radio-2">

			</div>
		</div>
		<div class="option">
			<h3><span class="icon-student"></span><span>{{pageDto.count}}</span>条记录</h3>
			<div class="center-search">
				<span class="btn btn-primary search" @click="search()">查询</span>
				<span class="btn btn-blue-light reset" @click="reset()">重置</span>
			</div>
			<div class="opration">
				<span class="btn btn-primary notice" @click="notice()">发通知</span>
				<span class="btn btn-primary add" @click="showBatchImport()">导入学员</span>
				<dropdown>
                    <span data-toggle="dropdown" class="btn btn-primary"><span class="icon-down"></span></span>
                    <ul solt="dropdown-menu" class="dropdown-menu add-student-menu">
                        <li @click="batchOutput()"><span>导入学员</span></li>
                    </ul>
                </dropdown>
				<span class="btn-set" @click="setHeader"><span class="icon-cog" title="设置">&nbsp;</span></span>
			</div>
		</div>

		<set-header v-if="setHeaderState" :type="1"></set-header>
		<grid v-if="gridRender"  @sort="sort" :fixed-column-count="3" :data.sync="studentList" @row-click="rowClick">
			<grid-column type="selection" width="50" property="process">
				<input type="checkbox"/>
	        </grid-column>
			<grid-column v-if="!item.hidden" :sortable="item.sort" v-for="item in header" :property="item.name" :field="item.queryProp" :label="item.showName" :type="item.type" :min-width="item.minWidth"></grid-column>

			<grid-column label="操作" :sortable="0" width="160" property="process">
				<span v-cell-process v-bind:option="[{text:'签到', command:'sign'}, {text:'发通知', command:'notice'}, {text:'退费', command:'refund'}, {text:'收费', command:'charge'}]" class="process-cell" data-id="{{ row['id'] }}" data-name="{{row['name']}}">操作<span class="icon-down"></span></span>
	        </grid-column>
		</grid>
		<import v-if="batchImportState" :show.sync="batchImportState"></import>
		<notice :list="selectStudents" :show.sync="sendMsg" :id="selectId" :type="messageType"></notice>
		<new-student v-if="addStudentState"  :show.sync="addStudentState"></new-student>
		<quit-class v-if="isQuit" :type.sync="type" :show.sync = "isQuit" :id.sync ="selectId"></quit-class>
		<loading :show="!loading"></loading>
		<div class="none-list" v-if="noRes">
			<span v-if="key">没有搜索到学生档案</span>
			<span v-if="!key">没有学生档案记录</span>
		</div>
		<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
	</div>
</template>

<script>
import Pager from '../../common/components/Pager.vue';
import Grid from '../../common/components/grid/index.vue';
import GridColumn from '../../common/components/grid/GridColumn.vue';
import SetHeader from '../../common/components/SetHeader.vue';
import InferenceInput from '../../common/components/InferenceInput.vue';
import Loading from '../../common/components/Loading.vue';
import Select from '../../../dep/vue-strap/src/Select.vue';
import Dropdown from '../../../dep/vue-strap/src/Dropdown.vue';
import Import from './components/Import.vue';
import NewStudent from './components/NewStudent.vue';
import QuitClass from './components/QuitClass.vue';
import Notice from './components/Notice.vue';
import { getMyStudentList, batchDel, getSchoolList, exportStudent, getOwnerList, getFuzzyClasses} from './request';
import getSelectOptions from '../../common/function/getSelectOptions';

let options = getSelectOptions();
export default {
	created () {
		this.getStudentListHandler();
		this.getOptions();
		this.$dispatch('showmystudent');
	},
	data () {
		return {
        	header: [],
        	studentList: null,
        	selectId: 0,
        	pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 20
        	},
        	orderType: '',
        	orderName: '',
        	name: '',
        	classesName: '',
        	clazz: null,
        	getFuzzyByName: function() {
				let param = {
					search: this.query
				}
				return getFuzzyClasses(param);
			},
			hitName: function(res) {
				this.$parent.clazz = res;
			},
			nameTemplate: `<span v-html="item.name"></span>`,
			searchFieldOptions: options.searchFieldOptions,
			searchField: "name",
			key: '',
			schoolOptions: [],
			orgSchoolId: -1,
			ownerOptions: [],
			ownerId: -1,
			accountStatusOptions: options.accountStatusOptions,
			accountStatus: -1,
			studentBrowseTypeOptions: options.studentBrowseTypeOptions,
			browseType: -1,
			hasClassToday: 0,
			classId: null,
			showDetail: false,
			isQuit: false,
			type: 'quit',
			sendMsg: false,
			messageType: 'multiple',
			selectStudents: []
        }
	},
	computed: {
		loading() {
			return !!this.studentList;
		},
		gridRender() {
			return this.studentList && this.studentList.length;
		},
		noRes() {
			return this.studentList && !this.studentList.length
		}
	},
	vuex: {
		getters:　{
			setHeaderState: state => state.student.setHeaderState,
			batchImportState: state => state.student.batchImportState,
			addStudentState: state=>state.student.addStudentState
		},
		actions: {
			setHeader ({ dispatch }) {
				dispatch('SET_HEADER');
			},
			showNewStudent({dispatch}) {
				dispatch('SHOW_NEW_STUDENT');
			},
			showBatchImport({dispatch}) {
				dispatch('BATCH_IMPORT');
			},
			hideNewStudent({dispatch}) {
				dispatch('HIDE_NEW_STUDENT');
			}
		}
	},
	events: {
		sign(id, name) {
			window.router.go({
				path: '/educational/sign'
			});
		},
		notice(id, name) {
			this.messageType = 'single';
			this.selectId = id;
			this.sendMsg = true;
		},
		refund(id, name) {
			window.router.go({
				path: '/financial/refund'
			});
		},
		quit(id, name) {
			this.selectId = id;
			this.type = 'quit';
			this.isQuit = true;
		},
		charge(id, name) {
			let path = '/financial/add/' + id;
			window.router.go({
				path: path
			});
		},
		select(event, row) {
			var self = this;
			if (row.$selected) {
				self.addStudentToSelects(row.id);
			} else {
				self.removeStudentFromSelects(row.id);

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
			this.$parent.$emit('showmystudent');
		},
		hidedetail() {
			this.showDetail = false;
		},
		showdetail(row) {
			this.showDetail = true;
			this.$parent.$emit('showdetail', row.id, 'myStudent');
		}
	},
	methods: {
		getOptions() {
			let self = this;
			$.when(getSchoolList(), getOwnerList({ type: 0 }))
				.then(function(res, res1) {
					let schoolList = res.data.list;
					let ownerList = res1.data.list;
					schoolList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					ownerList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					self.schoolOptions = schoolList;
					self.ownerOptions = ownerList;
					self.schoolOptions.splice(0, 0, options.blankItem);
					self.ownerOptions.splice(0, 0, options.blankItem);
				});
		},
		getStudent(id) {
			let student = null;
			this.studentList.forEach(function(item) {
				if(item.id == id) {
					student = item;
				}
			});
			return student;
		},
		addStudentToSelects(id) {
			let student = this.getStudent(id);
			this.selectStudents.push(student);
		},
		removeStudentFromSelects(id) {
			let index = -1;
			this.selectStudents.forEach(function(item, i) {
				if (item.id == id) {
					index = i;
				}
			});
			if (index > -1) {
				this.selectStudents.splice(index, 1);
			}
		},
		notice() {
			if (this.selectStudents.length === 0) {
				dispatch('TOAST', '请先选择学生');
				return;
			} else {
				this.messageType = 'multiple';
				this.sendMsg = true;
			}
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
			this.getStudentListHandler();
		},
		getStudentListHandler () {
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
			if (this.orgSchoolId != -1) {
				$.extend(params, {
					orgSchoolId: this.orgSchoolId
				});
			}
			if (this.accountStatus	!= -1) {
				$.extend(params, {
					accountStatus: this.accountStatus
				});
			}
			if (this.browseType != -1) {
				$.extend(params, {
					browseType: this.browseType
				});
			}
			if (this.hasClassToday != 0) {
				$.extend(params, {
					hasClassToday: this.hasClassToday
				});
			}
			if (this.classesName.length == 0) {
				this.clazz = null;
			}
			if (this.clazz != null) {
				$.extend(params, {
					classId: this.clazz.id
				});
			}
			if (this.ownerId != -1) {
				$.extend(params, {
					ownerId: this.ownerId
				})
			}
			getMyStudentList(params)
				.then(function (res) {
					var data = res.data;

					data.header.forEach(function (item) {
						if (item.name == 'nextRemindTime') {
							item.minWidth = "150";
						}
						if (item.name == 'mobile' || item.name == 'parentMobile' ) {
							item.minWidth = "120";
						}
					});

					if (JSON.stringify(self.header) != JSON.stringify(data.header)) {
						self.header = data.header;
					}
					self.studentList =  data.result;
					self.pageDto = res.pageDto;
				}, function () {
					self.studentList = [];
				});
		},
		refresh () {
			this.pageDto.pageNum = 1;
			this.getStudentListHandler();
		},
		search () {
			this.refresh();
		},
		batchOutput() {
			if (this.selectStudents.length === 0) {
				dispatch('TOAST', '请先选择需要导出的学员');
				return;
			}
			let params = [];
			this.selectStudents.forEach(function(item) {
				params.push(item.id)
			})
			exportStudent(params);
		},
		reset () {
			this.ownerId = -1;
			this.key = '';
			this.classesName = '';
			this.clazz = null;
			this.searchField = 'name';
			this.orgSchoolId = -1;
			this.accountStatus =  -1;
			this.browseType =  -1;
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
		NewStudent: NewStudent,
		QuitClass: QuitClass,
		Notice: Notice,
		InferenceInput: InferenceInput

	}
};
</script>
<style lang="sass">
.inference {
	> div {
		display: inline-block;
	}
}
</style>