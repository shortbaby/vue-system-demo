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
					// bind: [
					// 	{
					// 		name: '家校通',
					// 		command: 'showbind'
					// 	},
					// 	{
					// 		name: '微信认证',
					// 		command: 'showbind'
					// 	}
					// ],
					fans: [
						{
							name: '家校通',
							command: 'showbind'
						},
						{
							name: '微信粉丝',
							command: 'showfans'
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