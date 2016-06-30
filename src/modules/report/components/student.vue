<template>
	<div class="report-wrap">
        <div v-if="!loading" id="student-report" class="report-container">
            <chart :options="option"></chart>
        </div>
        <div v-if="!loading" class="report-table">
            <div>
                <p>在读人数</p>
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
                    <tr>
                        <td>总计</td>
                        <td>{{ personNumSum.vip }}</td>
                        <td>{{ personNumSum.group }}</td>
                        <td>{{ personNumSum.total }}</td>
                    </tr>
                </table>
            </div>
            <div>
                <p>在读人次</p>
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
                    <tr>
                        <td>总计</td>
                        <td>{{ personTimeSum.vip }}</td>
                        <td>{{ personTimeSum.group }}</td>
                        <td>{{ personTimeSum.total }}</td>
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
    import { schoolStudentReport } from '../request';

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
                personTimeList: [],
                personNumList: [],
                personTimeSum: {},
                personNumSum: {},
                option: {
                    title: {
                      text: '各校区在读学员情况'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {
                            type : 'shadow'
                        }
                    },
                    legend: {
                      data: ['在读人数', '在读人次']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
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
                            name: '在读人数',
                            tag: "personNum",
                            type: 'bar',
                            data: [],
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '在读人次',
                            tag: "personTime",
                            type: 'bar',
                            data: [],
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                }
    		}
    	},
        created() {
            this.getReport();
        },
        methods: {
            getReport () {
                schoolStudentReport()
                    .then( (res) => {
                        let data = res.data;
                        this.personTimeList = data.personTime.statistics;
                        this.personTimeSum = data.personTime.sum;
                        this.personNumList = data.personNum.statistics;
                        this.personNumSum = data.personNum.sum;
                        this.option.series
                            .forEach(
                                    (item) => {
                                        item.data =
                                            data[item.tag].statistics.map(
                                                    (item) => { return item.totalNum; }
                                                );
                                    }
                                );
                        this.option.xAxis[0].data = this.personNumList.map((item) => { return item.schoolName; });

                        this.loading = false;
                    }, () => {
                        console.log("网络错误");
                    });
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
    	events: {
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