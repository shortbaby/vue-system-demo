
<template>
	<div class="survey-wrap">
		<div class="item">
			<div class="item-title">未来学习安排</div>
			<div class="item-body">
				<div class="input-control">
					<label>留学国家</label>
					<input type="text" maxlength="20" v-model="data.future.country" class="normal"/>
				</div>
				<div class="input-control">
					<label>学习预算</label>
					<input type="number" v-model="data.future.budget" class="normal" @input="checkBudget($event)"/>
				</div>
				<div class="input-control">
					<label>培训科目</label>
					<input type="text" maxlength="20" v-model="data.future.subject" class="normal"/>
				</div>
				<div class="input-control">
					<label>咨询课程</label>
					<input type="text" maxlength="20" v-model="data.future.course" class="normal"/>
				</div>
				<div class="input-control">
					<label>学习时间</label>
					<input type="checkbox" id="tuochan" value="1" v-model="data.future.studyTimes">
					<label for="tuochan">脱产</label>
					<input type="checkbox" id="zhoumo" value="2" v-model="data.future.studyTimes">
					<label for="zhoumo">周末</label>
					<input type="checkbox" id="night" value="3" v-model="data.future.studyTimes">
					<label for="night">平日晚上</label> 
					<input type="checkbox" id="hanjia" value="4" v-model="data.future.studyTimes">
					<label for="hanjia">寒假</label> 
					<input type="checkbox" id="shujia" value="5" v-model="data.future.studyTimes">
					<label for="shujia">暑假</label> 
					<input type="checkbox" id="other" value="6" v-model="data.future.studyTimes">
					<label for="other">其他</label> 
				</div>
			</div>
		</div>
		<div class="item">
			<div class="item-title">过往考试成绩（真实/模考）</div>
			<div class="item-body">
				<div class="input-line user-select-none" v-for="item in data.beforeScore">
					<div class="line-item-wrap">
						<div class="input-line-item">
							<label>考试科目</label>
							<input type="text" maxlength="20" v-model="item.subject" class="medium"/>
						</div>
						<div class="input-line-item">
							<label>考试时间</label>
							<input type="date" v-model="item.time" class="medium"/>
						</div>
						<div class="input-line-item">
							<label>总分</label>
							<input type="number" v-model="item.total" class="smaller" @input="checkScore($event)"/>
						</div>
						<div class="input-line-item">
							<label>阅读</label>
							<input type="number" v-model="item.read" class="smaller" @input="checkScore($event)"/>
						</div>
						<div class="input-line-item">
							<label>听力/语法</label>
							<input type="number" v-model="item.listen" class="smaller" @input="checkScore($event)"/>
						</div>
						<div class="input-line-item">
							<label>口语/教学</label>
							<input type="number" v-model="item.speak" class="smaller" @input="checkScore($event)"/>
						</div>
						<div class="input-line-item">
							<label>写作/作文</label>
							<input type="number" v-model="item.article" class="smaller" @input="checkScore($event)"/>
						</div>
					</div>
					<span v-if="$index == 0" class="icon-plus" @click="addNewBeforeScore()"></span>
					<span v-if="$index != 0" class="icon-trash" @click="delBeforeScore($index)"></span>
				</div>
			</div>
		</div>
		<div class="item">
			<div class="item-title">过往培训经历/所做联系</div>
			<div class="item-body">
				<div class="input-line user-select-none" v-for="item in data.beforeStudy">
					<div class="line-item-wrap col3" >
						<div class="input-line-item">
							<label>培训时间</label>
							<input type="date" class="normal" v-model="item.time" />
						</div>
						<div class="input-line-item">
							<label>培训科目</label>
							<input type="text" maxlength="20" v-model="item.subject" class="normal"/>
						</div>
						<div class="input-line-item">
							<label>培训机构</label>
							<input type="text" maxlength="20" v-model="item.org" class="normal"/>
						</div>
						<div class="input-line-item">
							<label>授课老师</label>
							<input type="text" maxlength="10" v-model="item.teacher" class="normal"/>
						</div>
						<div class="input-line-item">
							<label>所做练习</label>
							<input type="text" maxlength="20" v-model="item.pratice" class="normal"/>
						</div>
						<div class="input-line-item">
							<label>教师评价</label>
							<input type="text" maxlength="200" v-model="item.teacherComment" class="normal"/>
						</div>
					</div>
					<span v-if="$index == 0" class="special icon-plus" @click="addNewBeforeStudy()"></span>
					<span v-if="$index != 0" class="special icon-trash" @click="delBeforeStudy($index)"></span>
				</div>
			</div>
		</div>
		<div class="item">
			<div class="item-title">出国前学习规划</div>
			<div class="item-body">
				<div class="input-line user-select-none" v-for="item in data.beforeAbroad">
					<div class="line-item-wrap col3">
						<div class="input-line-item">
							<label>时段</label>
							<input type="text" class="normal" maxlength="20" v-model="item.time"/>
						</div>
						<div class="input-line-item">
							<label>学习科目</label>
							<input type="text" v-model="item.subject" maxlength="20" class="normal"/>
						</div>
						<div class="input-line-item">
							<label>考试时间</label>
							<input type="date" v-model="item.testTime" class="normal"/>
						</div>
					</div>
					<span v-if="$index == 0" class="icon-plus" @click="addNewBeforeAbroad()"></span>
					<span v-if="$index != 0" class="icon-trash" @click="delBeforeAbroad()"></span>
				</div>
			</div>
		</div>
		<div class="item">
			<div class="item-title">课程计划</div>
			<div class="item-body">
				<div class="input-line user-select-none" v-for="item in data.coursePlan">
					<div class="line-item-wrap col3">
						<div class="input-line-item">
							<label>时段</label>
							<input type="text" class="normal" maxlength="20" v-model="item.time"/>
						</div>
						<div class="input-line-item">
							<label>班型</label>
							<input type="text" v-model="item.class" maxlength="20" class="normal"/>
						</div>
						<div class="input-line-item">
							<label>课程内容</label>
							<input type="text" v-model="item.content" maxlength="30" class="normal"/>
						</div>
					</div>
					<span v-if="$index == 0" class="icon-plus" @click="addNewCoursePlan()"></span>
					<span v-if="$index != 0" class="icon-trash" @click="delCoursePlan()"></span>
				</div>
			</div>
		</div>
		<div class="item">
			<div class="item-title">家长及学生预期</div>
			<div class="item-body">
				<div class="text-control">
					<span>家长及学生对大学排名的要求或对分数的直接要求</span>
					<div>
						<textarea class="text" v-model="data.demandForScore"></textarea>
					</div>
				</div>
				<div class="text-control">
					<span>家长对学生的要求</span>
					<div>
						<textarea class="text" v-model="data.demandForStudent"></textarea>
					</div>
				</div>
				<div class="text-control">
					<span>家长对课程的要求（管理\任课老师\同班同学等）</span>
					<div>
						<textarea class="text" v-model="data.demandForCourse"></textarea>
					</div>
				</div>
				<div class="text-control">
					<span>家长对上课的时间和地点的要求</span>
					<div>
						<textarea class="text" v-model="data.demandForTimeOrAddress"></textarea>
					</div>
				</div>
				<div class="text-control">
					<span>家长与学生之间的关系</span>
					<div>
						<textarea class="text" v-model="data.relationship"></textarea>
					</div>
				</div>
				<div class="text-control">
					<span>其他</span>
					<div>
						<textarea class="text" v-model="data.other"></textarea>
					</div>
				</div>
			</div>
			<div class="info-btns">
	  			<span @click.stop="save($event)" class="btn btn-primary">保存</span>
	  		</div>
	  	</div>
	</div>
