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
					agenda: [
						{
							name: '首页',
							command: 'showagenda'
						},
						{
							name: '日程管理',
							command: 'showagenda'
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
</style>