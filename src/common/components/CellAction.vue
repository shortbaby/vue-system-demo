<!--
  @file grid row 操作集合组件
  @author Zhang Chi(zhangchi03@baijiahulian.com)
-->

<template>

    <ul class="dropdown-menu action-menu" style="bottom: -5px; left: 0; display: block;">
        <li v-for="item in options" @click="fire(item.command)">{{ item.text }}</li>
    </ul>

</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false,
                twoWay: true
            },
            id: {
                type: Number,
                default: 0
            },
            name: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                default: []
            }
        },
        methods: {
            fire (event) {
                this.$dispatch(event, this.id, this.name);
                this.show = false;
            }
        }
    }

</script>