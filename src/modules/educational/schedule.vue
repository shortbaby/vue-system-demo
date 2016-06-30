<template>
	<div>
		<div class="select-wrap">
			<div class="input-control">
				<label>班级</label>
				<v-select :options="classesOptions" :close-on-select="true" :value.sync="classesId | str"></v-select>
			</div>
			<div class="input-control">
				<label>科目</label>
				<v-select :options="subTypeOptions" :close-on-select="true" :value.sync="subType | str"></v-select>
			</div>
		</div>
		<div class="select-wrap teachers user-select-none">
			<label>可排课老师:</label>
			<div class="content">
				<span v-for="item in teacherList"  :class="{active: clazzObj.teacher.id == item.id}" @click="selectTeacher($event, item)">
					{{item.name}}
				</span>
			</div>
		</div>
		<div class="select-wrap classrooms user-select-none">
			<label>校区:</label>
			<div class="content">
				<span v-for="item in schoolOptions"  :class="{active: schoolId == item.id}" @click="selectSchool($event, item)">
					{{item.label}}
				</span>
			</div>
		</div>
		<div class="select-wrap schools user-select-none">
			<label>可排课教室:</label>
			<div class="content">
				<span v-for="item in roomList" :class="{active: clazzObj.classroom.id == item.id}" @click="selectRoom($event, item)">
					{{item.name}}
				</span>
			</div>
		</div>
		
		<div class="select-wrap duration user-select-none">
			<label>课程时长:</label>
			<div class="content">
				<span v-for="item in [30, 45, 60, 90, 105, 120, 150]"  @click="selectDuration($event, item)">
					{{item}}分钟
				</span>
			</div>
		</div>
	</div>
	<div>
		<time-table :clazz-obj.sync="clazzObj"></time-table>
	</div>
