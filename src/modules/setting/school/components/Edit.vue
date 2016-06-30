<template>
    <div>
        <modal :show.sync="show" :width="830">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title">编辑校区</h4>
                <span class="icon-times" title="关闭" @click.stop="hideEdit()"></span>
            </div>
            <div slot="modal-body" class="modal-body">
                <form onsubmit="return false" id="schoolInfoForm" v-form name="schoolInfoForm" class="clearfix">
                    <div class="form-group">
                        <h3>
                        <label class="required">校区名称</label>
                        <span class="red" v-if="isEmpty('name')">姓名为必填项</span>
                        <span class="red" v-if="schoolInfoForm.name.$error.pattern && (schoolInfoForm.name.$dirty || schoolInfoForm.$submitted)">不能包含特殊字符</span>
                        </h3>
                        <input type="text" maxlength="20" pattern="^[a-zA-Z0-9\u4e00-\u9fa5]+$" placeholder="请输入校区名称" v-form-ctrl required v-model="form.name" name="name">
                    </div>

                    <div class="form-group">
                        <h3>
                        <label>校区类别</label>
                        </h3>
                        <v-select :options="schoolTypeOptions" :close-on-select="true" :value.sync="form.schoolType | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3>
                        <label class="required">归属上级</label>
                        </h3>
                        <v-select :options="supervisorOptions" :close-on-select="true" :value.sync="form.supervisorId | str"></v-select>
                    </div>

                    <div class="form-group">
                        <h3>
                        <label>负责人</label>
                        </h3>
                        <inference-input placehoder="请输入负责人姓名" :query.sync="form.userName" :on-hit="receive" :request="queryAction"></inference-input>
                        <input type="hidden" v-model="form.userId" >
                    </div>

                    <div class="form-group">
                        <h3>
                        <label>所属地区</label>
                        </h3>
                        <region :region-data.sync="regionData"></region>
                    </div>

                    <div class="form-group">
                        <h3>
                        <label>详细地址</label>
                        </h3>
                        <input type="text" maxlength="80" name="address" class="normal" v-model="form.address">
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
    import Region from '../../../../common/components/region/index.vue';
    import InferenceInput from '../../../../common/components/InferenceInput.vue';
    import { getOptions, getInfo, saveEdit, inference } from '../request';
    import config from '../config';
    import { isEmpty, optionMap } from '../../../../common/util/tool';

    export default {
        created () {
            this.prepareData();
        },
        data() {
            return {
                form: {
                    name: '',
                    schoolType: -1,
                    supervisorId: -1,
                    userId: -1,
                    userName: '',
                    address: ''
                },
                regionData: {
                    province: '',
                    city: '',
                    district: '',
                    areaId: 0
                },
                schoolInfoForm: {},
                schoolTypeOptions: config.schoolTypeOptions,
                supervisorOptions: [],
                queryAction: () => {
                    return inference( { name: this.form.userName } );
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
                return isEmpty(this.schoolInfoForm, field);
            },

            receive (data) {
                this.form.userId = data.id;
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
                let schoolInfoForm = this.schoolInfoForm;
                schoolInfoForm.$submitted = true;
                if (form.supervisorId < 0) {
                    dispatch('TOAST', "归属上级必选");
                    return;
                } else if (form.supervisorId === this.id) {
                    dispatch('TOAST', "归属上级不能选择自己");
                    return;
                }

                if (schoolInfoForm.$valid) {
                    let data = {
                        id: this.id,
                        name: form.name,
                        schoolType: form.schoolType,
                        supervisorId: form.supervisorId,
                        userId: form.userId,
                        province: this.regionData.province,
                        city: this.regionData.city,
                        county: this.regionData.district,
                        address: form.address
                    };
                    return saveEdit(data)
                            .then( () => {
                                dispatch('TOAST', '保存成功', 'success');
                                this.hideEdit();
                                this.$dispatch('saveSuccess');
                            });
                } else {
                    $('.modal.in').scrollTop(0);
                }
            },

            prepareData () {
                getOptions()
                    .then( (res) => {
                        this.supervisorOptions = optionMap(res.data.orgschools, true);
                    }, () => {
                        console.log('网络错误');
                    })

                getInfo({
                    id: this.id
                })
                .then( (res) => {
                    var data = res.data;
                    var self = this;

                    this.regionData.province = data.province;
                    Vue.set(self.regionData, 'city', data.city);
                    setTimeout(function () {
                        Vue.set(self.regionData, 'district', data.county);
                    });

                    this.form = data;
                })
            }
        },
        components: {
            Modal: Modal,
            vSelect: Select,
            InferenceInput: InferenceInput,
            Region: Region
        }
    }
</script>
<style>
</style>