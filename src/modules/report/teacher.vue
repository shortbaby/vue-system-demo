<template>
    <div class="report-wrap teacher-wrap">
        <div class="table-container">
            <table class="table table-striped">
                <tr>
                    <td>班主任</td>
                    <td>总学生数</td>
                    <td>今日学生数</td>
                    <td>今日任务计划</td>
                    <td>今日实际完成</td>
                    <td>今日逾期任务</td>
                </tr>
                <tr v-for="item in list" track-by="$index">
                    <td>{{item.adviserName}}</td>
                    <td>{{item.totalStudentNum}}</td>
                    <td>{{item.todayStudentNum}}</td>
                    <td>{{item.totalTaskNum}}</td>
                    <td>{{item.completeTaskNum}}</td>
                    <td>{{item.expiredTaskNum}}</td>
                </tr>
            </table>
        </div>  
    </div>
</template>

<script>
    import Calendar from '../../common/components/Calendar.vue';
    import {getAdviserReport} from './request';
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
                list: []
    		}
    	},
        created() {
            this.getReportData();
        },
        methods: {
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
            getReportData() {
                let param = {};
                if (this.startTime.length > 0) {
                    $.extend(param, {
                        startTime: new Date().fromFormattedString(this.startTime, 'yyyy/MM/dd').getTime()
                    })
                }
                if (this.endTime.length > 0) {
                    $.extend(param, {
                        endTime: new Date().fromFormattedString(this.endTime, 'yyyy/MM/dd').getTime()
                    })
                }
                getAdviserReport(param)
                    .then((res) => {
                        this.list = res.data;
                    })
            },
            search() {
                this.getReportData();
            },
            reset() {
                this.startTime = '';
                this.endTime = '';   
            }
        },
        components: {
            Calendar: Calendar
        }
    }
</script>

<style lang="sass">
</style>