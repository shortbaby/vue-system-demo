<!--
	@file tianxiao-virgo-frontend 评语
	@author xuguanlong
-->

<template>
	<div class="comment-form">
		<modal :show.sync="show">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title" v-if="!modify">写评语</h4>
		    	<h4 class="modal-title" v-if="modify">修改评语</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hide()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
				<textarea class="reason" v-model="comment.content" minlength="10" placeholder="请填写对学生的评语"></textarea>
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<button @click.stop="save($event)" class="btn btn-primary">完成</button>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import Modal from '../../../../dep/vue-strap/src/Modal.vue';
	import {addFeedBack, editFeedBack} from '../../teacherCenter/class/request';
	export default {
		props: {
			modify: {
				type: Boolean,
				default: false
			},
			info: {
				type: Object
			},
			comment: {
				type: Object
			},
			student: {
				type: Object
			},
			show: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			hide() {
				this.show = false;
				$('body').removeClass('modal-open');
			},
			save(event) {
				if (this.comment.content.length == 0) {
					dispatch('TOAST', '请输入评论内容');
					return;
				}
				let param = {};
				if (this.info) {
					$.extend(param, this.info);
				}
				$.extend(param, {
					studentId: this.student.studentId,
				    content: this.comment.content
				})
				let target = $(event.target);
				if (this.modify) {
					editFeedBack(this.comment)
						.then((res) => {
							dispatch('TOAST', '修改评语成功', 'success');
							this.$dispatch('refresh');
							this.hide();
						})
				} else {
					addFeedBack(param)
						.then((res) => {
							dispatch('TOAST', '添加评语成功', 'success');
							this.$dispatch('refresh');
							this.hide();
						})
				}
			}
		},
		components: {
			Modal: Modal
		}
	}
</script>
<style lang="sass">
.comment-form {
	.modal-body {
		text-align: center;
		p {
			text-align: left;
			margin-bottom: 10px;
			padding-left: 10px;
		}
	}
	textarea {
		width: 90%;
		height: 120px;
		border: 1px solid #ddd;
		padding: 5px 10px;
		outline: none;
		font-size: 1.4rem;
	}
}
</style>