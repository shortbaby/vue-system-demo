<template>
	<div class="homework-detail-wrap">
		<div class="homework-detail clearfix" v-show="show">
			<div class="clazz-wrap">
				<div class="top">
					<span>班级</span>
				</div>
				<div class="content">
					<ul class="list">
						<li class="clearfix" v-for="item in clazzList" @click="selectClazz(item)" id="clazz-{{item.classesId}}">
							<div>
								{{item.classesName}}
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="student-wrap">
				<div class="top">
					<span>学员</span>
					<v-select :options="assignmentStatusOptions" :close-on-select="true" :value.sync="assignmentStatus | str"></v-select>
				</div>
				<div class="content">
					<ul class="list">
						<li class="clearfix" v-for="item in studentList" @click="selectStudent(item)" id="student-{{item.studentId}}">
							<div>
								<span>{{item.studentName}}</span>
							</div>
							<div>
								<span>对{{item.rightNum}}题</span>
							</div>
							<div>
								<span>错{{item.errorNum}}题</span>
							</div>
							<div>
								<span>{{item.score}}分</span>
							</div>
							<div>
								<span :class="{ 'unpublish': item.status == 0, 'published': item.status == 1, 'verified': item.status == 2 }">{{item.statusStr}}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<div class="work-wrap">
				<div class="top">
					<span >{{homework.paperName}}</span>
					<span >已选{{homework.questionNum}}道题</span>
					<span class="score">总分{{homework.totalScore}}分</span>
					<span class="red">{{homework.notify}}</span>
				</div>
				<div class="content">
					<ul class="list">
						<li v-for="item in homework.questions" track-by="$index">
							<div v-if="item.questionType == 0">
								<single :index.sync="$index" :question.sync="item" type="show"></single>
							</div>
							<div v-if="item.questionType == 1">
								<multiple :index.sync="$index" :question.sync="item" type="show"></multiple>
							</div>
							<div v-if="item.questionType == 2">
								<fillblank :index.sync="$index" :question.sync="item" type="show"></fillblank>
							</div>
							<div v-if="item.questionType == 3">
								<essay :index.sync="$index" :question.sync="item" type="show" :status="selectedStudent.status"></essay>
							</div>
						</li>
					</ul>
					<!-- <textarea placeholder="请输入问答题批改评语" v-model="comment"></textarea> -->
				</div>
				<div class="bottom">
					<span class="score">得分 {{getScore}} 分</span>
					<span class="btn btn-primary" @click="submit($event)" v-if="selectedStudent && selectedStudent.status == 1">完成批改</span>
				</div>
			</div>
		</div>	
	</div>

