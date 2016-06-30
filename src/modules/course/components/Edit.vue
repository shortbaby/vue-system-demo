<template>
    <div>
        <modal :show.sync="show" :width="760">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">编辑课程</h4>
                <span class="icon-times" title="关闭" @click.stop="hideEdit()"></span>
            </div>
            <div slot="modal-body" class="modal-body">
                <form onsubmit="return false" id="courseEditForm" v-form name="courseForm" class="clearfix">

                    <div class="form-group">
                        <h3>
                        <label class="required">课程名称</label>
                        <span class="red" v-if="isEmpty('name')">课程名称为必填项</span>
                        <span class="red" v-if="courseForm.name.$error.pattern && (courseForm.name.$dirty || courseForm.$submitted)">不能包含特殊字符</span>
                        </h3>
                        <input type="text" maxlength="20" pattern="^[a-zA-Z0-9\u4e00-\u9fa5]+$" placeholder="请输入课程名称" v-form-ctrl required v-model="form.name" class="normal" name="name">
                    </div>

                    <div class="form-group">
                        <h3>
                        <label class="required">课程分类</label>
                        </h3>
                        <v-select :options="subjectOptions" :close-on-select="true" :value.sync="form.subjectId | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3>
                        <label class="required">课程单价</label>
                        <span class="red" v-if="isEmpty('price')">课程单价为必填项</span>
                        <span class="red" v-if="isFormatError('price')">课程单价格式不正确</span>
                        </h3>
                        <input type="number" placeholder="请输入课程单价" v-form-ctrl name="price" v-model="form.price" class="small">
                    </div>

                    <div class="form-group">
                        <h3>
                        <label>优惠价格</label>
                        <span class="red" v-if="isFormatError('price')">优惠价格格式不正确</span>
                        </h3>
                        <input type="number" placeholder="请输入优惠价格"  name="discount" v-model="form.discount" class="small">
                    </div>

                    <div class="form-group">
                        <h3>
                        <label class="required">人数</label>
                        <span class="red" v-if="isEmpty('capacity')">容纳人数为必填项</span>
                        <span class="red" v-if="isFormatError('capacity')">容纳人数格式不正确</span>
                        </h3>
                        <input type="number" placeholder="请输入人数" v-form-ctrl name="capacity" v-model="form.capacity" class="small">
                    </div>

                    <div class="form-group">
                        <h3>
                        <label class="required">班级班制</label>
                        </h3>
                        <v-select :options="classesTypeOptions" :close-on-select="true" :value.sync="form.classesType | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3>
                        <label class="required">阶段</label>
                        </h3>
                        <v-select :options="studyPhaseOptions" :close-on-select="true" :value.sync="form.studyPhase | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3>
                        <label class="required">开班日期</label>
                        <span class="red" v-if="isEmpty('startTime')">容纳人数为必填项</span>
                        </h3>
                        <div class="date" @click.stop="popCalendar('courseStart')">
                            <input readonly type="text" v-model="form.startTime" v-form-ctrl name="startTime" class="medium">
                            <calendar v-if="calendarState.courseStart" :x="0" :y="50" :show.sync="calendarState.courseStart" :value.sync="form.startTime"></calendar>
                        </div>
                    </div>

                    <div class="form-group">
                        <h3>
                        <label class="required">预计结束时间</label>
                        </h3>
                        <div class="date" @click.stop="popCalendar('courseEnd')">
                            <input readonly type="text" v-model="form.endTime" v-form-ctrl name="endTime" class="medium">
                            <calendar v-if="calendarState.courseEnd" :x="0" :y="50" :show.sync="calendarState.courseEnd" :value.sync="form.endTime"></calendar>
                        </div>
                    </div>

                    <div class="form-group">
                        <h3>
                        <label class="required">校区</label>
                        </h3>
                        <v-select :options="schoolOptions" :close-on-select="true" :value.sync="form.schoolId | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3>
                        <label>课程信息</label>
                        </h3>
                        <textarea name="note" v-model="form.remarks">
                        </textarea>
                    </div>

                    <div class="form-group">
                        <h3>
                            <label class="required">课程详情</label>
                        </h3>
                        <div class="item-course-detail" v-for="item in classesDetails">
                               <v-select :options="subTypeOptions" :close-on-select="true" :value.sync="item.subTypeId | str"></v-select>
                               <input type="number" max="2" placeholder="课次" class="form-control" v-model="item.totalLesson">
                               <span v-if="$index === 0" class="icon-plus" @click.stop="addDetail"></span>
                               <span v-else class="icon-trash" @click.stop="removeDetail($index)"></span>
                        </div>
                    </div>

                </form>
            </div>
            <div slot="modal-footer">
                <div class="modal-footer">
                    <button @click.stop="submit($event)" class="btn btn-primary">保存</button>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
    import Modal from '../../../../dep/vue-strap/src/Modal.vue';
    import Calendar from '../../../common/components/Calendar.vue';
    import Select from '../../../../dep/vue-strap/src/Select.vue';
    import { getSchoolList, getSubjectList, getSubTypeList, getInfo, saveEdit } from '../request';
    import config from '../config';
    import { isEmpty, isFormatError, getTimeStr, getTimestamp, optionMap } from '../../../common/util/tool';

    export default {
        created () {
            this.prepare();
        },
        beforeDestroy () {
            this.id = -1;
            this.firstTime = true;
        },
        watch: {
            'form.subjectId': {
                handler (newV, oldV) {
                    if (this.firstTime) {
                        this.firstTime = false;
                        getSubTypeList({ subjectId: newV })
                            .then( (res) => {
                                this.subTypeOptions = optionMap(res.data, true);
                            })
                        return;
                    } else {
                        if (newV >= 0 && newV !== oldV) {
                            if (newV === this.cachedSubjectId) {
                                this.removedDetails = [];
                                this.classesDetails = $.extend(true, [], this.cachedClassesDetails);
                            } else {
                                getSubTypeList({ subjectId: newV })
                                    .then( (res) => {
                                        this.subTypeOptions = optionMap(res.data, true);
                                        this.removedDetails = $.extend(true, [], this.cachedClassesDetails);
                                        this.classesDetails =
                                            this.classesDetails.map(
                                                    (item) => {
                                                        let obj = {
                                                            subTypeId: -1,
                                                            totalLesson: item.totalLesson
                                                        };
                                                        if (item.id) {
                                                            obj.id = item.id;
                                                        }
                                                        return obj;
                                                    }
                                                );
                                    });
                            }
                        }
                    }
                }
            }
        },
        data() {
            return {
                firstTime: true,
                calendarState: {
                    courseStart: false,
                    courseEnd: false
                },
                courseForm: {},
                form: {
                    name: null,
                    subjectId: -1,
                    classesType: -1,
                    price: null,
                    discount: null,
                    capacity: null,
                    studyPhase: -1,
                    startTime: '',
                    endTime: '',
                    schoolId: -1,
                    remarks: ''
                },
                cachedSubjectId: null,
                cachedClassesDetails: null,
                schoolOptions: [],
                subjectOptions: [],
                studyPhaseOptions: config.studyPhaseOptions,
                classesTypeOptions: config.classesTypeOptions,
                classesDetails: [
                    {
                        subTypeId: -1,
                        totalLesson: null,
                    }
                ],
                removedDetails: [],
                subTypeOptions: [
                    {
                        value: -1,
                        label: '请选择'
                    }
                ]
            }
        },
        props: {
            show: {
                type: Boolean,
                default: false,
                twoWay: true
            },
            id: {
                type: Number,
                default: -1,
                twoWay: true
            }
        },
        vuex: {
            getters:　{
            },
            actions: {
                hideEdit: ({ dispatch }) => {
                    dispatch('HIDE_EDIT');
                }
            }
        },
        methods: {
            isEmpty (field) {
                return isEmpty(this.courseForm, field);
            },

            isFormatError (field) {
                return isFormatError(this.courseForm, field);
            },

            popCalendar (target) {
                let state = this.calendarState;
                for (let k in state) {
                    state[k] = false;
                }
                state[target] = true;
            },

            addDetail () {
                this.classesDetails
                        .push({
                            subTypeId: -1,
                            totalLesson: null
                        });
            },

            removeDetail (index) {
                let item = this.classesDetails[index];
                if (item.id) {
                    this.removedDetails.push(item);
                    this.classesDetails.splice(index, 1);
                } else {
                    this.classesDetails.splice(index, 1);
                }
            },

            submit (e) {
                let btn = $(e.target);
                btn.prop('disabled', true);

                let promise = this.save();
                if (promise && promise.always) {
                    promise.always(function () {
                        btn.prop('disabled', false);
                    });
                } else {
                    btn.prop('disabled', false);
                }
            },

            save () {
                let form = this.form;
                let courseForm = this.courseForm;
                courseForm.$submitted = true;

                let startTime = getTimestamp(form.startTime);
                let endTime = getTimestamp(form.endTime);
                if (startTime && endTime) {
                    if (startTime > endTime) {
                        dispatch('TOAST', "预计结束时间不能小于开班日期");
                        return;
                    }
                }

                if (form.subjectId < 0) {
                    dispatch('TOAST', "课程类型必选");
                    return;
                } else if (form.classesType < 0) {
                    dispatch('TOAST', "班级班制必选");
                    return;
                } else if (form.studyPhase < 0) {
                    dispatch('TOAST', "阶段必选");
                    return;
                } else if (form.schoolId < 0) {
                    dispatch('TOAST', "校区必选");
                    return;
                }

                let classesDetails =
                    this.classesDetails.filter(
                            (item) => {
                                return item.subTypeId !== -1;
                            }
                        );

                if (classesDetails.length === 0) {
                    dispatch('TOAST', "课程详情至少填写一项");
                    return;
                } else {
                    let notPassed;
                    classesDetails.forEach(
                            (item) => {
                                let count = parseInt(item.totalLesson);
                                if (!Number.isInteger(count)) {
                                    notPassed = true;
                                    return;
                                } else if (count <= 0) {
                                    notPassed = true;
                                    return;
                                }
                            }
                        )

                    if (notPassed) {
                        dispatch('TOAST', "课程详情填写不合格");
                        return;
                    }
                }

                if (courseForm.$valid) {
                    let data = {
                        id: this.id,
                        name: form.name,
                        subjectId: form.subjectId,
                        classesType: form.classesType,
                        price: form.price * 100,
                        discount: form.discount * 100,
                        capacity: form.capacity,
                        studyPhase: form.studyPhase,
                        startTime: startTime,
                        expectedEndTime: endTime,
                        schoolId: form.schoolId,
                        remarks: form.remarks,
                        removedDetails: this.removedDetails,
                        details: classesDetails
                    };

                    let promise = saveEdit(data);
                    return promise.then( () => {
                        dispatch('TOAST', '保存成功', 'success');
                        dispatch('HIDE_EDIT');
                        this.$dispatch('saveSuccess');
                    });
                } else {
                    $('.modal.in').scrollTop(0);
                }
            },

            getOptions () {
                $.when(getSchoolList(), getSubjectList())
                    .then( (res1, res2) => {
                        this.schoolOptions = optionMap(res1.data.orgschools, true);
                        this.subjectOptions = optionMap(res2.data.list, true);
                    }, () => {
                        console.log("网络错误");
                    });
            },

            prepare () {
                this.getOptions();

                getInfo({
                    classesId: this.id
                })
                .then( (res) => {
                    let data = res.data.classesInfo.info;
                    let endTime = data.expectedEndTime;

                    data.startTime = getTimeStr(data.startTime, 'yyyy/MM/dd');
                    if (typeof endTime === 'number') {
                        data.endTime = getTimeStr(data.expectedEndTime, 'yyyy/MM/dd');
                    } else {
                        data.endTime = '';
                    }

                    this.form = data;
                    this.form.price = this.form.price / 100;
                    this.form.discount = this.form.discount / 100;

                    let classesDetails = res.data.classesInfo.classesDetails;
                    this.classesDetails = classesDetails;

                    this.cachedSubjectId = data.subjectId;
                    this.cachedClassesDetails = $.extend(true, [], classesDetails);
                })
            },

        },
        components: {
            Modal: Modal,
            Calendar: Calendar,
            vSelect: Select
        }
    }
</script>
