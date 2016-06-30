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
            <div class="opration">
                <span class="btn btn-primary search" @click="search()">查询</span>
                <span class="btn btn-blue-light reset" @click="reset()">重置</span>
            </div>
        </div>
        <div id="visit-report" class="report-container">
            <chart :options="option"></chart> 
        </div> 
       <div class="table-container">
            <table>
                <tr>
                    <td>咨询顾问</td>
                    <td v-for="item in channels" track-by="$index">
                        {{item}}
                    </td>
                </tr>
                <tr v-for="(i, item) in names" track-by="$index">
                    <td>{{item}}</td>
                    <td v-for="v in conversionRate">
                        {{v[i]}}%
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import Calendar from '../../../common/components/Calendar.vue';
    import Select from '../../../../dep/vue-strap/src/Select.vue';
    import Chart from '../../../../dep/vue-echarts/src/components/ECharts.vue';
    import {getConsultantVisitedReport} from '../request';
    export default {
        data() {
            return {
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
                channels: [],
                names: [],
                conversionRate: [],
                option: {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: []
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: [],
                        axisLabel: {
                            margin: 20
                        }
                    },
                    series: []
                }
            }
        },
        methods: {
            adaptData(data) {  
                this.channels = data.channelInfo;
                this.names = data.name;
                this.conversionRate = data.conversionRate;
                this.option.legend.data = this.channels;
                this.option.yAxis.data = this.names;
                for (var i = 0; i < this.channels.length; i++) {
                    let item = {
                        name: '',
                        type: 'bar',
                        //stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: []
                    };
                    item.name = this.channels[i];
                    item.data = this.conversionRate[i];
                    this.option.series.push(item);
                };

            },
            getReportData() {
                let param = {};
                if (this.startTime.length > 0) {
                    $.extend(param, {
                        start: new Date().fromFormattedString(this.startTime, 'yyyy/MM/dd').getTime()
                    })
                }
                if (this.endTime.length > 0) {
                    $.extend(param, {
                        end: new Date().fromFormattedString(this.endTime, 'yyyy/MM/dd').getTime()
                    })
                }
                getConsultantVisitedReport(param)
                    .then((res) => {
                        let data = res.data;
                        this.adaptData(data);
                    })
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
            search() {
                this.getReportData();
            },
            reset() {
                this.startTime = '';
                this.endTime = '';   
            }
        },
        // watch: {
        //     startTime(val) {
        //         this.getReportData();
        //     },
        //     endTime(val) {
        //         this.getReportData();
        //     }
        // },
        events: {
        },
        created() {
            this.getReportData();
        },
        components: {
            Calendar: Calendar,
            vSelect: Select,
            Chart: Chart
        }
    }
</script>

<style lang="sass">
</style>