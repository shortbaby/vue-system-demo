<template>
    <div>
        <modal :show.sync="show" :width="760">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title" v-if="id >= 0">编辑老师</h4>
                <h4 class="modal-title" v-else>新增老师</h4>
                <span class="icon-times" title="关闭" @click.stop="hideAdd()"></span>
            </div>
            <div slot="modal-body" class="modal-body">
                <form onsubmit="return false" id="teacherForm" v-form name="teacherForm" class="clearfix">

                    <div class="form-group">
                        <h3>
                            <label class="required">姓名</label>
                            <span class="red" v-if="isEmpty('name')">姓名为必填项</span>
                            <span class="red" v-if="teacherForm.name.$error.pattern && (teacherForm.name.$dirty || teacherForm.$submitted)">不能包含特殊字符</span>
                        </h3>
                        <input type="text" maxlength="20" pattern="^[a-zA-Z0-9\u4e00-\u9fa5]+$" placeholder="请输入老师姓名" v-form-ctrl required v-model="form.name" class="normal" name="name">
                    </div>

                    <div class="form-group">
                        <h3>
                            <label class="required">手机号</label>
                            <span class="red" v-if="isEmpty('mobile')">必填</span>
                            <span class="red" v-if="teacherForm.mobile.$error.pattern && (teacherForm.mobile.$dirty || teacherForm.$submitted)">手机格式不正确</span>
                        </h3>
                        <input type="text" maxlength="11" placeholder="手机号" pattern="1\d{10}" v-form-ctrl v-model="form.mobile" name="mobile" required>
                    </div>

                    <div class="form-group">
                        <h3><label class="required">老师类型</label></h3>
                        <v-select :options="userTypeOptions" :close-on-select="true" :value.sync="form.userType | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3><label class="required">所属校区</label></h3>
                        <v-select :options="schoolOptions" :close-on-select="true" :value.sync="form.schoolId | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3><label class="required">教授科目</label></h3>
                        <div class="option-item" v-for="item in subjectOptions">
                            <input type="checkbox" :value="item.value" v-model="form.subjectIds">
                            <span>{{ item.label }}</label>
                        </div>
                    </div>

                    <div class="form-group">
                        <h3><label class="required">状态</label></h3>
                        <v-select :options="statusOptions" :close-on-select="true" :value.sync="form.status | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3><label class="required">性别</label></h3>
                        <v-select :options="genderOptions" :close-on-select="true" :value.sync="form.gender | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3><label>入职日期</label></h3>
                        <div class="date" @click.stop="popCalendar('start')">
                            <input readonly type="text" v-model="form.startTime" class="medium">
                            <calendar v-if="calendarState.start" :x="0" :y="50" :show.sync="calendarState.start" :value.sync="form.startTime"></calendar>
                        </div>
                    </div>

                    <div class="form-group">
                        <h3><label>紧急联系人</label></h3>
                        <span class="red" v-if="teacherForm.emergencyContact.$error.pattern && (teacherForm.emergencyContact.$dirty || teacherForm.$submitted)">不能包含特殊字符</span>
                        <input type="text" maxlength="20" pattern="^[a-zA-Z0-9\u4e00-\u9fa5]+$" v-form-ctrl name="emergencyContact" v-model="form.emergencyContact" class="normal">
                    </div>

                    <div class="form-group">
                        <h3>
                            <label>联系人手机号</label>
                            <span class="red" v-if="teacherForm.contactMobile.$error.pattern && (teacherForm.contactMobile.$dirty || teacherForm.$submitted)">手机格式不正确</span>
                        </h3>
                        <input type="text" maxlength="11" placeholder="手机号" pattern="1\d{10}" v-form-ctrl v-model="form.contactMobile" name="contactMobile">
                    </div>

                    <div class="form-group">
                        <h3><label>住址</label></h3>
                        <input type="text" maxlength="100" v-form-ctrl name="address" v-model="form.address" class="normal">
                    </div>

                    <div class="form-group">
                        <h3><label>毕业院校</label></h3>
                        <input type="text" maxlength="100" v-form-ctrl name="graduateSchool" v-model="form.graduateSchool" class="normal">
                    </div>

                    <div class="form-group">
                        <h3><label>最高学历</label></h3>
                        <v-select :options="educationOptions" :close-on-select="true" :value.sync="form.education | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3><label>留学国家</label></h3>
                        <span class="red" v-if="teacherForm.studyCountry.$error.pattern && (teacherForm.studyCountry.$dirty || teacherForm.$submitted)">不能包含特殊字符</span>
                        <input type="text" maxlength="40" pattern="^[a-zA-Z0-9\u4e00-\u9fa5]+$" v-form-ctrl name="studyCountry" v-model="form.studyCountry" class="normal">
                    </div>

                    <div class="form-group">
                        <h3><label>授课经验(年)</label></h3>
                        <select class="form-control" v-model="form.schoolAge" style="width:40%;height:38px;">
                            <option v-for="item in yearOptions" value="{{ item }}">{{ item }}</option>
                        <select>
                    </div>

                    <div class="form-group" v-if="id >= 0">
                        <h3><label>离职日期</label></h3>
                        <div class="date" @click.stop="popCalendar('end')">
                            <input readonly type="text" v-model="form.endTime" class="medium">
                            <calendar v-if="calendarState.end" :x="0" :y="50" :show.sync="calendarState.end" :value.sync="form.endTime"></calendar>
                        </div>
                    </div>

                    <div class="form-group" v-if="id >= 0">
                        <h3><label>离职原因</label></h3>
                        <textarea name="resignedReason" v-model="form.resignedReason">
                        </textarea>
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
    import Modal from '../../../../../dep/vue-strap/src/Modal.vue';
    import Calendar from '../../../../common/components/Calendar.vue';
    import Select from '../../../../../dep/vue-strap/src/Select.vue';
    import { getOptions, getInfo, save, saveEdit } from '../request';
    import config from '../config';
    import { isEmpty, isFormatError, getTimeStr, getTimestamp, optionMap, getYearOptions } from '../../../../common/util/tool';

    export default {
        created () {
            if (this.id >= 0) {
                this.prepareData4Edit();
            } else {
                this.prepareData4Add();
            }
        },
        beforeDestroy () {
            this.id = -1;
        },
        data() {
            return {
                calendarState: {
                    start: false,
                    end: false
                },
                teacherForm: {},
                form: {
                    name: '',
                    mobile: '',
                    schoolId: -1,
                    subjectIds: [],
                    gender: -1,
                    status: -1,
                    userType: -1,
                    startTime: Date.format(new Date(), 'yyyy/MM/dd'),
                    endTime: '',
                    emergencyContact: '',
                    contactMobile: null,
                    address: '',
                    graduateSchool: '',
                    education: -1,
                    studyCountry: '',
                    schoolAge: '',
                    resignedReason: ''
                },
                statusOptions: config.statusOptions,
                userTypeOptions: config.userTypeOptions,
                genderOptions: config.genderOptions,
                educationOptions: config.educationOptions,
                yearOptions: getYearOptions(30),
                schoolOptions: [],
                subjectOptions: []
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
                hideAdd: ({ dispatch }) => {
                    dispatch('HIDE_ADD');
                }
            }
        },
        methods: {
            isEmpty (field) {
                return isEmpty(this.teacherForm, field);
            },

            isFormatError (field) {
                return isFormatError(this.teacherForm, field);
            },

            popCalendar (target) {
                let state = this.calendarState;
                for (let k in state) {
                    state[k] = false;
                }
                state[target] = true;
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
                debugger
                let form = this.form;
                let teacherForm = this.teacherForm;
                teacherForm.$submitted = true;

                let startTime = getTimestamp(form.startTime);
                let endTime = getTimestamp(form.endTime);
                if (startTime && endTime) {
                    if (startTime > endTime) {
                        dispatch('TOAST', "离职日期不能小于入职日期");
                        return;
                    }
                }

                if (form.schoolId < 0) {
                    dispatch('TOAST', "所属校区必选");
                    return;
                } else if (form.userType < 0) {
                    dispatch('TOAST', "老师类型必选");
                    return;
                } else if (form.subjectIds.length === 0) {
                    dispatch('TOAST', "所授科目至少选择一项");
                    return;
                } else if (form.gender < 0) {
                    dispatch('TOAST', "性别必选");
                    return;
                } else if (form.status < 0) {
                    dispatch('TOAST', "状态必选");
                    return;
                }

                if (teacherForm.$valid) {
                    let data = {
                        name: form.name,
                        mobile: form.mobile,
                        schoolId: form.schoolId,
                        subjectIds: form.subjectIds.join(),
                        gender: form.gender,
                        status: form.status,
                        userType: form.userType,
                        entryTime: startTime,
                        emergencyContact: form.emergencyContact,
                        contactMobile: form.contactMobile,
                        address: form.address,
                        graduateSchool: form.graduateSchool,
                        education: form.education,
                        studyCountry: form.studyCountry,
                        schoolAge: form.schoolAge ? parseInt(form.schoolAge) : null,
                    };
                    let promise;
                    if (this.id >= 0) {
                        data.id = this.id;
                        data.resignedTime = endTime;
                        data.resignedReason = form.resignedReason;
                        promise = saveEdit(data);
                    } else {
                        promise = save(data);
                    }
                    return promise.then( () => {
                        dispatch('TOAST', '保存成功', 'success');
                        dispatch('HIDE_ADD');
                        this.$dispatch('saveSuccess');
                    });
                } else {
                    $('.modal.in').scrollTop(0);
                }
            },

            prepareData4Add () {
                getOptions()
                    .then( (res) => {
                        this.schoolOptions = optionMap(res.data.orgschools, true);
                        this.subjectOptions = optionMap(res.data.subjects);
                    }, () => {
                        console.log('网络错误');
                    })
            },

            prepareData4Edit () {
                this.prepareData4Add();

                getInfo({
                    id: this.id
                })
                .then( (res) => {
                    let data = res.data;
                    let startTime = data.entryTime;
                    let endTime = data.resignedTime;

                    if (typeof endTime === 'number') {
                        data.startTime = getTimeStr(data.entryTime, 'yyyy/MM/dd');
                    } else {
                        data.startTime = '';
                    }
                    if (typeof endTime === 'number') {
                        data.endTime = getTimeStr(data.resignedTime, 'yyyy/MM/dd');
                    } else {
                        data.endTime = '';
                    }

                    this.form = data;
                })
            }
        },
        components: {
            Modal: Modal,
            Calendar: Calendar,
            vSelect: Select
        }
    }
</script>
<style>
</style>