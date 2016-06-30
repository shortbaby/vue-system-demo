<template>
    <div>
        <modal :show.sync="show" :width="420">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">员工业务转移</h4>
                <span class="icon-times" title="关闭" @click.stop="hideTransfer()"></span>
            </div>
            <div slot="modal-body" class="modal-body">
                <form onsubmit="return false" id="transferForm" name="transferForm" class="clearfix">

                    <div class="form-group">
                        <label class="required">接手人姓名</label>
                        <inference-input placehoder="请输入接手人姓名" :query.sync="form.searchKey" :on-hit="receive" :request="queryAction"></inference-input>
                        <input type="hidden" v-model="form.targetId" >
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
    import InferenceInput from '../../../../common/components/InferenceInput.vue';
    import { inference, transf } from '../request';
    import { isEmpty } from '../../../../common/util/tool';

    export default {
        created () {
        },
        data() {
            return {
                transferForm: {},
                form: {
                    targetId: -1,
                    searchKey: ''
                },
                empty: false,
                queryAction: () => {
                    return inference( { name: this.form.searchKey } );
                }
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
                default: -1
            }
        },
        vuex: {
            getters:　{
            },
            actions: {
                hideTransfer: ({ dispatch }) => {
                    dispatch('HIDE_TRANSFER');
                }
            }
        },
        methods: {
            receive (data) {
                this.form.targetId = data.id;
            },

            submit (e) {
                let btn = $(e.target);
                btn.prop('disabled', true);

                let promise = this.save();
                if (promise && promise.always) {
                    promise.always( () => {
                        btn.prop('disabled', false);
                    });
                } else {
                    btn.prop('disabled', false);
                }
            },

            save () {
                let targetId = this.form.targetId;

                if (typeof targetId === 'number' && targetId >= 0) {
                    let data = {
                        sourceId: this.id,
                        targetId: targetId
                    };
                    let promise = transf(data);
                    return promise.then( () => {
                        dispatch('TOAST', '转移业务成功', 'success');
                        dispatch('HIDE_TRANSFER');
                        this.$dispatch('saveSuccess');
                    });
                } else {
                    dispatch('TOAST', "请填写正确的接手人");
                    $('.modal.in').scrollTop(0);
                }
            }
        },
        components: {
            Modal: Modal,
            InferenceInput: InferenceInput
        }
    }
</script>
<style>
</style>