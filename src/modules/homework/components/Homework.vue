<template>
	<div class="homework-wrap clearfix">
		<div class="clazz-wrap">
			<div class="top">
				<span>班级</span>
				<span>班号</span>
				<span>人数</span>
			</div>
			<div class="content">
				<ul class="list">
					<li class="clearfix" v-for="item in classes" track-by="$index" @click="selectClass(item)">
						<div>
							<input type="checkbox" name="clazz-{{item.id}}" id="clazz-{{item.id}}" value="{{item.id}}" @click="checkClazz(item)" v-model="selectClasses">
							<label for="clazz-{{item.id}}">{{item.name}}</label>
						</div>
						<div>
							{{item.number}}
						</div>
						<div>
							{{item.studentNum}}人
						</div>
					</li>
					
				</ul>
			</div>
		</div>
		<div class="student-wrap">
			<div class="top">
				<input type="checkbox" v-model="allCheck" @click="allCheckStudent($event)">
				<span>学员</span>
			</div>
			<div class="content">
				<ul class="list">
					<li v-for="item in students">
						<div>
							<input type="checkbox" name="student-{{item.id}}" id="student-{{item.id}}" value="{{item.id}}" v-model="selectStudents" @click="checkStudent(item)">
							<label for="student-{{item.id}}">{{item.name}}</label>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div class="work-wrap">
			<div class="top">
				<span>{{title}}</span>
				<span>已选{{list.length}}道题</span>
				<span class="score">总分{{totalScore}}分</span>
			</div>
			<div class="content">
				<label>最晚交作业时间</label>
				<input type="text" v-model="time" @click="showCalendar">
				<calendar :show.sync="calendarShow" :value.sync="time" :x="calendarX" :y="calendarY" :begin="calendarBegin" :end="end" :range="calendarRange" :type.sync="calendarType"></calendar>
				<div>
					<span class="btn btn-primary" @click="submit($event)">完成</span>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
