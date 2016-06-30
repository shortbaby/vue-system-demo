<!--
    @file virgo-课程分类
    @author Zhang Chi (zhangchi03@baijiahulian.com)
-->

<template>
    <div class="list-wrapper course-category-wrapper" v-show="!showDetail">
        <div class="search-wrap">

            <div class="input-control long">
                <label>课程一级分类</label>
                <v-select :options="subjectOptions" :close-on-select="true" :value.sync="form.subjectId | str"></v-select>
            </div>

            <div class="input-control long">
                <label>课程二级分类</label>
                <v-select :options="subTypeOptions" :close-on-select="true" :value.sync="form.subTypeId | str"></v-select>
            </div>

        </div>

        <div class="option">
            <h3><span class="icon-course"></span><span>{{pageDto.count}}</span>条课程二级分类</h3>
            <div class="opration">
                <span class="btn btn-primary search" @click="search()">查询</span>
                <span class="btn btn-blue-light reset" @click="reset()">重置</span>
                <span class="btn btn-primary" @click="addSubtype()">新增课程二级分类</span>
            </div>
        </div>

        <grid v-if="something" :fixed-column-count="0" :data.sync="list">
            <grid-column v-if="!item.hidden" :sortable="item.sort" v-for="item in header" :property="item.name" :field="item.name" :label="item.showName" :type="item.type" :min-width="item.minWidth"></grid-column>

            <grid-column label="操作" :sortable="0" width="160" property="process">
                <span v-cell-process v-bind:option="[{text:'编辑', command:'edit'},{text:'删除', command:'del'}]" class="process-cell" data-id="{{ row['subTypeId'] }}" data-name="{{ row['subTypeName'] }}">操作<span class="icon-down"></span></span>
            </grid-column>
        </grid>

        <div class="none-list" v-if="nothing">
            <span>没有搜索到课程分类</span>
        </div>

        <loading :show="loading"></loading>

        <pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>

        <add-subtype v-if="addSubtypeState" :id.sync="modifyId" :old-name="modifyName" :old-id="modifySubjectId" :show.sync="addSubtypeState"></add-subtype>
    </div>
</template>

<script>
    import Pager from '../../common/components/Pager.vue';
    import Grid from '../../common/components/grid/index.vue';
    import GridColumn from '../../common/components/grid/GridColumn.vue';
    import Loading from '../../common/components/Loading.vue';
    import Select from '../../../dep/vue-strap/src/Select.vue';
    import confirmDialog from '../../common/plugin/confirmDialog';
    import AddSubtype  from './components/AddSubtype.vue';
    import config from './config';
    import { getTimeStr, getOptionValue, optionMap } from '../../common/util/tool';
    import { getSubTypeList, getSubjectList, getCourseCategoryList, delSubtype } from './request';

    export default {
        created () {
            this.prepare().getList();
        },
        data () {
            return {
                form: {
                    subjectId: -1,
                    subTypeId: -1
                },
                subTypeOptions: [],
                subjectOptions: [],
                header: config.categoryHeader,
                list: null,
                modifyId: -1,
                modifySubjectId: -1,
                modifyName: '',
                showDetail: false,
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
        watch: {
            'form.subjectId': {
                handler (newV, oldV) {
                    if (newV >= 0 && newV !== oldV) {
                        this.form.subTypeId = -1;
                        getSubTypeList({ subjectId: newV })
                            .then( (res) => {
                                this.subTypeOptions = optionMap(res.data, true);
                            });
                    } else if (newV === -1 && newV !== oldV) {
                        this.form.subTypeId = -1;
                        this.subTypeOptions = [];
                    }
                }
            },
        },
        vuex: {
            getters:　{
                addSubtypeState: state => state.course.addSubtypeState
            },
            actions: {
                addSubtype ({ dispatch }) {
                    dispatch('ADD_SUBTYPE')
                }
            }
        },
        events: {
            edit(id, name) {
                var item =
                    this.list.find(
                            (item) => {
                                return item.subTypeId === id;
                            }
                        );

                this.modifyId = id;
                this.modifyName = name;
                this.modifySubjectId = item.subjectId;
                this.addSubtype();
            },
            del(id, name) {
                if (typeof id === 'number' && id >= 0) {
                    confirmDialog({
                        content: `确认要删除【${name}】？删除成功后，该操作无法恢复`,
                        title: '提示',
                        callback: () => {
                            delSubtype({ subTypeId: id })
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
            },
            hidedetail() {
                this.showDetail = false;
            }
        },
        methods: {
            prepare () {
                $.when(getSubjectList())
                    .then( (res1, res2) => {
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

                getCourseCategoryList(params)
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
                    subjectId: getOptionValue(this.form.subjectId),
                    courseSubTypeId: getOptionValue(this.form.subTypeId)
                };
            },
            adaptList (data) {
                data.forEach(function (item) {
                    item.subTypeId = item.details.id;
                    item.subTypeName = item.details.name;
                    item.initialTime = getTimeStr(item.createTime, 'yyyy-MM-dd');
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
                    subjectId: -1,
                    subTypeId: -1
                }
            }
        },
        components: {
            Pager: Pager,
            Grid: Grid,
            GridColumn: GridColumn,
            AddSubtype: AddSubtype,
            Loading: Loading,
            vSelect: Select
        }
    };
</script>