</template>

<script>
import SurveyMixins from './surveyMixins';
export default {
	mixins: [SurveyMixins]
}
</script>

<style lang="sass">
.survey-wrap {
	background: #fff;
	border: 1px solid #e0e0e0;
	overflow: auto;
	padding-bottom: 20px;
	.item {
		.item-title {
			width: 180px;
			height: 30px;
			background: #f2f2f2;
			font-size: 12px;
			text-align: center;
			line-height: 30px;
			color: #2b3643;
		}
		.item-body {
			min-width: 1400px;
			padding: 40px;
			.input-control	{
				display: inline-block;
				margin: 10px 40px 0 0;
				label {
					margin-right: 10px;
				}
				input:not( [type="checkbox"]) {
					height: 44px;
					border: 1px solid #e0e0e0;
					line-height: 44px;
					width: 298px;
					padding: 0;
					border-radius: 4px;
				}
				&:last-child {
					height: 44px;
					line-height: 44px;
					label {
						margin:0 30px 0 8px;
						&:first-child {
							margin-right: 20px;
						}
					}
				}
			}
			.text-control {
				float: left;
				width: 50%;
				textarea {
					width: 420px;
					height: 80px;
					box-sizing: border-box;
					border-radius: 4px;
					border: 1px solid #e0e0e0;
					margin-top: 14px;
				}
			}

			.input-line {
				+ .input-line {
					margin-top: 30px
				}
				min-width: 1500px;
				position: relative;
				.line-item-wrap {
					display: inline-block;
					border: 1px dashed #e0e0e0;
					border-radius: 14px;
					padding: 20px;
					margin-right: 30px;
					&.col3 {
						.input-line-item {
							margin: 10px 70px 10px 0;
						}
					}
					.input-line-item {
						display: inline-block;
						margin-right: 10px;
						label {
							margin-right: 20px;
						}
						input {
							text-align: center;
							padding: 0;
							height: 44px;
							line-height: 44px;
							border: 1px solid #e0e0e0;
							border-radius: 4px;
							&.smaller {
								width: 79px;
							}
							&.medium {
								width: 179px;
							}
						}
					}
				}
				.special {
						position: relative;
						top: -22px;
					}
			}
		}
	}
	.info-btns {
		text-align: center;
		padding-top: 10px;
		.btn-primary {
			width: 120px;
		}
	}
}
</style>