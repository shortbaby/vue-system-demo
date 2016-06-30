

'use strict';

import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import Select from '../../../../dep/vue-strap/src/Select.vue';
import Calendar from '../../../common/components/Calendar.vue';
import getSelectOptions from '../../../common/function/getSelectOptions';
let options = getSelectOptions();
export default {
	computed: {
	},
	data () {
		return {
			form: {
				name: '',
				mobile: '',
				origin: 0,
				sourceDetail: '',
				adviserId: 0,
				subjectId: 0,
				availableTime: 0,
				parentName: '',
				parentMobile: '',
				relationship: 0,
				nextRemindTime: '',
				orgSchoolId: 0,
				school: '',
				grade: '',
				gender: 0,
				mail: '',
				qq: '',
				address: '',
				remarks: '',
				consultStatus: 0,
				hasDeposite: 0,
				deposite: 0
			},
			studentForm: {},
			searchFieldOptions: options.searchFieldOptions,
			searchField: "name",
			originOptions: options.originOptions,
			consultStatusOptions: options.consultStatusOptions,
			hasDepositeOptions: options.hasDepositeOptions,
			availableTimeOptions: options.availableTimeOptions,
			relationshipOptions: options.relationshipOptions,
			genderOptions: options.genderOptions,
			calendarShow:false,
            calendarType:"datetime", //date datetime
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
		Modal: Modal,
		vSelect: Select,
		Calendar: Calendar
	},
	vuex: {
		actions: {
			hideNewStudent: ({ dispatch }) => {
				dispatch('HIDE_NEW_STUDENT');
			}
		}
	},
	methods: {
		save (event) {
			var btn = $(event.target);
			var self = this;
			var form = this.form;
			this.studentForm.$submitted = true;
			if (this.studentForm.$valid) {
			} else {
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
		
	},
	beforeDestroy () {
		this.id = 0;
		this.isCopy = false;
	}
}