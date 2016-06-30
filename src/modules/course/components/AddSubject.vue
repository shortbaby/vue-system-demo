<template>
    <div>
        <modal :show.sync="show" :width="420">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">新增课程分类</h4>
                <span class="icon-times" title="关闭" @click.stop="hideAdd()"></span>
            </div>
            <div slot="modal-body" class="modal-body">
                <form onsubmit="return false" id="subjectForm" v-form name="subjectForm" class="clearfix">

                    <div class="form-group">
                        <label class="required">课程分类名称</label>
                        <span class="red" v-if="isEmpty('name')">课程分类名称必填</span>
                        <input type="text" maxlength="20" placeholder="请输入课程分类名称" class="one" v-form-ctrl required v-model="form.name" name="name">
                    </div>

                    <div class="form-group">
                        <label class="required">课程分类编码</label>
                        <span class="red" v-if="isEmpty('code')">课程分类编码必填</span>
                        <input type="text" maxlength="5" placeholder="请输入课程分类编码必填,例如: TO" class="one" v-form-ctrl required v-model="form.code" name="code">
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
    import { saveSubject, editSubject } from '../request';
    import { isEmpty } from '../../../common/util/tool';

    export default {
        created () {
            if (this.target && this.target.id >= 0) {
                this.prepare();
            }
        },
        data() {
            return {
                subjectForm: {},
                form: {
                    name: '',
                    code: ''
                }
            }
        },
        props: {
            show: {
                type: Boolean,
                default: false,
                twoWay: true
            },
            target: {
                type: Object,
                default: {}
            }
        },
        beforeDestroy () {
            this.target = null;
        },
        vuex: {
            getters:　{
            },
            actions: {
                hideAdd: ({ dispatch }) => {
                    dispatch('HIDE_ADD_SUBJECT');
                }
            }
        },
        methods: {
            isEmpty (field) {
                return isEmpty(this.subjectForm, field);
            },
            prepare () {
                this.form.name = this.target.name;
                this.form.code = this.target.code;
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
                let subjectForm = this.subjectForm;
                subjectForm.$submitted = true;

                if (subjectForm.$valid) {
                    let data = {
                        subjectName: form.name,
                        code: form.code
                    };
                    let promise;
                    if (this.target && this.target.id) {
                        data.id = this.target.id;
                        promise = editSubject(data);
                    } else {
                        promise = saveSubject(data);
                    }
                    return promise.then( () => {
                        dispatch('TOAST', '保存成功', 'success');
                        dispatch('HIDE_ADD_SUBJECT');
                        this.$dispatch('saveSuccess');
                    });
                } else {
                    $('.modal.in').scrollTop(0);
                }
            }
        },
        components: {
            Modal: Modal
        }
    }
</script>
<style>
</style>