<!--
	@file tianxiao-virgo-frontend
	@author xuguanlong
-->

<template>
	<div class="question-form">
		<modal :show.sync="show" :width="640">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title">修改题目</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hide()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
		  		<div v-if="question.questionType == 0">
					<single :question.sync="question" type="modify"></single>
				</div>
				<div v-if="question.questionType == 1">
					<multiple :question.sync="question" type="modify"></multiple>
				</div>
				<div v-if="question.questionType == 2">
					<fillblank :question.sync="question" type="modify"></fillblank>
				</div>
				<div v-if="question.questionType == 3">
					<essay :question.sync="question" type="modify"></essay>
				</div>
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<button @click.stop="save($event)" class="btn btn-primary">保存</button>
		  			<button @click.stop="hide()" class="btn btn-default">取消</button>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import Single from './Single.vue';
import Multiple from './Multiple.vue';
import Fillblank from './Fillblank.vue';
import Essay from './Essay.vue';
import {editQuestion} from '../request';
export default {
	props: {
		show: {
			type: Boolean,
			default: false,
			twoWay: true
		},
		question: {
			type: Object
		}
	},
	components: {
		Modal: Modal,
		Single: Single,
		Multiple: Multiple,
		Fillblank: Fillblank,
		Essay: Essay
	},
	methods: {
		checkQuestion() {
			let check = true;
			let self = this;
			if (self.question.questionType == 2) {
				self.question.answer = [];
				self.question.name = JSON.stringify(this.question.contents);
				self.question.contents.forEach(function(content) {
					if (content.type == 'blank') {
						self.question.answer.push(content.content);
					}
				});
			}
			if (self.question.name == '') {
				check = false;
				dispatch('TOAST', `题目为空，请重新填写`);
			}
			if (self.question.questionType == 2) {
				let checkAnswer = true;
				for (let j = 0; j < self.question.answer.length; j++) {
					let a = self.question.answer[j];
					if (a.length == 0) {
						checkAnswer = false;
					}
				};
				if (checkAnswer == false) {
					check = false;
					dispatch('TOAST', `未填写正确答案，请重新填写`);
				}
				
			}
			if (self.question.questionType != 3) {
				if (!self.question.answer || self.question.answer.length == 0) {
					check = false;
					dispatch('TOAST', `未填写正确答案，请重新填写`);
				}
			}
			if (self.question.questionType == 0) {
				let answer = self.question.answer[0];
				self.question.answer = [];
				self.question.answer = [answer];
			}
			if (!self.question.score) {
				check = false;
				dispatch('TOAST', `分值不能为空，请重新填写`);
			}
			return check;
		},
		save (event) {
			var btn = $(event.target);
			var self = this;
			if (!self.checkQuestion()) {
				return;
			}
			let question = JSON.stringify(this.question);
			btn.prop('disabled', true);
			editQuestion({
				question: question	
			})
				.then(function(res) {
					if (res.code == 0) {
						dispatch('TOAST', '修改题目成功', 'success');
						setTimeout(function() {
							self.hide();
							self.$dispatch('editsuccess');
							//btn.prop('disabled', false);
						}, 1000);
								
					}
				})
				.fail(function() {
					btn.prop('disabled', false);
				});
		},
		hide(event) {
			this.show = false;
			$('body').removeClass('modal-open');
		}
	}
}
</script>
<style lang="sass">

</style>