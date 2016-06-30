

'use strict';
import Select from '../../../../dep/vue-strap/src/Select.vue';
import getSelectOptions from '../../../common/function/getSelectOptions';
import Calendar from '../../../common/components/Calendar.vue';
export default {
	computed: {
	},
	data () {
		return {
			form: {
				userName: '',
				mobile: ''
			},
			clueForm: {},
			searchFieldOptions: getSelectOptions().searchFieldOptions,
			searchField: "name",
			calendarShow:false,
            calendarType:"datetime", //date datetime
            calendarValue:"2015-12-11",
            calendarBegin:"2015-12-20",
            calendarEnd:"2015-12-25",
            calendarX:0,
            calendarY:0,
            calendarRange:false,//是否多选
			
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
	vuex: {
		actions: {
			
		}
	},
	methods: {
		saveAccount (event) {
			var btn = $(event.target);
			var self = this;
			var form = this.form;
			this.clueForm.$submitted = true;
			if (this.clueForm.$valid) {
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
	}
}