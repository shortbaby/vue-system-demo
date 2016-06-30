<!--
    @file virgo-校区管理
    @author Zhang Chi (zhangchi03@baijiahulian.com)
-->

<template>
    <div class="school-wrapper">

        <div class="guide-wrapper">
            <h4>校区管理</h4>
            <div class="school-list">
                <ul v-if="list">
                    <tree-list class="tree-list-item" :model="list">
                    </tree-list>
                </ul>
                <loading :show="!list"></loading>
            </div>
        </div>

        <div class="action-wrapper">
            <h4>添加校区</h4>
            <div class="school-add">
                <div class="add-body">
                    <form onsubmit="return false" id="schoolForm" v-form name="schoolForm" class="clearfix">
                        <div class="form-group">
                            <h3>
                                <label class="required">校区名称</label>
                            </h3>
                            <span class="red" v-if="isEmpty('name')">姓名为必填项</span>
                            <span class="red" v-if="schoolForm.name.$error.pattern && (schoolForm.name.$dirty || schoolForm.$submitted)">不能包含特殊字符</span>
                            <input type="text" maxlength="20" pattern="^[a-zA-Z0-9\u4e00-\u9fa5]+$" placeholder="请输入校区名称" v-form-ctrl required v-model="form.name" name="name">
                        </div>

                        <div class="form-group">
                            <h3>
                                <label class="required">校区类别</label>
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
                                <label class="required">负责人</label>
                            </h3>
                            <inference-input placehoder="请输入负责人姓名" :query.sync="searchName" :on-hit="receive" :request="queryAction"></inference-input>
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
                                <label>校区颜色<span class="description">颜色用于在课表中通过颜色区分校区调节</span></label>
                            </h3>
                            <v-select :options="colorOptions" :close-on-select="true" :value.sync="form.color"></v-select>
                        </div>

                        <div class="form-group" style="width: 100%;">
                            <h3>
                                <label>详细地址</label>
                            </h3>
                            <input type="text" maxlength="80" name="address" v-model="form.address">
                        </div>

                    </form>
                </div>

                <div class="add-footer">
                    <span class="btn btn-blue-light reset" @click="reset()">重置</span>
                    <span class="btn btn-primary" @click.stop="submit($event)">保存</span>
                </div>
            </div>
        </div>

        <edit v-if="editState" :id.sync="modifyId" :show.sync="editState"></edit>
    </div>
</template>
    </div>
</template>

<script>
import Loading from '../../../common/components/Loading.vue';
import TreeList from '../../../common/components/TreeList.vue';
import Select from '../../../../dep/vue-strap/src/Select.vue';
import Region from '../../../common/components/region/index.vue';
import InferenceInput from '../../../common/components/InferenceInput.vue';
import Edit from './components/Edit.vue';
import confirmDialog from '../../../common/plugin/confirmDialog';
import config from './config';
import { getOptionValue, optionMap, isEmpty } from '../../../common/util/tool';
import { getList, getInfo, getOptions, inference, del, save } from './request';

export default {
    created () {
        this.getList().prepareSelectOptions();
    },
    data () {
        return {
            form: {
                name: '',
                schoolType: -1,
                supervisorId: -1,
                userId: -1,
                color: '#d0021b',
                address: ''
            },
            regionData: {
                province: '',
                city: '',
                district: '',
                areaId: 0
            },
            schoolForm: {},
            schoolTypeOptions: config.schoolTypeOptions,
            colorOptions: config.colorOptions,
            supervisorOptions: [],
            searchName: '',
            list: null,
            modifyId: -1,
            queryAction: () => {
                return inference( { name: this.searchName } );
            }
        };
    },
    computed: {
    },
    vuex: {
        getters:　{
            editState: state => state.school.editState
        },
        actions: {
            edit ({ dispatch }) {
                dispatch('EDIT');
            }
        }
    },
    events: {
        edit (id) {
            this.modifyId = id;
            this.edit();
        },
        del (id, name) {
            if (typeof id === 'number' && id >= 0) {
                confirmDialog({
                    content: `确认要删除【${name}】？删除成功后，该操作无法恢复`,
                    title: '提示',
                    callback: () => {
                        del({ id: id })
                            .then( (res) => {
                                dispatch('TOAST', '删除成功', 'success');
                                this.getList();
                            });
                    }
                })
            } else {
                return;
            }
        },
        saveSuccess () {
            this.getList();
        }
    },
    methods: {
        isEmpty (field) {
            return isEmpty(this.schoolForm, field);
        },
        receive (data) {
            this.form.userId = data.id;
        },
        prepareSelectOptions () {
            getOptions()
                .then( (res) => {
                    this.supervisorOptions = optionMap(res.data.orgschools, true);
                }, () => {
                    console.log('网络错误');
                })
        },
        getList () {
            getList()
                .then(
                    (res) => {
                        let treeObj = res.data.pop();
                        if (treeObj) {
                            this.list = treeObj;
                        }
                    },
                    () => {
                        console.log("网络错误");
                    }
                );

            return this;
        },
        reset () {
            this.form = {
                name: '',
                schoolType: -1,
                supervisorId: -1,
                userId: -1,
                color: '#d0021b',
                address: ''
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
            let schoolForm = this.schoolForm;
            schoolForm.$submitted = true;
            if (form.supervisorId < 0) {
                dispatch('TOAST', "归属上级必选");
                return;
            }
            if (schoolForm.$valid) {
                let data = {
                    name: form.name,
                    schoolType: form.schoolType,
                    supervisorId: form.supervisorId,
                    userId: form.userId,
                    color: form.color[0],
                    address: form.address,
                    province: this.regionData.province,
                    city: this.regionData.city,
                    county: this.regionData.district
                };
                return save(data)
                        .then( () => {
                            this.$emit('saveSuccess');
                            dispatch('TOAST', '保存成功', 'success');
                        });
            } else {
                $('.modal.in').scrollTop(0);
            }
        },
    },
    components: {
        Edit: Edit,
        Loading: Loading,
        vSelect: Select,
        TreeList: TreeList,
        InferenceInput: InferenceInput,
        Region: Region
    }
};
</script>
