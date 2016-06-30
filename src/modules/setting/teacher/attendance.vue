<template>
	<div class="attendance-wrap">
		<div>
			<div class="top">
				<span class="absence">本月缺勤{{absentNum}}次</span>
				<span class="late">本月迟到{{lateNum}}次</span>
				<p class="user-select-none">
					<span class="icon-left" @click="previous()"></span>
					<span class="time">{{year}}年{{month}}月</span>
					<span class="icon-right" @click="next()"></span>
				</p>
				<div>
					<inference-input placeholder="请输入老师姓名" :query.sync="teacherName" :request="queryAction"
					:limit="10" :on-hit="receive"></inference-input>
					<span @click="export" class="btn btn-primary">导出考勤记录</span>
				</div>
			</div>
			<div class="days-list">
				<ul class="week-list">
					<li v-for="i in ['一', '二', '三', '四', '五', '六', '日'] ">
						<span>{{i}}</span>
					</li>
				</ul>
				<table>
					<tr v-for="item in weekRows" track-by="$index">
						<td v-for="infoDay in item" track-by="$index" :class="{disabled: infoDay.disable}">
							<div v-if="infoDay.day" class="date-td-{{infoDay.day}}">
								<p>{{infoDay.day}}</p>
								<div class="attendance">
									<p v-for="info in infoDay.infoList" :style="{background: getColor(info.status)}" data-id="{{info.id}}" data-day="{{info.day}}"
									@click="showDetail($event)">{{info.section}}</p>
								</div>
							</div>
						</td>
					</tr>
				</table>
			</div>
			<div class="attendance-detail" v-show="show" :style="position">
				<p><span>{{info.no}}</span><span>{{info.subject}}</span></p>
				<p><span>班级:</span><span>{{info.course}}</span></p>
				<p><span>上课时间:</span><span>{{info.courseTime}}</span></p>
	            <p><span>教室:</span><span>{{info.classroom}}</span></p>
	            <p><span>上课老师:</span>{{info.teacher}}</p>
	            <p><span>签到时间:</span>{{info.signTime}}</p>
	            <span class="sign" :style="{background: getColor(info.status)}">{{info.statusName}}</span>
			</div>	
		</div>
	</div>
</template>
<script>
import Select from '../../../../dep/vue-strap/src/Select.vue';
import InferenceInput from '../../../common/components/InferenceInput.vue';
import { getAttendances, exportAttendance, getTeacherByName } from './request';
import config from './config';

