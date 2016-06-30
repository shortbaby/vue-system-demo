
const state = {
	studentCurrentView: 'course',
	analysisCurrentView: 'source',
	financialCurrentView: 'income',
	adviserCurrentView: 'conversion'
};

const mutations = {
	'CHANGE_REPORT_STUDENT_TAB' (state, view) {
		state.studentCurrentView = view || 'course';
	},
	'CHANGE_REPORT_ANALYSIS_TAB' (state, view) {
		state.analysisCurrentView = view || 'source';
	},
	'CHANGE_REPORT_FINANCIAL_TAB' (state, view) {
		state.financialCurrentView = view || 'income';
	},
	'CHANGE_REPORT_ADVISER_TAB' (state, view) {
		state.adviserCurrentView = view || 'conversion';
	}
};

export default {
	state,
	mutations
};
