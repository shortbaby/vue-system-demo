<template>
    <div>
        <modal :show.sync="show" :width="830">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">修改</h4>
                <span class="icon-times" title="关闭" @click.stop="hideAdd()"></span>
            </div>
            <div slot="modal-body" class="modal-body">
                <form onsubmit="return false" id="parameterForm" class="clearfix">

                    <div class="form-group">
                        <label>参数名</label>
                        <input type="text" disabled value="{{* target.paramDesc }}" class="normal">
                    </div>

                    <div class="form-group">
                        <label class="required">值</label>
                        <input v-if="target.systemConfig === 2" v-model="form.value" class="timepicker normal" readonly placeholder="请选择时间">
                        <input v-if="target.systemConfig === 1" v-model="form.value" class="normal" maxlength="3">
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
    import { saveEdit } from '../request';
    import config from '../config';
    import { isEmpty } from '../../../../common/util/tool';

    export default {
        created () {
            var config = this.target.systemConfig;
            if (config === 1) {
                this.form.value = this.target.value;
            } else if (config === 2) {
                this.form.value = this.target.value;
                this.initTimePicker();
            }
        },
        data () {
            return {
                parameterForm: {},
                form: {
                    value: null
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
                default: null
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
                return isEmpty(this.parameterForm, field);
            },

            initTimePicker () {
                Vue.nextTick(function () {
                    setTimeout(function () {
                        $('#parameterForm').find('.timepicker').timePicker({
                            startTime: "06:00",
                            endTime: new Date(0, 0, 0, 22, 0, 0),
                            show24Hours: true,
                            separator: ':',
                            step: 5
                        });
                    });
                });
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
                var v = this.form.value;

                if (!v) {
                    dispatch('TOAST', "参数值必填");
                    return;
                } else if (this.target.systemConfig === 1) {
                    var n = parseInt(v);
                    if (!Number.isInteger(n) || n < 1) {
                        dispatch('TOAST', "参数值必须是正整数");
                        return;
                    }
                }

                let data = {
                    id: this.target.id,
                    value: (this.form.value).toString()
                };
                return saveEdit(data)
                        .then( () => {
                            dispatch('TOAST', '保存成功', 'success');
                            dispatch('HIDE_ADD');
                            this.$dispatch('saveSuccess');
                        });

            }

        },
        components: {
            Modal: Modal
        }
    }
</script>
<style>
</style>