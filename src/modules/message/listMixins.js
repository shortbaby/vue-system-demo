import Pager from '../../common/components/Pager.vue';
import Calendar from '../../common/components/Calendar.vue';
import Loading from '../../common/components/Loading.vue';
// import Select from '../../../dep/vue-st rap/src/Select.vue';
// import InferenceInput from '../../common/components/InferenceInput.vue';
import { queryBatch, readBatch} from './request';
// import getSelectOptions from '../../common/function/getSelectOptions';
// let options = getSelectOptions();
export default {
	created () {
		// this.getOptions();
		this.getListHandler();
	},
	data () {
		return {
        	list: null,
        	pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 20
        	},
        	allCheck: false,
        	selectIds: [],
        	startTime: '',
        	endTime: '',
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
	watch: {
		selectIds(val) {
			let tdChecks = $('.td-check');
			let checkedBoxes = $(".td-check:checked");
			if (checkedBoxes.length == tdChecks.length) {
				this.allCheck = true;
			} else {
				this.allCheck = false;
			}
		}
	},
	events: {
		success() {
			this.refresh();
		},
		select(item, selected) {
			var self = this;
			if (selected) {
				if (self.selectIds.indexOf(item.id.toString()) < 0) {
					self.selectIds.push(item.id.toString());
				}	
			} else {
				let index = self.selectIds.indexOf(item.id.toString());
				if (index > -1) {
					self.selectIds.splice(index, 1);
				}
			}
		},
	},
	methods: {
		go(item) {
			if (item.url) {
				window.router.go(item.url);
			}
		},
		read(){
			if (this.selectIds.length == 0) {
				dispatch('TOAST', '请先勾选消息');
				return;
			}
			readBatch({
				ids: this.selectIds.join(',')
			})
				.then((res) => {
					this.refresh();
				})

		},
		selectItem(event, item) {
			let target = $(event.target);
			let self = this;
			let check = target.prop('checked');
			self.$emit('select', item, check);
		},
		selectAll(event) {
			let target = $(event.target);
			let self = this;
			let check = target.prop('checked');
			self.list.forEach((item) => {
				self.$emit('select', item, check);
			})
		},
		showCalendar(event, type) {
			this.type = type;
			event.stopPropagation();
            var that=this;
            if (this.type == 1) {
            	that.calendarShow2=false;
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
			queryBatch(params)
				.then(function (res) {
					var data = res.data;
					self.list =  data.list;
					self.pageDto = res.data.pageDto;
				}, function () {
					self.list = [];
				});
		},
		refresh () {
			this.getListHandler();
		},
		search () {
			this.refresh();
		},
		reset () {
			this.startTime = '';
			this.endTime = '';
		},
	},
	components: {
		Pager: Pager,
		Loading: Loading,
		Calendar: Calendar,
	}
};