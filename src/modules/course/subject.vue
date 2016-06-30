<!--
    @file virgo-课程分类
    @author Zhang Chi (zhangchi03@baijiahulian.com)
-->

<template>
    <div class="list-wrapper course-category-wrapper">
        <div class="search-wrap">
            <div class="input-control long">
                <label>课程一级分类</label>
                <input type="text" maxlength="20" v-model="form.name" class="form-control"></input>
            </div>
        </div>

        <div class="option">
            <h3><span class="icon-course"></span><span>{{pageDto.count}}</span>条课程一级分类</h3>
            <div class="opration">
                <span class="btn btn-primary search" @click="search()">查询</span>
                <span class="btn btn-blue-light reset" @click="reset()">重置</span>
                <span class="btn btn-primary" @click="addSubject()">新增课程一级分类</span>
            </div>
        </div>

        <grid v-if="something" :fixed-column-count="0" :data.sync="list">
            <grid-column v-if="!item.hidden" :sortable="item.sort" v-for="item in header" :property="item.name" :field="item.name" :label="item.showName" :type="item.type" :min-width="item.minWidth"></grid-column>

            <grid-column label="操作" :sortable="0" width="160" property="process">
                <span v-cell-process v-bind:option="[{text:'编辑', command:'edit'},{text:'删除', command:'del'}]" class="process-cell" data-id="{{ row['id'] }}" data-name="{{ row['name'] }}">操作<span class="icon-down"></span></span>
            </grid-column>
        </grid>

        <div class="none-list" v-if="nothing">
            <span>没有搜索到课程分类</span>
        </div>

        <loading :show="loading"></loading>

        <pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>

        <add-subject v-if="addSubjectState" :target='target' :show.sync="addSubjectState"></add-subject>
    </div>
</template>

<script>
    import Pager from '../../common/components/Pager.vue';
    import Grid from '../../common/components/grid/index.vue';
    import GridColumn from '../../common/components/grid/GridColumn.vue';
    import Loading from '../../common/components/Loading.vue';
    import confirmDialog from '../../common/plugin/confirmDialog';
    import AddSubject  from './components/AddSubject.vue';
    import config from './config';
    import { getTimeStr, getOptionValue, optionMap } from '../../common/util/tool';
    import { getSubjectList, searchSubjectList, delSubject } from './request';

    export default {
        created () {
            this.prepare().getList();
        },
        data () {
            return {
                form: {
                    name: '',
                },
                subjectOptions: [],
                header: config.subjectHeader,
                list: null,
                target: null,
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
                addSubjectState: state => state.course.addSubjectState
            },
            actions: {
                addSubject ({ dispatch }) {
                    dispatch('ADD_SUBJECT');
                }
            }
        },
        events: {
            edit(id, name) {
                this.target =
                    this.list.find(
                            (item) => { return item.id === id; }
                        );

                this.addSubject();
            },
            del(id, name) {
                if (typeof id === 'number' && id >= 0) {
                    confirmDialog({
                        content: `确认要删除【${name}】？删除成功后，该操作无法恢复`,
                        title: '提示',
                        callback: () => {
                            delSubject({ subjectId: id })
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
                getSubjectList()
                    .then( (res1) => {
                        this.subjectOptions = optionMap(res1.data.list, true);
                    }, () => {
                        console.log('网络错误');
                    });
                return this;
            },
            pageChange () {
                this.getList();
            },
            getList () {
                let params = this.setQueryParams();
                params.pageNum = this.pageDto.pageNum;

                searchSubjectList(params)
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
                data.forEach( (item) => {
                    item.initialTime = getTimeStr(item.createTime, 'yyyy-MM-dd');
                });
                return data;
            },
            refresh () {
                this.getList();
            },
            search () {
                this.refresh();
            },
            reset () {
                this.form = {
                    name: ''
                }
            }
        },
        components: {
            Pager: Pager,
            Grid: Grid,
            GridColumn: GridColumn,
            AddSubject: AddSubject,
            Loading: Loading
        }
    };
</script>
