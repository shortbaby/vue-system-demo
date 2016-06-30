
const state = {
	batchImportState: false,
	setHeaderState: false,
	currentView: 'follow',
	addStudentState: false
};

const mutations = {
	'BATCH_IMPORT' (state) {
		state.batchImportState = true;
	},
	'HIDE_BATCH_IMPORT' (state) {
		state.batchImportState = false;
		// TODO
		$('body').removeClass('modal-open');
	},
	'SET_HEADER' (state) {
		state.setHeaderState = true;
	},
	'SHOW_NEW_STUDENT' (state) {
		state.addStudentState = true;
	},
	'HIDE_NEW_STUDENT' (state) {
		state.addStudentState = false;
		// TODO
		$('body').removeClass('modal-open');
	},
	'CHANGE_TAB' (state, view) {
		state.currentView = view || 'follow';
	},
 	'HIDE_SET_HEADER' (state) {
		state.setHeaderState = false;
		// TODO
		$('body').removeClass('modal-open');
	}
};

export default {
	state,
	mutations
};
