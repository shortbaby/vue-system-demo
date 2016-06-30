<template>
	<div id="sign" class="list-wrapper">
		<div class="select-wrap">
			<div>
				<label>校区:</label>
				<v-select :options="schoolOptions" :close-on-select="true" :value.sync="schoolId | str"></v-select>
			</div>
			<div>
				<label>班级:</label>
				<inference-input placeholder="请输入班级名称" :query.sync="classesName" :request="queryClassesByName" :limit="10" :on-hit="hitClassesName" :template="nameTemplate"></inference-input>	
			</div>
			<div>
				<label>科目:</label>
				<v-select :options="subTypeOptions" :close-on-select="true" :value.sync="subTypeId | str"></v-select>
			</div>
			<div>
				<label>老师:</label>
				<inference-input placeholder="请输入老师姓名" :query.sync="teacherName" :request="queryTeacherByName" :limit="10" :on-hit="hitTeacherName" :template="nameTemplate"></inference-input>
			</div>
			<div>
				<label>教室:</label>
				<v-select :options="classroomOptions" :close-on-select="true" :value.sync="classroom | str"></v-select>
			</div>
			
			<inference-input placeholder="请输入学员姓名" :query.sync="name" :request="queryStudentByName" :limit="10" :on-hit="hitName" :template="nameTemplate"></inference-input>
			<!-- <input type="text" placeholder="请输入学员姓名" v-model="name"> -->
			<span class="btn btn-primary" @click="search($event)">查询</span>
		</div>
		<div class="wrap">
			<div class="content-wrap">
				<div class="left">
					<div class="time-head">
		                <span class="triangle-left"></span>
		                <span class="previous-week user-select-none" @click="previousWeek()">上一周</span>
		                <div class="time-select">
		                    <div class="date-week">
		                        <p class="p1">{{year}}年{{month}}月</p>  
		                        <p class="p2">{{weekStart}} ~ {{weekEnd}}</p>
		                    </div>
		                    <span class="icon-calendar user-select-none" @click="showCalendar($event)"></span>
		                    <calendar v-if="calendarShow" :show.sync="calendarShow" :value.sync="weektime" :x="calendarX" :y="calendarY" :range="calendarRange"></calendar>
		                </div>
		                
		                <span class="next-week user-select-none" @click="nextWeek()">下一周</span>
		                <span class="triangle-right"></span>
		            </div>
		            <div class="time-body">
		                <table class="week-table">
		                    <tr>
		                        <td v-for = "item in weekdays">
		                            <div>
		                                <p>{{item.day}}</p>
		                                <p>{{item.dateFormated}}</p>
		                            </div>
		                        </td>
		                    </tr>
		                </table>
		            </div>
		            <div class="clazz-wrap">
		            	<ul class="list">
		            		<li v-for="item in list" track-by="$index" @click="showSignDetail($event, item)">
		            			<p>
		            				<span>{{item.classesName}}({{item.classesNumber}})</span>
		            				<span>{{item.subTypeName}}第{{item.index}}节</span>
		            				<span>{{item.startTime | date 'MM-dd'}}</span>
		            				<span>{{item.section}}</span>
		            				<span>{{item.roomName}}</span>
		            				<span>{{item.teacherName}}</span>
		            				<span>{{item.checkinCount}}/{{item.signCount}}人签到</span>
		            				<span class="icon-eye"></span>
		            			</p>
		            		</li>
		            	</ul>
		            </div>
				</div>
				<div class="right">
					<div class="clazz-info">
						<p>{{selectClazz.classesName}}{{(selectClazz.classesNumber)}}</p>
						<P v-if="selectClazz.section"><span>{{selectClazz.startTime | date 'MM月dd日'}}</span><span>{{selectClazz.section}}</span></P>
						<p v-if="selectClazz.teacherName"><span><!-- 上课老师: --></span><span>{{selectClazz.teacherName}}</span></p>
						<p v-if="selectClazz.roomName"><span><!-- 上课教室: --></span><span>{{selectClazz.roomName}}</span></p>
						<v-select v-if="selectClazz.scheduleList && selectClazz.scheduleList.length > 0" :options="selectClazz.scheduleList" :close-on-select="true" :value.sync="selectClazz.id | str"></v-select>	
					</div>
					<div class="sign-content"> 
						<p>老师签到</p>
						<ul class="student-list">
							<li v-if="selectClazz.teacherDetail.name != null">
								<p>
									<span>{{selectClazz.teacherDetail.name}}</span>
									<span class="sign type" :class="{active: selectClazz.teacherDetail.status == 1}" @click="sign(selectClazz.teacherDetail, 0)">签到</span>
									<span class="leave type" :class="{active: selectClazz.teacherDetail.status == 2}" @click="sign(selectClazz.teacherDetail, 1)">请假</span>
									<span class="absence type" :class="{active: selectClazz.teacherDetail.status == 3}" @click="sign(selectClazz.teacherDetail, 2)">旷课</span>
								</p>
								<p class="check" v-if="selectClazz.teacherDetail.status != 0"><span class="icon-check"></span>{{selectClazz.teacherDetail.statusStr}}</p>
							</li>
						</ul>
					</div>
					<div class="sign-content">
						<p>学生签到</p>
						<ul class="student-list">
							<li v-for="item in selectClazz.checkinDetail" track-by="$index">
								<p>
									<span>{{item.name}}</span>
									<span class="sign type" :class="{active: item.status == 1}" @click="sign(item, 0)">签到</span>
									<span class="leave type" :class="{active: item.status == 2}" @click="sign(item, 1)">请假</span>
									<span class="absence type" :class="{active: item.status == 3}" @click="sign(item, 2)">旷课</span>
								</p>
								<p class="check" v-if="item.status != 0"><span class="icon-check"></span>{{item.statusStr}}</p>
							</li>
						</ul>
						<p class="user-select-none">
							<input type="checkbox" id="send" name="send" v-model="sendToStudent"><label for="send">签到结果是否发送给学员</label>
						</p>
					</div>
					<span class="btn btn-primary" @click="signAll()">全部签到</span>
				</div>
			</div>	
		</div>
		
	</div>
