<template>
	<div class="arrangement">
		<div class="top">
			<ul class="progress">
				<li class="num active">1</li>
				<li class="progress-item">
					<span v-if="scene=='setting'"></span>
					<span v-if="scene=='complete'" class="full"></span>
				</li>
				<li class="num" :class="{active: scene=='complete'}">2</li>
			</ul>
		</div>
		<div class="arrangement-wrap" v-show="scene=='setting'">
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
				<div class="content">
					<ul class="list">
						<li v-for="(index, item) in list" track-by="$index" @click="select(item)" :class="{'active': item.selected}">
							<div v-if="item.questionType == 0">
								<p>
									{{item.name}} 
									<span>分值: {{item.score}}</span>
								</p>
								<p v-for="(i, m) in item.options">
									<input type="radio" name="{{index}}-radio"><label>{{i | alpha}}、{{m}}</label>
								</p>
							</div>
							<div v-if="item.questionType == 1">
								<p>
									{{item.name}} 
									<span>分值: {{item.score}}</span>
								</p>
								<p v-for="(i, m) in item.options">
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
						<input type="text" v-model="title" class="title" placeholder="请输入作业标题,不能超过20个字">
					</div>
				</div>
				<div class="question-list-wrap">
					<div class="question-list">
						<ul class="list">
							<li v-for="item in newList">
								<div v-if="item.questionType == 0">
									<single :index.sync="$index" :question.sync="item" type="display"></single>
								</div>
								<div v-if="item.questionType == 1">
									<multiple :index.sync="$index" :question.sync="item" type="display"></multiple>
								</div>
								<div v-if="item.questionType == 2">
									<fillblank :index.sync="$index" :question.sync="item" type="display"></fillblank>
								</div>
								<div v-if="item.questionType == 3">
									<essay :index.sync="$index" :question.sync="item" type="display"></essay>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="bottom">
					<p>
						<span>已选{{newList.length}}道题</span>
						<span>总分 {{totalScore}}分</span>
						<span class="btn btn-primary" @click="submit()">下一步</span>
					</p>
				</div>				
			</div>
		</div>
		<homework v-if="scene=='complete'" v-show="scene=='complete'" :title="title" :list="newList"></homework>
	</div>
