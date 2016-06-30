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
                    school: [
                        {
                            name: '系统设置',
                            command: 'showuser'
                        },
                        {
                            name: '校区管理',
                            command: 'showschool'
                        }
                    ],
					user: [
						{
							name: '系统设置',
							command: 'showuser'
						},
						{
							name: '员工管理',
							command: 'showuser'
						}
					],
					teacher: [
						{
							name: '系统设置',
							command: 'showuser'
						},
						{
							name: '老师管理',
							command: 'showteacher'
						}
					],
                    attendance: [
                        {
                            name: '系统设置',
                            command: 'showuser'
                        },
                        {
                            name: '老师考勤',
                            command: 'showattendance'
                        }
                    ],
                    classroom: [
                        {
                            name: '系统设置',
                            command: 'showuser'
                        },
                        {
                            name: '教室管理',
                            command: 'showclassroom'
                        }
                    ],
                    role: [
                        {
                            name: '系统设置',
                            command: 'showuser'
                        },
                        {
                            name: '职位管理',
                            command: 'showrole'
                        }
                    ],
                    channel: [
                        {
                            name: '系统设置',
                            command: 'showuser'
                        },
                        {
                            name: '线索渠道管理',
                            command: 'showchannel'
                        }
                    ],
                    parameter: [
                        {
                            name: '系统设置',
                            command: 'showuser'
                        },
                        {
                            name: '系统参数设置',
                            command: 'showparameter'
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