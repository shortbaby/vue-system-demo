<template>
    <div>
        <modal :show.sync="show" :width="800">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title" v-if="id >= 0">编辑用户</h4>
                <h4 class="modal-title" v-else>新增用户</h4>
                <span class="icon-times" title="关闭" @click.stop="hideAdd()"></span>
            </div>
            <div slot="modal-body" class="modal-body">
                <form onsubmit="return false" id="userForm" v-form name="userForm" class="clearfix">

                    <div class="form-group">
                        <h3>
                            <label class="required">姓名</label>
                            <span class="red" v-if="isEmpty('name')">姓名为必填项</span>
                            <span class="red" v-if="userForm.name.$error.pattern && (userForm.name.$dirty || userForm.$submitted)">不能包含特殊字符</span>
                        </h3>
                        <input type="text" maxlength="20" pattern="^[a-zA-Z0-9\u4e00-\u9fa5]+$" placeholder="请输入用户姓名" v-form-ctrl required v-model="form.name" class="normal" name="name">
                    </div>

                    <div class="form-group">
                        <h3>
                            <label class="required">手机号</label>
                            <span class="red" v-if="isEmpty('mobile')">必填</span>
                            <span class="red" v-if="userForm.mobile.$error.pattern && (userForm.mobile.$dirty || userForm.$submitted)">手机格式不正确</span>
                        </h3>
                        <input maxlength="11" placeholder="手机号" name="mobile" v-form-ctrl required pattern="1\d{10}" v-model="form.mobile" >
                    </div>

                    <div class="form-group">
                        <h3><label class="required">员工类型</label></h3>
                        <v-select :options="userTypeOptions" :close-on-select="true" :value.sync="form.userType | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3><label class="required">所属校区</label></h3>
                        <v-select :options="schoolOptions" :close-on-select="true" :value.sync="form.schoolId | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3><label class="required">职位</label></h3>
                        <div class="clearfix">
                            <div class="option-item" v-for="item in titleOptions">
                                <input type="checkbox" :value="item.value" v-model="form.roleId">
                                <span>{{ item.label }}</label>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <h3><label>直属上级</label></h3>
                        <inference-input placehoder="请输入接手人姓名" :query.sync="form.supervisorName" :on-hit="receive" :on-blur="checkSuperVisor" :request="queryAction"></inference-input>
                        <input type="hidden" v-model="form.superVisor">
                    </div>

                    <div class="form-group">
                        <h3><label>可操作校区</label></h3>
                        <div class="option-wrap clearfix">
                            <div class="option-all"><input @change="selectAllSchools($event)" type="checkbox"><span>全部校区</span></div>
                            <div class="option-item" v-for="item in schoolOptions.slice(1)">
                                <input type="checkbox" :value="item.value" v-model="form.operateSchoolIds">
                                <span>{{ item.label }}</label>
                            </div>
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
                        <h3><label>紧急联系人</label>
                        <span class="red" v-if="userForm.emergencyContact.$error.pattern && (userForm.emergencyContact.$dirty || userForm.$submitted)">不能包含特殊字符</span>
                        <input type="text" maxlength="20" v-form-ctrl name="emergencyContact" pattern="^[a-zA-Z0-9\u4e00-\u9fa5]+$" v-model="form.emergencyContact" class="normal">
                    </div>

                    <div class="form-group">
                        <h3>
                            <label>联系人手机号</label>
                            <span class="red" v-if="userForm.contactMobile.$error.pattern && (userForm.contactMobile.$dirty || userForm.$submitted)">格式不正确</span>
                        </h3>
                        <input maxlength="11" placeholder="手机号" name="contactMobile"  v-form-ctrl pattern="1\d{10}" v-model="form.contactMobile">
                    </div>

                    <div class="form-group">
                        <h3>
                            <label>住址</label>
                            <span class="red" v-if="userForm.address.$error.pattern && (userForm.address.$dirty || userForm.$submitted)">格式不正确</span>
                        </h3>
                        <input type="text" maxlength="100" pattern="^[a-zA-Z0-9\u4e00-\u9fa5]+$"
                        v-form-ctrl name="address" v-model="form.address">
                    </div>

                    <div class="form-group">
                        <h3>
                            <label>毕业院校</label>
                            <span class="red" v-if="userForm.graduateSchool.$error.pattern && (userForm.graduateSchool.$dirty || userForm.$submitted)">格式不正确</span>
                        </h3>
                        <input type="text" maxlength="40" v-model="form.graduateSchool"
                        pattern="^[a-zA-Z0-9\u4e00-\u9fa5]+$" v-form-ctrl name="graduateSchool">
                    </div>

                    <div class="form-group">
                        <h3><label>最高学历</label></h3>
                        <v-select :options="educationOptions" :close-on-select="true" :value.sync="form.education | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3>
                            <label>留学国家</label>
                            <span class="red" v-if="userForm.studyCountry.$error.pattern && (userForm.studyCountry.$dirty || userForm.$submitted)">格式不正确</span>
                        </h3>
                        <input type="text" maxlength="20" v-model="form.studyCountry" pattern="^[a-zA-Z0-9\u4e00-\u9fa5]+$"
                        v-form-ctrl name="studyCountry">
                    </div>

                    <div class="form-group">
                        <h3><label>工作经验(年)</label></h3>
                        <select class="form-control" v-model="form.schoolAge" style="height: 38px; width: 40%;">
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
    import InferenceInput from '../../../../common/components/InferenceInput.vue';
    import { getOptions, inference, getInfo, save, saveEdit } from '../request';
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
                userForm: {},
                form: {
                    name: '',
                    mobile: '',
                    schoolId: -1,
                    roleId: [],
                    operateSchoolIds: [],
                    superVisor: -1,
                    supervisorName: '',
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
                    schoolAge: null,
                    resignedReason: ''
                },
                statusOptions: config.statusOptions,
                userTypeOptions: config.userTypeOptions,
                genderOptions: config.genderOptions,
                educationOptions: config.educationOptions,
                yearOptions: getYearOptions(30),
                schoolOptions: [],
                titleOptions: [],
                superVisorOptions: [],
                queryAction: () => {
                    return inference( { name: this.form.supervisorName } );
                },
                cachedSuperVisorName: null
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
            selectAllSchools (e) {
                if (e.target.checked) {
                    this.form.operateSchoolIds =
                        this.schoolOptions.slice(1).map(
                                (item) => { return item.value; }
                            );
                } else {
                    this.form.operateSchoolIds = [];
                }
            },

            receive (data) {
                this.form.superVisor = data.id;
                this.cachedSuperVisorName = this.form.supervisorName;
            },

            isEmpty (field) {
                return isEmpty(this.userForm, field);
            },

            isFormatError (field) {
                return isFormatError(this.userForm, field);
            },

            checkSuperVisor () {
                if (this.form.superVisor < 0 && this.form.supervisorName) {
                    this.form.supervisorName = '';
                } else if (this.form.supervisorName !== this.cachedSuperVisorName) {
                    this.form.supervisorName = '';
                }
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
                let form = this.form;
                let userForm = this.userForm;
                userForm.$submitted = true;

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
                    dispatch('TOAST', "用户类型必选");
                    return;
                } else if (form.roleId.length === 0) {
                    dispatch('TOAST', "职位至少选择一项");
                    return;
                } else if (this.id >= 0 && (this.id === form.superVisor)) {
                    dispatch('TOAST', "直属上司不能是自己");
                    return;
                }
                // else if (form.gender < 0) {
                //     dispatch('TOAST', "性别必选");
                //     return;
                // } else if (form.status < 0) {
                //     dispatch('TOAST', "状态必选");
                //     return;
                // }
                if (userForm.$valid) {
                    let data = {
                        name: form.name,
                        mobile: form.mobile,
                        schoolId: form.schoolId,
                        roleId: form.roleId.join(),
                        operateSchoolIds: form.operateSchoolIds.join(),
                        superVisor: form.superVisor,
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
                        schoolAge: form.schoolAge
                    };

                    let promise;
                    if (this.id >= 0) {
                        data.id = this.id;
                        data.resignedTime = endTime;
                        data.resignedReason = form.resignedReason;
                        if (!form.supervisorName) {
                            data.superVisor = -1;
                        }
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
                        this.titleOptions = optionMap(res.data.roles);
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

                    data.roleId = data.roleIds;

                    for (var key in data) {
                        if (data[key] || typeof data[key] == 'number') {
                            this.form[key] = data[key];
                        }
                    }
                })
            }
        },
        components: {
            Modal: Modal,
            Calendar: Calendar,
            vSelect: Select,
            InferenceInput: InferenceInput
        }
    }
</script>
<style>
</style>