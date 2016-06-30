<template>
    <div class="question-item" v-if="type!='show' && type!='modify'">
        <span class="icon-times" @click="deleteQuestion()"></span>
        <div class="top">
            <span v-if="type=='new'">Q{{index+1}} 填空题</span>
        </div>
        <div>
           <div class="fill-blank-content">
               <ul>
                   <li v-for="item in question.contents" track-by="$index">
                        <input v-if="item.type=='blank' && type=='new'" type="text" class="blank" v-model="item.content" placeholder="填空内容">
                        <p v-if="item.type=='blank' && type=='display'" class="blank-p">{{item.content}}</p>
                        <p v-if="item.type=='fill'" class="fill">{{item.content}}</p>

                        <span v-if="type=='new'" class="icon-times" @click="del($index)"></span>
                   </li>
                   <li v-if="type=='display'">
                      <span class="score">分值: {{question.score}}分</span> 
                   </li>
               </ul>
                
           </div>
           <div v-if="type=='new'">
                <input type="text" v-model="fillTxt" placeholder="请输入填空内容">
                <span class="btn btn-primary" @click="add()">加入填空</span>
           </div>
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
            <span v-if="type=='modify'">Q{{index+1}} 填空题</span>
        </div>
        <div>
           <div class="fill-blank-content">
               <ul>
                   <li v-for="item in question.contents" track-by="$index">
                        <input v-if="item.type=='blank' && type=='modify'" type="text" class="blank" v-model="item.content" placeholder="填空内容">
                        <p v-if="item.type=='fill'" class="fill">{{item.content}}</p>

                        <span v-if="type=='modify'" class="icon-times" @click="del($index)"></span>
                   </li>
               </ul>
                
           </div>
           <div v-if="type=='modify'">
                <input type="text" v-model="fillTxt" placeholder="请输入填空内容">
                <span class="btn btn-primary" @click="add()">加入填空</span>
           </div>
        </div>
        <div class="bottom" v-if="type=='modify'">
            <span>本题分值</span>
            <input type="text" v-model="question.score" placeholder="请输入本题分值" class="small">
            <span>题目级别</span>
            <v-select :options="questionPhaseOptions" :close-on-select="true" :value.sync="question.phase | str"></v-select>   
        </div>
    </div>
    <div class="question-item" v-if="type=='show'">
        <div>
           <div class="fill-blank-content">
               <div class="result">
                    <span v-if="!result" class="icon-check-nocircle"></span>
                    <span v-if="result" class="icon-times"></span>
                </div>
               <ul>
                   <li v-for="item in question.contents" track-by="$index">
                        <input v-if="item.type=='blank'" readonly type="text" class="blank" v-model="item.content" placeholder="填空内容">
                        <p v-if="item.type=='fill'" class="fill">{{item.content}}</p>
                   </li>
                   <li>
                      <span>({{question.score}}分)</span> 
                   </li>
               </ul>
           </div>
           <div>
              <p class="answer">
                  {{question.select}}
              </p> 
           </div>
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
            fillTxt: ''
        }
    },
    watch: {
        phase(val) {
            this.question.phase = val;
        } 
    },
    computed: {
        result() {
            return this.question.result || 0;
        }
    },
    created() {
        let self = this;
        let contents = [];
        if (self.question.name.length > 0) {
            contents =  JSON.parse(self.question.name);
        }
        Vue.set(self.question, 'contents', contents);
        
        
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
                score: 0,
                phase: 0,
                answer: []
            },
            twoWay: true
        }
    },
    methods: {
        deleteQuestion() {
            this.$dispatch('del', this.index);
        },
        add(event) {
            if(this.fillTxt.length > 0) {
                let item = {
                    type: 'fill',
                    content: this.fillTxt
                }
                this.question.contents.push(item);
                this.fillTxt = '';
            }
            let blankItem = {
                type: 'blank',
                content: ''
            }
            this.question.contents.push(blankItem);
        },
        del(index) {
            this.question.contents.splice(index, 1);
        }
    },
    components: {
        vSelect: Select
    }
}
</script>

<style lang="sass"></style>