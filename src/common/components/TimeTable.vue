<!--
    @file TimeTable 课表组件
    @author xuguanlong
-->
<template>
    <div class="time-table-wrap">
        <div id="class-info" draggable="true" v-if="showScheduleClassInfo" v-show="showScheduleClassInfo" @click="select($event)">
            <div class="select-info">
                <div class="title">已选信息</div>
                <p><label>班级:</label><span>{{clazzObj.info.name}}</span></p>
                <p><label>班级编号:</label><span>{{clazzObj.info.number}}</span></p>
                <p><label>科目:</label><span>{{clazzObj.subType.name}}</span></p>
                <p><label>老师:</label><span>{{clazzObj.teacher.name}}</span></p>
                <p><label>教室:</label><span>{{clazzObj.classroom.name}}</span></p>
            </div>
             <div class="class-detail">
                <div class="title">班级信息</div>
                <p><label>班级班制:</label><span>{{clazzObj.info.classesTypeName}}</span></p>
                <p><label>开班日期:</label><span>{{clazzObj.info.startTime | date 'yyyy-MM-dd'}}</span></p>
                <p><label>上课校区:</label><span>{{clazzObj.info.schoolName}}</span></p>
                <p class="spec" v-for="item in clazzObj.classesDetails">
                    <span>{{item.name}} {{item.totalLesson}}课次</span>
                </p>
            </div>
        </div>
        <div id="time-table" :class="{space: showScheduleClassInfo}" v-show="show">
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
                        <td></td>
                        <td v-for = "item in weekdays">
                            <div>
                                <p>{{item.day}}</p>
                                <p>{{item.dateFormated}}</p>
                            </div>
                        </td>
                    </tr>
                </table>
                <table class="hour-table">
                    <tr v-for="num in [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]">
                        <td>{{num}}:00</td>
                    </tr>
                </table>
                <table class="grades-table">
                    <tr v-for = "num in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]">
                        <td v-for ="i in [1, 2, 3, 4, 5, 6, 7]">
                        </td>
                    </tr>
                </table>
                <div class="clazz-detail-info" v-show="showDetail">
                    <p><span>{{selectClazzObj.info.number}}</span><span>{{selectClazzObj.subType.name}}</span></p>
                    <p><span>班级:</span><span>{{selectClazzObj.info.name}}</span></p>
                    <p><span>上课时间:</span><span>{{selectClazzObj.section}}</span></p>
                    <p><span>校区:</span><span>{{selectClazzObj.info.schoolName}}</span></p>
                    <p><span>教室:</span><span>{{selectClazzObj.classroom.name}}</span></p>
                    <p><span>上课老师:</span>{{selectClazzObj.teacher.name}}</p>
                </div>
                {{{templateHtml}}}
            </div>
        </div>
        <div class="drag-item template" v-if="showScheduleClassInfo" :draggable="showScheduleClassInfo">
            <span class="icon-times"></span>
            <span class="conflict">冲突</span>
            <div>
                <p class="no">{{clazzObj.info.number}}</p>
                <p class="time">{{clazzObj.duration}}分钟</p>
                <p class="subject">{{clazzObj.subType.name}}</p>
                <p class="classroom">{{clazzObj.classroom.name}}</p>
                <p class="teacher">{{clazzObj.teacher.name}}</p>
            </div>
        </div>
        
    </div>
    
</template>

