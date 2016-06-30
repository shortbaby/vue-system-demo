<!--
  @file 树形列表操作组件
  @author Zhang Chi(zhangchi03@baijiahulian.com)
-->

<template>

  <li @click="activate(model.id)">
    <div @click="toggle">
      <div>
        <span v-if="notLeaf" class="{{ open ? 'icon-caret-down' : 'icon-play' }}"></span>
        <span>{{ model.name }}</span>
      </div>
      <div v-if="model.level" class="action">
        <!-- 这里是父组件的操作，应该由父组件使用该组件时插入slot，
            现在时间不够，shit 只能留到以后做了 -->
        <span class="icon-edit" @click.stop="popEditEvent(model.id)"></span>
        <span class="icon-trash" @click.stop="popDelEvent(model.id, model.name)"></span>
      </div>
    </div>
    <ul v-show="open" v-if="notLeaf" class="indent">
      <tree-list class="tree-list-item" v-for="model in model.children" :model="model">
      </tree-list>
    </ul>
  </li>

</template>

<script>

export default {
  name: 'tree-list',
  props: {
    model: {
      type: Object  // tree structure
    },
    hasAction: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      open: false,
      isActive: false,
      activeId: -1
    }
  },
  computed: {
    notLeaf () {
      var children = this.model.children;
      return children && children.length;
    }
  },
  methods: {
    activate (id) {
      this.activeId = id;
    },

    toggle (e) {
      $('.tree-list-item > .active').removeClass('active');
      $(e.currentTarget).addClass('active');

      if (this.notLeaf) {
        this.open = !this.open;
      }
    },

    popEditEvent (id) {
      this.$dispatch('edit', id);
    },

    popDelEvent (id, name) {
      this.$dispatch('del', id, name);
    }
  }
}

</script>

<style lang="sass">

  .tree-list-item {
    list-style: none;
    margin: 5px 0;
    cursor: point;
    > div {
      display: -webkit-box;
      display: -ms-box;
      display: -moz-box;
      display:  box;
      display: -webkit-flex;
      display: -ms-flex;
      display: -moz-flex;
      display: flex;

      justify-content: space-between;
      align-items: center;
      padding-left: 5px;
    }

    .action {
      text-align: right;
    }

    .active {
      background: #F2F2F2;
    }

    ul.indent {
      padding-left: 20px;
    }
  }
</style>