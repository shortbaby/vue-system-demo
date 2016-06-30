

'use strict';
import Select from '../../../../dep/vue-strap/src/Select.vue';
import getSelectOptions from '../../../common/function/getSelectOptions';
import Calendar from '../../../common/components/Calendar.vue';
import config from '../config';
import {editClue, getSchoolList, getOriginList, getAdviserList, getSubjectList} from '../request';
let options = getSelectOptions();
export default {
	computed: {
	},
	watch: {
		time(val) {
			this.clue.nextRemindTime = Date.parseFormatted(val, 'yyyy/MM/dd').getTime();
		}
	},
	data () {
		return {
			clue: {
				name: '',
				mobile: '',
				channelId: -1,
				sourceDetail: '',
				adviserId: -1,
				adviserName: '',
				subjectId: -1,
				availableTime: -1,
				parentName: '',
				parentMobile: '',
				relationship: -1,
				nextRemindTime: '',
				orgSchoolId: -1,
				recommendedOrg: '',
				hasDeposite: -1,
				deposite: null,
				school: '',
				score: null,
				grade: '',
				gender: -1,
				mail: '',
				qq: '',
				address: '',
				remarks: '',
				consultStatus: -1,
				studyPhase: -1,
				followPlan: -1
			},
			clueForm: {},
			subjectOptions: [],
			originOptions: [],
			adviserOptions: [],
			consultStatusOptions: options.consultStatusOptions,
			hasDepositeOptions: options.hasDepositeOptions,
			availableTimeOptions: options.availableTimeOptions,
			relationshipOptions: options.relationshipOptions,
			followPlanOptions: options.followPlanOptions,
			genderOptions: options.genderOptions,
			studyPhaseOptions: options.studyPhaseOptions,
			schoolOptions: [],
			calendarShow:false,
            calendarType:"datetime",
            calendarX:0,
            calendarY:0,
            calendarRange:false,
            time: ''
		}
	},
	props: {
		id: {
			type: Number,
			default: 0
		}
	},
	components: {
		vSelect: Select,
		Calendar: Calendar
	},
	vuex: {
		actions: {

		}
	},
	methods: {
		getOptions() {
			let self = this;
			$.when(getSchoolList(), getOriginList(), getAdviserList(), getSubjectList())
				.then(function(res1, res2, res3, res4) {
					let schoolList = res1.data.list;
					let originList = res2.data.list;
					let adviserList = res3.data.list;
					let subjectList = res4.data.list;
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
					schoolList.splice(0, 0, options.blankItem);
					self.schoolOptions = schoolList;
					originList.splice(0, 0, options.blankItem);
					self.originOptions = originList;
					adviserList.splice(0, 0, options.blankItem);
					self.adviserOptions = adviserList;
					subjectList.splice(0, 0, options.blankItem);
					self.subjectOptions = subjectList;
				});
		},
		getDetail() {
			let self = this;

			config
				.getDetailRequest(this.$parent.$parent.tab)
			({id: this.id})
				.then(function(res) {
					let data = res.data;
					self.clue = $.extend(self.clue, data);
					if (self.clue.deposite) {
						self.clue.deposite = self.clue.deposite / 100;
					}
				});
		},
		saveClue (event) {
			var btn = $(event.target);
			var self = this;
			var form = $.extend({}, this.clue);
			this.clueForm.$submitted = true;
			if (this.clueForm.$valid) {
				btn.prop('disable', true);
				form.id = this.id;
				if (form.hasDeposite == 1) {
					if (form.deposite == null || form.deposite < 0 || form.deposite == 0) {
						dispatch('TOAST', '请输入正确的定金金额');
						return;
					}
					form.deposite = form.deposite * 100;
				}
				if (form.orgSchoolId == -1) {
					dispatch('TOAST', '请先选择校区');
					return;
				}
				config
					.getEditRequest(this.$parent.$parent.tab)
				(form)
					.then(function(res) {
						dispatch('TOAST', '修改基本资料成功', 'success');
						self.$dispatch('editsuccess');
					})
					.always(function() {
						btn.prop('disable', false);
					})
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
		this.getDetail();

	},
	beforeDestroy () {
	}
}