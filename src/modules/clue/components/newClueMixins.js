

'use strict';

import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import Select from '../../../../dep/vue-strap/src/Select.vue';
import Calendar from '../../../common/components/Calendar.vue';
import config from '../config';
import getSelectOptions from '../../../common/function/getSelectOptions';
import {addClue, getSchoolList, getOriginList, getAdviserList, getSubjectList, getBelongToList} from '../request';
let options = getSelectOptions();
export default {
	computed: {

	},
	data () {
		return {
			form: {
				name: '',
				mobile: '',
				channelId: -1,
				sourceDetail: '',
				adviserId: -1,
				belongTo: -1,
				subjectId: -1,
				availableTime: -1,
				parentName: '',
				parentMobile: '',
				relationship: -1,
				nextRemindTime: null,
				nextRemindTimeStr: '',
				orgSchoolId: -1,
				school: '',
				grade: '',
				gender: -1,
				mail: '',
				qq: '',
				address: '',
				remarks: '',
				recommendedOrg: '',
				consultStatus: -1,
				hasDeposite: -1,
				followPlan: -1,
				studyPhase: -1,
				deposite: null,
				score: null
			},
			clueForm: {},
			subjectOptions: [],
			originOptions: [],
			belongToOptions: [],
			consultStatusOptions: options.consultStatusOptions,
			hasDepositeOptions: options.hasDepositeOptions,
			availableTimeOptions: options.availableTimeOptions,
			relationshipOptions: options.relationshipOptions,
			genderOptions: options.genderOptions,
			studyPhaseOptions: options.studyPhaseOptions,
			followPlanOptions: options.followPlanOptions,
			schoolOptions: [],
			calendarShow:false,
            calendarType:"datetime",
            calendarX:0,
            calendarY:0,
            calendarRange:false
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
		}
	},
	components: {
		Modal: Modal,
		vSelect: Select,
		Calendar: Calendar
	},
	vuex: {
		actions: {
			hideNewClue: ({ dispatch }) => {
				dispatch('HIDE_NEW_CLUE');
			}
		}
	},
	methods: {
		isFromClueMy () {
			return this.$root.tab === config.my;
		},
		getOptions() {
			let self = this;
			$.when(getSchoolList(), getOriginList(), getAdviserList(), getSubjectList(), getBelongToList())
				.then(function(res1, res2, res3, res4, res5) {
					let schoolList = res1.data.list;
					let originList = res2.data.list;
					let adviserList = res3.data.list;
					let subjectList = res4.data.list;
					let belongToList = res5.data.list;
					schoolList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					originList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					adviserList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					subjectList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					belongToList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					schoolList.splice(0, 0, options.blankItem);
					self.schoolOptions = schoolList;
					originList.splice(0, 0, options.blankItem);
					self.originOptions = originList;
					adviserList.splice(0, 0, options.blankItem);
					self.adviserOptions = adviserList;
					subjectList.splice(0, 0, options.blankItem);
					self.subjectOptions = subjectList;
					belongToList.splice(0, 0, options.blankItem);
					self.belongToOptions = belongToList;
				});
		},
		saveClue (event) {
			var btn = $(event.target);
			var self = this;
			var form = $.extend({}, this.form);
			if (this.$root.tab === config.common) {
				delete form['belongTo'];
			}
			this.clueForm.$submitted = true;

			if (this.clueForm.$valid) {
				if (form.name == "" || form.mobile == "") {
					dispatch('TOAST', '请填写姓名以及手机号');
					return;
				}
				if (form.hasOwnProperty('belongTo') && form.belongTo == -1) {
					dispatch('TOAST', '请选择线索归属');
					return;
				}
				if (form.orgSchoolId == -1) {
					dispatch('TOAST', '请选择校区');
					return;
				}
				if (form.hasDeposite == 1 && form.deposite == 0) {
					dispatch('TOAST', '请输入定金金额');
					return;
				} else if (form.hasDeposite == 1){
					if (form.deposite.toString().indexOf('.') > -1) {
						dispatch('TOAST', '定金金额必须是整数');
						return;
					}
					form.deposite == form.deposite * 100;
				}
				btn.prop('disabled', true);
				form.nextRemindTime = new Date().fromFormattedString(form.nextRemindTimeStr, 'yyyy-MM-dd HH:mm:ss').getTime();
				delete form['nextRemindTimeStr'];


				config
					.getAddRequest(self.$root.tab)
				(form)
					.then(function(res) {
						dispatch('TOAST', '添加线索成功', 'success');
						self.$dispatch('addcluesuccess');
						dispatch('HIDE_NEW_CLUE');
					})
					.always(function() {
						btn.prop('disabled', false);
					});
			} else {
				dispatch('TOAST', '请输入完整的信息');
				$('.modal.in').scrollTop(0);
			}
		},
		showCalendar:function(e){
            e.stopPropagation();
            var that=this;
            that.calendarShow=true;
            that.calendarX=e.target.offsetLeft;
            that.calendarY=e.target.offsetTop+e.target.offsetHeight+8;
            var bindHide=function(e){
                e.stopPropagation();
                that.calendarShow=false;
                document.removeEventListener('click',bindHide,false);
            };
            setTimeout(function(){
                document.addEventListener('click',bindHide,false);
            },500);
        }
	},
	created () {
		var self = this;
		self.getOptions();
		let date = new Date();
		date.setTime(date.getTime() + 60 * 60 * 24 * 1000);
		self.form.nextRemindTime = date.getTime();
		self.form.nextRemindTimeStr = date.toFormattedString('yyyy-MM-dd HH:mm:ss');
	},
	beforeDestroy () {
		this.id = 0;
		this.isCopy = false;
	}
}