</template>
<script>
import Calendar from '../../common/components/Calendar.vue';
import Select from '../../../dep/vue-strap/src/Select.vue';
import InferenceInput from '../../common/components/InferenceInput.vue';
import getSelectOptions from '../../common/function/getSelectOptions';
import {getTeacherByName, getStudentByName, getClassesByName, getSchoolList, getSubTypeListByClassesId, getRoomsBySchoolId, getScheduledTimeTable, getCheckinDetail, lessonList, manualSign} from './request';
let options = getSelectOptions();
const dayStrs = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
function getDateStr(dd, AddDayCount) {
    var dl = new Date();
    dl.setTime(dd.getTime());
    dl.setDate(dl.getDate() + AddDayCount);
    return dl.toFormattedString('MM-dd');
}
export default {
	computed: {	
	},
	created() {
        this.calculateDate();
        this.getOptions();

    },
    ready() {
    	this.getList();
    },
	data() {
		return {
			searchFieldOptions: options.searchFieldOptions,
			searchField: "name",
			name: '',
			teacherName: '',
			classesName: '',
			student: null,
			clazz: null,
			teacher: null,
			schoolOptions: [],
			schoolId: -1,
			subTypeOptions: [],
			subTypeId: -1,
			classroomOptions: [],
			classroom: -1,
			list: [],
			sendToStudent: false,
			selectClazz: {
				id: -1,
				scheduleList: [],
				checkinDetail: [],
				teacherDetail: {}
			},
			queryStudentByName: function() {
				let param = {
					type: 1,
					name: this.query
				}
				return getStudentByName(param);
			},
			hitName: function(res) {
				this.$parent.student = res;
			},
			queryTeacherByName: function() {
				let param = {
					name: this.query
				}
				return getTeacherByName(param);
			},
			hitTeacherName: function(res) {
				this.$parent.teacher = res;
			},
			queryClassesByName: function() {
				let param = {
					query: this.query
				}
				return getClassesByName(param);
			},
			hitClassesName: function(clazz) {
				this.$parent.clazz = clazz;
			},
			nameTemplate: `<span v-html="item.name"></span>`,
			weektime: new Date().toFormattedString('yyyy/MM/dd'),
            time: new Date(),
            year: null,
            month: null,
            weekStart: '',
            weekEnd: '',
            weekdays: [],
			calendarShow: false,
            calendarX:0,
            calendarY:60,
            calendarRange:false,
		}
	},
	watch: {
        weektime(newVal, oldVal) {
            if (this.time) {
                this.time.fromFormattedString(newVal, 'yyyy/MM/dd');
                this.calculateDate();
                this.getList();
            }      
        },
        clazz(val) {
        	if (val == null) {
        		this.subTypeOptions = [];
        		this.subTypeId = -1;
        	}
        	if (val && val.id) {
        		this.getSubTypeList();
        	} 
        },
        schoolId(val) {
        	if (val == -1) {
        		this.classroomOptions = [];
        		this.classroom = -1;
        	} else {
        		this.getClassRoomList();
        	}
        },
        'selectClazz.id'(val) {
			this.selectClazz.scheduleList.forEach((item) => {
				if (item.id == this.selectClazz.id) {
					this.selectClazz.index = item.index;
				}
			})
			this.getClazzCheckinDetail();
			
        }
    },
	methods: {
		getList() {
			let d = new Date();
            let start = d.fromFormattedString(this.year + '-' + this.weekStart, 'yyyy-MM-dd').getTime();
            let end = d.fromFormattedString(this.year + '-' + this.weekEnd, 'yyyy-MM-dd').getTime();
			let param = {
				startTime: start,
				endTime: end
			}
			if (this.schoolId != -1) {
				$.extend(param, {
					schoolId: this.schoolId
				})
			}
			if (this.classesName == '') {
				this.clazz = null;
			}
			if (this.clazz) {
				$.extend(param, {
					classesId: this.clazz.id
				})
			}
			if (this.subTypeId != -1) {
				$.extend(param, {
					subTypeId: this.subTypeId
				})
			}
			if (this.teacherName == '') {
				this.teacher = null;
			}
			if (this.teacher) {
				$.extend(param, {
					userId: this.teacher.id
				})
			}	
			if (this.classroom != -1) {
				$.extend(param, {
					roomId: this.classroom
				})
			}
			if (this.student) {
				$.extend(param, {
					studentId: this.student.id
				})
			}
			getScheduledTimeTable(param)
				.then((res) => {
					if (res.code == 0) {
						this.list = res.data;
					}
				})
		},
		signAll() {
			if (!this.selectClazz.teacherDetail.name && this.selectClazz.checkinDetail.length == 0) {
				dispatch('TOAST', '没有可以签到的老师或学生');
				return;
			}
			let status = 1;
			let statusStr = '已签到';
			let signWayStr = '手动签到';
			let param = {
				isSend: this.sendToStudent ? 1: 0,
				scheduleId: this.selectClazz.id,
				index: this.selectClazz.index,
				studentRecord: []
			}
			// if (this.selectClazz.teacherDetail.name) {
			// 	let teacherSign = {
			// 		id: this.selectClazz.teacherDetail.id,
			// 		name: this.selectClazz.teacherDetail.name,
			// 		status: 1,
			// 		statusStr: statusStr,
			// 		userRole: this.selectClazz.teacherDetail.userRole,
			// 		signId: this.selectClazz.teacherDetail.signId,
			// 		signWay: 0,
			// 		signWayStr: signWayStr
			// 	}
			// 	param.studentRecord.push(teacherSign);
			// }
			this.selectClazz.checkinDetail.forEach((item) => {
				if (!item.status) {
					let studentSign = {
						id: item.id,
						name: item.name,
						status: 1,
						statusStr: statusStr,
						userRole: item.userRole,
						signId: item.signId,
						signWay: 0,
						signWayStr: signWayStr
					}
					param.studentRecord.push(studentSign);
				}
				
			})
			manualSign(param)
				.then((res) => {
					if (res.code == 0) {
						this.getClazzCheckinDetail();
						this.getList();
					}
				})

		},
		getClazzCheckinDetail() {
			let param = {
				scheduleId: this.selectClazz.id,
				classesId: this.selectClazz.classesId,
				subTypeId: this.selectClazz.subTypeId
			}
			getCheckinDetail(param)
				.then((res) => {
					if (res.code == 0) {
						let data = res.data;
						this.$set('selectClazz.checkinDetail', data.checkinDetail);
						this.$set('selectClazz.teacherDetail', data.teacherDetail);
					}
				})
		},
		getLessonList(){
			let param = {
    			scheduleId: this.selectClazz.id,
    			classesId: this.selectClazz.classesId,
    			subTypeId: this.selectClazz.subTypeId
    		};
    		lessonList(param)
    			.then((res) => {
    				if (res.code == 0) {
    					let data = res.data;
    					data.forEach((item) => {
							item.value = item.scheduleId.toString();
							item.label = `${item.name}第${item.index}节`;
						});
						data.splice(0, 0, options.blankItem);
						this.selectClazz.scheduleList = data;
    				}
    			})
		},
		sign(item, type) {
			let status = 0;
			let statusStr = '';
			let signWayStr = '';
			if (type == 0) {
				status = 1;
				statusStr = '已签到';
				signWayStr = '手动签到';
			}
			if (type == 1) {
				status = 2;
				statusStr = '请假';
				signWayStr = '请假';
			}
			if (type == 2) {
				status = 3;
				statusStr = '旷课';
				signWayStr = '旷课';
			}
			let param = {
				isSend: this.sendToStudent ? 1: 0,
				scheduleId: this.selectClazz.id,
				index: this.selectClazz.index,
				studentRecord: [{
					id: item.id,
					name: item.name,
					status: status,
					statusStr: statusStr,
					userRole: item.userRole,
					signId: item.signId,
					signWay: 0,
					signWayStr: signWayStr
				}]
			}
			manualSign(param)
				.then((res) => {
					if (res.code == 0) {
						this.getClazzCheckinDetail();
						this.getList();
					}
				})
		},
		search(event) {
			let target = $(event.target);
		  	this.getList();
		},
		showSignDetail(event, item) {
			if (item.id == this.selectClazz.id) {
				return;
			}
			this.selectClazz = $.extend(true, {}, item);
			this.$set('selectClazz.scheduleList', []);
			this.$set('selectClazz.checkinDetail', []);
			this.$set('selectClazz.teacherDetail', {});
			this.getLessonList();
			// let param = {
			// 	scheduleId: item.id,
			// 	classesId: item.classesId,
			// 	subTypeId: item.subTypeId
			// }
			// getCheckinDetail(param)
			// 	.then((res) => {
			// 		if (res.code == 0) {
			// 			let data = res.data;
			// 			this.$set('selectClazz.checkinDetail', data.checkinDetail);
			// 			this.$set('selectClazz.teacherDetail', data.teacherDetail);
			// 		}
			// 	})
		},
		getSubTypeList() {
			let param = {
				classesId: this.clazz.id
			}
			getSubTypeListByClassesId(param)
				.then((res) => {
					if (res.code == 0) {
						let subTypeList = res.data;
						subTypeList.forEach(function(item) {
							item.value = item.id.toString();
							item.label = item.name;
						});
						subTypeList.splice(0, 0, {label: '请选择', value: '-1'});
						this.subTypeOptions = subTypeList;
					}
				})
		},
		getClassRoomList() {
			let param = {
				schoolId: this.schoolId
			}
			getRoomsBySchoolId(param)
				.then((res) => {
					if (res.code == 0) {
						let roomList = res.data;
						roomList.forEach(function(item) {
							item.value = item.id.toString();
							item.label = item.name;
						});
						roomList.splice(0, 0, {label: '请选择', value: '-1'});
						this.classroomOptions = roomList;
					}
				})
		},
		getOptions() {
			$.when(getSchoolList())
				.then((res) => {
					let schoolList = res.data.list;
					schoolList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					schoolList.splice(0, 0, {label: '请选择', value: '-1'});
					this.schoolOptions = schoolList;
				});
		},
		getWeeks() {
            var weekdays = [];
            var obj = {};
            var nowDay = this.time.getDay();
            obj.day = dayStrs[nowDay];
            obj.dateFormated = this.time.toFormattedString('MM-dd');
            weekdays.push(obj);
            if (nowDay === 0) {
                for (var i = 1; i < 7; i++) {
                    var d = {};
                    d.day = dayStrs[7 - i];
                    var a = 0 - i;
                    d.dateFormated = getDateStr(this.time, a);
                    weekdays.splice(0, 0, d);
                } 
            } else {
                for (var i = nowDay - 1; i > 0; i--) {
                    var d = {};
                    d.day = dayStrs[i];
                    d.dateFormated = getDateStr(this.time, i - nowDay);
                    weekdays.splice(0, 0, d);
                }
                for (var j = nowDay + 1; j < 8; j++) {
                    var d = {};
                    d.day = dayStrs[j];
                    if (j == 7) {
                        d.day = dayStrs[0];
                    }
                    d.dateFormated = getDateStr(this.time, j - nowDay);
                    weekdays.push(d);
                }
            }
            return weekdays;
        },
        getWeekStart() {
            var nowDay = this.time.getDay();
            if (nowDay === 0) {
                return getDateStr(this.time, -6);
            } else {
                return getDateStr(this.time, 1 - nowDay);
            }
        },
        getWeekEnd() {
            var nowDay = this.time.getDay();
            if (nowDay === 0) {
                return this.time.toFormattedString('MM-dd');
            } else {
                return getDateStr(this.time, 7 - nowDay);
            }
        },
        calculateDate() {
            this.$set('year', this.time.getFullYear());
            this.$set('month', this.time.getMonth() + 1);
            this.$set('weekdays', this.getWeeks());
            this.$set('weekStart', this.getWeekStart());
            this.$set('weekEnd', this.getWeekEnd());   
        },
        previousWeek() {
            this.time.setDate(this.time.getDate() - 7);
            this.weektime = this.time.toFormattedString('yyyy/MM/dd');
        },
        nextWeek() {
            this.time.setDate(this.time.getDate() + 7);
            this.weektime = this.time.toFormattedString('yyyy/MM/dd');
        },
		showCalendar(e) {
            e.stopPropagation();
            var that=this;
            that.calendarShow=true;
            var bindHide=function(e){
                e.stopPropagation();
                that.calendarShow=false;
                document.removeEventListener('click',bindHide,false);
            };
            setTimeout(function(){
                document.addEventListener('click',bindHide,false);
            },500);
        }
	},
    components: {
        Calendar: Calendar,
        vSelect: Select,
        InferenceInput: InferenceInput
    }
}
</script>
<style lang="sass">
#sign {
	.btn-group {
		margin-right: 20px;
		&.open {
			.dropdown-toggle {
				box-shadow: none;
			}
		}
		.btn-default {
			background: #fff;
			//width: px;
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
	.select-wrap {
		background: #fff;
		padding-bottom: 30px;
		> div {
			display: inline-block;
			> div {
				display: inline-block;
			}
			> label {
				margin-right: 10px;
			}
		}
		input {
			height: 27px;
			position: relative;
			top: 1px;
			width: 130px;
		}
	}
	.wrap {
		overflow: auto;
		border: none;
		padding: 0;
	}
	.content-wrap {
		background: #fff;
		position: relative;
		padding-bottom: 40px;
		//min-width: 1020px;
		min-width: 1020px;
		min-height: 600px;
		> .left {
			margin-right: 410px;
			border: 1px solid #e0e0e0;
			padding: 40px 40px 0 40px;
			// display: inline-block;
			.clazz-wrap {
				ul {
					li {
						list-style: none;
						border: 1px dashed #ccc;
						margin-bottom: 20px;
						padding: 10px;
						cursor: pointer;
						p {	
							// text-align: center;
							span {
								font-size: 13px;
								display: inline-block;
								text-align: center;
								width: 100px;
								&:first-child {
									width: 180px;
								}
								&:last-child {
									width: 30px;
									font-size: 14px;
								}
								&:nth-child(3) {
									width: 60px;
								}
								&.icon-eye {
									font-size: 18px;
								}
							}
						}
					}
				}
			}
			.time-head {
		        text-align: center;
		        margin-bottom: 30px;
		        .time-select {
		            position: relative;
		            display: inline-block;
					margin: 0 9%;
		            .date-week {
		                display: inline-block;
		                margin-right: 20px;
		                position: relative;
		                top: 10px;
		                .p1 {
		                	font-size: 24px;
		                	color: #2b3643;
		                }
		                .p2 {
							color: #6f7276;
		                }

		            }
		            .icon-calendar {
		                font-size: 22px;
		                position: relative;
		                top: 5px;
		                cursor: pointer;
		            }
		        }
		        .previous-week {
		        	height: 38px;
		        	line-height: 38px;
		        	width: 96px;
		            display: inline-block;
		            color: #fff;
		            background: #66ccff;
		            cursor: pointer;
		        }
		        .next-week {
		            height: 38px;
		        	line-height: 38px;
		        	width: 96px;
		            display: inline-block;
		            color: #fff;
		            background: #66ccff;
		            cursor: pointer;
		        }
		        .triangle-left {
		            width: 0px;
		            height: 0px;
		            border-bottom: 19px solid transparent;
		            border-top: 19px solid transparent;
		            border-right: 19px solid #66ccff;
		            font-size: 0px;
		            line-height: 0px;
		            position: relative;
		            top: -5px;
		        }
		        .triangle-right {
		            width: 0px;
		            height: 0px;
		            border-top: 19px solid transparent;
		            border-bottom: 19px solid transparent;
		            border-left: 19px solid #66ccff;
		            font-size: 0px;
		            line-height: 0px;
		            position: relative;
		            top: -5px;
		            left: -5px;
		        }
		    }
		    .time-body {
		        position: relative;
		        padding-bottom: 20px;
		    }
		    .week-table {
		        margin-bottom: 10px;
		        tr {
		            td {
		            	width:120px;
		                text-align: center;
		                >div {
		                	p {
		                		&:first-child {
		                			font-size: 20px;
		                			color: #2b3643;
		                		}
		                		&:last-child {
		                			font-size: 14px;
		                			color: #6f7276;
		                		}

		                	}
		                }
		            }
		        }
		    }
		}
		> .right {
			text-align: center;
			>div {
				>p{
					&:first-child {
						background: #f6f7f9;
						padding-left: 20px;
						height: 28px;
						line-height:28px;
						border: 1px solid #f6f7f9;
					}
				}
			}
			.sign-content {
				> p {
					background: #eee;
					text-align: left;
					&:last-child {

					}
				}
				margin-bottom: 10px;
			}
			.clazz-info {
				padding-bottom: 15px;
				border-bottom: 1px solid #eee;
				p {
					margin: 10px 0;
					span {
						margin-right: 10px;
					}
					&:first-child {
						color: #2b3643;
						font-size: 18px;
						height: 50px;
						line-height: 50px;
						padding: 0px;
						text-align: center;
						margin: 0;
					}
				}
				+ div {
					margin-bottom: 10px;
				}
			}
			.student-list {
				li {
					list-style: none;
					padding: 10px 15px 10px 20px;
					p {
						>span {
							&:first-child {
								font-size: 14px;
								color: #2b3643;
								display: inline-block;
								width: 85px;
								overflow: hidden;
							    text-overflow: ellipsis;
							    white-space: nowrap;
							    position: relative;
							    top: 5px;
							}
						}
						.type {
							height: 30px;
							background: #66ccff;
							width: 80px;
							font-size: 16px;
							line-height: 30px;
							color: #fff;
							display: inline-block;
							cursor: pointer;
						}
						.sign {
							border-top-left-radius: 25px;
							border-bottom-left-radius: 25px;
						}
						.absence {
							border-top-right-radius: 25px;
							border-bottom-right-radius: 25px;
						}
						&.check {
							padding-top: 5px;
							color: #999;
							span {
								font-size: 15px;
								color: #33cc66;
							}
						}
					}
				}
				+ p {
					text-align: right;
					padding-right: 10px;
					border: 1px solid red;
					height: 28px;
					line-height: 28px;
					border: 1px solid #f6f7f9;
					background: #f6f7f9;

				}
			}
			> span {
				margin-right: 20px;
			}
			// display: inline-block;
			position: absolute;
			width: 380px;
			right: 10px;
			top: 0;
			border: 1px solid #eee;
			padding-bottom: 20px;
		}
	}
}

</style>