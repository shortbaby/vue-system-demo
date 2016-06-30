<!--
    @file 地址输入框
    @author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
    <div style="position: relative"
      v-bind:class="{'open':showDropdown}"
      >
      <input class="normal" type="text"
        :placeholder="placeholder"
        autocomplete="off"
        v-model="query" 
        v-disable="!city" 
        @input="update"
        maxlength="20"  
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter= "hit"
        @keydown.esc="reset"
        @blur="showDropdown = false"
      />
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
        'default': '<span v-html="item.name">1111</span>'
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
        city: {
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
        onHit: {
            type: Function,
            default (items) {
                this.reset()
                this.query = items
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
            var self = this;
            if (!this.query) {
                this.reset()
                return false
            }
            $.ajax({
                    url: 'http://api.map.baidu.com/place/v2/suggestion',
                    data: {
                        query: this.query,
                        region: this.city,
                        output: 'json',
                        ak: 'FYFvMwLbOQfdZdbT49KGAG6k'
                    },
                    dataType: 'jsonp'
                })
                .then(function(res) {
                    var result = res.result;
                    self.$set('items', result.slice(0, self.limit))
                    self.$set('showDropdown', self.items.length ? true : false);
                });
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
            e.preventDefault()
            this.onHit(this.items[this.current], this);
            this.showDropdown = false;
        },
        up() {
            if (this.current > 0) this.current--
        },
        down() {
            if (this.current < this.items.length - 1) this.current++
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
