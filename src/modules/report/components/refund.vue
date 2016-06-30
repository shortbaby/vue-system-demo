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
        <div id="refund-report" class="report-container">
            <chart :options="option"></chart> 
        </div> 
        <div class="table-container">
            <table>
                <tr>
                    <td>校区</td>
                    <td>VIP</td>
                    <td>班数</td>
                    <td>总计</td>
                </tr>
                <tr v-for="item in schools" track-by="$index">
                    <td>{{item}}</td>
                    <td>{{vip[$index]}}</td>
                    <td>{{normal[$index]}}</td>
                    <td>{{vip[$index] + normal[$index]}}</td>
                </tr>
            </table>
        </div>
	</div>
</template>

<script>
    import Calendar from '../../../common/components/Calendar.vue';
    import Select from '../../../../dep/vue-strap/src/Select.vue';
    import Chart from '../../../../dep/vue-echarts/src/components/ECharts.vue';
    import {schoolList, getRefundReport} from '../request';
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
                schools: [],
                vip: [],
                normal: [],
                option: {
                    title : {
                        text: '校区退费情况',
                        subtext: '武汉飞渡教育'
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['VIP','班教']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : []
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'VIP',
                            type:'bar',
                            data:[],
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
                            name:'班教',
                            type:'bar',
                            data:[],
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
                }
    		}
    	},
        created() {
            this.getOptions();
            this.getReportData();
        },
        methods: {
            adaptData(data) { 
                this.schools = data.school;
                this.vip = data.vip;
                this.normal = data.normal;    
                this.option.xAxis[0].data = data.school;
                this.option.series[0].data = data.vip;
                this.option.series[1].data = data.normal;
            },
            getReportData() {
                let param = {};
                if (this.schoolId != -1) {
                    $.extend(param, {
                        schoolId: this.schoolId
                    });
                }
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
                getRefundReport(param)
                    .then((res) => {
                        let data = res.data;
                        this.adaptData(data);
                    })
            },
            getOptions() {
                let self = this;
                $.when(schoolList())
                    .then(function(res) {
                        let schoolList = res.data.orgschools;
                        schoolList.forEach(function(item) {
                            item.value = item.id.toString();
                            item.label = item.name;
                        });
                        self.schoolOptions = schoolList;
                        self.schoolOptions.splice(0, 0, {value: '-1', label: '请选择'});
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
                this.schoolId = -1;  
            }
        },
    	events: {
    	},
    	computed: {
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