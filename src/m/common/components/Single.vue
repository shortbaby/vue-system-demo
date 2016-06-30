<template>
    <div class="question-item">
        <div class="top">
            <p>
                {{index}}、{{question.name}}
                <span class="score">{{question.score}}分</span>
            </p>
        </div>
        <div>
            <ul class="single-ul">
                <li v-for="item in question.options" track-by="$index">
                    <div>
                        <input type="radio" name="single-{{index}}-answer" value="{{$index}}" id="single-{{index}}-{{$index}}" v-model="question.select">
                        <label for="single-{{index}}-{{$index}}">{{$index | alpha}}、{{item}}<span class="right-answer" v-show="question.answer.indexOf($index.toString()) != -1 && type=='result'">正确答案</span></label>
                    </div>
                </li>
            </ul>
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
        question: {
            type: Object,
            default: function(){
                return {
                    name: '',
                    options: [],
                    answer: [],
                    select: [],
                    score: 0,
                    phase: 0
                }
            },
            twoWay: true
        }
    },
    methods: {
    }
}
</script>
<style lang="sass">
</style>