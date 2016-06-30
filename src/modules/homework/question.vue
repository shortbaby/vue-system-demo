<template>
<div class="question-wrap">
	<div class="left">
		<div class="head">
			<div>
				<label>题目分类</label>
				<v-select :options="subjectOptions" :close-on-select="true" :value.sync="subjectId | str"></v-select>
			</div>
			<div>
				<label>级别</label>
				<v-select :options="questionPhaseOptions" :close-on-select="true" :value.sync="phase | str"></v-select>
			</div>
			<div>
				<label>题目类型</label>
				<v-select :options="questionTypeOptions" :close-on-select="true" :value.sync="questionType | str"></v-select>
			</div>
		</div>
		<div class="question-content">
			<ul class="list">
				<li v-for="(index, item) in list" track-by="$index" @click="modify(item)">
					<div v-if="item.questionType == 0">
						<p>
							{{item.name}} 
							<span>分值: {{item.score}}</span>
						</p>
						<p v-for="(i, m) in item.options" track-by="$index">
							<input type="radio" name="{{index}}-radio"><label>{{i | alpha}}、{{m}}</label>
						</p>
					</div>
					<div v-if="item.questionType == 1">
						<p>
							{{item.name}} 
							<span>分值: {{item.score}}</span>
						</p>
						<p v-for="(i, m) in item.options" track-by="$index">
							<input type="checkbox" name="{{index}}-check"><label>{{i | alpha}}、{{m}}</label>
						</p>
					</div>
					<div v-if="item.questionType == 2">
						<p>{{item.str}} <span>分值: {{item.score}}</span></p>
					</div>
					<div v-if="item.questionType == 3">
						<p>{{item.name}} <span>分值: {{item.score}}</span></p>
					</div>
				</li>
			</ul>
			<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
		</div>
	</div>
	<div class="right">
		<div class="head">
			<div>
				<span>添加题目</span>
			</div>
			<div>
				<label>题目分类</label>
				<v-select :options="subjectOptions" :close-on-select="true" :value.sync="subjectId2 | str"></v-select>
			</div>
		</div>
		<div class="new-question-wrap">
			<div class="type-list">
				<ul>
					<li :class="{active: question.questionType == 0}" @click="selectType(0)">
						<div>
							<span>单选题</span>
						</div>
					</li>
					<li :class="{active: question.questionType == 1}" @click="selectType(1)">
						<div>
							<span>多选题</span>
						</div>
					</li>
					<li :class="{active: question.questionType == 2}" @click="selectType(2)">
						<div>
							<span>填空题</span>
						</div>
					</li>
					<li :class="{active: question.questionType == 3}" @click="selectType(3)">
						<div>
							<span>问答题</span>
						</div>
					</li>
				</ul>
			</div>
			<div>
				<p class="btn btn-primary" @click="add()">+ 添加题目</p>
			</div>
			<div class="question-list">
				<ul class="list">
					<li v-for="item in newList">
						<div v-if="item.questionType == 0">
							<single :index.sync="$index" :question.sync="item" type="new"></single>
						</div>
						<div v-if="item.questionType == 1">
							<multiple :index.sync="$index" :question.sync="item" type="new"></multiple>
						</div>
						<div v-if="item.questionType == 2">
							<fillblank :index.sync="$index" :question.sync="item" type="new"></fillblank>
						</div>
						<div v-if="item.questionType == 3">
							<essay :index.sync="$index" :question.sync="item" type="new"></essay>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="bottom">
			<p>
				<span>已添加{{newList.length}}道题</span>
				<span class="btn btn-primary" @click="submit()">添加到题库</span>
			</p>
		</div>
	</div>
	<modify v-if="showModify" :show.sync="showModify" :question.sync="selectQuestion"></modify>
</div>
</template>

