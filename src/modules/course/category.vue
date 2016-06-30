<template>
    <ul class="category-tabs">
        <li :class="{current: isCurrent('subject')}" @click="changeTabs('subject')" >
            <div>课程一级分类</div>
        </li>
        <li :class="{current: isCurrent('subtype')}" @click="changeTabs('subtype')">
            <div>课程二级分类</div>
        </li>
    </ul>
    <component :is="currentView" transition="fade" transition-mode="out-in">
    </component>
</template>
<script>
    import Subject from './subject.vue';
    import Subtype from './subtype.vue';

    export default {
        data() {
            return {
            }
        },
        vuex: {
            getters:　{
                currentView: state => state.course.categoryCurrentView
            },
            actions: {
                changeTabs({dispatch}, view) {
                    $('.process-menu').remove();
                    dispatch('CHANGE_CATEGORY_TAB', view);
                }
            }
        },
        create() {
            // dispatch('CHANGE_CATEGORY_TAB', 'cource');
        },
        events: {
        },
        methods: {
            isCurrent(view) {
                return view === this.currentView;
            }
        },
        components: {
            Subject: Subject,
            Subtype: Subtype
        }
    }
</script>

<style lang="sass">
.category-tabs {
    border-bottom: 1px solid #66ccff;
    margin-top: 10px;
    background: #fff;
    padding-left: 20px;
    li {
        list-style: none;
        display: inline-block;
        margin-right: 40px;
        padding: 8px 0;
        font-size: 16px;
        font-weight: 600;
        color: #868686;
        cursor: pointer;
        &.current {
            color: #66ccff;
            border-bottom: 3px solid #66ccff;
        }
    }
}
</style>