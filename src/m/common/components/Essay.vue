<template>
    <div class="question-item">
        <div class="top">
            <span>{{index}} 问答题</span>
            <p>
                {{question.name}}
                <span class="score">分值: {{question.score}}分</span>
            </p>
        </div>
        <div class="essay-result mobile">
              <textarea v-model="question.select"></textarea>
        </div>
        <div class="essay-answer" v-show="type=='result'">
            <p class="score-p">
                该题得分: <span class="score">{{question.getScore}} </span>分
            </p> 
            <p class="answer">
                  {{question.comment}}
            </p> 
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        index: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            default: 'default'
        },
        status: {
            type: Number,
            default: 1
        },
        question: {
            type: Object,
            default: function(){
                return {
                    name: '',
                    score: 0,
                    phase: 0   
                } 
            },
            twoWay: true
        }
    },
    methods: {
    },
    events: {
        
    }
}
</script>

<style lang="sass">
.mobile {
    text-align: center;
    textarea {
        width: 85%;
        height: 8rem;
    }
}
.score-p {
    color: #f51e0b;
    margin-bottom: 1rem;
}
</style>