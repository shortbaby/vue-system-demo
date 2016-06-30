<template>
	<div>
		<bread-navs :taps="taps"></braed-navs>
	</div>
	<router-view></router-view>
	
</template>

<script>
	import breadNavs from '../../common/components/breadNavs.vue';
    export default {
    	data() {
    		return {
    			id: 0,
    			navs:  {
					add: [
						{
							name: '财务管理',
							command: 'showadd'
						},
						{
							name: '添加合同',
							command: 'showadd'
						}
					],
					list: [
						{
                            name: '财务管理',
                            command: 'showadd'
                        },
                        {
                            name: '合同列表',
                            command: 'showlist'
                        }
					],
					refund: [
						{
                            name: '财务管理',
                            command: 'showadd'
                        },
                        {
                            name: '退费记录',
                            command: 'showrefund'
                        }
					]
				}
    		}
    	},
    	events: {
    		
    		
    	},
    	computed: {
    		taps() {
    			var routeName = this.$route.name;
    			return this.navs[routeName];
    		}
    	},
        components: {
            breadNavs: breadNavs
        }
    }
</script>

<style lang="sass">
@import "./common-styles";
</style>