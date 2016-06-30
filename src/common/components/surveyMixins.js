'use strict';
import Calendar from './Calendar.vue';
import { saveQuestionnaire, getQuestionnaire } from '../request';
export default {
    data() {
        return {
            data: $.parseJSON('{"future":{"country":"","budget":0,"subject":"","course":"","studyTimes":[]},"beforeScore":[{"subject":"","time":"","total":0,"read":0,"listen":0,"speak":0,"article":0}],"beforeStudy":[{"time":"","subject":"","org":"","teacher":"","pratice":"","teacherComment":""}],"beforeAbroad":[{"time":"","subject":"","testTime":""}],"coursePlan":[{"time":"","class":"","content":""}],"demandForScore":"","demandForStudent":"","demandForCourse":"","demandForTimeOrAddress":"","relationship":"","other":""}')
        }
    },
    props: {
        id: {
            type: Number,
            default: 0,
            twoWay: true
        }
    },
    methods: {
        checkBudget(event) {
            let target=$(event.target);
            if (isNaN(target.val()) || parseFloat(target.val()) < 0 || parseFloat(target.val()) > 1000000000) {
                dispatch('TOAST', '请输入正确的学习预算');
                target.addClass('error');
            } else {
                target.removeClass('error');
            }
        },
        checkScore(event) {
            let target=$(event.target);
            if (isNaN(target.val()) || parseFloat(target.val()) < 0 || parseFloat(target.val()) > 1000) {
                dispatch('TOAST', '请输入正确的分数');
                target.addClass('error');
            } else {
                target.removeClass('error');
            }
        },
        addNewBeforeScore() {
            let item = {
                subject: "",
                time: "",
                total: 0,
                read: 0,
                listen: 0,
                speak: 0,
                article: 0
            };
            this.data.beforeScore.push(item);
        },
        delBeforeScore(index) {
            this.data.beforeScore.splice(index, 1);
        },
        addNewBeforeStudy() {
            let item = {
                item: "",
                subject: "",
                org: "",
                teacher: "",
                pratice: "",
                teacherComment: ""
            };
            this.data.beforeStudy.push(item);
        },
        delBeforeStudy(index) {
            this.data.beforeStudy.splice(index, 1);
        },
        addNewBeforeAbroad() {
            let item = {
                time: "",
                subject: "",
                testTime: ""
            };
            this.data.beforeAbroad.push(item);
        },
        delBeforeAbroad(index) {
            this.data.beforeAbroad.splice(index, 1);
        },
        addNewCoursePlan() {
            let item = {
                item: "",
                class: "",
                content: ""
            };
            this.data.coursePlan.push(item);
        },
        delCoursePlan(index) {
            this.data.coursePlan.splice(index, 1);
        },
        getDetail() {
            let self = this;
            let params = {
                id: this.id
            }
            getQuestionnaire(params)
                .then(function(res) {
                    let data = res.data.content;
                    self.data = $.parseJSON(data);
                })
        },
        save(event) {
            let target = $(event.target);
            let self = this;
            let dataStr = JSON.stringify(self.data);
            let params = {
                id: this.id,
                content: dataStr
            }
            target.prop('disable', true);
            saveQuestionnaire(params)
                .then(function(res) {
                    if (res.code == 0) {
                        dispatch('TOAST', '保存调查问卷成功', 'success');
                    }
                })
                .always(function() {
                    target.prop('disable', false);
                })
        }
    },
    created() {
        var self = this;
        self.getDetail();
    }
}
