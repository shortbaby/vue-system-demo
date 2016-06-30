<template>
    <div>
        <modal :show.sync="show" :width="760">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title" v-if="id >= 0">编辑教室</h4>
                <h4 class="modal-title" v-else>新增教室</h4>
                <span class="icon-times" title="关闭" @click.stop="hideAdd()"></span>
            </div>
            <div slot="modal-body" class="modal-body">
                <form onsubmit="return false" id="classroomForm" v-form name="classroomForm" class="clearfix">

                    <div class="form-group">
                        <h3>
                            <label class="required">教室名称</label>
                            <span class="red" v-if="isEmpty('name')">教室名称为必填项</span>
                        </h3>
                        <input type="text" maxlength="20" placeholder="请输入教室名称" v-form-ctrl required v-model="form.name" name="name">
                    </div>

                    <div class="form-group">
                        <h3>
                            <label class="required">教室容量</label>
                            <span class="red" v-if="isEmpty('capacity')">教室容量为必填项</span>
                            <span class="red" v-if="isFormatError('capacity')">教室容量格式不正确</span>
                        </h3>
                        <input type="number" maxlength="3" placeholder="请输入教室名称" v-form-ctrl required v-model="form.capacity" name="capacity">
                    </div>

                    <div class="form-group">
                        <h3>
                            <label class="required">所属校区</label>
                        </h3>
                        <v-select :options="schoolOptions" :close-on-select="true" :value.sync="form.schoolId | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3>
                            <label>状态</label>
                        </h3>
                        <v-select :options="statusOptions" :close-on-select="true" :value.sync="form.status | str"></v-select>
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
    import Select from '../../../../../dep/vue-strap/src/Select.vue';
    import { getOptions, getInfo, save, saveEdit } from '../request';
    import config from '../config';
    import { isEmpty, isFormatError, optionMap } from '../../../../common/util/tool';

    export default {
        created () {
            if (this.id >= 0) {
                this.prepareData4Edit();
            } else {
                this.prepareData4Add();
            }
        },
        data() {
            return {
                calendarState: {
                    start: false,
                    end: false
                },
                classroomForm: {},
                form: {
                    name: '',
                    capacity: null,
                    schoolId: -1,
                    status: -1
                },
                statusOptions: config.statusOptions,
                schoolOptions: []
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
                return isEmpty(this.classroomForm, field);
            },

            isFormatError (field) {
                return isFormatError(this.classroomForm, field);
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
                let classroomForm = this.classroomForm;
                classroomForm.$submitted = true;

                if (form.schoolId < 0) {
                    dispatch('TOAST', "所属校区必选");
                    return;
                }

                if (classroomForm.$valid) {
                    let data = {
                        name: form.name,
                        capacity: parseInt(form.capacity),
                        schoolId: form.schoolId,
                        status: form.status
                    };
                    let promise;
                    if (this.id >= 0) {
                        data.id = this.id;
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
                    this.form = res.data;
                })
            }
        },
        beforeDestroy () {
            this.id = -1;
        },
        components: {
            Modal: Modal,
            vSelect: Select
        }
    }
</script>
<style>
</style>