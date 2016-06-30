<!--
    @file virgo-课程列表
    @author Zhang Chi (zhangchi03@baijiahulian.com)
-->

<template>
    <div class="list-wrapper course-wrapper" v-show="!showDetail">
        <div class="search-wrap">

            <div class="input-control long">
                <label>开课日期</label>
                <div class="date" @click.stop="popCalendar('start')">
                    <input readonly type="text" class="form-control half" v-model="form.startTime" class="medium">
                    <calendar v-if="calendarState.start" :x="0" :y="50" :show.sync="calendarState.start" :value.sync="form.startTime"></calendar>
                </div>
                ~
                <div class="date" @click.stop="popCalendar('end')">
                    <input readonly type="text" class="form-control half" v-model="form.endTime" class="medium">
                    <calendar v-if="calendarState.end" :x="0" :y="50" :show.sync="calendarState.end" :value.sync="form.endTime"></calendar>
                </div>
            </div>

            <div class="input-control long">
                <label>校区</label>
                <v-select :options="schoolOptions" :close-on-select="true" :value.sync="form.schoolId | str"></v-select>
            </div>

            <div class="input-control long">
                <label>课程类型</label>
                <v-select :options="subjectOptions" :close-on-select="true" :value.sync="form.subjectId | str"></v-select>
            </div>

            <div class="input-control long">
                <label>班级班制</label>
                <v-select :options="classesTypeOptions" :close-on-select="true" :value.sync="form.classesType | str"></v-select>
            </div>

            <div class="input-control long">
                <label>状态</label>
                <v-select :options="classesStatusOptions" :close-on-select="true" :value.sync="form.classesStatus | str"></v-select>
            </div>

            <div class="input-control long">
                <label>预计结束日期</label>
                <div class="date" @click.stop="popCalendar('expected')">
                    <input readonly type="text" class="form-control" v-model="form.expectedEndTime" class="medium">
                    <calendar v-if="calendarState.expected" :x="0" :y="50" :show.sync="calendarState.expected" :value.sync="form.expectedEndTime"></calendar>
                </div>
            </div>

        </div>
        <div class="option">
            <h3><span class="icon-course"></span><span>{{pageDto.count}}</span>条课程信息</h3>
            <div class="center-search">
                <span class="btn btn-primary search" @click="search()">查询</span>
                <span class="btn btn-blue-light reset" @click="reset()">重置</span>
            </div>
            <div class="opration">
                <span class="btn btn-primary" @click="add()">新增课程</span>
            </div>
        </div>

        <grid v-if="something" @sort="sort" :fixed-column-count="0" :data.sync="list" @row-click="rowClick">

            <grid-column v-if="!item.hidden" :sortable="item.sort" v-for="item in header" :property="item.name" :field="item.queryProp" :label="item.showName" :type="item.type" :min-width="item.minWidth"></grid-column>

            <grid-column label="操作" :sortable="0" width="160" property="process">
                <span v-cell-process v-bind:option="[{text:'编辑', command:'edit'},{text:'删除', command:'del'},{text:'申请排课', command:'askArrangement'},{text:'关闭班级', command:'close'}]" class="process-cell" data-id="{{ row['id'] }}" data-name="{{ row['name'] }}" data-status="{{ row['status'] }}">操作<span class="icon-down"></span></span>
            </grid-column>

        </grid>

        <div class="none-list" v-if="nothing">
            <span>没有搜索到课程</span>
        </div>

        <loading :show="loading"></loading>

        <pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>

        <apply v-if="showApply" :id.sync="modifyId" :show.sync = "showApply"></apply>

        <add v-if="addState" :show.sync="addState"></add>

        <edit v-if="editState" :id.sync="modifyId" :show.sync="editState"></add>
    </div>
</template>

<script>
import Pager from '../../common/components/Pager.vue';
import Calendar from '../../common/components/Calendar.vue';
import Grid from '../../common/components/grid/index.vue';
import GridColumn from '../../common/components/grid/GridColumn.vue';
import Loading from '../../common/components/Loading.vue';
import Select from '../../../dep/vue-strap/src/Select.vue';
import confirmDialog from '../../common/plugin/confirmDialog';
import Add  from './components/Add.vue';
import Edit  from './components/Edit.vue';
import Apply from './components/Apply.vue';
import config from './config';
import { getTimeStr, getTimestamp, getOptionValue, optionMap } from '../../common/util/tool';
import { getSchoolList, getSubjectList, getList, del, close, applySchedule } from './request';

