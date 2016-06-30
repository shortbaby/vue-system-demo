<template>
    <div class="question-item">
       <div class="top head">
           老师评语
       </div>
       <p class="remark">{{comment}}</p>
    </div>
</template>

<script>
export default {
    props: {
        comment: {
            type: String,
            default: 'How do you  find  your new classmates? Most of them are kind, but none is so good to me as Bruce'
        }
    },
    methods: {
    },
	events: {	
	},
    components: {
    }
}
</script>

<style lang="sass">
.question-item {
    .top {
        &.head {
            border-bottom: 1px solid #ccc;
        }
    }
    .remark {
        padding: 1rem;
    }
}
</style>