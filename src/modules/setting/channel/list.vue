<!--
    @file virgo-市场渠道管理
    @author Zhang Chi (zhangchi03@baijiahulian.com)
-->

<template>
    <div class="list-wrapper classroom-wrapper">
        <div class="search-wrap">

            <div class="input-control long">
                <label>渠道名称</label>
                <input type="text" class="form-control" v-model="form.name" class="medium">
            </div>

        </div>

        <div class="option">
            <h3><span class="icon-setting"></span><span>{{pageDto.count}}</span>条渠道信息</h3>
            <div class="opration">
                <span class="btn btn-primary search" @click="search()">查询</span>
                <span class="btn btn-blue-light reset" @click="reset()">重置</span>
                <span class="btn btn-primary" @click="add()">新增渠道</span>
            </div>
        </div>

        <grid v-if="something" :fixed-column-count="0" :data.sync="list">

            <grid-column v-if="!item.hidden" :sortable="item.sort" v-for="item in header" :property="item.name" :field="item.queryProp" :label="item.showName" :type="item.type" :min-width="item.minWidth"></grid-column>

            <grid-column label="操作" :sortable="0" width="160" property="process">
                <span v-cell-process v-bind:option="[{text:'编辑', command:'edit'},{text:'删除', command:'del'}]" class="process-cell" data-id="{{ row['id'] }}" data-name="{{ row['name'] }}">操作<span class="icon-down"></span></span>
            </grid-column>

        </grid>

        <div class="none-list" v-if="nothing">
            <span>没有搜索到渠道</span>
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
            this.getList();
        },
        data () {
            return {
                form: {
                    name: ''
                },
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
                                    this.getList();
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
            search () {
                this.refresh();
            },
            refresh () {
                this.pageDto.pageNum = 1;
                this.getList();
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
                        console.log('网络错误');
                    });
            },
            setQueryParams () {
                return {
                    name: this.form.name
                };
            },
            adaptList (data) {
                data.forEach(function (item) {
                    item.status = config.getStatus(item.status);
                });
                return data;
            },
            reset () {
                this.form = {
                    schoolId: -1,
                    status: -1,
                    capacity: ''
                }
            }
        },
        beforeDestroy () {
            this.id = -1;
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
