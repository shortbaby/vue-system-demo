<!--
    @file 通用推理输入框
    @author Zhang Chi(zhangchi03@baijiahulian.com)
-->

<template>
    <div style="position: relative" v-bind:class="{'open':showDropdown}">

      <input type="text" :placeholder="placeholder" autocomplete="off" v-model="query"
        @input="update" maxlength="20" @keydown.up="up" @keydown.down="down"
        @keydown.enter= "hit" @keydown.esc="reset" @blur="leave" />

      <ul class="dropdown-menu" v-el:dropdown>
        <li v-for="item in items" v-bind:class="{'active': isActive($index)}">
          <a @mousedown.prevent="hit" @mousemove="setActive($index)">
            <partial :name="templateName"></partial>
          </a>
        </li>
      </ul>

    </div>

</template>

<script>

export default {
    created() {
        this.items = this.primitiveData
    },
    partials: {
        'default': '<span v-html="item.name"></span>'
    },
    props: {
        data: {
            type: Array
        },
        limit: {
            type: Number,
            default: 8
        },
        query: {
            type: String,
            default: ''
        },
        template: {
            type: String
        },
        templateName: {
            type: String,
            default: 'default'
        },
        key: {
            type: String
        },
        matchCase: {
            type: Boolean,
            default: false
        },
        request: {
            type: Function
        },
        onHit: {
            type: Function,
            default (items) {
                this.reset()
                this.query = items
            }
        },
        onBlur: {
            type: Function,
            default () {
                console.log('hehe');
            }
        },
        placeholder: {
            type: String
        }
    },
    data() {
        return {
            showDropdown: false,
            noResults: true,
            current: 0,
            selected: false,
            items: [],
        }
    },
    computed: {

    },
    ready() {
        // register a partial:
        if (this.templateName && this.templateName !== 'default') {
            Vue.partial(this.templateName, this.template)
        }
    },
    methods: {
        update() {
            if (!this.query) {
                this.reset()
                return;
            } else {
                let promise = this.request();
                if (promise && promise.then) {
                    promise.then(
                         (res) => {
                             let data = res.data;
                             this.$set('items', data.slice(0, this.limit));
                             this.$set('showDropdown', this.items.length ? true : false);
                         }
                    );
                }
            }
        },
        reset() {
            this.items = []
            this.query = ''
            this.loading = false
            this.showDropdown = false
        },
        setActive(index) {
            this.current = index
        },
        isActive(index) {
            return this.current === index;
        },
        hit(e) {
            e.preventDefault();
            var result = this.items[this.current];
            this.query = result.name;
            this.onHit(result, this);
            this.showDropdown = false;
        },
        up() {
            if (this.current > 0) this.current--
        },
        down() {
            if (this.current < this.items.length - 1) this.current++
        },
        leave() {
            this.showDropdown = false;
            this.onBlur();
        },
        filters: {
            highlight(value, phrase) {
                console.log(value);
                return value.replace(new RegExp('(' + phrase + ')', 'gi'), '<strong>$1</strong>')
            }
        }
    }
}
</script>

<style>
.dropdown-menu > li > a {
  cursor: pointer;
}
</style>
