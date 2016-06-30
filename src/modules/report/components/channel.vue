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
            </div>
        </div>
        <div v-if="!loading" id="source-report" class="report-container">
            <chart :options="option"></chart>
        </div>
        <div v-if="!loading" class="table-container">
            <table>
                <tr>
                    <td>来源渠道</td>
                    <td>转化人数</td>
                    <td>转化占比</td>
                </tr>
                <tr v-for="item in list">
                    <td>{{ item.name }}</td>
                    <td>{{ item.number }}</td>
                    <td>{{ item.percentage }}%</td>
                </tr>
            </table>
        </div>

        <loading :show="loading"></loading>
    </div>
</template>

<script>
    import Calendar from '../../../common/components/Calendar.vue';
    import Chart from '../../../../dep/vue-echarts/src/components/ECharts.vue';
    import Select from '../../../../dep/vue-strap/src/Select.vue';
    import Loading from '../../../common/components/Loading.vue';
    import { channelConversionRate } from '../request';
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
                list: [],
                option: {
                    grid: {
                        top: '5%',
                        left: '10%'
                    },
                    title: {
                        text: '渠道转化率',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: []
                    },
                    series: {
                        name: '渠道转化率',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: []
                    }
                }
            }
        },
        created() {
            this.getReport();
        },
        methods: {
            search () {
                this.loading = true;
                this.getReport();
            },
            getReport () {
                let params = this.setQueryParams();
                channelConversionRate(params)
                    .then( (res) => {
                        let data = res.data;
                        this.list = data;
                        this.option.legend.data = data.map((item) => { return item.name; });
                        this.option.series.data =
                            data.map((item) => {
                                return {
                                    value: item.number,
                                    name: item.name
                                }
                            });

                        this.loading = false;
                    }, () => {
                        this.loading = false;
                        console.log("网络错误");
                    });
            },
            setQueryParams () {
                return {
                    start: getTimestamp(this.startTime),
                    end: getTimestamp(this.endTime),
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
        events: {
        },
        components: {
            Calendar: Calendar,
            Loading: Loading,
            vSelect: Select,
            Chart: Chart
        }
    }
</script>

<style lang="sass">
</style>