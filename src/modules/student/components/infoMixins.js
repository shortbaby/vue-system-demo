

'use strict';
import Select from '../../../../dep/vue-strap/src/Select.vue';
import Calendar from '../../../common/components/Calendar.vue';
import getSelectOptions from '../../../common/function/getSelectOptions';
import {editStudent, getStudentDetail, getOriginList, getAdviserList, getSubjectList, getSchoolList} from '../request';
let options = getSelectOptions();
export default {
	created () {
		this.getOptions();
		this.getDetail();
		
	},
	data () {
		return {
			form: {},
			studentForm: {},
			subjectOptions: [],
			originOptions: [],
			adviserOptions: [],
			schoolOptions: [],
			genderOptions: options.genderOptions,
			calendarShow:false,
            calendarType:"date",
            calendarX:0,
            calendarY:0,
            calendarRange:false,
            time: ''
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
		vSelect: Select,
		Calendar: Calendar
	},
	watch: {
		time(val) {
			this.form.transformTime = Date.parseFormatted(val, 'yyyy/MM/dd').getTime();
		}
	},
	methods: {
		getOptions() {
			let self = this;
			$.when(getOriginList(), getAdviserList(), getSubjectList(), getSchoolList())
				.then(function(res1, res2, res3, res4) {
					let originList = res1.data.list;
					let adviserList = res2.data.list;
					let subjectList = res3.data.list;
					let schoolList = res4.data.list;

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
					schoolList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					originList.splice(0, 0, options.blankItem);
					self.originOptions = originList;
					adviserList.splice(0, 0, options.blankItem);
					self.adviserOptions = adviserList;
					subjectList.splice(0, 0, options.blankItem);
					self.subjectOptions = subjectList;
					schoolList.splice(0, 0, options.blankItem);
					self.schoolOptions = schoolList;
				});
		},
		getDetail() {
			getStudentDetail({id: this.id})
				.then((res) => {
					if(res.code == 0) {
						this.form = res.data;
					}
				});
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
        },
		saveAccount (event) {
			var btn = $(event.target);
			var self = this;
			var form = this.form;
			this.studentForm.$submitted = true;
			if (this.studentForm.$valid) {
				btn.prop('disabled', true);
				editStudent(this.form)
					.then((res) => {
						if(res.code == 0) {
							dispatch('TOAST', '修改信息成功', 'success');
						}
						this.getDetail();
					})
					.always(function(){
						btn.prop('disabled', false);
					});
			} else {
				dispatch('TOAST', '请输入完整信息');
			}
		}
		
	},

	beforeDestroy () {
	}
}