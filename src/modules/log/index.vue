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
    			navs:  {
					history: [
						{
							name: '操作记录',
							command: 'showhistory'
						},
						{
							name: '历史记录',
							command: 'showhistory'
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
@import './style';
</style>