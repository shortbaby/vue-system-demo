<template>
    <div class="question-item" v-if="type!='show' && type!='modify'">
        <span class="icon-times" @click="deleteQuestion()"></span>
        <div class="top">
            <span v-if="type=='new'">Q{{index+1}} 多选题目</span>
            <input v-if="type=='new'" type="text" v-model="question.name" name="question" placeholder="请输入题目文字">
            <p v-if="type=='display'">
                {{question.name}}
                <span class="score">分值: {{question.score}}分</span>
            </p>
        </div>
        <div>
            <ul class="multiple-ul">
                <li v-for="item in question.options" track-by="$index">
                    <div>
                        <input type="checkbox" v-if="type=='new'" name="multiple-{{index}}-answer" value="{{$index}}" id="multiple-{{index}}-{{$index}}" v-model="question.answer">
                        <input v-if="type=='display'" disabled type="checkbox" name="multiple-{{index}}-answer" value="{{$index}}" id="multiple-{{index}}-{{$index}}" v-model="question.answer">
                        <label for="multiple-{{index}}-{{$index}}">{{$index | alpha}}、{{item}}<span class="right-answer" v-show="question.answer.indexOf($index.toString()) != -1">正确答案</span></label>
                        <span v-if="type=='new'" class="icon-trash" @click="del($index)"></span>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="type=='new'">
            <input type="checkbox" name="multiple-answer" disabled>  
            <input type="text" name="question-txt" placeholder="请输入选项" v-model="option" class="answer-item">
            <span class="icon-plus" @click="add($event)"></span>
        </div>
        <div class="bottom" v-if="type=='new'">
            <span>本题分值</span>
            <input type="text" v-model="question.score" placeholder="请输入本题分值" class="small">
            <span>题目级别</span>
            <v-select :options="questionPhaseOptions" :close-on-select="true" :value.sync="phase | str"></v-select>   
        </div>
    </div>
    <div class="question-item" v-if="type=='modify'">
        <div class="top">
            <span v-if="type=='modify'">Q{{index+1}} 多选题目</span>
            <input v-if="type=='modify'" type="text" v-model="question.name" name="question" placeholder="请输入题目文字">
        </div>
        <div>
            <ul class="multiple-ul">
                <li v-for="item in question.options" track-by="$index">
                    <div>
                        <input type="checkbox" v-if="type=='modify'" name="multiple-{{index}}-answer" value="{{$index}}" id="m-multiple-{{index}}-{{$index}}" v-model="question.answer">
                        <label for="m-multiple-{{index}}-{{$index}}">{{$index | alpha}}、{{item}}<span class="right-answer" v-show="question.answer.indexOf($index.toString()) != -1">正确答案</span></label>
                        <span v-if="type=='modify'" class="icon-trash" @click="del($index)"></span>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="type=='modify'">
            <input type="checkbox" name="multiple-answer" disabled>  
            <input type="text" name="question-txt" placeholder="请输入选项" v-model="option" class="answer-item">
            <span class="icon-plus" @click="add($event)"></span>
        </div>
        <div class="bottom" v-if="type=='modify'">
            <span>本题分值</span>
            <input type="text" v-model="question.score" placeholder="请输入本题分值" class="small">
            <span>题目级别</span>
            <v-select :options="questionPhaseOptions" :close-on-select="true" :value.sync="question.phase | str"></v-select>   
        </div>
    </div>
    <div class="question-item" v-if="type=='show'">
        <div class="top">
            <p class="txt">
                {{question.name}}
                <span>({{question.score}}分)</span>
            </p>
        </div>
        <div>
            <div class="result">
                <span v-if="!result" class="icon-check-nocircle"></span>
                <span v-if="result" class="icon-times"></span>
            </div>
            <ul class="multiple-ul">
                <li v-for="item in question.options" track-by="$index">
                    <div>
                        <input disabled type="checkbox" name="multiple-{{index}}-answer" value="{{$index}}" id="multiple-{{index}}-{{$index}}" v-model="question.select">
                        <label for="multiple-{{index}}-{{$index}}">{{$index | alpha}}、{{item}}<span class="right-answer" v-show="question.answer.indexOf($index.toString()) != -1">正确答案</span></label>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import getSelectOptions from '../../../common/function/getSelectOptions';
import Select from '../../../../dep/vue-strap/src/Select.vue';
let options = getSelectOptions();
let questionPhaseOptions = options.questionPhaseOptions;
questionPhaseOptions.splice(0, 1);
export default {
    data() {
        return {
            questionPhaseOptions:questionPhaseOptions,
            phase: 0,
            option: ''
        }
    },
    watch: {
        phase(val) {
            this.question.phase = val;
        } 
    },
    props: {
        index: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            default: 'new'
        },
        question: {
            type: Object,
            default: {
                name: '',
                options: [],
                answer: [],
                select: [],
                score: 0,
                phase: 0
            },
            twoWay: true
        }
    },
    computed: {
        result() {
            return this.question.result || 0;
        }
    },
    methods: {
        deleteQuestion() {
            this.$dispatch('del', this.index);
        },
        add(event) {
            let target = $(event.target);
            if (this.option.length == 0) {
                target.parent().find('.answer-item').addClass('error');
            } else {
                this.question.options.push(this.option);
                this.option = '';
                target.parent().find('.answer-item').removeClass('error');
            }
        },
        del(index) {
            this.question.options.splice(index, 1);
            this.question.answer = [];
        }
    },
    components: {
        vSelect: Select
    }
}
</script>

<style lang="sass">
</style>