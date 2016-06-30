

'use strict';

import GradeDetail from './GradeDetail.vue';
export default {
	computed: {
	},
	data () {
		return {
			hoverId: '0',
			showDetail: false
		}
	},
	props: {
	},
	components: {
		GradeDetail: GradeDetail
	},
	watch: {
		hoverId(newVal, oldVal) {
			let oldLi = $('#grade-' + oldVal + ' + .detail');
			let newLi = $('#grade-' + newVal + ' + .detail');
			if (newVal && oldVal && newVal != oldVal) {
				oldLi.slideUp('fast');
				newLi.slideDown('fast');
			}
		}
	},
	methods: {
		changeHoverId(event) {
			let target = $(event.currentTarget);
			let id = target.attr('data-id');
			if (id != this.hoverId) {
				this.hoverId = id;
			}
		},
		showGradeDetail(event) {
			let target = $(event.currentTarget);
			let id = target.attr('data-id');
			if (id != this.hoverId) {
				this.hoverId = id;
			}
			this.showDetail = true;
		}
	},
	created () {
		var self = this;
		
	},
	beforeDestroy () {
	}
}