<script>
import getSelectOptions from '../../common/function/getSelectOptions';
import Select from '../../../dep/vue-strap/src/Select.vue';
import Pager from '../../common/components/Pager.vue';
import Single from './components/Single.vue';
import Multiple from './components/Multiple.vue';
import Fillblank from './components/Fillblank.vue';
import Essay from './components/Essay.vue';
import Modify from './components/Modify.vue';
import {getQuestionOptions, getQuestionList, addQuestion} from './request';
let options = getSelectOptions();
export default {
	created() {
		this.getOptions();
		this.getQuestionList();
	},
	ready() {
		this.$dispatch('showquestion');
	},
	data() {
		return {
			subjectOptions: [],
			subjectId: -1,
			subjectId2: -1,
			questionTypeOptions: options.questionTypeOptions,
			questionType: -1,
			questionPhaseOptions: options.questionPhaseOptions,
			phase: -1,
			list: [],
			newList: [],
			showModify: false,
			pageDto: {
        		pageNum: 1,
        		count: 0,
        		pageSize: 20
        	},
        	selectQuestion: null,
			question: {
				questionType: 0
			}
		}
	},
	watch: {
		subjectId(val) {
			this.refresh();
		},
		phase(val) {
			this.refresh();
		},
		questionType(val) {
			this.refresh();
		}
	},
	events: {
		del(index) {
			this.newList.splice(index, 1);
		},
		editsuccess() {
			this.pageChange();
		}	
	},
	methods: {
		modify(item) {
			let question = $.extend(true, {}, item);
			this.selectQuestion = question;
			this.showModify = true;
		},
		getOptions() {
			getQuestionOptions()
				.then((res) => {
					let subjectOptions = res.data.subjects;
					subjectOptions.forEach(function(item){
						item.value = item.id.toString();
						item.label = item.name;
					});
					this.subjectOptions = subjectOptions;
					this.subjectOptions.splice(0, 0, options.blankItem);
				})
		},
		pageChange: function () {
			this.getQuestionList();
		},
		refresh() {
			this.pageDto.pageNum = 1;
			this.getQuestionList();
		},
		getQuestionList() {
			var self = this;

			var params = {
				pageNum: this.pageDto.pageNum,
				pageSize: this.pageDto.pageSize
			};

			if (this.subjectId != -1) {
				$.extend(params, {
					subjectId: this.subjectId
				});
			}
			if (this.questionType != -1) {
				$.extend(params, {
					questionType: this.questionType
				});
			}
			if (this.phase != -1) {
				$.extend(params, {
					phase: this.phase
				});
			}
			getQuestionList(params)
				.then(function (res) {
					var data = res.data;
					self.list =  data.list;
					self.list.forEach(function(item) {
						if(item.questionType == 2) {
							let contents = JSON.parse(item.name);
							let str = '';
							contents.forEach(function(content) {
								if (content.type == 'blank') {
									str += '_______';
								}
								if (content.type == 'fill') {
									str += content.content;
								}
							});
							item.str = str;
						}
					})
					self.pageDto = res.pageDto;
				}, function () {
					self.list = [];
				});
		},
		selectType(type) {
			this.question.questionType = type;
		},
		add() {
			let item = {};
			item.questionType = this.question.questionType;

			switch(item.questionType) {
				case 0:
					item = {
						questionType: this.question.questionType,
						name: '',
		                options: [],
		                answer: [],
		                phase: 0,
		                score: 0
					};
					break;
				case 1:
					item = {
						questionType: this.question.questionType,
						name: '',
		                options: [],
		                answer: [],
		                phase: 0,
		                score: 0
					};
					break;
				case 2:
					item = {
						questionType: this.question.questionType,
						name: '',
						answer: [],
						phase: 0,
		                score: 0
					}
					break;
				case 3:
					item = {
						questionType: this.question.questionType,
						name: '',
						phase: 0,
		                score: 0
					}
					break;
				default:
					break;
			}
			this.newList.push(item);
		},
		submit() {
			if (this.newList.length == 0) {
				dispatch('TOAST', '请先添加题目');
				return;
			}
			let check = true;
			let self = this;
			for (let i = 0; i < self.newList.length; i++) {
				let item = self.newList[i];
				item.subjectId = self.subjectId2;
				if (item.subjectId == -1) {
					check = false;
					dispatch('TOAST', `请先选择题目分类`);
					break;
				}
				if (item.questionType == 2) {
					item.answer = [];
					item.name = JSON.stringify(item.contents);
					item.contents.forEach(function(content) {
						if (content.type == 'blank') {
							item.answer.push(content.content);
						}
					});
				}
				if (item.name == '') {
					check = false;
					dispatch('TOAST', `第${i + 1}题 题目为空，请重新填写`);
					break;
				}
				if (item.questionType == 2) {
					let checkAnswer = true;
					for (let j = 0; j < item.answer.length; j++) {
						let a = item.answer[j];
						if (a.length == 0) {
							checkAnswer = false;
						}
					};
					if (checkAnswer == false) {
						check = false;
						dispatch('TOAST', `第${i + 1}题未填写正确答案，请重新填写`);
						break;
					}
					
				}
				if (item.questionType != 3) {
					if (!item.answer || item.answer.length == 0) {
						check = false;
						dispatch('TOAST', `第${i + 1}题未填写正确答案，请重新填写`);
						break;
					}
				}
				if (item.questionType == 0) {
					let answer = item.answer[0];
					item.answer = [];
					item.answer = [answer];
				}
				if (!item.score) {
					check = false;
					dispatch('TOAST', `第${i + 1}题 分值为空，请重新填写`);
					break;
				}
			};
			if (check) {
				let questions = JSON.stringify(this.newList);
				//console.log(questions);
				addQuestion({
					questions: questions
				})
					.then((res) => {
						if (res.code == 0) {
							dispatch('TOAST', `添加题库成功`, 'success');
						}
						setTimeout(function() {
							self.pageChange();
						}, 100);
					})
			}
		}
	},
    components: {
       vSelect: Select,
       Single: Single,
       Multiple: Multiple,
       Fillblank: Fillblank,
       Essay: Essay,
       Pager: Pager,
       Modify: Modify

    }
}
</script>

