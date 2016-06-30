<!--
    @file virgo-老师列表
    @author Zhang Chi (zhangchi03@baijiahulian.com)
-->

<template>
    <div class="list-wrapper user-wrapper">
        <div class="search-wrap">

            <div class="input-control long">
                <label>姓名</label>
                <input type="text" maxlength="20" class="form-control" v-model="form.name" class="medium">
            </div>

            <div class="input-control long">
                <label>手机号</label>
                <input type="number" maxlength="11" class="form-control" v-model="form.mobile" class="medium">
            </div>

            <div class="input-control long">
                <label>状态</label>
                <v-select :options="statusOptions" :close-on-select="true" :value.sync="form.status | str"></v-select>
            </div>

            <div class="input-control long">
                <label>所属校区</label>
                <v-select :options="schoolOptions" :close-on-select="true" :value.sync="form.schoolId | str"></v-select>
            </div>

            <div class="input-control long">
                <label>教授科目</label>
                <v-select :options="subjectOptions" :close-on-select="true" :value.sync="form.subjectId | str"></v-select>
            </div>

            <div class="input-control long">
                <label>老师类型</label>
                <v-select :options="userTypeOptions" :close-on-select="true" :value.sync="form.userType | str"></v-select>
            </div>

        </div>
        <div class="option">
            <h3><span class="icon-setting"></span><span>{{pageDto.count}}</span>条老师信息</h3>
            <div class="opration">
                <span class="btn btn-primary search" @click="search()">查询</span>
                <span class="btn btn-blue-light reset" @click="reset()">重置</span>
                <span class="btn btn-primary" @click="add()">新增老师</span>
            </div>
        </div>

        <grid v-if="something" :fixed-column-count="0" :data.sync="list">

            <grid-column v-if="!item.hidden" :sortable="item.sort" v-for="item in header" :property="item.name" :field="item.queryProp" :label="item.showName" :type="item.type" :min-width="item.minWidth"></grid-column>

            <grid-column label="操作" :sortable="0" width="160" property="process">
                <span v-cell-process v-bind:option="[{text:'查看考勤', command:'checkAttendence'},{text:'编辑', command:'edit'},{text:'删除', command:'del'},{text:'重置密码', command:'resetPassword'},{text:'启用', command:'enable'},{text:'禁用', command:'disable'}]" class="process-cell" data-id="{{ row['id'] }}" data-name="{{ row['name'] }}">操作<span class="icon-down"></span></span>
            </grid-column>

        </grid>

        <div class="none-list" v-if="nothing">
            <span>没有搜索到课程</span>
        </div>

        <loading :show="loading"></loading>

        <pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>

        <add v-if="addState" :id.sync="modifyId" :show.sync="addState"></add>

    </div>
</template>

<script>
import Pager from '../../../common/components/Pager.vue';
import Grid from '../../../common/components/grid/index.vue';
import GridColumn from '../../../common/components/grid/GridColumn.vue';
import Loading from '../../../common/components/Loading.vue';
import Select from '../../../../dep/vue-strap/src/Select.vue';
import Add  from './components/Add.vue';
import confirmDialog from '../../../common/plugin/confirmDialog';
import config from './config';
import { getOptionValue, optionMap } from '../../../common/util/tool';
import { getList, getOptions, del, disable, enable, reset } from './request';

export default {
    created () {
        this.prepare().getList();
    },
    data () {
        return {
            form: {
                name: '',
                mobile: '',
                status: 0,
                schoolId: -1,
                subjectId: -1,
                userType: -1
            },
            statusOptions: config.statusOptions,
            userTypeOptions: config.userTypeOptions,
            schoolOptions: [],
            subjectOptions: [],
            header: config.header,
            list: null,
            modifyId: -1,
            pageDto: {
                pageNum: 1,
                count: 0,
                pageSize: 20
            }
        };
    },
    computed: {
        something() {
            return this.list && (this.list.length > 0);
        },
        nothing () {
            return this.list && (this.list.length === 0);
        },
        loading () {
            return !this.list;
        }
    },
    vuex: {
        getters:　{
            addState: state => state.teacher.addState
        },
        actions: {
            add ({ dispatch }) {
                dispatch('ADD');
            }
        }
    },
    events: {
        edit (id) {
            this.modifyId = id;
            this.add();
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
                                this.refresh();
                            });
                    }
                })
            } else {
                return;
            }
        },
        checkAttendence (id, name) {
            window.router.go(`/setting/attendance/${id}/${name}`);
        },
        resetPassword (id) {
            confirmDialog({
                content: "确认要重置密码为初始密码？",
                title: '提示',
                callback: () => {
                    reset({ id: id })
                        .then( () => {
                            dispatch('TOAST', '重置密码成功', 'success');
                        });
                }
            })
        },
        enable (id, name) {
            confirmDialog({
                content: `确认要启用【${name}】？`,
                title: '提示',
                callback: () => {
                    enable({ id: id })
                        .then( () => {
                            dispatch('TOAST', '操作成功', 'success');
                            this.refresh();
                        });
                }
            })
        },
        disable (id, name) {
            confirmDialog({
                content: `确认要禁用【${name}】？`,
                title: '提示',
                callback: () => {
                    disable({ id: id })
                        .then( () => {
                            dispatch('TOAST', '操作成功', 'success');
                            this.refresh();
                        });
                }
            })
        },
        saveSuccess () {
            this.refresh();
        }
    },
    methods: {
        prepare () {
            getOptions()
                .then( (res) => {
                    this.schoolOptions = optionMap(res.data.orgschools, true);
                    this.subjectOptions = optionMap(res.data.subjects, true);
                }, () => {
                    console.log('网络错误');
                })

            return this;
        },
        pageChange () {
            this.getList();
        },
        getList () {
            let params = this.setQueryParams();
            params.pageNum = this.pageDto.pageNum;

            getList(params)
                .then( (res) => {
                    let data = res.data.list;
                    if (data.length > 0) {
                        this.list = this.adaptList(data);
                    } else {
                        this.list = [];
                    }
                    this.pageDto = res.pageDto;
                }, () => {
                    console.log("网络错误");
                });
        },
        setQueryParams () {
            let form = this.form;
            return {
                name: form.name,
                mobile: form.mobile,
                status: getOptionValue(form.status),
                schoolId: getOptionValue(form.schoolId),
                subjectId: getOptionValue(form.subjectId),
                userType: getOptionValue(form.userType)
            }
        },
        adaptList (data) {
            data.forEach(function (item) {
                item.statusName = config.getStatus(item.status);
                item.userType = config.getUserType(item.userType);
                item.gender = config.getGender(item.gender);
                item.subjectNames = item.subjectNames.join();
            });
            return data;
        },
        refresh () {
            this.pageDto.pageNum = 1;
            this.getList();
        },
        search () {
            this.refresh();
        },
        reset () {
            this.form = {
                name: '',
                mobile: '',
                status: -1,
                schoolId: -1,
                subjectId: -1,
                userType: -1
            }
        }
    },
    components: {
        Pager: Pager,
        Grid: Grid,
        GridColumn: GridColumn,
        Add: Add,
        Loading: Loading,
        vSelect: Select
    }
};
</script>
