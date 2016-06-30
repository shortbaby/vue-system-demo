<template>
    <div>
        <modal :show.sync="show" :width="830">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title" v-if="id >= 0">编辑渠道</h4>
                <h4 class="modal-title" v-else>新增渠道</h4>
                <span class="icon-times" title="关闭" @click.stop="hideAdd()"></span>
            </div>
            <div slot="modal-body" class="modal-body">
                <form onsubmit="return false" id="classroomForm" v-form name="classroomForm" class="clearfix">

                    <div class="form-group">
                        <label class="required">渠道名称</label>
                        <span class="red" v-if="isEmpty('name')">渠道名称为必填项</span>
                        <input type="text" maxlength="20" placeholder="请输入渠道名称" v-form-ctrl required v-model="form.name" class="normal" name="name">
                    </div>

                    <div class="form-group">
                        <label class="required">渠道返点率</label>
                        <span class="red" v-if="isEmpty('rebate')">渠道返点率为必填项</span>
                        <span class="red" v-if="isFormatError('rebate')">渠道返点率格式不正确</span>
                        <input type="number" maxlength="3" placeholder="请输入渠道返点率(只能输入数字)" v-form-ctrl required v-model="form.rebate" class="normal" name="rebate">
                    </div>

                    <div class="form-group">
                        <label>状态</label>
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
            }
        },
        beforeDestroy () {
            this.id = -1;
        },
        data() {
            return {
                classroomForm: {},
                form: {
                    name: '',
                    rebate: null,
                    status: -1
                },
                statusOptions: config.statusOptions
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

                if (classroomForm.$valid) {
                    let data = {
                        name: form.name,
                        rebate: parseInt(form.rebate),
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

            prepareData4Edit () {
                getInfo({
                    id: this.id
                })
                .then( (res) => {
                    this.form = res.data;
                })
            }
        },
        components: {
            Modal: Modal,
            vSelect: Select
        }
    }
</script>
<style>
</style>