</template>
<script>
	import TimeTable from '../../common/components/TimeTable.vue';
	import Select from '../../../dep/vue-strap/src/Select.vue';
	import {schoolList, getSubjectList, getMyCourse, getSubTypeListByClassesId, getTeacherList, getRoomList, getClassesDetail} from './request';
	export default {
    	data() {
    		return {
    			classesId: -1,
    			subjectId: -1,
    			schoolId: -1,
    			subType: -1,
    			classesOptions: [],
    			subTypeOptions: [],
    			schoolOptions: [],
    			teacherList: [],
    			roomList: [],
    			time: null,
    			startTime: null,
    			endTime: null,
                clazzObj: {
                    teacher: {},
                    subType: {},
                    classroom: {},
                    duration: 0,
                    info: {},
                    classesDetails: []
                }
    		}
    	},
        watch: {
            classesId(val) {
                if (val == -1) {
                    return;
                } else {
                    this.getClassDetail();
                    this.$emit('refreshlist');
                    this.$emit('refreshSubTypeList');
                }
            },
            schoolId(val) {
                if (val == -1) {
                    return;
                } else {
                    this.$emit('refreshlist');
                }
            },
            subType(val) {
                let subType = {};
                for (let i = 0; i < this.subTypeOptions.length; i++) {
                    if (this.subTypeOptions[i].id == val) {
                       subType =  this.subTypeOptions[i];
                       break;
                    }
                };
                this.$set('clazzObj.subType', subType);
            }
        },
    	events: {
            refreshSubTypeList() {
                getSubTypeListByClassesId({
                    classesId: this.classesId
                })
                    .then((res) => {
                        let subTypeList = res.data;
                        subTypeList.forEach(function(item) {
                            item.value = item.id.toString(); 
                            item.label = item.name;
                        });
                        subTypeList.splice(0, 0, {label: '请选择', value: '-1'});
                        this.subTypeOptions = subTypeList,
                        this.subType = -1;
                    })
            },
    		refreshlist() {
    			let day = this.time.getDay();
    			if (day == 0) {
    				day = 7;
    			}
                let today = this.time.toFormattedString('yyyy-MM-dd') + ' 00:00:00';
                let d = new Date();
                d = d.fromFormattedString(today, 'yyyy-MM-dd HH:mm:ss');
    			this.startTime =  d.getTime() - (day - 1) * 24 * 60 * 60 * 1000;
    			this.endTime = d.getTime() + (7 - day) * 24 * 60 * 60 * 1000;
    			let param1 = {
    				classesId: this.classesId,
    				startTime: this.startTime,
    				endTime: this.endTime
    			}
    			let param2 = {
    				classesId: this.classesId,
    				schoolId: this.schoolId,
    				startTime: this.startTime,
    				endTime: this.endTime
    			}
    			$.when(getTeacherList(param1), getRoomList(param2))
    				.then((res1, res2) => {
    					this.teacherList = res1.data;
                        this.$set('clazzObj.teacher', {});
						this.roomList = res2.data;
                        this.$set('clazzObj.classroom', {});
    				})
    		},
    		previousweek() {
    			 this.time.setDate(this.time.getDate() - 7);
    			 this.$emit('refreshlist');
    		},
    		nextweek() {
    			this.time.setDate(this.time.getDate() + 7);
    			this.$emit('refreshlist');
    		}
    	},
    	route: {
    		data(transition) {
    			let classesId = transition.to.query.class;
    			let subjectId = transition.to.query.subject;
    			let schoolId = transition.to.query.school;
    			let param = {
    				classesId: classesId
    			};
    			let time = new Date();
    			let day = time.getDay();
    			if (day == 0) {
    				day = 7;
    			}
    			let startTime = time.getTime() - (day - 1) * 24 * 60 * 60 * 1000;
    			let endTime = time.getTime() + (7 - day) * 24 * 60 * 60 * 1000;
    			let param1 = {
    				classesId: classesId,
    				startTime: startTime,
    				endTime: endTime
    			}
    			let param2 = {
    				classesId: classesId,
    				schoolId: schoolId,
    				startTime: startTime,
    				endTime: endTime
    			}
    			return $.when(schoolList(), getSubTypeListByClassesId(param), getMyCourse(), getTeacherList(param1), getRoomList(param2))
    				.then((res1, res2, res3, res4, res5) => {
    					let schoolList = res1.data;
						let subTypeList = res2.data;
						let classList = res3.data;
						let teacherList = res4.data;
						let roomList = res5.data;
						schoolList.forEach(function(item) {
							item.value = item.id.toString();
							item.label = item.name;
						});
						subTypeList.forEach(function(item) {
							item.value = item.id.toString(); 
							item.label = item.name;
						});
						classList.forEach(function(item) {
							item.value = item.id.toString(); 
							item.label = item.name;
						});
						subTypeList.splice(0, 0, {label: '请选择', value: '-1'});
						classList.splice(0, 0, {label: '请选择', value: '-1'});
    					return {
    						classesId: classesId,
							subjectId: subjectId,
							schoolId: schoolId,
							schoolOptions: schoolList,
							subTypeOptions: subTypeList,
							classesOptions: classList,
							teacherList: teacherList,
							roomList: roomList,
							time: time,
							startTime: startTime,
							endTime: endTime
    					}
    				});
    		}
    	},
    	methods: {
            getClassDetail(){
                getClassesDetail({
                    "classesId": this.classesId
                })
                    .then((res) => {
                        if (res.code == 0) {
                            this.clazzObj = $.extend(this.clazzObj, res.data);
                        }
                    })
            },
    		selectTeacher(event, item) {
    			// this.teacher = item;
                this.$set('clazzObj.teacher', item);
    			let target = $(event.target);
    			target.parent().find('span').removeClass('active');
    			target.addClass('active');
    		},	
    		selectRoom(event, item) {
    			// this.room = item;
                this.$set('clazzObj.classroom', item);
    			let target = $(event.target);
    			target.parent().find('span').removeClass('active');
    			target.addClass('active');
    		},
    		selectDuration(event, item) {
    			this.$set('clazzObj.duration', item);
    			let target = $(event.target);
    			target.parent().find('span').removeClass('active');
    			target.addClass('active');
    		},
    		selectSchool(event, item) {
                this.schoolId = item.id;
    			this.$set('clazzObj.info.schoolId', item.id);
                this.$set('clazzObj.info.schoolName', item.name);
    			let target = $(event.target);
    			target.parent().find('span').removeClass('active');
    			target.addClass('active');
    		}
    	},
        components: {
            TimeTable: TimeTable,
            vSelect: Select
        }
    }
</script>
<style lang="sass">
.select-wrap {
	background: #fff;
	position: relative;
	&.teachers {
		padding-top: 10px;
	}
	> .input-control {
		display: inline-block;
		margin: 0px 10px 10px 10px;
		label {
			width: 40px;
		}
	}
	> label {
		position: absolute;
		left: 10px;
		width: 100px;
	}
	> .content {
		margin-left: 100px;
		min-height: 38px;
        line-height: 24px;
		span {
			background: #eee;
			color: #999;
			border-radius: 5px;
			padding: 5px 15px;
			margin-right: 10px;
			cursor: pointer;
            display: inline-block;
            margin-bottom: 10px;
			&.active {
				background: #66ccff;
				color: #fff;
			}
		}
	}
}
</style>