</template>
<script>
import getSelectOptions from '../../common/function/getSelectOptions';
import Pager from '../../common/components/Pager.vue';
import Select from '../../../dep/vue-strap/src/Select.vue';
import Single from './components/Single.vue';
import Multiple from './components/Multiple.vue';
import Fillblank from './components/Fillblank.vue';
import Essay from './components/Essay.vue';
import Homework from './components/Homework.vue';
import {getQuestionOptions, getQuestionList} from './request';
let options = getSelectOptions();
export default {
	created() {
		this.getOptions();
		this.getQuestionList();
	},
	ready() {
		this.$dispatch('showarrangement');
	},
	data() {
		return {
			subjectOptions: [],
			subjectId: -1,
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
        	scene: 'setting',
			title: '',
		}
	},
	events: {
		del(index) {
			Vue.set(this.newList[index], 'selected', false);
			this.newList.splice(index, 1);
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
	methods: {
		addNewList(question) {
			let l = this.newList.length;
			let index = -1;
			for (let i = 0; i < l; i++) {
				if (question.id == this.newList[i].id) {
					index = i;
					break;
				}
			}
			if (index == -1) {
				this.newList.push(question);
			}
		},	
		select(question) {
			this.addNewList(question);
			Vue.set(question, 'selected', true);
			//question.selected = true;
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
		refresh() {
			this.pageDto.pageNum = 1;
			this.getQuestionList();
		},
		pageChange: function () {
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
		submit() {
			if (this.title.length == 0) {
				dispatch('TOAST', '请输入作业标题');
				$('.title').addClass('error');
				return;
			}
			if (this.title.length > 20) {
				dispatch('TOAST', '作业题目不能超过20个字');
				return;
			}
 			if (this.newList.length == 0) {
				dispatch('TOAST', '请选择题目');
				return;
			}
			$('.title').removeClass('error');
			this.scene = 'complete';
		}
	},
	computed: {
		totalScore() {
			let l = this.newList.length;
			let score = 0;
			for (var i = 0; i < l; i++) {
				score += this.newList[i].score;
			};
			return score;
		}
	},
    components: {
       vSelect: Select,
       Single: Single,
       Multiple: Multiple,
       Fillblank: Fillblank,
       Essay: Essay,
       Homework: Homework,
       Pager: Pager
    }
}
</script>
<style lang="sass">
@import '../../resource/css/common/mixin';
@import '../../resource/css/common/color';
.arrangement {
	margin-top: 15px;
	background: #fff;
	> .top {
		padding: 20px 0;
		width: 520px;
		margin: 0 auto;
		.progress {
			margin-bottom: 0;
			li {
				list-style: none;
			}
			// @include flex-container;
			// -webkit-align-items: center;
			// align-items: center;
			position: relative;
			background: #fff;
			$cicle-size: 40px;
			box-shadow: none;
			height: 40px;
			> .num {
				@include circle($cicle-size, $brand, #fff);
				font-size: 18px;
				&.active {
					background: $brand;
					color: #fff;
				}
				&:last-child {
					position: absolute;
					right: 0;
					top: 0;
				}
			}
			$item-height: 8px;
			.progress-item {

				// @include flex(1);
				position: absolute;
				top: 20px;
				left: 35px;
				width: 450px;
				height: $item-height;
				background: #fff;
				color: $brand;
				> span {
					position: absolute;
					left: 0;
					top: 0;
					width: 50%;
					height: $item-height;
					background: $brand;
					&.full {
						width: 100%;
					}
				}
			}
		}		
	}
	.arrangement-wrap {
		position: relative;
		// .left {
		// 	// float: left;
		// 	padding-right: 550px;
		// 	width: 100%;
		// 	box-sizing: border-box;
		// 	position: relative;
		// 	padding-bottom: 30px;
		// 	.content {
		// 		height: 700px;
		// 		overflow: auto;
		// 	}
		// 	.list {
		// 		li {
		// 			list-style: none;
		// 			padding: 5px 0;
		// 			border-left: 1px solid #fff;
		// 			position: relative;
		// 			&:hover {
		// 				background: #efefef;
		// 				border-left: 1px solid #66ccff;
		// 			}
		// 			div{
		// 				margin: 10px 20px 10px 30px;
		// 				font-size: 13px;
		// 				&:first-child {
		// 					position: absolute;
		// 					left: 0;
		// 					top: 0;
		// 					margin: 15px 0 0 10px;
		// 				}
		// 				p {
		// 					span {
		// 						color: #66ccff;
		// 					}
		// 					label {
		// 						margin-left: 10px;
		// 					}
		// 				}	
		// 			}
					
		// 		}
		// 	}
		// 	.head {
		// 		background: #efefef;
		// 		margin: 5px 0;
		// 		padding: 10px;
		// 		border-bottom: 1px solid #ddd;
		// 		> div {
		// 			display: inline-block;
		// 			label {
		// 				margin-right: 10px;
		// 			}
		// 		}
		// 	}
		// }
		.left {
			margin-right: 560px;
			position: relative;
			padding-bottom: 30px;
			.content {
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
					&.active {
						background: #edf0f5;
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
			position: absolute;
			top: 0;
			right: 10px;
			width: 520px; 
			
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
				input {
					width: 400px;
				}
			}
			.question-list {
				padding: 0 10px;
				padding-top: 20px;
				max-height: 500px;
				overflow: auto;
				border: 1px solid #eee;
				background: #efefef;
				max-height: 600px;
				overflow: auto;
				.list {
					> li {
						list-style: none;
						margin-bottom: 20px;
					}
				}
			}
			> .bottom {
				margin-top: 20px;
				p {
					span {
						margin-right: 20px;
						&:last-child {
							float: right;
						}
					}
				}
			}
		}
	}

}

</style>