<style lang="sass">
.question-wrap {
	background: #fff;
	position: relative;
	margin-top: 10px;
	min-height: 780px;
	.left {
		margin-right: 560px;
		position: relative;
		padding-bottom: 30px;
		.question-content {
			height: 700px;
			overflow: auto;
		}
		.list {
			li {
				list-style: none;
				padding: 5px 0;
				border-left: 1px solid #fff;
				&:hover {
					background: #efefef;
					border-left: 1px solid #66ccff;
				}
				div{
					margin: 10px 20px;
					font-size: 13px;
					p {
						span {
							color: #66ccff;
						}
						label {
							margin-left: 10px;
						}
					}	
				}
				
			}
		}
		.head {
			background: #efefef;
			margin: 5px 0;
			padding: 10px;
			border-bottom: 1px solid #ddd;
			> div {
				display: inline-block;
				// width: 33%;
				// text-align: center;
				// margin-right: 30px;
				label {
					margin-right: 10px;
				}
			}
		}
	}
	.right {
		display: inline-block;
		width: 520px;
		position: absolute;
		right: 10px;
		top: 0;
		> .head {
			background: #efefef;
			padding: 10px;
			border-bottom: 1px solid #ddd;
			> div {
				display: inline-block;
				margin-right: 120px;
				label {
					margin-right: 10px;
				}
			}
		}
		> .bottom {
			padding-top: 20px;
			padding-bottom: 20px;
			text-align: right;
			span {
				margin-right: 20px;
			}
		}
		.type-list {
			padding: 10px 20px;
			li {
				list-style: none;
				display: inline-block;
				width: 100px;
				margin-right: 20px;
				cursor: pointer;
				&:hover {
					div {
						border: 1px dashed #66ccff;
					}
				}
				&.active {
					div {
						background: #66ccff;
						border: 1px dashed #66ccff;
						color: #fff;
					}
				}
				&:last-child {
					margin-right: 0;
				}
				div {
					text-align: center;
					padding: 5px 0;
					border: 1px dashed #ccc;
					border-radius: 20px;
					label {
						margin-left: 5px;
					}
				}
			}
		}
		.new-question-wrap {
			div {
				&:nth-child(2) {
					p {
						text-align: center;
						background: #66ccff;
						color: #fff;
						padding: 5px 0;
						margin: 6px 0;
						cursor: pointer;
						width: 100%;
						border: none;
					}
				}
			}
			.question-list {
				padding: 0 10px;
				padding-top: 20px;
				padding-bottom: 30px;
				max-height: 500px;
				overflow: auto;
				border: 1px solid #eee;
				background: #efefef;
				.list {
					> li {
						list-style: none;
						margin-bottom: 20px;
					}
				}
			}
		}
	}
}
</style>