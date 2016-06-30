<template>
    <div class="report-wrap">
        <div class="search-wrap">
            <div class="input-control long time-range">
                <label>按日期查看</label>
                <input type="text" v-model="startTime" class="time-input form-control" @click="showCalendar($event, 1)">
                <span class="icon-calendar cal-1"></span>
                <calendar :show.sync="calendarShow1" :value.sync="startTime" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
                <span class="step">-</span>
                <input type="text" v-model="endTime" class="time-input form-control" @click="showCalendar($event, 2)">
                <span class="icon-calendar cal-2"></span>
                <calendar :show.sync="calendarShow2" :value.sync="endTime" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
            </div>
            <div class="input-control long">
                <label>校区</label>
                <v-select :options="schoolOptions" :close-on-select="true" :value.sync="schoolId | str"></v-select>
            </div>
            <div class="opration">
                <span class="btn btn-primary search" @click="search()">查询</span>
                <span class="btn btn-blue-light reset" @click="reset()">重置</span>
            </div>
        </div>

        <div v-if="!loading" id="course-report" class="report-container">
            <chart :options="option"></chart>
        </div>

        <div v-if="!loading" class="report-table">
            <div>
                <p>课时</p>
                <table>
                    <tr>
                        <td>校区</td>
                        <td>VIP</td>
                        <td>班教</td>
                        <td>总计</td>
                    </tr>
                    <tr v-for="item in courseList">
                        <td>{{ item.schoolName }}</td>
                        <td>{{ item.vipNum }}</td>
                        <td>{{ item.groupNum }}</td>
                        <td>{{ item.totalNum }}</td>
                    </tr>
                </table>
            </div>
            <div>
                <p>班级</p>
                <table>
                    <tr>
                        <td>校区</td>
                        <td>VIP</td>
                        <td>班教</td>
                        <td>总计</td>
                    </tr>
                    <tr v-for="item in classList">
                        <td>{{ item.schoolName }}</td>
                        <td>{{ item.vipNum }}</td>
                        <td>{{ item.groupNum }}</td>
                        <td>{{ item.totalNum }}</td>
                    </tr>
                </table>
            </div>
            <div>
                <p>人数</p>
                <table>
                    <tr>
                        <td>校区</td>
                        <td>VIP</td>
                        <td>班教</td>
                        <td>总计</td>
                    </tr>
                    <tr v-for="item in personNumList">
                        <td>{{ item.schoolName }}</td>
                        <td>{{ item.vipNum }}</td>
                        <td>{{ item.groupNum }}</td>
                        <td>{{ item.totalNum }}</td>
                    </tr>
                </table>
            </div>
            <div>
                <p>人次</p>
                <table>
                    <tr>
                        <td>校区</td>
                        <td>VIP</td>
                        <td>班教</td>
                        <td>总计</td>
                    </tr>
                    <tr v-for="item in personTimeList">
                        <td>{{ item.schoolName }}</td>
                        <td>{{ item.vipNum }}</td>
                        <td>{{ item.groupNum }}</td>
                        <td>{{ item.totalNum }}</td>
                    </tr>
                </table>
            </div>
        </div>

        <loading :show="loading"></loading>

    </div>
</template>