<script>
    import {classSchedule} from '../../modules/student/request';
    import {getScheduledCourseList, addSchedule, editSchedule, deleteSchedule, getScheduledTimeTable} from '../../modules/educational/request';
    import Calendar from './Calendar.vue';
    const dayStrs = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var eleDrag = null;
    function getDateStr(dd, AddDayCount) {
        var dl = new Date();
        dl.setTime(dd.getTime());
        dl.setDate(dl.getDate() + AddDayCount);
        return dl.toFormattedString('MM-dd');
    }
    export default {
        props: {
            show: {
                type: Boolean,
                default: true
            },
            showScheduleClassInfo: {
                type: Boolean,
                default: true
            },
            studentId: {
                type: Number
            },
            info: {
                type: Object,
                default: function() {
                    return {
                        className: '',
                        classNum: '',
                        subType: '',
                        teacher: '',
                        classroom: '',
                        classType: '',
                        startTime: new Date().getTime(),
                        school: '',
                    }
                }
            },
            clazzObj: {
                type: Object,
                default: function() {
                    return {
                        teacher: {},
                        subType: {},
                        classroom: {},
                        duration: 0,
                        info: {},
                        classesDetails: []
                    }
                }
            },
            queryProp: {
                type: Object
            }
        },
        data() {
            return {
                calendarShow: false,
                calendarX:0,
                calendarY:60,
                calendarRange:false,
                weektime: new Date().toFormattedString('yyyy/MM/dd'),
                time: new Date(),
                year: null,
                month: null,
                weekStart: '',
                weekEnd: '',
                weekdays: [],
                showDetail: false,
                list: [],
                ownList: [],
                templateHtml: '',
                selectClazzObj: {
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
            weektime(newVal, oldVal) {
                if (this.time) {
                    this.time.fromFormattedString(newVal, 'yyyy/MM/dd');
                    this.calculateDate();
                    if (this.showScheduleClassInfo) {
                        this.getScheduledCourse();
                    } else {
                        this.refresh();
                    }
                }
            },
            'clazzObj.duration'(val) {
                let duration = this.clazzObj.duration;
                let index = Math.round(duration / 15);
                this.clazzHeight = index * 10;
                this.renderClassItem(this.clazzHeight);
            },
            'clazzObj.info.schoolId'(val) {
             
                if (val == -1) {
                    return;
                }
                if (this.showScheduleClassInfo) {
                    this.getScheduledCourse();
                }
            },
            'clazzObj.classroom'(val) {
              
                if (val['id'] == -1) {
                    return;
                }
                if (this.showScheduleClassInfo) {
                    this.getScheduledCourse();
                }
            },
            'clazzObj.teacher'(val) {
              
                if (val['id'] == -1) {
                    return;
                }
                if (this.showScheduleClassInfo) {
                    this.getScheduledCourse();
                }
            },
            'clazzObj.subType'(val) {
               
                if (val['id'] == -1) {
                    return;
                }
                if (this.showScheduleClassInfo) {
                    this.getScheduledCourse();
                }
            }
        },
        components: {
            Calendar: Calendar
        },
        events: {
            refreshschedule(){
                this.refresh();
            }
        },
        created() {
            this.calculateDate();
        },
        ready() {
            let self = this;
            if (this.showScheduleClassInfo) {
                let self = this;
                let item = $('#class-info')[0];
                let classBody = $('.grades-table')[0];
                this.getScheduledCourse();
                $(item).on('selectstart', function(){
                    return false;
                });
                $(item).on('dragstart', function(event) {
                    self.showDetail = false;
                      
                    if (!self.clazzObj.subType.id) {
                        dispatch('TOAST', '请先选择科目');
                        event.preventDefault();
                        return;
                    }
                    if (!self.clazzObj.teacher.id) {
                        dispatch('TOAST', '请先选择老师');
                        event.preventDefault();
                        return;
                    }
                    if (!self.clazzObj.classroom.id) {
                        dispatch('TOAST', '请先选择教室');
                        event.preventDefault();
                        return;
                    }
                    if (!self.clazzObj.duration) {
                        dispatch('TOAST', '请先选择课程时长');
                        event.preventDefault();
                        return;
                    }
                    let template = document.getElementsByClassName('template')[0];

                    event.originalEvent.dataTransfer.effectAllowed = "move";
                    event.originalEvent.dataTransfer.setData("text", event.target.innerHTML);
                    // console.log(e.target);
                    // console.log(template);
                    event.originalEvent.dataTransfer.setDragImage(event.target, 0, 0);
                    //event.originalEvent.dataTransfer.setDragImage(template, 0, 0);
                    eleDrag = $(event.target);
                    classBody.style.cursor = 'pointer';
                    return true;
                })
                $(item).on('dragend', function(event) {
                    if (eleDrag == null) {
                    } else {
                        let poi = $(classBody).offset();
                        let pos = {
                            x: event.originalEvent.pageX - poi.left,
                            y: event.originalEvent.pageY - poi.top
                        }
                        //debugger;
                        // let poi = $(classBody).position();
                        // let pos = {
                        //     x: event.originalEvent.offsetX - 320,
                        //     y: event.originalEvent.offsetY - $(event.target).height()
                        // }
                        // 
                        //debugger;
                        if (pos.x < -20 || pos.y < -20 || pos.x > 850 || pos.y > 610) {
                            return;
                        }
                        //console.log()
                        self.fixedPos(pos, eleDrag);
                        event.originalEvent.dataTransfer.clearData("text");
                        eleDrag = null;
                        classBody.style.cursor = 'default';   
                    }
                    return false;
                })
                $(classBody).on('dragover', function(event) {
                    event.preventDefault();
                    return true;
                });
                $(classBody).on('dragenter', function(event) {
                    event.preventDefault();
                    return true;
                });
                // $(classBody).on('dragdrop', function(event) {
                //     event.preventDefault();
                //     let poi = $(event.target).position();
                //     let pos = {
                //         x: event.originalEvent.offsetX + poi.left,
                //         y: event.originalEvent.offsetY + poi.top
                //     }
                //     if (pos.x < -20 || pos.y < -20 || pos.x > 850 || pos.y > 610) {
                //         return;
                //     }
                //     self.fixedPos(pos, eleDrag);
                //     eleDrag = null;
                //     return true;
                // });
                $(classBody).on('drop', function(event) {
                    event.preventDefault();
                    let offset = $(classBody).position();
                    let poi = $(event.target).position();
                    //debugger;
                    // safari 浏览器与chrome浏览器兼容问题 特殊处理 
                    let pos = {
                        x: event.originalEvent.offsetX + poi.left,
                        y: event.originalEvent.offsetY + poi.top
                    }

                    // debugger;
                    // if (window.Sys.safari) {
                    //     pos = {
                    //         x: event.originalEvent.layerX,
                    //         y: event.originalEvent.layerY
                    //     }
                    // }
                     // alert(pos.x);
                     // alert(pos.y);
                    if (pos.x < -20 || pos.y < -20 || pos.x > 850 || pos.y > 610) {
                        return;
                    }
                    //console.log(eleDrag);
                   
                    self.fixedPos(pos, eleDrag);
                    eleDrag = null;
                    return true;
                });
                let detailInfo = $('.clazz-detail-info');
                detailInfo.on('click', function(event) {
                    event.stopPropagation();
                });
            } else {
                self.refresh();
            }
            $('.time-body').on('click', '.drag-item', function(event) {
                let target = $(event.currentTarget);
                let index = target.attr('data-index');
                self.selectClazzObj = self.ownList[parseInt(index)];
                if (self.selectClazzObj.info == undefined) {
                    self.$set('selectClazzObj.info', {
                        name: self.selectClazzObj.classesName,
                        number: self.selectClazzObj.classesNumber,
                        schoolName: self.selectClazzObj.schoolName, 
                    })  
                }
                if (self.selectClazzObj.subType == undefined) {
                    self.$set('selectClazzObj.subType', {
                        name: self.selectClazzObj.subTypeName
                    })  
                }
                if (self.selectClazzObj.classroom == undefined) {
                    self.$set('selectClazzObj.classroom', {
                        name: self.selectClazzObj.roomName        
                    })  
                }
                if (self.selectClazzObj.teacher == undefined) {
                    self.$set('selectClazzObj.teacher', {
                        name: self.selectClazzObj.teacherName    
                    })  
                }
                let detailInfo = $('.clazz-detail-info');
                let pos = target.position();
                let width = target.width();
                let height = target.height();
                detailInfo.css({
                    left: pos.left + width + 2,
                    top: pos.top
                })
                self.showDetail = true;
                event.stopPropagation();
            });
            $('.time-body').on('click', '.icon-times', function(event) {
                self.showDetail = false;
                let target = $(event.currentTarget);
                self.deleteScheduleClass(target.parent());
                event.stopPropagation();
            });
            $('body').on('click', function(event) {
                self.showDetail = false;
            });
        },
        methods: {
            getClassesTimes(xGrep, yGrep, height){
                let obj = {
                    startTime: 0,
                    endTime: 0,
                    section: ''
                }
                let tmpTime = this.year + '-' + this.weekStart;
                let endTime = new Date();
                let startTime = new Date();
                let firstTime = tmpTime + ' 07:30:00';
                let grepTime = yGrep * 30 * 60 * 1000; //距离最顶端的毫秒数
                startTime = startTime.fromFormattedString(firstTime, 'yyyy-MM-dd HH:mm:ss');
                startTime.setTime(startTime.getTime() + xGrep * 24 * 60 * 60 * 1000 + grepTime);
                let endGrepTime = Math.round(height / 10) * 15 * 60 * 1000;
                endTime.setTime(startTime.getTime() + endGrepTime);
                let firstTimeStr = startTime.toFormattedString('HH:mm');
                let endTimeStr = endTime.toFormattedString('HH:mm');
                obj.startTime = startTime.getTime();
                obj.endTime = endTime.getTime();
                obj.section = firstTimeStr + '~' + endTimeStr;
                return obj;
            },
            renderClassItem(clazzHeight) {
                let dragItem = $('.template');
                dragItem.css('height', clazzHeight);
            },
            delItem(event) {
                let target = $(event.target);
                let item = target.parent();
                item.remove();
            },
            fixedPos(pos, dragItem) {
                let item =  $($('.drag-item')[0]).clone(true);
                let newItem = true;
                if (dragItem.hasClass('drag-item')) {
                    item = dragItem;
                    newItem = false;
                }
                let wrapPos = $('.grades-table').position();
                let xGrep = Math.floor(pos.x / 120);
                let yGrep = Math.floor(pos.y / 20);
                pos.x = xGrep * 120;
                if (Math.abs(yGrep * 20 - pos.y) > 10) {
                    yGrep += 1;
                }
                pos.y = yGrep * 20;
                pos.x += wrapPos.left;
                pos.y += wrapPos.top;
                // item.css({
                //     left: pos.x + 10,
                //     top: pos.y
                // });
                let tmpTime = this.time.toFormattedString('yyyy-MM-dd');
                let endTime = new Date();
                let startTime = new Date();
                let firstTime = tmpTime + ' 07:30:00';
                let grepTime = yGrep * 30 * 60 * 1000; //距离最顶端的毫秒数
                startTime = startTime.fromFormattedString(firstTime, 'yyyy-MM-dd HH:mm:ss');
                startTime.setTime(startTime.getTime() + grepTime);
                let height = this.clazzHeight;
                if (!newItem) {
                   height = item.height();
                }
                let endGrepTime = Math.round(height / 10) * 15 * 60 * 1000;
                endTime.setTime(startTime.getTime() + endGrepTime);
                let firstTimeStr = startTime.toFormattedString('HH:mm');
                let endTimeStr = endTime.toFormattedString('HH:mm');
                this.$set('clazzObj.section', firstTimeStr + '~' + endTimeStr);
                let clazzTimeObj = this.getClassesTimes(xGrep, yGrep, height);
                //let checkTimeAvailable(clazzTimeObj)
                if (newItem) {
                    this.addScheduleClass(clazzTimeObj);
                    // item.find('.time').html(clazzTimeObj.section);
                    // item.find('.no').html(this.clazzObj.info.number);
                    // item.find('.subject').html(this.clazzObj.subType.name);
                    // item.find('.classroom').html(this.clazzObj.classroom.name);
                    // item.find('.teacher').html(this.clazzObj.teacher.name);
                    // item.removeClass('template');
                    // let clazz = $.extend(true, {}, this.clazzObj);
                    // this.ownList.push(clazz);
                    // console.log(this.ownList);
                    // item.attr('data-index', this.ownList.length - 1);
                    // this.initItemEvents(item);
                    // item.css('height', height);
                    // $('.time-body').append(item);
                    // item.show();
                } else {
                    //debugger;
                    this.eidtScheduleClass(clazzTimeObj, item);
                    //this.initItemEvents(item);
                    //item.find('.time').html(clazzTimeObj.section);
                }   
            },
            deleteScheduleClass(item){
                let self = this;
                let index = item.attr('data-index');
                let selectClazzObj = self.ownList[parseInt(index)];
                let param = {
                    id: selectClazzObj.id,
                    classesId: selectClazzObj.classesId,
                    index: selectClazzObj.index
                }
                deleteSchedule(param)
                    .then((res) => {
                        if(res.code == 0) {
                            setTimeout(function() {
                                self.getScheduledCourse();
                            }, 10)
                        }
                    }, () => {
                        setTimeout(function() {
                            self.getScheduledCourse();
                        }, 10)
                    })
            },
            eidtScheduleClass(clazzTimeObj, item) {
                let self = this;
                let index = item.attr('data-index');
                let selectClazzObj = self.ownList[parseInt(index)];
                let param = {
                    id: selectClazzObj.id,
                    classesId: selectClazzObj.classesId,
                    startTime: clazzTimeObj.startTime,
                    endTime: clazzTimeObj.endTime
                }
                editSchedule(param)
                    .then((res) => {
                        if(res.code == 0) {
                            setTimeout(function() {
                                self.getScheduledCourse();
                            }, 10)
                        }
                    }, () => {
                        setTimeout(function() {
                            self.getScheduledCourse();
                        }, 10)
                    })
            },
            addScheduleClass(clazzTimeObj){
                let self = this;
                let param = {
                    schoolId: this.clazzObj.info.schoolId,
                    classesId: this.clazzObj.info.id,
                    classesNumber: this.clazzObj.info.number,
                    startTime: clazzTimeObj.startTime,
                    endTime: clazzTimeObj.endTime,
                    subTypeId: this.clazzObj.subType.id,
                    roomId: this.clazzObj.classroom.id,
                    teacherId: this.clazzObj.teacher.id,
                    teacherName: this.clazzObj.teacher.name,
                    subjectId: this.clazzObj.info.subjectId
                }
                addSchedule(param)
                    .then((res) => {
                        if(res.code == 0) {
                            setTimeout(function() {
                                self.getScheduledCourse();
                            }, 10)
                        }
                    }, () => {
                        setTimeout(function() {
                            self.getScheduledCourse();
                        }, 10)
                    })
            },
            initItemEvents(item) {
                let self = this;
                item.on('click', '.icon-times', this.delItem);
                //item.on('click', 'div', this.showCourseDetail);
                let classBody = $('.grades-table')[0];
                let domItem = item[0];
                $(domItem).on('selectstart', function() {
                    return false;
                });
                $(domItem).on('dragstart', function(event) {
                    self.showDetail = false;
                    event.originalEvent.dataTransfer.effectAllowed = "move";
                    event.originalEvent.dataTransfer.setData("text", event.target.innerHTML);
                    event.originalEvent.dataTransfer.setDragImage(event.target, 3, 10);
                    eleDrag = $(event.target);
                    return true;
                });
                $(domItem).on('dragend', function(event) {
                    let poi = $(event.target).position();
                    poi.left = poi.left - 120;
                    poi.top = poi.top - 52;
                    // console.log(poi);
                    // console.log(event.originalEvent);
                    let pos = {
                        x: poi.left + event.originalEvent.offsetX,
                        y: poi.top - event.originalEvent.offsetY
                    }
                    if (pos.x < 0 || pos.y < 0 || pos.x > 840 || pos.y > 600) {
                        return;
                    }
                    self.fixedPos(pos, eleDrag);
                    //console.log(pos);
                    event.originalEvent.dataTransfer.clearData("text");
                    eleDrag = null;
                    // event.originalEvent.dataTransfer.clearData("text");
                    // eleDrag = null;
                    return false;
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
            getScheduledCourse() {
                let self = this;
                let param = {};
                let d = new Date();
                let start = d.fromFormattedString(this.year + '-' + this.weekStart, 'yyyy-MM-dd').getTime();
                let end = start + 7 * 24 * 60 * 60 * 1000;
                if (this.clazzObj.info.schoolId == null || this.clazzObj.classroom.id == null|| this.clazzObj.teacher.id == null) {
                    return;
                }
                param['schoolId'] = this.clazzObj.info.schoolId;
                param['roomId'] = this.clazzObj.classroom.id;
                param['userId'] = this.clazzObj.teacher.id;
                param['classesId'] = this.clazzObj.info.id;
                param['subTypeId'] = this.clazzObj.subType.id;
                param['startTime'] = start;
                param['endTime'] = end;
                getScheduledCourseList(param)
                    .then((res) => {
                        if (res.code == 0) {
                            let ownList = res.data.ownList;
                            this.ownList = res.data.ownList;
                            let template = '';
                            ownList.forEach((item, index) => {
                                template += self.gennrateTemplate(item, index);
                            });
                            let otherList = res.data.otherList;
                            otherList.forEach((item) => {
                                template += self.gennrateMaskTemplate(item);
                            })
                            template = template.replace(/\[draggable\]/g, 'true');
                            template = template.replace(/\[icon-times\]/g, '<span class="icon-times"></span>');
                            template = template.replace(/\[template\]/g, 'template-item');
                            self.$set('templateHtml', template);
                            self.$nextTick(function(){
                                let doms = $('.time-body').find('.template-item');
                                for (let i = 0; i < doms.length; i++) {
                                    let domItem = doms[i];
                                    $(domItem).on('selectstart', function() {
                                        return false;
                                    });
                                    $(domItem).on('dragstart', function(event) {
                                        self.showDetail = false;
                                        event.originalEvent.dataTransfer.effectAllowed = "move";
                                        event.originalEvent.dataTransfer.setData("text", event.target.innerHTML);
                                        event.originalEvent.dataTransfer.setDragImage(event.target, 3, 10);
                                        eleDrag = $(event.target);
                                        return true;
                                    });
                                    $(domItem).on('dragend', function(event) {
                                        if (eleDrag == null) {
                                        } else {
                                            let classBody = $('.grades-table')[0];
                                            let poi = $(classBody).offset();
                                            let pos = {
                                                x: event.originalEvent.pageX - poi.left,
                                                y: event.originalEvent.pageY - poi.top
                                            }
                                            //console.log(pos);
                                            if (pos.x < -20 || pos.y < -20 || pos.x > 850 || pos.y > 610) {
                                                return;
                                            }
                                            //console.log(pos);
                                            self.fixedPos(pos, eleDrag);
                                            //console.log(pos);
                                            event.originalEvent.dataTransfer.clearData("text");
                                            eleDrag = null;  
                                        }
                                        
                                        //classBody.style.cursor = 'default';
                                        return false;
                                    });
                                };
                            })
                        }
                        
                    })
            },
            previousWeek() {
                this.time.setDate(this.time.getDate() - 7);
                this.weektime = this.time.toFormattedString('yyyy/MM/dd');
                this.$dispatch('previousweek');
            },
            nextWeek() {
                this.time.setDate(this.time.getDate() + 7);
                this.weektime = this.time.toFormattedString('yyyy/MM/dd');
                this.$dispatch('nextweek');
            },
            refresh() {
                let self = this;
                let d = new Date();
                let start = d.fromFormattedString(this.year + '-' + this.weekStart, 'yyyy-MM-dd').getTime();
                let end = start + 7 * 24 * 60 * 60 * 1000;;
                if (this.studentId) {
                    let param = {
                        id: this.studentId,
                        start: start,
                        end: end
                    };
                    classSchedule(param)
                        .then((res) => {
                            //self.clearTimeTable();
                            self.ownList = res.data.list;
                            let template = '';
                            self.ownList.forEach(function(item, index) {
                                template += self.gennrateTemplate(item, index);
                            })
                            template = template.replace(/\[draggable\]/g, 'false');
                            template = template.replace(/\[icon-times\]/g, '');
                            template = template.replace(/\[template\]/g, '');
                            self.$set('templateHtml', template);
                        }) 
                }
                if (this.queryProp && this.queryProp.schoolId) {
                    let param = {
                        startTime: start,
                        endTime: end
                    };
                    $.extend(param, this.queryProp);
                    getScheduledTimeTable(param)
                        .then((res) => {
                            self.ownList = res.data;
                            let template = '';
                            self.ownList.forEach(function(item, index) {
                                template += self.gennrateTemplate(item, index);
                            })
                            template = template.replace(/\[draggable\]/g, 'false');
                            template = template.replace(/\[icon-times\]/g, '');
                            template = template.replace(/\[template\]/g, '');
                            self.$set('templateHtml', template);
                        })
                }
               
            },
            clearTimeTable() {
                $('.time-body').find('.drag-item').remove();
            },
            gennrateMaskTemplate(item) {
                let itemHtmlObj = $(`<div class="disabled-item">已排课</div>`);
                let cssObj = this.getCss(item);
                cssObj['background'] = '#ff9b9b';
                itemHtmlObj.css(cssObj);
                return itemHtmlObj.prop('outerHTML');
                //$('.time-body').append(itemHtmlObj);
            },
            gennrateTemplate(item, index) {
                let itemHtmlObj = $(`<div class="drag-item [template]" draggable="[draggable]">
                    [icon-times]
                    <div>
                        <p class="time">${item.section}</p>
                        <p class="subject">${item.subTypeName}</p>
                        <p class="classroom">${item.roomName}</p>
                        <p class="school">${item.schoolName}</p>
                        <p class="teacher">${item.teacherName}</p>
                    </div></div>`);
                let cssObj = this.getCss(item);
                itemHtmlObj.css(cssObj);
                itemHtmlObj.attr('data-index', index);
                return itemHtmlObj.prop('outerHTML');
            },
            getCss(item) {
                let wrapPos = $('.grades-table').position();
                let duration = item.endTime - item.startTime;
                let height = Math.round((duration * 40)/ (60 * 60 * 1000));
                let start = new Date();
                let top = new Date();
                start.setTime(item.startTime);
                let tmpTime = start.toFormattedString('yyyy-MM-dd');
                let firstTime = tmpTime + ' 07:30:00';
                let topTime = top.fromFormattedString(firstTime, 'yyyy-MM-dd HH:mm:ss').getTime();
                let yDiff = Math.round((item.startTime - topTime) * 40 / (60 * 60 * 1000));
                let xDiff = (item.weekType - 1) * 120 + 10;
                return {
                    height: height,
                    left: wrapPos.left + xDiff,
                    top: wrapPos.top + yDiff
                }
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
            },
            select(event) {
            }
        }
    }
</script>

<style lang="sass">
.time-table-wrap {
    overflow: auto;
    margin-top: 15px;
    background: #fff;
    position: relative;
}
#class-info {
    display: inline-block;
    width: 200px;
    position: absolute;
    top: 120px;
    left: 10px;
    cursor: move;
    background: #fff;
    .title {
        background: #edf0f5;
        text-align: center;
        height: 36px;
        line-height: 36px;
        margin-bottom: 10px;
    }
    p {
        font-size: 13px;
        padding-left: 10px;
        label {
            margin-right: 10px;
        }
        &.spec {
            span {
                margin-right: 15px;
            }
        }
    }
    .select-info {
        
    }
}
.disabled-item {
    position: absolute;
    cursor: pointer;
    width: 100px;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    font-size: 14px;
}
.drag-item {
    position: absolute;
    cursor: pointer;
    width: 100px;
    background: #66ccff;
    color: #fff;
    //font-size: 8px;
    text-align: center;
    // overflow: hidden;
    left: -1000px;
    > div {
        height: 100%;
        overflow: hidden;
    }
    &:hover {
        .icon-times {
            display: block;
        }
    }
    .conflict {
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 10px;
        color: #fff;
        border-radius: 16px;
        background: #ff0000;
        position: absolute;
        right: -16px;
        top: -16px;
        cursor: pointer;
        display: none;
    }
    .icon-times {
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 13px;
        color: #fff;
        border-radius: 8px;
        background: #ff0000;
        position: absolute;
        right: -8px;
        top: -8px;
        cursor: pointer;
        display: none;
    }
}
#time-table {
    background: #fff;
    min-width: 1000px;
    font-size: 12px;
    display: inline-block;
    &.space {
        margin-left: 200px;    
    }
    .time-head {
        text-align: center;
        margin-bottom: 30px;
        .time-select {
            position: relative;
            display: inline-block;
            width: 260px;
            .date-week {
                display: inline-block;
                margin-right: 20px;
                position: relative;
                top: 10px;
            }
            .icon-calendar {
                font-size: 22px;
                position: relative;
                top: 5px;
                cursor: pointer;
            }
        }
        .previous-week {
            padding: 1px 10px;
            display: inline-block;
            color: #fff;
            background: #66ccff;
            cursor: pointer;
           
        }
        .next-week {
            padding: 1px 10px;
            display: inline-block;
            color: #fff;
            background: #66ccff;
            cursor: pointer;
        }
        .triangle-left {
            width: 0px;
            height: 0px;
            border-bottom: 10px solid transparent;
            border-top: 10px solid transparent;
            border-right: 20px solid #66ccff;
            font-size: 0px;
            line-height: 0px;
            position: relative;
            top: -5px;
        }
        .triangle-right {
            width: 0px;
            height: 0px;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-left: 20px solid #66ccff;
            font-size: 0px;
            line-height: 0px;
            position: relative;
            top: -5px;
            left: -5px;
        }
    }
    .time-body {
        position: relative;
        padding-bottom: 30px;
    }
    .week-table {
        margin-bottom: 10px;
        tr {
            td {
                width: 120px;
                text-align: center;
                &:first-child {
                    width: 120px;
                }
            }
        }
    }
    .hour-table {
        position: relative;
        top: 5px;
        tr {
            td {
                height: 40px;
                line-height: 40px;
                padding-left: 45px;
            }
        }
    }
    .grades-table {
        background: #edf0f5;
        position: absolute;
        left: 120px;
        top: 52px;
        tr {
            td {
                height: 19px;
                width: 119px;
                border-right: 1px dashed #ccc;
            }
            &:nth-child(odd) {
                border-bottom: 1px solid #ccc;
            }
            &:nth-child(even) {
                border-bottom: 1px dashed #ccc;
            }
        }
    }
}
.clazz-detail-info {
    position: absolute;
    font-size: 13px;
    width: 240px;
    background: #fff;
    border: 1px solid rgba(221, 221, 221, .7);
    box-sizing: border-box;
    z-index: 10;
    p {
        margin-bottom: 10px;
        padding-left: 10px;
        span {
            &:first-child {
                margin-right: 10px;
            }
        }
        &:first-child {
            background: #66ccff;
            color: #fff;
            padding: 5px 10px 5px 0;
            span {
                &:last-child {
                    float: right;
                }
            }
        }
    }
}
</style>