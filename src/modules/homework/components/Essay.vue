<template>
    <div class="question-item" v-if="type!='show' && type!='modify'">
        <span class="icon-times" @click="deleteQuestion()"></span>
        <div class="top">
            <span v-if="type=='new'">Q{{index+1}} 问答题</span>
            <input v-if="type=='new'" type="text" v-model="question.name" name="question" placeholder="请输入题目文字">
            <p v-if="type=='display'">
                {{question.name}}
                <span class="score">分值: {{question.score}}分</span>
            </p>
        </div>
        <div v-if="type=='new'" class="bottom">
            <span>本题分值</span>
            <input type="text" v-model="question.score" placeholder="请输入本题分值" class="small">
            <span>题目级别</span>
            <v-select :options="questionPhaseOptions" :close-on-select="true" :value.sync="phase | str"></v-select>   
        </div>
    </div>
    <div class="question-item" v-if="type =='modify'">
        <div class="top">
            <span v-if="type=='modify'">Q{{index+1}} 问答题</span>
            <input v-if="type=='modify'" type="text" v-model="question.name" name="question" placeholder="请输入题目文字">
        </div>
        <div v-if="type=='modify'" class="bottom">
            <span>本题分值</span>
            <input type="text" v-model="question.score" placeholder="请输入本题分值" class="small">
            <span>题目级别</span>
            <v-select :options="questionPhaseOptions" :close-on-select="true" :value.sync="question.phase | str"></v-select>   
        </div>
    </div>
    <div class="question-item" v-if="type=='show'">
        <div class="top">
            <p class="essay-title">
                {{question.name}}
                <span>({{question.score}}分)</span> 
            </p>
        </div>
        <div class="essay-answer">
              <p class="answer">
                  {{question.select}}
              </p> 
        </div>
        <div class="essay-result">
              <input type="text" v-model="question.getScore" placeholder="请输入本题得分值" v-if="status == 1">
              <textarea v-model="question.comment" v-if="status == 1"></textarea>
              <input type="text" v-model="question.getScore" readonly placeholder="请输入本题得分值" v-if="status == 2">
              <textarea readonly v-model="question.comment" v-if="status == 2"></textarea>
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
            phase: 0
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
        status: {
            type: Number,
            default: 1
        },
        question: {
            type: Object,
            default: {
                name: '',
                score: 0,
                phase: 0
            },
            twoWay: true
        }
    },
    methods: {
        deleteQuestion() {
            this.$dispatch('del', this.index);
        }
    },
    events: {
        
    },
    computed: {
        result() {
            return this.question.result || 0;
        }
    },
    components: {
        vSelect: Select
    }
}
</script>

<style lang="sass">
</style>