<template>
    <ul class="report-tabs">
        <li :class="{current: isCurrent('conversion')}" @click="changeTabs('conversion')" >
            <div>咨询顾问渠道转化率</div>
        </li>
        <li :class="{current: isCurrent('visit')}" @click="changeTabs('visit')">
            <div>咨询顾问渠道到访率</div>
        </li>
    </ul>
    <component :is="currentView" transition="fade" transition-mode="out-in" keep-alive>
    </component>
</template>

<script>
    import Conversion from './components/conversion.vue';
    import Visit from './components/visit.vue';
    export default {
        data() {
            return {
            }
        },
        vuex: {
            getters:　{
                currentView: state => state.report.adviserCurrentView
            },
            actions: {
                changeTabs({dispatch}, currentView) {
                    dispatch('CHANGE_REPORT_ADVISER_TAB', currentView);
                }
            }
        },
        create() {
            dispatch('CHANGE_REPORT_ADVISER_TAB', 'conversion');
        },
        events: {
        },
        methods: {
            isCurrent(view) {
                return view === this.currentView;
            },
        },
        components: {
            Conversion: Conversion,
            Visit: Visit
        }
    }
</script>

<style lang="sass">
</style>