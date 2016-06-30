'use strict';

import Single from '../../common/components/Single.vue';
import Multiple from '../../common/components/Multiple.vue';
import Fillblank from '../../common/components/Fillblank.vue';
import Essay from '../../common/components/Essay.vue';
import {getQuestions, submitQuestion, submitAssignment} from './request';
export default {
	vuex: {
		getters: 　{
			currentView: state => state.currentView
		},
		actions: {
			changeTabs({
				dispatch
			}, currentView) {
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
			this.submitQuestion(oldQuestion);
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
		this.getQuestions();
	},
	ready() {
		let height = $('body').height() - $('#nav-bar').height();
		$('.dohomework-wrap').css('height', height);
		///alert($('body').width());
	},
	methods: {
		submitQuestion(question) {
			let param = {
				questionId: question.id,
				paperStudentId: this.paperStudentId,
				answers: []
			}
			if (question.questionType == 0) {
				//param.answers[0] = question.select
				param.answers.push(question.select.toString());
			}
			if (question.questionType == 1) {
				param.answers = question.select;
			}
			if (question.questionType == 2) {
				question.contents.forEach((item) => {
					if (item.type == 'blank') {
						if (item.select == null) {
							item.select = '';
						}
						param.answers.push(item.select);
					}	
				})
			}
			if (question.questionType == 3) {
				if (question.select == null) {
					param.answers = null;
				} else {

					param.answers.push(question.select.toString());;
				}
			}

			if (this.checkAnswer(param.answers)) {
				submitQuestion(param)
					.then((res) => {
						Vue.set(question, 'submited', true);
						//this.$set(question.submited', true);
						//question.submited = true;
					})
			}
		},
		checkAnswer(answers) {
			let rst = false;
			if (answers.toString().length == 0) {
			} else {
				answers.forEach((item) => {
					if (item.toString().length != 0) {
						rst = true;
					}
				})
			}
			return rst;

		},
		getQuestions() {
			getQuestions({
					paperStudentId: this.paperStudentId
				})
				.then((res) => {
					this.list = res.data;
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
				})
		},
		left() {
			this.showLeft = !this.showLeft;
			if (this.showLeft) {
				this.submitQuestion(this.currentQuestion);
			}
		},
		previous(event) {
			if (this.showLeft) {
				return;
			}
			let target = $(event.target);
			if (target.hasClass('disable')) {
				return;
			}
			this.index--;
			if (this.index < 1) {
				this.index = 1
			}
		},
		next(event) {
			if (this.showLeft) {
				return;
			}
			let target = $(event.target);
			if (target.hasClass('disable')) {
				return;
			}
			this.index++;
			if (this.index > this.list.length) {
				this.index = this.list.length
			}
		},
		submit(event) {
			let target = $(event.target);
			target.prop('disable', true);
			submitAssignment({
				paperStudentId: this.paperStudentId
			})
				.then((res) => {
					dispatch('TOAST', '作业提交成功', 'success');
				})
				.always(() => {
					target.prop('disable', false);
				});
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