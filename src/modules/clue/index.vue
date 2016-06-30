<template>
	<div>
		<bread-navs :taps="taps"></braed-navs>
	</div>
	<div class="clue-detail-content">
		<clue-detail v-if="showDetail" :show.sync="showDetail" :id="clueId" ></clue-detail>
	</div>
	<router-view></router-view>

</template>

<script>
	import breadNavs from '../../common/components/breadNavs.vue';
	import clueDetail from './clueDetail.vue';
    export default {
    	data() {
    		return {
    			clueId: 0,
    			showDetail: false,
                tab: null,
    			navs:  {
					myClue: [
						{
							name: '线索管理',
							command: 'showmyclue'
						},
						{
							name: '我的线索',
							command: 'showmyclue'
						}
					],
					commonClue: [
						{
							name: '线索管理',
							command: 'showcommonclue'
						},
						{
							name: '公共线索',
							command: 'showcommonclue'
						}
					],
					invalidClue: [
						{
							name: '线索管理',
							command: 'showinvalidclue'
						},
						{
							name: '无效线索',
							command: 'showinvalidclue'
						}
					]
				}
    		}
    	},
    	events: {
    		showmyclue() {
    			var self = this;
				var l = self.navs['myClue'].length;
				for (var i = 0; i < l; i++) {
					if (self.navs['myClue'][i].name === '线索详情') {
						self.navs['myClue'].splice(i, 1);
					}
				}
    			this.showDetail = false;
    			this.$broadcast('hidedetail');
    		},
    		showcommonclue() {
    			var self = this;
				var l = self.navs['commonClue'].length;
				for (var i = 0; i < l; i++) {
					if (self.navs['commonClue'][i].name === '线索详情') {
						self.navs['commonClue'].splice(i, 1);
					}
				}
    			this.showDetail = false;
    			this.$broadcast('hidedetail');
    		},
    		showinvalidclue() {
    			var self = this;
				var l = self.navs['invalidClue'].length;
				for (var i = 0; i < l; i++) {
					if (self.navs['invalidClue'][i].name === '线索详情') {
						self.navs['invalidClue'].splice(i, 1);
					}
				}
    			this.showDetail = false;
    			this.$broadcast('hidedetail');
    		},
    		showdetail(id, type) {
    			this.clueId = id;
    			this.showDetail = true;
                this.tab = type;
    			this.navs[type].push({
    				name: '线索详情'
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
            clueDetail: clueDetail
        }
    }
</script>

<style lang="sass">
@import "./common-styles";
</style>