</template>
<script>
import getSelectOptions from '../../../common/function/getSelectOptions';
import Select from '../../../../dep/vue-strap/src/Select.vue';
import Single from './Single.vue';
import Multiple from './Multiple.vue';
import Fillblank from './Fillblank.vue';
import Essay from './Essay.vue';
import {getClasses, getStudents, getQuestions, correct} from '../request';
let options = getSelectOptions();
export default {
	props: {
		id: {
			type: Number,
			default: 0
		},
		show: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		getScore() {
			if (!this.selectedStudent) {
				return 0;
			}
			if (this.selectedStudent && this.selectedStudent.status == 2) {
				return this.homework.getScore;
			}
			if (this.selectedStudent && this.selectedStudent.status == 1) {
				let score = 0;
				this.homework.questions.forEach(function(item) {
					score += parseFloat(item.getScore);
				})
				return score;
			}
		}
	},
	created() {
		this.getClassesList();
	},
	data() {
		return {
			clazzList: [],
			studentList: [],
			homework: {
				paperName: '',
				questionNum: 0,
				totalScore: 0,
				getScore: 0,
				questions: []

			},
			selectedClazz: null,
			selectedStudent: null,
			assignmentStatusOptions:[
				{
					label: "请选择",
					value: '-1'
				},
				{
					label: "未批改",
					value: '1'
				},
				{
					label: "已批改",
					value: '2'
				}
			],
			assignmentStatus: -1
		}
	},
	watch: {
		assignmentStatus() {
			if (this.selectedClazz) {
				this.getStudentList();
			}
		},
		selectedClazz(newVal, oldVal) {
			if (oldVal) {
				$('#clazz-' + oldVal.classesId).removeClass('active');
			}
			if (newVal) {
				$('#clazz-' + newVal.classesId).addClass('active');
			}
		},
		selectedStudent(newVal, oldVal) {
			if (oldVal) {
				$('#student-' + oldVal.studentId).removeClass('active');
			}
			if (newVal) {
				$('#student-' + newVal.studentId).addClass('active');
			}
		}
	},
	events: {

	},
	methods: {
		selectClazz(clazz) {
			this.selectedClazz = clazz;
			this.getStudentList();
		},
		selectStudent(student) {
			this.selectedStudent = student;
			this.getQuestionList();
		},
		getClassesList() {
			getClasses({
				paperId: this.id
			})
				.then((res) => {
					if(res.code == 0) {
						this.clazzList = res.data;
					}
				})
		},
		getStudentList() {
			let params = {
				paperId: this.id,
				classesId: this.selectedClazz.classesId
			};
			if (this.assignmentStatus != -1) {
				$.extend(params, {
					status: this.assignmentStatus
				});
			}
			getStudents(params)
				.then((res) => {
					if(res.code == 0) {
						this.studentList = res.data;
					}
				})
		},
		getQuestionList() {
			let params = {
				paperStudentId: this.selectedStudent.paperStudentId
			};
			getQuestions(params)
				.then((res) => {
					if (res.code == 0) {
						this.homework = res.data;
						let contents = [];
						this.homework.questions.forEach((item) => {
							if(item.questionType == 2) {
								if (item.name.length > 0) {
						            contents =  JSON.parse(item.name);
						        }
						        Vue.set(item, 'contents', contents);
							}
						})
					}
				})
		},
		submit(event) {
			let btn = $(event.target);
			let params = {
				paperStudentId: this.selectedStudent.paperStudentId,
				questions: []
			}
			this.homework.questions.forEach(function(item) {
				if (item.questionType == 3) {
					params.questions.push({
						id: item.id,
						score: item.getScore,
						comment: item.comment
					})	
				}
			});
			correct({
				correctPaper: JSON.stringify(params)
			})
				.then((res) => {
					if (res.code == 0) {
						dispatch('TOAST', '批改作业成功', 'success');
						this.getStudentList();
						this.getQuestionList();
						this.selectedStudent.status = 2;
					}
				})

		}
	},
	components: {
		vSelect: Select,
		Single: Single,
		Multiple: Multiple,
		Fillblank: Fillblank,
		Essay: Essay
	}

}
</script>
<style lang="sass">
.homework-detail-wrap {
	overflow: auto;
}
.homework-detail {
	min-width: 1200px;
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
		font-weight: 600;
		position: relative;
		padding: 10px 0;
		> span {
			display: inline-block;
			margin-left: 20px;
		}
	}
	.clazz-wrap {
		min-width: 240px;
		.top {
			> span {
				width: 30%;
			}
		}
		.content {
			max-height: 700px;
			min-height: 588px;
			overflow: auto;
			ul {
				li {
					list-style: none;
					margin: 5px 0;
					height: 30px;
					line-height: 30px;
					cursor: pointer;
					&:hover {
						background: #efefef;
					}
					&.active {
						background: #eeeeee;
					}
					> div {
						text-align: center;
					}
				}
			}
		}
	}
	.student-wrap {
		min-width: 400px;
		font-size: 13px;
		.top {
			.btn-group {
				position: absolute;
				right: 10px;
				top: 5px;
			}
		}
		.content {
			max-height: 700px;
			min-height: 588px;
			overflow: auto;
			ul {
				li {
					list-style: none;
					margin: 5px 0;
					height: 30px;
					line-height: 30px;
					cursor: pointer;
					&:hover {
						background: #efefef;
					}
					&.active {
						background: #eeeeee;
					}
					> div {
						float: left;
						width: 20%;
						text-align: center;
						.verified {
							padding: 3px 5px;
							background: #66ccff;
							color: #fff;

						}
						.published {
							padding: 4px 5px;
							background: #eee;
							color: #fff;
						}
					}
				}
			}
		}
	}
	.work-wrap {
		width: 500px;
		.top {
			span {
				&.score {
					color: #66ccff;
					margin-left: 50px;
				}
			}
		}
		.content {
			position: relative;
			max-height: 700px;
			min-height: 500px;
			padding: 20px 20px 0 20px;
			overflow: auto;
			label {
				margin-right: 20px;
			}
			> div {
				text-align: center;
				margin-top: 30px;
			}
			> ul {
				li {
					list-style: none;
					margin-bottom: 20px;
				}
			}
			// textarea {
			// 	padding: 5px 10px;
			// 	width: 448px;
			// 	height: 100px;
			// 	margin-top: 15px;
			// 	border: 1px solid #eee;
			// }
		}
		.bottom {
			padding: 20px;
			border-top: 1px solid #eee;
			span {
				&:first-child {
					margin-left: 30px;
					font-size: 18px;
				}
				&:last-child {
					float: right;
					margin-right: 20px;
				}
			}
		}
	}
	
}
</style>