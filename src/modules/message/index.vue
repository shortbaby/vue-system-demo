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
					message: [
						{
							name: '消息中心',
							command: 'showmessage'
						},
						{
							name: '我的审批',
							command: 'showmessage'
						}
					],
                    apply: [
                        {
                            name: '消息中心',
                            command: 'showaplly'
                        },
                        {
                            name: '我的申请',
                            command: 'showapply'
                        }
                    ],
                    msglist: [
                        {
                            name: '消息中心',
                            command: 'showmsglist'
                        },
                        {
                            name: '消息列表',
                            command: 'showmsglist'
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