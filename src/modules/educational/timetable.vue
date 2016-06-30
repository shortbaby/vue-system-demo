
<template>
	<div class="timetable-base">
		<div class="timetable-base-wrap">
			<time-table v-ref:timetable :show-schedule-class-info="showScheduleClassInfo" :query-prop.sync="queryProp"></time-table>
			<div class="selection-wrap">
				<!-- <p><span class="type type-1"></span> 中南校区</p>
				<p><span class="type type-2"></span> 武广校区</p> -->
				<!-- <h3>课表筛选</h3> -->
				<label>校区</label>
				<v-select :options="schoolOptions" :close-on-select="true" :value.sync="schoolId | str"></v-select>
				<label>课程类型</label>
				<v-select :options="subjectOptions" :close-on-select="true" :value.sync="subjectId | str"></v-select>
				<label>教室</label>
				<v-select :options="classroomOptions" :close-on-select="true" :value.sync="classroom | str"></v-select>
				<label>老师</label>
				<inference-input placeholder="请输入姓名" :query.sync="teacherName" :request="queryTeacherByName" :limit="10" :on-hit="hitTeacherName" :template="nameTemplate"></inference-input>
				<label>班级</label>
				<inference-input placeholder="请输入班级" :query.sync="classesName" :request="queryClassesByName" :limit="10" :on-hit="hitClassesName" :template="nameTemplate"></inference-input>
				<label>上课时间段</label>
				<div>
					<input type="text" v-model="startTime" class="small"> <span> -- </span><input type="text" v-model="endTime" class="small">
				</div>
				<span class="btn btn-primary" @click="search($event)">查询</span>
			</div>
		</div>
	</div>
</template>
<script>
import TimeTable from '../../common/components/TimeTable.vue';
import getSelectOptions from '../../common/function/getSelectOptions';
import InferenceInput from '../../common/components/InferenceInput.vue';
import Select from '../../../dep/vue-strap/src/Select.vue';
import {schoolList, subjectList, getTeacherByName, getClassesByName, getRoomsBySchoolId} from './request';
let options = getSelectOptions();
export default {
	created: function() {
		this.getOptions();
	},
	data() {
		return {
			showScheduleClassInfo: false,
			schoolOptions: [],
			schoolId: -1,
			subjectOptions: [],
			subjectId: -1,
			classroomOptions: [],
			classroom: -1,
			teacherName: '',
			classesName: '',
			teacher: null,
			clazz: null,
			queryProp: {},
			queryTeacherByName: function() {
				let param = {
					name: this.query
				}
				return getTeacherByName(param);
			},
			queryClassesByName: function() {
				let param = {
					query: this.query
				}
				return getClassesByName(param)
			},
			hitTeacherName: function(res) {
				this.$parent.teacher = res;
				// this.$parent.name = res.name;
				// this.$parent.id = res.id;
				// this.$parent.mobile = res.mobile;
				// this.$parent.parentName = res.parentName;
				// this.$parent.parentMobile = res.parentMobile;
			},
			hitClassesName: function(res) {
				this.$parent.clazz = res;
				// this.$parent.name = res.name;
				// this.$parent.id = res.id;
				// this.$parent.mobile = res.mobile;
				// this.$parent.parentName = res.parentName;
				// this.$parent.parentMobile = res.parentMobile;
			},
			nameTemplate: `<span v-html="item.name"></span>`,
			// searchFieldOptions: getSelectOptions().searchFieldOptions,
			// searchField: "name",
			startTime: null,
			endTime: null
		}
	},
	watch: {
		schoolId(val) {
			if(val == -1) {
				this.classroomOptions = [];
				this.classroom = -1;
			} else {
				this.getClassRoomOptions();
			}
		}
	},
	methods: {
		getOptions() {
			$.when(schoolList(), subjectList())
				.then((res1, res2) => {
					let schoolList = res1.data;
					let subjectList = res2.data;
					schoolList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = `<span style="display: inline-block; width: 30px; height: 20px;background: ${item.color}"></span><span style="position: relative; top: -5px; left: 5px;padding-right: 10px;">${item.name}</span>`
					});
					subjectList.forEach(function(item) {
						item.value = item.id.toString(); 
						item.label = item.name;
					});
					this.schoolOptions = schoolList;
					this.schoolOptions.splice(0, 0, options.blankItem);
					this.subjectOptions = subjectList;
					this.subjectOptions.splice(0, 0, options.blankItem);
				})
		},
		getClassRoomOptions() {
			getRoomsBySchoolId({
				"schoolId": this.schoolId
			})
				.then((res) => {
					if (res.code == 0) {
						let classroomList = res.data;
						classroomList.forEach((item) => {
							item.value = item.id.toString(); 
							item.label = item.name;
						})
						this.classroomOptions = classroomList;
						this.classroomOptions.splice(0, 0, options.blankItem);
					}
				})
		},
		search(event) {
			let target = $(event.target);
			if (this.schoolId == -1) {
				dispatch('TOAST', '请先选择校区');
				return;
			}
			let param = {
				schoolId: this.schoolId
			};
			if (this.subjectId != -1) {
				$.extend(param, {
					subjectId: this.subjectId
				});
			}
			if (this.teacher != null) {
				$.extend(param, {
					userId: this.teacher.id
				});
			}
			if (this.clazz != null) {
				$.extend(param, {
					classesId: this.clazz.id
				});
			}
			if (this.classroom != -1) {
				$.extend(param, {
					roomId: this.classroom
				});
			}
			if (this.startTime != '') {
				$.extend(param, {
					start: this.startTime
				});
			}
			if (this.endTime != '') {
				$.extend(param, {
					end: this.endTime
				});
			}
			this.$set('queryProp', param);
			this.$nextTick(()=> {
				this.$refs.timetable.$emit('refreshschedule');
			})
		}
	},
	components: {
        TimeTable: TimeTable,
        vSelect: Select,
        InferenceInput: InferenceInput
    }
};
</script>

<style lang="sass">
	.timetable-base {
		overflow: auto;
		.timetable-base-wrap {
			min-width: 1200px;
			position: relative;
			.selection-wrap {
				position: absolute;
				left: 1000px;
				top: 100px;
				width: 200px;
				> p {
					height: 30px;
					line-height: 30px;
				}
				> div {
					margin-top: 10px;
					> input[type="text"] {
						width: 175px;
						&.small {
							width: 80px;
						}
					}
				}
				h3 {
					margin-top: 10px;
					font-weight: 500;
				}
				> label {
					margin-bottom: 0px;
				}
				.type {
					display: inline-block;
					height: 15px;
					width: 80px;
					margin-right: 20px;
					position: relative;
					top: 3px;
				}
				.type-1 {
					background: #fea219;
				}
				.type-2 {
					background: #66ccff;
				}
				.btn-group {
					margin: 10px 0;
					&.open {
						.dropdown-toggle {
							box-shadow: none;
						}
					}
					.btn-default {
						background: #fff;
						&:hover {
							background: #fff;
							box-shadow: none;
						}
						&:active {
							background: #fff;
							box-shadow: none;
						}
					}
				}
				.btn-default {
					width: 180px;
				}
				.btn-primary {
					width: 100px;
					position: relative;
					left: 30px;
					top: 10px;
				}

			}
		}
	}
</style>