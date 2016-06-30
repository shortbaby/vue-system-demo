'use strict';

import Single from '../../common/components/Single.vue';
import Multiple from '../../common/components/Multiple.vue';
import Fillblank from '../../common/components/Fillblank.vue';
import Essay from '../../common/components/Essay.vue';
import {getAssignmentDetail} from './request';
export default {
	vuex: {
		getters:　{
			currentView: state => state.currentView
		},
		actions: {
			changeTabs({dispatch}, currentView) {
				dispatch('CHANGE_TAB', currentView);
			}
		}
	},
	data() {
		return {
			currentQuestion: {
				questionType: 0,
				name: '',
				options: [],
				answer: [],
				select: [],
				score: 0,
				phase: 0
			},
			score: null,
			rightNum: 0,
			errorNum: 0,
			paperStudentId: null,
			index: 1,
			showLeft: false,
			list: []
		}
	},
	watch: {
		index(val, oldVal) {
			if (val < 1 || val > this.list.length) {
				return;
			}
			this.currentQuestion = this.list[val -1];
			let oldQuestion = this.list[oldVal - 1];
		},
		'currentQuestion.questionType'(val) {
			if (val == 0) {
				this.changeTabs('single');
			}
			if (val == 1) {
				this.changeTabs('multiple');
			}
			if (val == 2) {
				this.changeTabs('fillblank');
			}
			if (val == 3) {
				this.changeTabs('essay');
			}
		}
	},
	created() {
		this.paperStudentId = this.$route.params.id;
		this.getDetail();
	},
	ready() {
		let height = $('body').height() - $('#nav-bar').height();
		$('.dohomework-wrap').css('height', height);
		///alert($('body').width());
	},
	methods: {
		getDetail() {
			getAssignmentDetail({
				paperStudentId: this.paperStudentId
			})
				.then((res) => {
					this.list = res.data.questions;
					this.score = res.data.score;
					this.rightNum = res.data.rightNum;
					this.errorNum = res.data.errorNum;
					this.currentQuestion = this.list[this.index - 1];
					if (this.currentQuestion.questionType == 0) {
						this.changeTabs('single');
					} else if (this.currentQuestion.questionType == 1) {
						this.changeTabs('multiple');
					} else if (this.currentQuestion.questionType == 2) {
						this.changeTabs('fillblank');
					} else if (this.currentQuestion.questionType == 3) {
						this.changeTabs('essay');
					}
					this.list.forEach((item) => {
						let contents = [];
						if(item.questionType == 2) {
						
							if (item.name.length > 0) {
					            contents =  JSON.parse(item.name);
					        }
					        let index = 0;
					        contents.forEach((content) => {
					        	if (content.type == 'blank') {
					        		if (index < item.select.length) {
					        			Vue.set(content, 'select', item.select[index]);
					        		} else {
					        			Vue.set(content, 'select', '');
					        		}
					        		index++;
					        	}
					        })
					        Vue.set(item, 'contents', contents);

						}
					})
				})
		},
		left() {
			this.showLeft = !this.showLeft;
		},
		previous() {
			if (this.showLeft) {
				return;
			}
			this.index--;
			if (this.index < 1) {
				this.index = 1
			}
		},
		next() {
			if (this.showLeft) {
				return;
			}
			this.index++;
			if (this.index > this.list.length) {
				this.index = this.list.length
			}
		},
		change() {

		}
	},
	components: {
		Single: Single,
		Multiple: Multiple,
		Fillblank: Fillblank,
		Essay: Essay
	}
};