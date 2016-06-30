<!--
	@file tianxiao-virgo-frontend 新建线索
	@author xuguanlong
-->

<template>
	<div>
		<modal :show.sync="show" :width="600">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title">线索查重</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hideClueCheck()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
		  		<form onsubmit="return false" id="clue-check-form" v-form  name="checkClueForm" class="clearfix">
		  			<div class="form-group">
						<label class="required">姓名</label>
						<input placeholder="请输入姓名" v-form-ctrl required name="name" v-model="form.name"  class="normal">
					</div>
					<div class="form-group">
						<label class="required">手机号</label>
						<input maxlength="11" placeholder="请输入11位手机号" v-form-ctrl required name="mobile" v-model="form.mobile" pattern="1\d{10}" class="normal">
					</div>
		  		</form>
		  		<div class="check-res" >
		  			<alert :show.sync="showAlert" :type="alertType" :duration="duration" v-cloak>
			            <p>{{alertMessage}}</p>
			        </alert>
			        <span v-if="status == 1" class="active-btn btn btn-primary" @click="activeClue()">激活</span>
		  		</div>

		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<button @click.stop="checkAccount($event)" class="btn btn-primary">查询</button>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import Modal from '../../../dep/vue-strap/src/Modal.vue';
	import Alert from './Alert.vue';
	import {clueDuplicate, activeClue} from '../../modules/clue/request';
	export default {
		data () {
			return {
				form: {
					name: '',
					mobile: ''
				},
				showAlert: false,
				duration: 0,
				alertType: 'success',
				alertMessage: '',
				checkClueForm: {},
				status: 0,
				clueId: null
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false,
				twoWay: true
			}
		},
		components: {
			Modal: Modal,
			Alert: Alert
		},
		methods: {
			hideClueCheck() {
				dispatch('HIDE_CHECK_CLUE');
			},
			activeClue() {
				let self = this;
				if (!this.clueId) {
					dispatch('TOAST', '线索不存在，无法激活');
					return;
				}
				activeClue({
					ids: this.clueId
				})
					.then((res) => {
						if (res.code == 0) {
							dispatch('TOAST', '线索激活成功', 'success');
							setTimeout(function() {
								dispatch('HIDE_CHECK_CLUE');
							}, 2000);
						}
					})
			},
			checkAccount (event) {
				var btn = $(event.target);
				var self = this;
				var form = this.form;
				this.checkClueForm.$submitted = true;
				if (this.checkClueForm.$valid) {
					clueDuplicate(form)
						.then((res) => {
							this.status = res.data.status;
							this.alertMessage = res.data.message;
							this.clueId = res.data.id;
							this.showAlert = true;
						})
				} else {
					$('.modal.in').scrollTop(0);
				}
			}
		}
	}
</script>
<style lang="sass">
	#clue-check-form {
		padding: 20px 0;
		.form-group {
			display: block;
			float: none;
			width: 100%;
			padding: 0 75px;
			label {
				width: 120px;
			}
			input.normal {
				width: 260px;
				height: 31px;
				line-height: 31px;
				margin-bottom: 0;
			}
			&.large {
				width: 97%;
			}
		}
	}
	.check-res {
		position: relative;
		.alert {
			&.top {
				position: relative;
				top: 0;
			}
		}
		.active-btn {
			position: absolute;
			right: 2px;
			top: 10px;
		}
	}
</style>