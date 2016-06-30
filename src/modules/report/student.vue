<template>
	<ul class="report-tabs">
		<li :class="{current: isCurrent('course')}" @click="changeTabs('course')" >
			<div>校区课程报表</div>
		</li>
		<li :class="{current: isCurrent('student')}" @click="changeTabs('student')">
			<div>在读学员报表</div>
		</li>
	</ul>
	<component :is="currentView" transition="fade" transition-mode="out-in" keep-alive>
	</component>
</template>

<script>
	import Student from './components/student.vue';
	import Course from './components/course.vue';
    export default {
    	data() {
    		return {
    		}
    	},
    	vuex: {
			getters:　{
				currentView: state => state.report.studentCurrentView
			},
			actions: {
				changeTabs({dispatch}, currentView) {
					dispatch('CHANGE_REPORT_STUDENT_TAB', currentView);
				}
			}
		},
		create() {
			dispatch('CHANGE_REPORT_STUDENT_TAB', 'cource');
		},
    	events: {
    	},
    	methods: {
    		isCurrent(view) {
				return view === this.currentView;
			}
    	},
    	components: {
    		Student: Student,
    		Course: Course
    	}
    }
</script>

<style lang="sass">
</style>