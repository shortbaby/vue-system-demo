
const state = {
	addState: false,
	editState: false,
	addSubjectState: false,
	addSubtypeState: false,
	categoryCurrentView: 'subject'
};

const mutations = {
	'ADD' (state) {
		state.addState = true;
	},
	'HIDE_ADD' (state) {
		state.addState = false;
		window.removeBodyModalOpen();
	},
	'EDIT' (state) {
		state.editState = true;
	},
	'HIDE_EDIT' (state) {
		state.editState = false;
		window.removeBodyModalOpen();
	},
	'ADD_SUBJECT' (state) {
		state.addSubjectState = true;
	},
	'HIDE_ADD_SUBJECT' (state) {
		state.addSubjectState = false;
		window.removeBodyModalOpen();
	},
	'ADD_SUBTYPE' (state) {
		state.addSubtypeState = true;
	},
	'HIDE_ADD_SUBTYPE' (state) {
		state.addSubtypeState = false;
		window.removeBodyModalOpen();
	},
	'CHANGE_CATEGORY_TAB' (state, view) {
		state.categoryCurrentView = view || 'subject';
	}
};

export default {
	state,
	mutations
};
