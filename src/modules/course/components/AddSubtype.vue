<template>
    <div>
        <modal :show.sync="show" :width="420">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title" v-if="id >= 0">编辑课程分类</h4>
                <h4 class="modal-title" v-else>新增自类目</h4>
                <span class="icon-times" title="关闭" @click.stop="hideAdd()"></span>
            </div>
            <div slot="modal-body" class="modal-body">
                <form onsubmit="return false" id="subtypeForm" v-form name="subtypeForm" class="clearfix">

                    <div class="form-group">
                        <label class="required">课程子类目</label>
                        <span class="red" v-if="isEmpty('name')">课程子类目必填</span>
                        <input type="text" maxlength="20" placeholder="请输入课程分类名称" class="one" v-form-ctrl required v-model="form.name" name="name">
                    </div>

                    <div class="form-group">
                        <label class="required">上级类目</label>
                        <v-select :options="subjectOptions" :close-on-select="true" :value.sync="form.subjectId | str"></v-select>
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
    import Select from '../../../../dep/vue-strap/src/Select.vue';
    import { getSubjectList, saveSubtype, saveEditSubtype } from '../request';
    import { isEmpty, optionMap } from '../../../common/util/tool';

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
                subtypeForm: {},
                form: {
                    name: '',
                    subjectId: -1
                },
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
            },
            oldId: {
                type: Number,
                default: -1
            },
            oldName: {
                type: String,
                default: ''
            }
        },
        vuex: {
            getters:　{
            },
            actions: {
                hideAdd: ({ dispatch }) => {
                    dispatch('HIDE_ADD_SUBTYPE');
                }
            }
    },
    methods: {
        isEmpty (field) {
            return isEmpty(this.subtypeForm, field);
        },

        prepareData4Add () {
            getSubjectList()
                .then( (res) => {
                    this.subjectOptions = optionMap(res.data.list, true);
                }, () => {
                    console.log("网络错误");
                });
        },

        prepareData4Edit () {
            this.prepareData4Add();
            this.form.subjectId = this.oldId;
            this.form.name = this.oldName;
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
            let subtypeForm = this.subtypeForm;
            subtypeForm.$submitted = true;

            if (form.subjectId < 0) {
                dispatch('TOAST', "课程类型必选");
                return;
            }

            if (subtypeForm.$valid) {
                let data = {
                    name: form.name,
                    subjectId: form.subjectId
                };
                let promise;
                if (this.id >= 0) {
                    data.id = this.id;
                    promise = saveEditSubtype(data);
                } else {
                    promise = saveSubtype(data);
                }
                return promise.then( () => {
                    dispatch('TOAST', '保存成功', 'success');
                    dispatch('HIDE_ADD_SUBTYPE');
                    this.$dispatch('saveSuccess');
                });
            } else {
                $('.modal.in').scrollTop(0);
            }
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