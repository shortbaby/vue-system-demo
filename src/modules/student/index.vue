<template>
	<div>
		<bread-navs :taps="taps"></braed-navs>
	</div>
	<div class="student-detail-content">
		<student-detail v-if="showDetail" :show.sync="showDetail" :id="studentId"></student-detail>
	</div>
	<router-view></router-view>

</template>

<script>
	import breadNavs from '../../common/components/breadNavs.vue';
	import studentDetail from './studentDetail.vue';
    export default {
    	data() {
    		return {
    			studentId: 0,
    			showDetail: false,
    			navs:  {
					myStudent: [
						{
							name: '学生档案管理',
							command: 'showmystudent'
						},
						{
							name: '我的学生',
							command: 'showmystudent'
						}
					],
					commonStudent: [
						{
							name: '学员档案管理',
							command: 'showcommonstudent'
						},
						{
							name: '学生档案',
							command: 'showcommonstudent'
						}
					]
				}
    		}
    	},
    	events: {
    		showmystudent() {
    			var self = this;
				var l = self.navs['myStudent'].length;
				for (var i = 0; i < l; i++) {
					if (self.navs['myStudent'][i].name === '学员详情') {
						self.navs['myStudent'].splice(i, 1);
						break;
					}
				}
    			this.showDetail = false;

    			this.$broadcast('hidedetail');
    		},
    		showcommonstudent() {
    			var self = this;
				var l = self.navs['commonStudent'].length;
				for (var i = 0; i < l; i++) {
					if (self.navs['commonStudent'][i].name === '学员详情') {
						self.navs['commonStudent'].splice(i, 1);
						break;
					}
				}
    			this.showDetail = false;
    			this.$broadcast('hidedetail');
    		},
    		showdetail(id, type) {
    			this.studentId = id;
    			this.showDetail = true;
    			this.navs[type].push({
    				name: '学员详情'
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
            studentDetail: studentDetail
        }
    }
</script>

<style lang="sass">
@import "./common-styles";
</style>