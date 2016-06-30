<template>
    <ul class="report-tabs">
        <li :class="{current: isCurrent('income')}" @click="changeTabs('income')" >
            <div>校区收入报表</div>
        </li>
        <li :class="{current: isCurrent('refund')}" @click="changeTabs('refund')">
            <div>校区退费报表</div>
        </li>
    </ul>
    <component :is="currentView" transition="fade" transition-mode="out-in" keep-alive>
    </component>
</template>

<script>
    import Income from './components/income.vue';
    import Refund from './components/refund.vue';
    export default {
        data() {
            return {
            }
        },
        vuex: {
            getters:　{
                currentView: state => state.report.financialCurrentView
            },
            actions: {
                changeTabs({dispatch}, currentView) {
                    dispatch('CHANGE_REPORT_FINANCIAL_TAB', currentView);
                }
            }
        },
        create() {
            dispatch('CHANGE_REPORT_FINANCIAL_TAB', 'income');
        },
        events: {
        },
        methods: {
            isCurrent(view) {
                return view === this.currentView;
            },
        },
        components: {
            Income: Income,
            Refund: Refund
        }
    }
</script>

<style lang="sass">
</style>