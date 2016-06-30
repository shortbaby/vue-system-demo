<template>
    <div class="detail-base-course">
        <ul class="info-header">
            <li>
                <h2>{{info.name}}</h2>
                <p>{{info.number}}</p>
                <div>{{info.classesStatus}}</div>
            </li>

            <li class="info-item-wrap">
                <div class="info-item">
                    <div>{{info.totalLesson}}</div>
                    <label>总课时</label>
                </div>
                <div class="info-item">
                    <div>{{info.passedLessons}}</div>
                    <label>已上课时</label>
                </div>
            </li>
            <li class="info-item-wrap">
                <div class="info-item">
                    <div>{{info.schoolName}}</div>
                    <label>校区</label>
                </div>
                <div class="info-item">
                    <div>{{info.subjectName}}</div>
                    <label>课程分类</label>
                </div>
            </li>
            <li class="dynamic-item-wrap">
                 <div class="dynamic-item"  v-for="item in classesDetails">
                     <div>{{ item.finishLesson + '/' + item.totalLesson }}</div>
                     <label>{{ item.name }}</label>
                 </div>
            </li>
        </ul>

        <ul class="tabs">
            <li v-for="item in showDetailTabs" @click="changeTab(item.value)" :class="{active: currentTab == item.value}">{{ item.text }}</li>
        </ul>
        <div class="tabl-content" v-if="currentTab === 'arrangement'">
            <p>课节列表</p>
            <table class="table table-bordered" v-if="something" >
                <tr v-for="item in lessonInfo">
                    <td>{{ item.day }}</td>
                    <td>{{ item.section }}</td>
                    <td>{{ item.lessonDetail }}</td>
                    <td>{{ item.roomName }}</td>
                    <td>{{ item.teacherName }}</td>
                </tr>
            </table>

            <div v-if="nothing" class="none-list">
                <span>没有课节信息</span>
            </div>
        </div>
        <div class="tabl-content detail-item-wrap" v-if="currentTab === 'information'">
            <div>
                <label>课程总价</label>
                <div>{{ info.totalPrice | money }}</div>
            </div>
            <div>
                <label>课程单价</label>
                <div>{{ info.price | money }}</div>
            </div>
            <div>
                <label>优惠价格</label>
                <div>{{ info.discount | money }}</div>
            </div>
            <div>
                <label>课程分类</label>
                <div>{{ info.subjectName }}</div>
            </div>
            <div>
                <label>校区</label>
                <div>{{ info.schoolName }}</div>
            </div>
            <div>
                <label>总课时</label>
                <div>{{ info.totalLesson }}</div>
            </div>
            <div>
                <label>班级班制</label>
                <div>{{ info.classesType }}</div>
            </div>
            <div>
                <label>人数</label>
                <div>{{ info.capacity }}</div>
            </div>
            <div>
                <label>开班日期</label>
                <div>{{ info.startTime }}</div>
            </div>
            <div>
                <label>预计结束日期</label>
                <div>{{ info.expectedEndTime }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import getSelectOptions from '../../../common/function/getSelectOptions';
    import { getTimeStr, getTimestamp, getOptionValue } from '../../../common/util/tool';
    import config from '../config';
    import { getSubjectList, getInfo } from '../request';

    export default {
        created () {
            this.getInfo();
        },
        props: {
            id: {
                type: Number,
                default: -1
            }
        },
        computed: {
            something() {
                return this.lessonInfo && (this.lessonInfo.length > 0);
            },
            nothing () {
                return this.lessonInfo && (this.lessonInfo.length === 0);
            }
        },
        data () {
            return {
                showDetailTabs: config.detailTabs,
                currentTab: 'arrangement',
                info: {
                    name: '',
                    number: 0
                },
                lessonInfo: [],
                classesDetails: [],
                header: config.lessonHeader
            };
        },
        methods: {
            changeTab (tab) {
                this.currentTab = tab;
            },
            getInfo () {
                getInfo({
                    classesId: this.id
                })
                .then( (res) => {
                    let data = res.data.classesInfo.info;

                    data.startTime = getTimeStr(data.startTime, 'yyyy-MM-dd');
                    if (typeof data.expectedEndTime === 'number') {
                        data.expectedEndTime = getTimeStr(data.expectedEndTime, 'yyyy-MM-dd');
                    } else {
                        data.expectedEndTime = '';
                    }

                    data.classesType = config.getType(data.classesType);
                    data.classesStatus = config.getStatus(data.classesStatus);

                    data.price = data.price / 100;
                    data.totalPrice = data.totalPrice / 100;

                    let discount = data.discount / 100;
                    if (typeof discount !== 'number') {
                        data.discount = 0;
                    } else {
                        data.discount = discount;
                    }

                    this.info = data;

                    this.classesDetails = res.data.classesInfo.classesDetails;

                    let lessonInfo = res.data.summarys;
                    lessonInfo.forEach(
                        (item) => {
                            item.lessonDetail = `${item.subTypeName}第${item.index}节`;
                        }
                    )
                    this.lessonInfo = lessonInfo;

                });
            }
        }
    };

</script>