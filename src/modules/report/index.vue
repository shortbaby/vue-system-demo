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
					studentReport: [
						{
							name: '首页',
							command: 'showstudentreport'
						},
						{
							name: '校区学生报表',
							command: 'showstudentreport'
						}
					],
					analysisReport: [
						{
							name: '首页',
							command: 'showanalysisreport'
						},
						{
							name: '招生分析报表',
							command: 'showanalysisreport'
						}
					],
					financialReport: [
						{
							name: '首页',
							command: 'showfinancialreport'
						},
						{
							name: '校区财务报表',
							command: 'showfinancialreport'
						}
					],
					teacherReport: [
						{
							name: '首页',
							command: 'showteacherreport'
						},
						{
							name: '班主任报表',
							command: 'showteacherreport'
						}
					],
					adviserReport: [
						{
							name: '首页',
							command: 'showadviserreport'
						},
						{
							name: '咨询顾问报表',
							command: 'showadviserreport'
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