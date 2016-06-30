<!--
    @file virgo-教室管理
    @author Zhang Chi (zhangchi03@baijiahulian.com)
-->

<template>
    <div class="list-wrapper classroom-wrapper">
        <div class="search-wrap">

            <div class="input-control long">
                <label>所属校区</label>
                <v-select :options="schoolOptions" :close-on-select="true" :value.sync="form.schoolId | str"></v-select>
            </div>

            <div class="input-control long">
                <label>状态</label>
                <v-select :options="statusOptions" :close-on-select="true" :value.sync="form.status | str"></v-select>
            </div>

            <div class="input-control long">
                <label>教室容量</label>
                <input type="text" maxlength="3" class="form-control" v-model="form.capacity" class="medium">
            </div>

        </div>

        <div class="option">
            <h3><span class="icon-setting"></span><span>{{pageDto.count}}</span>条教室信息</h3>
            <div class="opration">
                <span class="btn btn-primary search" @click="search()">查询</span>
                <span class="btn btn-blue-light reset" @click="reset()">重置</span>
                <span class="btn btn-primary" @click="add()">新增教室</span>
            </div>
        </div>

        <grid v-if="something" :fixed-column-count="0" :data.sync="list">

            <grid-column v-if="!item.hidden" :sortable="item.sort" v-for="item in header" :property="item.name" :field="item.queryProp" :label="item.showName" :type="item.type" :min-width="item.minWidth"></grid-column>

            <grid-column label="操作" :sortable="0" width="160" property="process">
                <span v-cell-process v-bind:option="[{text:'编辑', command:'edit'},{text:'删除', command:'del'}]" class="process-cell" data-id="{{ row['id'] }}" data-name="{{ row['name'] }}">操作<span class="icon-down"></span></span>
            </grid-column>

        </grid>

        <div class="none-list" v-if="nothing">
            <span>没有搜索到教室</span>
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
import { getList, getOptions, del, disable } from './request';

    export default {
        created () {
            this.prepare().getList();
        },
        data () {
            return {
                form: {
                    schoolId: -1,
                    status: -1,
                    capacity: null
                },
                schoolOptions: [],
                statusOptions: config.statusOptions,
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
            loading() {
                return !this.list;
            }
        },
        vuex: {
            getters:　{
                addState: state => state.classroom.addState
            },
            actions: {
                add ({ dispatch }) {
                    dispatch('ADD');
                }
            }
        },
        events: {
            edit(id, name) {
                this.modifyId = id;
                this.add();
            },
            del(id, name) {
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
            saveSuccess () {
                this.refresh();
            }
        },
        methods: {
            prepare () {
                getOptions()
                    .then( (res) => {
                        this.schoolOptions = optionMap(res.data.orgschools, true);
                    }, () => {
                        console.log('网络错误');
                    })
                return this;
            },
            pageChange () {
                this.getList();
            },
            getList () {
                if (this.form.capacity) {
                    var num = parseInt(this.form.capacity);
                    if (!Number.isInteger(num) || num < 0) {
                        dispatch('TOAST', "教室容量格式不正确");
                        return;
                    }
                }

                let params = {
                    schoolId: getOptionValue(this.form.schoolId),
                    status: getOptionValue(this.form.status),
                    capacity: num
                };
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
                        console.log('网络错误');
                    });
            },
            adaptList (data) {
                data.forEach(function (item) {
                    item.status = config.getStatus(item.status);
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
                    schoolId: -1,
                    status: -1,
                    capacity: null
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
