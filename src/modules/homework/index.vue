<template>
	<div>
		<bread-navs :taps="taps"></braed-navs>
	</div>
    <detail v-if="showDetail" :show.sync="showDetail" :id.sync="homeworkId"></detail>
	<router-view></router-view>
	
</template>

<script>
	import breadNavs from '../../common/components/breadNavs.vue';
    import Detail from './components/Detail.vue';
    export default {
    	data() {
    		return {
    			homeworkId: 0,
                showDetail: false,
    			navs:  {
					question: [
						{
							name: '作业系统',
							command: 'showquestion'
						},
						{
							name: '题库',
							command: 'showquestion'
						}
					],
					list: [
						{
                            name: '作业系统',
                            command: 'showquestion'
                        },
                        {
                            name: '作业列表',
                            command: 'showlist'
                        }
					],
					arrangement: [
						{
                            name: '作业系统',
                            command: 'showquestion'
                        },
                        {
                            name: '布置作业',
                            command: 'showarrangement'
                        }
					]
				}
    		}
    	},
    	events: {
            showquestion() {
                var self = this;
                var l = self.navs['question'].length;
                for (var i = 0; i < l; i++) {
                    if (self.navs['question'][i].name === '作业详情') {
                        self.navs['question'].splice(i, 1);
                    }
                }
                
                this.showDetail = false;
                this.$broadcast('hidedetail');
            },
            showarrangement() {
                var self = this;
                var l = self.navs['arrangement'].length;
                for (var i = 0; i < l; i++) {
                    if (self.navs['arrangement'][i].name === '作业详情') {
                        self.navs['arrangement'].splice(i, 1);
                    }
                }
                
                this.showDetail = false;
                this.$broadcast('hidedetail');
            },
            showlist() {
                var self = this;
                var l = self.navs['list'].length;
                for (var i = 0; i < l; i++) {
                    if (self.navs['list'][i].name === '作业详情') {
                        self.navs['list'].splice(i, 1);
                    }
                }
                this.showDetail = false;
                this.$broadcast('hidedetail');
            },
    	    showdetail(id, type) {
                this.homeworkId = id;
                this.showDetail = true;
                this.navs[type].push({
                    name: '作业详情'
                })
            }	
    		
    	},
    	computed: {
    		taps() {
    			var routeName = this.$route.name;
    			return this.navs[routeName];
    		}
    	},
        components: {
            breadNavs: breadNavs,
            Detail: Detail
        }
    }
</script>

<style lang="sass">
@import "./common-styles";
</style>