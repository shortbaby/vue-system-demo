import Pager from '../../common/components/Pager.vue';
import Calendar from '../../common/components/Calendar.vue';
import Loading from '../../common/components/Loading.vue';
import Select from '../../../dep/vue-strap/src/Select.vue';
import InferenceInput from '../../common/components/InferenceInput.vue';
import { getLogList, getFuncList, queryFuzzyName } from './request';
import getSelectOptions from '../../common/function/getSelectOptions';
let options = getSelectOptions();
export default {
	created () {
		this.getOptions();
		this.getListHandler();
	},
	data () {
		return {
        	header: [],
        	list: null,
        	pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 20
        	},
			typeOptions: options.typeOptions,
			opType: -1,
			funcOptions: [],
			func: -1,
			startTime: '',
        	endTime: '',
        	time: '',
        	name: '',
        	user: null,
        	queryUserByName: function() {
				let param = {
					query: this.query
				}
				return queryFuzzyName(param);
			},
			hitName: function(res) {
				this.$parent.user = res;
			},
			nameTemplate: `<span v-html="item.name"></span>`,
			calendarShow1: false,
			calendarShow2: false,
            calendarType: "date",
            calendarX: 0,
            calendarY: 0,
            calendarRange: false
        }
	},
	computed: {
		loading() {
			return !!this.list;
		},
		noRes() {
			return this.list && !this.list.length
		}
	},
	methods: {
		showCalendar(event, type) {
			this.type = type;
			event.stopPropagation();
            var that=this;
            if (this.type == 1) {
            	that.calendarShow2=false
            	that.calendarShow1=true;
            }
            if (this.type == 2) {
            	that.calendarShow1=false;
            	that.calendarShow2=true;
            }
            that.calendarX=event.target.offsetLeft;
            that.calendarY=event.target.offsetTop+event.target.offsetHeight+8;
            var bindHide=function(event){
                event.stopPropagation();
                if (this.type == 1) {
	            	that.calendarShow1=false;
	            }
	            if (this.type == 2) {
	            	that.calendarShow2=false;
	            }
                document.removeEventListener('click',bindHide,false);
            };
            setTimeout(function(){
                document.addEventListener('click',bindHide,false);
            },500);
		},
		pageChange: function () {
			//console.log('pageChange');
			this.getListHandler();
		},
		getListHandler () {
			var self = this;

			var params = {
				pageNum: this.pageDto.pageNum,
				pageSize: this.pageDto.pageSize
			};
			if (this.func != -1) {
				$.extend(params, {
					funcType: this.func
				})
			}
			if (this.opType != -1) {
				$.extend(params, {
					opType: this.opType
				})
			}
			if (this.name.length == 0) {
				this.user = null;
			}
			if (this.user) {
				$.extend(params, {
					userId: this.user.id
				})
			}
			if(this.startTime != '') {
				$.extend(params, {
					startTime: new Date().fromFormattedString(this.startTime, 'yyyy/MM/dd').getTime()
				})
			}
			if(this.endTime != '') {
				$.extend(params, {
					endTime: new Date().fromFormattedString(this.endTime, 'yyyy/MM/dd').getTime()
				})
			}
			getLogList(params)
				.then(function (res) {
					var data = res.data;
					self.list =  data.list;
					self.pageDto = res.pageDto;
				}, function () {
					self.list = [];
				});
		},
		getOptions() {
			let self = this;
			$.when(getFuncList())
				.then(function(res) {
					let functionList = res.data;
					functionList.forEach(function(item) {
						item.value = item.name; 
						item.label = item.name;
					})
					self.funcOptions = functionList;
					self.funcOptions.splice(0, 0, options.blankItem);
				});
		},
		refresh () {
			//this.pageDto.pageNum = 1;
			this.getListHandler();
		},
		search () {
			this.refresh();
		},
		reset () {
			this.opType = -1;
			this.func = -1;
			this.name = '';
			this.user = null;
			this.startTime = '';
			this.endTime = '';
		},
	},
	components: {
		Pager: Pager,
		Loading: Loading,
		vSelect: Select,
		Calendar: Calendar,
		InferenceInput: InferenceInput
	}
};