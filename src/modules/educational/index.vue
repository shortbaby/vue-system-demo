<template>
	<div>
		<bread-navs :taps="taps"></braed-navs>
	</div>
	<schedule v-if="schedule" :show.sync = "schedule" :id.sync = "courseId"></schedule>
	<router-view></router-view>
	
</template>

<script>
	import breadNavs from '../../common/components/breadNavs.vue';
	import Schedule from './components/Schedule.vue';
    export default {
    	data() {
    		return {
    			courseId: 0,
    			schedule: false,
    			navs:  {
					course: [
						{
							name: '教务管理',
							command: 'showcourse'
						},
						{
							name: '待排课班级',
							command: 'showcourse'
						}
					],
					timetable: [
						{
							name: '教务管理',
							command: 'showcourse'
						},
						{
							name: '课表',
							command: 'showtimetable'
						}
					],
					sign: [
						{
							name: '教务管理',
							command: 'showcourse'
						},
						{
							name: '签到管理',
							command: 'showsign'
						}
					]
				}
    		}
    	},
    	events: {
    		showcourse() {
    			var self = this;
    			if (this.schedule) {
    				var l = self.navs['course'].length;
    				for (var i = 0; i < l; i++) {
    					if (self.navs['course'][i].name === '排课') {
    						self.navs['course'].splice(i, 1);
    						break;
    					}
    				}
    			}
    			this.schedule = false;
    			this.$broadcast('hideschedule');
    		},
    		schedule(id, type) {
    			this.courseId = id;
    			this.schedule = true;
    			this.navs[type].push({
    				name: '排课'
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
            Schedule: Schedule
        }
    }
</script>

<style lang="sass">
@import "./common-styles";
</style>