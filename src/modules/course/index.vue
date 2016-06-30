<!--
	@file virgo-课程管理
	@author Zhang Chi (zhangchi03@baijiahulian.com)
-->

<template>
    <div>
        <bread-navs :taps="taps"></braed-navs>
    </div>
    <div>
        <detail v-if="showDetail" :show.sync="showDetail" :id="detailId"></detail>  
    </div>  
    <router-view></router-view>
</template>

<script>
    import breadNavs from '../../common/components/breadNavs.vue';
    import Detail from './components/detail.vue';

    export default {
        computed: {
            taps() {
                return this.navs[this.$route.name];
            }
        },
        data() {
            return {
                detailId: -1,
                showDetail: false,
                navs: {
                    list: [
                        {
                            name: '课程管理',
                            command: 'showlist'
                        },
                        {
                            name: '课程列表',
                            command: 'showlist'
                        }
                    ],
                    category: [
                        {
                            name: '课程管理',
                            command: 'showcategory'
                        },
                        {
                            name: '课程分类',
                             command: 'showcategory'
                        }
                    ]
                }
            }
        },
        events: {
            showlist() {
                var self = this;
                var l = self.navs['list'].length;
                for (var i = 0; i < l; i++) {
                    if (self.navs['list'][i] && self.navs['list'][i].name === '课程详情') {
                        self.navs['list'].splice(i, 1);
                    }
                }
                
                this.showDetail = false;
                this.$broadcast('hidedetail');
            },
            showcategory() {
                var self = this;
                var l = self.navs['category'].length;
                for (var i = 0; i < l; i++) {
                    if (self.navs['category'][i] && self.navs['category'][i].name === '课程详情') {
                        self.navs['category'].splice(i, 1);
                    }
                }
                
                this.showDetail = false;
                this.$broadcast('hidedetail');
            },
            showdetail(id, type) {
                this.detailId = id;
                this.showDetail = true;
                this.navs[type].push({
                    name: '课程详情'
                })
            }
        },
        components: {
            breadNavs: breadNavs,
            Detail: Detail
        }
    }
</script>