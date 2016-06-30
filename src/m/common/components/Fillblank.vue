<template>
    <div class="question-item">
        <div class="top">
            <span>{{index}} 填空题</span>
        </div>
        <div>
           <div class="fill-blank-content">
               <ul>
                   <li v-for="item in question.contents" track-by="$index">
                        <input v-if="item.type=='blank'" type="text" class="blank" v-model="item.select" placeholder="填空内容">
                        <p v-if="item.type=='fill'" class="fill">{{item.content}}</p>
                   </li>
                   <li>
                      <span class="score">分值: {{question.score}}分</span> 
                   </li>
               </ul>
           </div>
           <div v-show="type=='result'">
              <p class="answer">
                  正确答案: {{question.answer}}
              </p> 
           </div> 
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    computed: {
        result() {
            return this.question.result || 0;
        }
    },
    created() {
        // let contents = [];
        // if (this.question.name.length > 0) {
        //     contents =  JSON.parse(this.question.name);
        // }
        // Vue.set(this.question, 'contents', contents);
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
                    score: 0,
                    phase: 0,
                    answer: []    
                }
            },
            twoWay: true
        }
    }
}
</script>

<style lang="sass"></style>