export default {
    created () {
        this.prepare().getList();
        this.$dispatch('showlist');
    },
    data () {
        return {
            calendarState: {
                start: false,
                end: false,
                expected: false
            },
            form: {
                startTime: '',
                endTime: '',
                expectedEndTime: '',
                schoolId: -1,
                subjectId: -1,
                classesType: -1,
                classesStatus: -1
            },
            schoolOptions: [],
            subjectOptions: [],
            classesTypeOptions: config.classesTypeOptions,
            classesStatusOptions: config.classesStatusOptions,
            header: config.header,
            list: null,
            modifyId: -1,
            showDetail: false,
            showApply: false,
            pageDto: {
                pageNum: 1,
                count: 0,
                pageSize: 20
            },
            orderType: '',
            name: '',
            key: ''
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
            addState: state => state.course.addState,
            editState: state => state.course.editState
        },
        actions: {
            add ({ dispatch }) {
                dispatch('ADD');
            },
            edit ({ dispatch }) {
                dispatch('EDIT');
            }
        }
    },
    events: {
        edit (id, name) {
            this.modifyId = id;
            this.edit();
        },
        askArrangement(id, name, status) {
            if (status != 0) {
                dispatch('TOAST', '非招生课程无法申请排课');
                return ;
            }
            this.modifyId = id;
            this.showApply = true;
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
        close (id, name) {
            if (typeof id === 'number' && id >= 0) {
                confirmDialog({
                    content: `确认要关闭【${name}】？`,
                    title: '提示',
                    callback: () => {
                        close({ id: id })
                            .then( (res) => {
                                dispatch('TOAST', '关闭成功', 'success');
                                this.refresh();
                            });
                    }
                })
            } else {
                return;
            }
        },
        select (e, row) {
            console.log(row.name);
        },
        selectAll (e, data) {
            console.log(data);
        },
        saveSuccess () {
            this.refresh();
        },
        roothidedetail() {
            //debugger;
            this.$parent.$emit('showlist');
        },
        hidedetail() {
            this.showDetail = false;
        },
        showdetail(row) {
            this.showDetail = true;
            this.$parent.$emit('showdetail', row.id, 'list');
        }
    },
    methods: {
        prepare () {
            $.when(getSchoolList(), getSubjectList())
                .then( (res1, res2) => {
                    this.schoolOptions = optionMap(res1.data.orgschools, true);
                    this.subjectOptions = optionMap(res2.data.list, true);
                }, () => {
                    console.log('网络错误');
                });

            return this;
        },
        popCalendar (target) {
            let state = this.calendarState;
            for (let k in state) {
                state[k] = false;
            }
            state[target] = true;
        },
        rowClick (e, row, grid) {
            var target = $(e.target);
            var offset = target.offset();
            var self = this;
            var command = target.attr('command');
            if (target.hasClass('process-cell') || target.find('input').length || target.is('input') || target.find('.process-cell').length) {
                return;
            } else {
                self.$emit('showdetail', row);
            }
        },
        sort (column) {
            if (column) {
                this.orderType = column.direction == 'ascending' ? 0 : 1;
                this.name = column.field;
                this.refresh();
            } else {
                this.orderType = '';
                this.name = '';
            }
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
                }, function () {
                    console.log("网络错误");
                });
        },
        setQueryParams () {
            let form = this.form;
            return {
                startTime: getTimestamp(form.startTime),
                endTime: getTimestamp(form.endTime),
                schoolId: getOptionValue(form.schoolId),
                subjectId: getOptionValue(form.subjectId),
                classesType: getOptionValue(form.classesType),
                classesStatus: getOptionValue(form.classesStatus),
                expectedEndTime: getTimestamp(form.expectedEndTime)
            }
        },
        adaptList (data) {
            data.forEach(function (item) {
                let price = item.price;
                let totalPrice = item.totalPrice;
                let totalLesson = item.totalLesson;

                item.lessonStat = item.passedLessons + '/' + item.totalLesson;
                item.classesType = config.getType(item.classesType);
                item.status = item.classesStatus;
                item.classesStatus = config.getStatus(item.classesStatus);
                item.startTime = getTimeStr(item.startTime, 'yyyy-MM-dd');
            });
            return data;
        },
        refresh () {
            this.getList();
        },
        search () {
            this.pageDto.pageNum = 1;
            this.getList();
        },
        reset () {
            this.form = {
                startTime: '',
                endTime: '',
                expectedEndTime: '',
                schoolId: -1,
                subjectId: -1,
                classesType: -1,
                classesStatus: -1
            }
        }
    },
    components: {
        Pager: Pager,
        Calendar: Calendar,
        Grid: Grid,
        GridColumn: GridColumn,
        Add: Add,
        Edit: Edit,
        Loading: Loading,
        vSelect: Select,
        Apply: Apply
    }
};
</script>
