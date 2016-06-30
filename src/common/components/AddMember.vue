<template>

	<div class="suggestion-diretive">
	    <span class="btn-add-student" @click="add($event)"><span class="icon-plus"></span></span>
	    <div class="search-member" v-show="searching">
	        <input 
	            class="search-key" 
	            autocomplete="off" 
	            ng-keydown="onKeyDown($event)" 
	            placeholder="支持手机号、名字搜索" 
	            v-model="key" 
	            @input="search()" 
	            @blur="hideSearch()" 
	            @keydown.up="up" 
        		@keydown.down="down"
        		@keydown.enter= "hit"
        		@keydown.esc="reset"
	            style="width:auto" 
	            ng-click="inputerClick($event)"
	            >
	        <ul class="suggesting" v-show="searchResult && searchResult.length">
	            <li v-for="item in searchResult" 
	            	@click="hit($event, item.teahcerId)" 
	            	@mousemove="setActive($index)" 
	            	:class="{active: $index == current }" 
	                >
	                <span class="name">
	                    <img width="30" height="30" :src="item.avatar|compressImage 30 30">
	                   {{ item.teacherName }}
	                </span>
	                <span class="icon-check" v-show="hasSaved(item.teacherId)"></span>
	            </li>
	        </ul>
	        <p class="none-member" v-show="(!searchResult || !searchResult.length) && key">没有搜索结果</p>
    	</div>
	</div>

</template>

<script>
	import { searchResource, getCourseInfo} from '../request';

	export default {
		props: {
			onHit: {
	            type: Function,
	            default (items) {
	                this.reset();
	                this.query = items;
	            }
	        },
	        members: {
	        	type: Array,
	        	default () {
	        		return [];
	        	}
	        }
		},
		data () {
			return {
				key : '',
				searchResult: [],
				searching: false,
				current: 0
			}
		},
		created () {
		},
		methods: {
			add () {
				this.searching = true;
				setTimeout(function () {
					$('.search-member').find('input').focus();
				});
			},
			hideSearch () {
				var self = this;
				setTimeout(function () {
					self.searching = false;
					self.key = '';
				}, 250);
			},
			search () {
				var self = this;
				searchResource({
					key: self.key,
					pageSize: 10,
					pageNum: 1
				})
					.then(function (res) {
						self.searchResult = res.data;
					});
			},
			hasSaved (teacherId) {
				return this.members.some(function (item) {
					return item.teacherId == teacherId;
				});
			},
			hit(e, teahcerId) {
	            e.preventDefault();
	            var result = this.searchResult[this.current];
	            var members = this.members;

	            if (members.length == 5) {
	            	dispatch('TOAST', '最多只能增加5个老师');
	            	return;
	            }
	            if (members.some(function(item) {
	            	return result.teacherId == item.teacherId;
	            })) {
	            	dispatch('TOAST', '该老师已存在');
	            	return;
	            } 
	            this.onHit(result, this);
	            this.reset();
	        },
	        reset() {
	            this.searchResult = [];
	            this.searching = false;
    	        this.key = '';
        	},
			up() {
            	if (this.current > 0) this.current--
        	},
	        down() {
	            if (this.current < this.searchResult.length - 1) this.current++
	        },
		    setActive(index) {
	            this.current = index;
	        },
	        isActive(index) {
	            return this.current === index;
	        }
		}
	};
</script>

