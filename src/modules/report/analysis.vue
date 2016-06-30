<template>
    <ul class="report-tabs">
        <li :class="{current: isCurrent('source')}" @click="changeTabs('source')" >
            <div>招生来源</div>
        </li>
        <li :class="{current: isCurrent('channel')}" @click="changeTabs('channel')">
            <div>渠道转化率</div>
        </li>
    </ul>
    <component :is="currentView" transition="fade" transition-mode="out-in" keep-alive>
    </component>
</template>

<script>
    import Source from './components/source.vue';
    import Channel from './components/channel.vue';
    export default {
        data() {
            return {
            }
        },
        vuex: {
            getters:　{
                currentView: state => state.report.analysisCurrentView
            },
            actions: {
                changeTabs({dispatch}, currentView) {
                    dispatch('CHANGE_REPORT_ANALYSIS_TAB', currentView);
                }
            }
        },
        create() {
            dispatch('CHANGE_REPORT_ANALYSIS_TAB', 'source');
        },
        events: {
        },
        methods: {
            isCurrent(view) {
                return view === this.currentView;
            },
        },
        components: {
            Source: Source,
            Channel: Channel
        }
    }
</script>

<style lang="sass">
</style>