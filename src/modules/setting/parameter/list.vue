<!--
    @file virgo-市场渠道管理
    @author Zhang Chi (zhangchi03@baijiahulian.com)
-->

<template>
    <div class="list-wrapper channel-wrapper">

        <grid v-if="something" :fixed-column-count="0" :data.sync="list">

            <grid-column v-if="!item.hidden" :sortable="item.sort" v-for="item in header" :property="item.name" :field="item.queryProp" :label="item.showName" :type="item.type" :min-width="item.minWidth"></grid-column>

            <grid-column label="操作" :sortable="0" width="160" property="process">
                <span v-cell-process v-bind:option="[{text:'编辑', command:'edit'}]" class="process-cell" data-id="{{ row['id'] }}">操作<span class="icon-down"></span></span>
            </grid-column>

        </grid>

        <loading :show="loading"></loading>

        <add v-if="addState" :target='target' :show.sync="addState"></add>

    </div>
</template>

<script>
import Grid from '../../../common/components/grid/index.vue';
import GridColumn from '../../../common/components/grid/GridColumn.vue';
import Loading from '../../../common/components/Loading.vue';
import Add  from './components/Add.vue';
import config from './config';
import { getOptionValue, optionMap } from '../../../common/util/tool';
import { getList } from './request';

    export default {
        created () {
            this.getList();
        },
        data () {
            return {
                header: config.header,
                list: null,
                target: null
            };
        },
        computed: {
            something() {
                return this.list && (this.list.length > 0);
            },
            loading() {
                return !this.list;
            }
        },
        vuex: {
            getters:　{
                addState: state => state.channel.addState
            },
            actions: {
                add ({ dispatch }) {
                    dispatch('ADD');
                }
            }
        },
        events: {
            edit(id) {
                this.target =
                    this.list.find(
                            (item) => { return item.id === id; }
                        );

                this.add();
            },
            saveSuccess () {
                this.getList();
            }
        },
        methods: {
            getList () {
                getList()
                    .then( (res) => {
                        let data = res.data;
                        if (data.length > 0) {
                            this.list = data;
                        } else {
                            this.list = [];
                        }
                    }, () => {
                        console.log('网络错误');
                    });
            },
            adaptList (data) {
                data.forEach(function (item) {
                    item.status = config.getStatus(item.status);
                });
                return data;
            }
        },
        components: {
            Grid: Grid,
            GridColumn: GridColumn,
            Add: Add,
            Loading: Loading
        }
    };
</script>