export default {
	data() {
		return {
			teacherId: null,
			teacherName: null,
			time: new Date(),
			year: '',
			month: '',
			weekRows: [],
			infoDayList: [],
			show: false,
			position: {
				left: 0,
				top: 0,
			},
			lateNum: null,
			absentNum: null,
			info: {},
			queryAction: () => {
                return getTeacherByName( { name: this.teacherName } );
            },
		}
	},
	created() {
		this.year = this.time.getFullYear();
		this.month = this.time.getMonth() + 1;
		var params = this.$route.params;
		if (params && params.id) {
			this.teacherId = parseInt(params.id);
			this.teacherName = params.name;
		}
		this.prepare();
		this.initEvents();
	},
	methods: {
		initEvents() {
			let self = this;
			$('body').on('click', function(event) {
                self.show = false;
            });
		},
		showDetail(event) {
			event.stopPropagation();

			let target = $(event.target);
			let id = parseInt(target.data('id'));
			let day = parseInt(target.data('day'));
			let list = this.infoDayList.find((item) => {
				return item.day === day;
			})
			if (list.infoList) {
				this.info = list.infoList.find((item) => { return item.id === id; })
			} else {
				return;
			}

		 	let pos = target.offset();
            let width = target.width();
            let height = target.height();
            this.position.left = (pos.left) + (width * 3 / 4) + 'px';
            this.position.top = (pos.top) + 'px';

            this.show = true;
		},
		prepare () {
			this.infoDayList = [];

			getAttendances({
				teacherId: this.teacherId,
				year: this.year,
				month: this.month
			})
				.then(
					(res) => {
						var data = res.data;
						this.lateNum = data.lateNum;
						this.absentNum = data.absentNum;
						this.initArrays(data.attendenceList);
					}
				)
		},
		previous() {
			this.month -= 1;
			if (this.month < 1) {
				this.month = 12;
				this.year -= 1;
			}
			this.prepare();
		},
		next() {
			this.month += 1;
			if ( this.month > 12 ) {
                this.year = this.year + Math.floor( ( this.month - 1 ) / 12 );

                if ( this.month % 12 == 0 ) {
                    this.month = 12;
                } else {
                    this.month = this.month % 12;
                }
            }
            this.prepare();
		},
		getColor (id) {
			return config.getColor(id);
		},
		receive (data) {
            this.teacherId = data.id;
            this.prepare();
        },
        export () {
        	var teacherQuery = '';
        	if (this.teacherId) {
        		teacherQuery = `&teacherId=${this.teacherId}`;
        	}
        	window.location.href =
        		`/teacher/export.json?year=${this.year}&month=${this.month}${teacherQuery}`;
        },
		initArrays(data) {
			this.weekRows = [];
			let tmpDays = [];
			let startDate = new Date(this.year, this.month - 1, 1);
			let endDate = new Date(this.year, this.month, 0);
			let days = endDate.getDate();
			let firstDay = startDate.getDay();
			let endDay = endDate.getDay();

			if ( firstDay == 0 ) {
	            firstDay = 7;
	        }
	        if (endDay == 0) {
	        	endDay = 7;
	        }
			let totalDays = days + (firstDay - 1) + (7 - endDay);
			let rows = Math.round(totalDays / 7);
	        for ( let i = 1; i < firstDay; i++ ) {
	            tmpDays.push({disable: true});
	        }

	        data.forEach( (itemDay) => {
	        	let day = itemDay.day;
	        	let infoDay = { day: day };
	        	infoDay.infoList =
	        		itemDay.attendences.map( (item, i) => {
	        			return {
	        				id: i,
	        				day: day,
	        				no: item.classesNum,
							subject: item.subTypeName,
							course: item.classesName,
							courseTime: item.classesTime,
							classroom: item.roomName,
							teacher: item.teacherName,
							signTime: item.signTime,
							status: item.status,
							statusName: config.getAttendence(item.status),
							section: `${item.classesName} ${item.subTypeName} ${item.index}/${item.totalLesson} ${item.signTime}`
	        			}
	        		})

	        	this.infoDayList.push(infoDay);
	        	tmpDays.push(infoDay);
	        })

	        for (let m = 7; m > endDay; m--) {
	        	tmpDays.push({disable: true});
	        }

	        for (let n = 0; n < rows; n++) {
	        	let week = [];
	        	week = tmpDays.slice(n*7, (n+1)*7);
	        	this.weekRows.push(week);
	        }
		}
	},
	components: {
		vSelect: Select,
		InferenceInput: InferenceInput
	}
}
</script>
<style lang="sass">
@import "../../../resource/css/common/mixin";
.attendance-wrap {
	overflow: auto;
	> div {
		> .top {
			background: #fff;
			margin-top: 10px;
			padding: 10px;
			position: relative;
			height: 36px;
			line-height: 36px;
			min-width: 740px;
			> span {
				padding: 3px 20px;
			}
			> p {
				margin-bottom: 2px;
				display: inline-block;
				text-align: center;
				position: absolute;
				left: 50%;
				margin-left: -80px;
				width: 160px;
				cursor: pointer;
				font-weight: 600;
				background: #ff99ff;
				.time {
					display: inline-block;
					width: 120px;
					text-align: center;
				}
			}
			> div {
				@include flex-container;
				align-items: center;
				float: right;

				input {
					height: 27px;
				}
			}
		}	
	}
	
}

.absence {
	background: #ff0000;
	color: #fff;
}
.late {
	background: #ff9933;
	color: #fff;
}
.attend {
	background: #00cc33;
	color: #fff;
}
.attendance-detail {
	position: absolute;
    font-size: 13px;
    width: 240px;
    background: #fff;
    border: 1px solid rgba(221, 221, 221, .7);
    box-sizing: border-box;
    z-index: 10;
    transition: all .2s;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
    p {
    	padding: 2px;
        span {
            &:first-child {
                margin-right: 5px;
            }
        }
        &:first-child {
            background: #66ccff;
            color: #fff;
            padding: 5px 10px 5px 0;
            span {
                &:last-child {
                    float: right;
                }
            }
        }
    }
	.sign {
		position: absolute;
		right: 10px;
		bottom: 10px;
		height: 50px;
		width: 50px;
		line-height: 50px;
		text-align: center;
		border-radius: 30px;
	}
}
.days-list {
	background: #fff;
	padding: 10px 20px 20px 20px;
	min-width: 1100px;
	position: relative;
	> .week-list {
		border: 1px solid #ccc;
		font-weight: 600;
		@include flex-container();
		li {
			@include flex(1);
			text-align: center;
			list-style: none;
			min-width: 100px;
			height: 40px;
			line-height: 40px;
		}
	}
	>table {
		width: 100%;
		border: 1px solid #ccc;
		tr {
			border: 1px solid #ccc;
			td {
				border-right: 1px solid #ccc;
				&.disabled {
					background: #f2f2f2;
				}
				> div {
					width: 148px;
					height: 120px;
					.attendance {
						padding: 0 2px;
						p {
							position: relative;
							z-index: 10;
							margin-bottom: 2px;
							padding: 2px 0;
							font-size: 11px;
							text-align: center;
							cursor: pointer;
						}
					}
				}

			}
		}
	}
}
</style>