import Calendar from '../../../common/components/Calendar.vue';
import {getClassesMap, getStudentsMap, assign} from '../request';
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		list: {
			type: Array,
			default: []
		}

	},
	data() {
		return {
			allCheck: false,
			classes: [],
			students: [],
			classInfos: [],
			clazzId: null,
			selectClasses: [],
			selectStudents: [],
			calendarShow:false,
            calendarType:"datetime",
            calendarX:0,
            calendarY:0,
            calendarRange:false,
            time: ''
		}
	},
	created() {
		this.getClasses();
	},
	computed: {
		questions() {
			let a = [];
			let l = this.list.length;
			for (let i = 0; i < l; i++) {
				a.push(this.list[i].id);
			};
			return a;
		},
		totalScore() {
			let l = this.list.length;
			let score = 0;
			for (let i = 0; i < l; i++) {
				score += this.list[i].score;
			};
			return score;
		}
	},
	events: {
	},
	methods: {
		allCheckStudent(event) {
			let target = $(event.target);
			let check = target.prop('checked');
			if (check) {
				this.students.forEach((item) => {
					this.pushStudentToSelectClass(item.id);
					this.arrayPush(this.selectStudents, item.id.toString());
				})
			} else {
				this.students.forEach((item) => {
					this.delStudentFromSelecClass(item.id);
					this.arrayDel(this.selectStudents, item.id.toString());
				})
			}
		},
		arrayPush(array, id) {
			if (array.indexOf(id) == -1) {
				array.push(id);
			}
		},
		arrayDel(array, id) {
			let index = array.indexOf(id);
			if (index > -1) {
				array.splice(index, 1);
			}
		},
		indexClass(id) {
			let index = -1;
			for (let i = 0; i < this.classInfos.length; i++) {
				let info = this.classInfos[i];
				if (info.classInfo == id) {
					index = i;
					break;
				}
			}
			return index;
		},
		checkClazz(item) {
			let exist = false;
			let index = -1;
			let self = this;
			for (let i = 0; i < self.classInfos.length; i++) {
				let info = self.classInfos[i];
				if (info.classInfo == item.id) {
					exist = true;
					index = i;
					break;
				}
			}
			if (exist) {
				let classInfo = self.classInfos[index];
				classInfo.students.forEach(function(item) {
					self.arrayDel(self.selectStudents, item.toString());
				});
				self.classInfos.splice(index, 1);
			} else {
				let o = {
					classInfo: item.id,
					students: []
				}
				self.classInfos.push(o);
			}
		},
		addClassInfo(o) {
			if (this.indexClass(o.classInfo) == -1) {
				this.classInfos.push(o);
			}
		},
		pushStudentToSelectClass(id) {
			let index = this.indexClass(this.clazzId);
			this.arrayPush(this.selectClasses, this.clazzId.toString());
			if (index > -1) {
				let clazz = this.classInfos[index];
				this.arrayPush(clazz.students, id);
			} else {
				let o = {
					classInfo: this.clazzId,
					students: []
				}
				this.arrayPush(o.students, id);
				this.classInfos.push(o);
			}
		},
		delStudentFromSelecClass(id) {
			let index = this.indexClass(this.clazzId);
			if (index > -1) {
				let clazz = this.classInfos[index];
				this.arrayDel(clazz.students, id);
				if (clazz.students.length == 0) {
					this.arrayDel(this.selectClasses, this.clazzId.toString());
				}
			}
		},
		checkStudent(student) {
			if (this.selectStudents.indexOf(student.id.toString()) > -1) {
				this.delStudentFromSelecClass(student.id);	
			} else {
				this.pushStudentToSelectClass(student.id);
			}
		},
		getClasses() {
			getClassesMap()
				.then((res) => {
					if(res.code == 0) {
						this.classes = res.data;
					}
				})
		},
		selectClass(clazz) {
			if (this.clazzId == clazz.id) {
				return;
			}
			this.allCheck = false;
			this.clazzId = clazz.id;
			let self = this;
			let params = {
				classesId: clazz.id
			};
			getStudentsMap(params)
				.then((res) => {
					if(res.code == 0) {
						self.students = res.data;
					}
				})
		},
		submit(event) {
			let btn = $(event.target);
			let self = this;
			if (self.list.length == 0) {
				dispatch('TOAST', '请先选择题目!');
				return;
			}
			if (self.selectClasses.length == 0) {
				dispatch('TOAST', '请先选择班级!');
				return;
			}
			if (self.selectStudents.length == 0) {
				dispatch('TOAST', '请先选择学员!');
				return;
			}
			if (self.time.length == 0) {
				dispatch('TOAST', '请填写最晚交作业时间!');
				return;
			}
			let params = {
				name: self.title,
				questionIds: self.questions.join(','),
				latestTime: new Date().fromFormattedString(self.time, 'yyyy/MM/dd HH:mm:ss').getTime(),
				classInfos: self.classInfos
			}
			btn.prop('disable', true);
			assign({
				assignJson: JSON.stringify(params)
			})
				.then((res) => {
					if (res.code == 0) {
						dispatch('TOAST', '布置作业成功', 'success');
					}
				})
				.always(function() {
					btn.prop('disable', false);
				})
		},
		showCalendar:function(e){
            e.stopPropagation();
            var that=this;
            that.calendarShow=true;
            that.calendarX=e.target.offsetLeft - 30;
            that.calendarY=e.target.offsetTop;
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
	components: {
		Calendar: Calendar
	}

}
</script>
<style lang="sass">
.homework-wrap {
	overflow: auto;
	padding-top: 10px;
	background: #edf0f5;
	position: relative;
	> div {
		margin: 10px;
		background: #fff;
		display: inline-block;
		float: left;
	}
	.top {
		border-bottom: 2px solid #66ccff;
		font-size: 14px;
		font-weight: 500;
		position: relative;
		padding: 10px 0;
		text-align: center;
		span {
			display: inline-block;
		}
	}
	.clazz-wrap {
		min-width: 420px;
		.top {
			> span {
				width: 30%;
			}
		}
		.content {
			max-height: 520px;
			min-height: 400px;
			overflow: auto;
			ul {
				li {
					list-style: none;
					margin: 5px 0;
					height: 2.4rem;
					line-height: 2.4rem;
					&:hover {
						cursor: pointer;
						background: #efefef;
					}
					> div {
						float: left;
						width: 33%;
						text-align: center;
					}
				}
			}
		}
	}
	.student-wrap {
		min-width: 240px;
		.content {
			max-height: 520px;
			min-height: 400px;
			overflow: auto;
			ul {
				li {
					list-style: none;
					margin: 5px 0;
					> div {
						padding-left: 30px;
					}
				}
			}
		}
	}
	.work-wrap {
		min-width: 400px;
		.top {
			span {
				&:first-child {
					float: left;
					margin-left: 10px;
				}
				&.score {
					color: #66ccff;
					margin-left: 5px;
				}
			}
		}
		.content {
			position: relative;
			min-height: 380px;
			padding: 20px 20px 0 20px;
			label {
				margin-right: 20px;
			}
			> div {
				text-align: center;
				margin-top: 30px;
			}
		}
	}
	
}
</style>