<script>
    import Calendar from '../../../common/components/Calendar.vue';
    import Select from '../../../../dep/vue-strap/src/Select.vue';
    import Chart from '../../../../dep/vue-echarts/src/components/ECharts.vue';
    import Loading from '../../../common/components/Loading.vue';
    import { schoolList, schoolCourseReport } from '../request';
    import { optionMap, getOptionValue, getTimestamp } from '../../../common/util/tool';

    export default {
        data() {
            return {
                loading: true,
                startTime: '',
                endTime: '',
                calendarShow1: false,
                calendarShow2: false,
                calendarType: "date",
                calendarX: 0,
                calendarY: 0,
                calendarRange: false,
                schoolOptions: [],
                schoolId: -1,
                courseList: [],
                classList: [],
                personTimeList: [],
                personNumList: [],
                option: {
                    title: {
                      text: '各校区学生课程情况',
                      subtext: ''
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {
                            type : 'shadow'
                        }
                    },
                    legend: {
                      data: ['班教课时', 'VIP课时', '班教班级数', 'VIP班级数', '班教人数', 'VIP人数', '班教人次', 'VIP人次', '开班', '结班'],
                      width: 500,
                      left: 250
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    xAxis: [
                        {
                            type : 'category',
                            data : []
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '班教课时',
                            tag: "groupCourse",
                            type: 'bar',
                            stack: '课时',
                            data: [],
                            // markPoint : {
                            //     data : [
                            //         {type : 'max', name: '最大值'},
                            //         {type : 'min', name: '最小值'}
                            //     ]
                            // }
                        },
                        {
                            name: 'VIP课时',
                            tag: "vipCourse",
                            type: 'bar',
                            stack: '课时',
                            data: [],
                            // markPoint : {
                            //     data : [
                            //         {type : 'max', name: '最大值'},
                            //         {type : 'min', name: '最小值'}
                            //     ]
                            // }
                        },
                        {
                            name: '班教班级数',
                            tag: "groupClasses",
                            type: 'bar',
                            stack: '班级',
                            data: [],
                            // markPoint : {
                            //     data : [
                            //         {type : 'max', name: '最大值'},
                            //         {type : 'min', name: '最小值'}
                            //     ]
                            // }
                        },
                        {
                            name: 'VIP班级数',
                            tag: "vipClasses",
                            type: 'bar',
                            stack: '班级',
                            data: [],
                            // markPoint : {
                            //     data : [
                            //         {type : 'max', name: '最大值'},
                            //         {type : 'min', name: '最小值'}
                            //     ]
                            // }
                        },
                        {
                            name: '班教人数',
                            tag: "groupPersonNum",
                            type: 'bar',
                            stack: '人数',
                            data: [],
                            // markPoint : {
                            //     data : [
                            //         {type : 'max', name: '最大值'},
                            //         {type : 'min', name: '最小值'}
                            //     ]
                            // }
                        },
                        {
                            name: 'VIP人数',
                            tag: "vipPersonNum",
                            type: 'bar',
                            stack: '人数',
                            data: [],
                            // markPoint : {
                            //     data : [
                            //         {type : 'max', name: '最大值'},
                            //         {type : 'min', name: '最小值'}
                            //     ]
                            // }
                        },
                        {
                            name: '班教人次',
                            tag: "groupPersonTime",
                            type: 'bar',
                            stack: '人次',
                            data: [],
                            // markPoint : {
                            //     data : [
                            //         {type : 'max', name: '最大值'},
                            //         {type : 'min', name: '最小值'}
                            //     ]
                            // }
                        },
                        {
                            name: 'VIP人次',
                            tag: "vipPersonTime",
                            type: 'bar',
                            stack: '人次',
                            data: [],
                            // markPoint : {
                            //     data : [
                            //         {type : 'max', name: '最大值'},
                            //         {type : 'min', name: '最小值'}
                            //     ]
                            // }
                        },
                        {
                            name: '开班',
                            tag: "startClassesNum",
                            type: 'bar',
                            stack: '开结',
                            data: [],
                            // markPoint : {
                            //     data : [
                            //         {type : 'max', name: '最大值'},
                            //         {type : 'min', name: '最小值'}
                            //     ]
                            // }
                        },
                        {
                            name: '结班',
                            tag: "endClassesNum",
                            type: 'bar',
                            stack: '开结',
                            data: [],
                            // markPoint : {
                            //     data : [
                            //         {type : 'max', name: '最大值'},
                            //         {type : 'min', name: '最小值'}
                            //     ]
                            // }
                        }
                    ]
                }
            }
        },
        created() {
            this.getOptions().getReport();
        },
        methods: {
            getOptions() {
                schoolList()
                    .then(
                        (res) => {
                            this.schoolOptions = optionMap(res.data.orgschools, true);
                        }
                    );
                return this;
            },
            search () {
                this.loading = true;
                this.getReport();
            },
            reset () {
                this.startTime = '';
                this.endTime = '';
                this.schoolId = -1;
                this.search();
            },
            getReport () {
                let params = this.setQueryParams();

                schoolCourseReport(params)
                    .then( (res) => {
                        let data = res.data;

                        let nameList = data.schoolName;
                        this.option.xAxis[0].data = nameList;
                        if (nameList.length > 1) {
                            this.option.title.subtext = '全部校区';
                        } else {
                            this.option.title.subtext = nameList[0];
                        }

                        this.option.series
                            .forEach(
                                    (item) => {
                                        item.data = data[item.tag];
                                    }
                                );

                        this.courseList = data.course;
                        this.classList = data.classes;
                        this.personTimeList = data.personTime;
                        this.personNumList = data.personNum;

                        this.loading = false;
                    }, () => {
                        this.loading = false;
                        console.log("网络错误");
                    });
            },
            setQueryParams () {
                return {
                    startTime: getTimestamp(this.startTime),
                    endTime: getTimestamp(this.endTime),
                    schoolId: getOptionValue(this.schoolId)
                }
            },
            showCalendar(event, type) {
                this.type = type;
                event.stopPropagation();
                var that=this;
                if (this.type == 1) {
                    that.calendarShow2=false;
                    that.calendarShow1=true;
                }
                if (this.type == 2) {
                    that.calendarShow1 = false;
                    that.calendarShow2=true;
                }
                that.calendarX=event.target.offsetLeft;
                that.calendarY=event.target.offsetTop+event.target.offsetHeight+8;
                var bindHide=function(event){
                    event.stopPropagation();
                    if (this.type == 1) {
                        that.calendarShow1=false;
                    }
                    if (this.type == 2) {
                        that.calendarShow2=false;
                    }
                    document.removeEventListener('click',bindHide,false);
                };
                setTimeout(function(){
                    document.addEventListener('click',bindHide,false);
                },500);
            },
        },
        components: {
            Calendar: Calendar,
            vSelect: Select,
            Loading: Loading,
            Chart: Chart
        }
    }
</script>

<style lang="sass">
</style>