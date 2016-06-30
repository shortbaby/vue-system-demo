

'use strict';

import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import Select from '../../../../dep/vue-strap/src/Select.vue';
import getSelectOptions from '../../../common/function/getSelectOptions';
import InferenceInput from '../../../common/components/InferenceInput.vue';
import {getSchool, selectStudent, getClasses, getClassDetail, refundApply, getRefundDetail, checkRefundApply, getAgreementNumberOptions, getDetailAfterPass} from '../request';
let options = getSelectOptions();
export default {
	data () {
		return {
			name: '',
			school: -1,
			subject: -1,
			agreementId: -1,
			agreementNumber: '',
			refundment: 0,
			money: 0,
			remarks: '',
			review: '',
			student: null,
			refundForm: {},
			schoolOptions: [],
			subjectOptions: [],
			agreementNumberOptions: [],
			form: {
				price: 0,
		        discount: 0,
		        grantAmount: 0,
		        cutAccount: 0,
		        receivalbleExpense: 0,
		        realPayAmount: 0,
		        totalLesson: 0,
		        finishedCount: 0,
		        expectedReturnAmount: 0
			},
			queryStudent: function() {
				return selectStudent({name: this.query});
			},
			hitName: function(res) {
				this.$parent.$parent.student = res;
			},
			nameTemplate: `<span v-html="item.name"></span>`
		}
	},
	watch: {
		student(val) {
			if (val.id) {
				this.getSubjects();
				this.getOptions()
			}
		},
		school(val) {
			this.getSubjects();
		},
		agreementId(val) {
			//this.
		},
		subject(val) {
			if (val == -1) {
				this.form = {
					price: 0,
			        discount: 0,
			        grantAmount: 0,
			        cutAccount: 0,
			        receivalbleExpense: 0,
			        realPayAmount: 0,
			        totalLesson: 0,
			        finishedCount: 0,
			        expectedReturnAmount: 0,
			        realReturnAmount: 0
				}
			} else {
				this.getDetail();
			}
		}
	},
	props: {
		show: {
			type: Boolean,
			default: false,
			twoWay: true
		},
		id: {
			type: Number,
			default: 0,
			twoWay: true
		},
		type: {
			type: String,
			default: ''
		}
	},
	components: {
		Modal: Modal,
		vSelect: Select,
		InferenceInput: InferenceInput
	},
	methods: {
		getDetailAfterPass() {
			if (this.id) {
				getDetailAfterPass({
					id: this.id
				})
					.then((res) => {
						if (res.code == 0) {
							this.form = res.data;
							this.form['realReturnAmount'] = this.form['realReturnAmount'] / 100;
							this.form['price'] = this.form['price'] / 100;
							this.form['grantAmount'] = this.form['grantAmount'] / 100;
							this.form['realPayAmount'] = this.form['realPayAmount'] / 100;
							this.form['receivalbleExpense'] = this.form['receivalbleExpense'] / 100;
							this.form['expectedReturnAmount'] = this.form['expectedReturnAmount'] / 100;
							//this.$set('form', form);
							if (this.type == 'modify') {
								this.getSubjects();
								this.getOptions();
								this.school = this.form['schoolId'];
								this.subject = this.form['classId'];
								this.agreementId = this.form['agreementId'];
							}
						}
					})
			}
		},
		getRefundDetail() {
			if (this.id) {
				getRefundDetail({
					id: this.id
				})
					.then((res) => {
						if (res.code == 0) {
							this.form = res.data;
							this.form['realReturnAmount'] = this.form['realReturnAmount'] / 100;
							this.form['price'] = this.form['price'] / 100;
							this.form['grantAmount'] = this.form['grantAmount'] / 100;
							this.form['realPayAmount'] = this.form['realPayAmount'] / 100;
							this.form['receivalbleExpense'] = this.form['receivalbleExpense'] / 100;
							this.form['expectedReturnAmount'] = this.form['expectedReturnAmount'] / 100;
							//this.$set('form', form);
							if (this.type == 'modify') {
								this.getSubjects();
								this.getOptions();
								this.school = this.form['schoolId'];
								this.subject = this.form['classId'];
								this.agreementId = this.form['agreementId'];
							}
						}
					})
			}
		},
		getDetail() {
			getClassDetail({
				agreementId: this.agreementId,
				classId: this.subject
			})
				.then((res) => {
					if (res.code == 0) {
						this.form = $.extend(this.form, res.data);
						// this.form = $.extend(this.form,res.data);
						this.form['expectedReturnAmount'] = this.form['expectedReturnAmount'] / 100;
						this.form['price'] = this.form['price'] / 100;
						this.form['grantAmount'] = this.form['grantAmount'] / 100;
						this.form['realPayAmount'] = this.form['realPayAmount'] / 100;
						this.form['receivalbleExpense'] = this.form['receivalbleExpense'] / 100;
						//this.$set('form', form);
					}
				})
		},
		getSubjects() {
			let params = {};
			if (this.type == 'add') {
				if (!this.student) {
					return;
				}
				$.extend(params, {
					studentId: this.student.id
				})
				if (this.school != -1) {
					$.extend(params, {
						schoolId: this.school
					});
				}
			} else {
				$.extend(params, {
					studentId: this.form.studentId,
					schoolId: this.form.schoolId
				})
			}
			getClasses(params)
				.then((res) => {
					if (res.code == 0) {
						let subjectList = res.data;
						subjectList.forEach(function(item) {
							item.value = item.id.toString();
							item.label = item.name;
						});
						this.subjectOptions = subjectList;
						this.subjectOptions.splice(0, 0, options.blankItem);
					}
				})
		},
		getOptions() {
			let self = this;
			let param1 = {};
			let param2 = {};
			if (this.type == 'add') {
				if (!this.student) {
					return;
				}
				$.extend(param1, {
					studentId: this.student.id
				})
				$.extend(param2, {
					studentId: this.student.id
				})
				if (this.school != -1) {
					$.extend(param2, {
						schoolId: this.school
					});
				}
			} else {
				$.extend(param1, {
					studentId: this.form.studentId
				});
				$.extend(param2, {
					studentId: this.form.studentId,
					schoolId: this.form.schoolId
				})
			}
			$.when(getSchool(param1), getAgreementNumberOptions(param2))
				.then(function(res,  res1) {
					let schoolList = res.data;
					let agreementNumberList = res1.data;
					schoolList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					agreementNumberList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					self.schoolOptions = schoolList;
					self.schoolOptions.splice(0, 0, options.blankItem);
					self.agreementNumberOptions = agreementNumberList;
					self.agreementNumberOptions.splice(0, 0, options.blankItem);
				})
		},
		refuse() {
			var btn = $(event.target);
			var self = this;
			var form = $.extend({}, this.form);
			btn.prop('disabled', true);
			checkRefundApply({
				id: form.id,
				illustration: form.illustration,
				status: 1
			})
				.then((res) => {
					if (res.code == 0) {
						dispatch('TOAST', '已经拒绝该退费申请', 'success');
						self.$parent.$emit('success');
						setTimeout(function(){
							self.hide();
						}, 1000);
					}
				})
		},
		save (event) {
			var btn = $(event.target);
			var self = this;
			var form = $.extend({}, this.form);
			var params = {};
			this.refundForm.$submitted = true;
			form['agreementId'] = this.agreementId;
			form['classId'] = this.subject;
			if (this.id) {
				$.extend(params, {
					id: this.id
				});
			}
			
			if (this.type == 'add') {
				$.extend(params, {
					status: 0
				});
			}
			if (this.remarks.length > 0) {
				$.extend(params, {
					remark: this.remarks
				});
			}
			
			if (this.type == 'add') {
				if (!this.student) {
					dispatch('TOAST', '请先选择学员');
					return;
				} else {
					$.extend(params, {
						studentId: this.student.id
					});
				}
				if (this.agreementId == -1) {
					dispatch('TOAST', '请先选择退费合同');
					return;
				} else {
					$.extend(params, {
						agreementId: this.agreementId
					});
				}
				if (this.subject == -1) {
					dispatch('TOAST', '请先选择退费课程');
					return;
				} else {
					$.extend(params, {
						classId: this.subject
					});
				}
				if (this.money <= 0) {
					dispatch('TOAST', '请填写退费金额');
					return;
				} else {
					$.extend(params, {
						realReturnAmount: this.money * 100
					});
				}
				btn.prop('disabled', true);
				refundApply(params)
					.then((res) => {
						if (res.code == 0) {
							dispatch('TOAST', '添加退费记录成功', 'success');
							self.$parent.$emit('success');
							setTimeout(function(){
								self.hide();
							}, 1000);
						}
					})
					.always(function() {
						btn.prop('disabled', false);
					})
			}
			if (this.type == 'modify') {
				this.form['realReturnAmount'] = this.form['realReturnAmount'] * 100;
				this.form['status'] = 1;
				btn.prop('disabled', true);
				refundApply(this.form)
					.then((res) => {
						if (res.code == 0) {
							dispatch('TOAST', '修改退费记录成功', 'success');
							self.$parent.$emit('success');
							setTimeout(function(){
								self.hide();
							}, 1000);
						}
					})
					.always(function() {
						btn.prop('disabled', false);
					})
			}
			if (this.type == 'verify') {
				btn.prop('disabled', true);
				checkRefundApply({
					id: form.id,
					illustration: form.illustration,
					status: 2
				})
					.then((res) => {
						if (res.code == 0) {
							dispatch('TOAST', '已经通过该退费申请', 'success');
							self.$parent.$emit('success');
							setTimeout(function(){
								self.hide();
							}, 1000);
						}
					})
					.always(function() {
						btn.prop('disabled', false);
					})
			}
		},
		hide() {
			this.show = false;
			$('body').removeClass('modal-open');
		}
	},
	created () {
		var self = this;
		if (self.type == 'add') {
			self.getOptions();
		}
		if (self.type == 'detail') {
			self.getDetailAfterPass();
		}
		if (self.type == 'modify' || self.type == 'verify') {
			self.getRefundDetail();
		}
		
	},
	beforeDestroy () {
		this.id = 0;
		this.isCopy = false;
	}
}