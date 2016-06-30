
const state = {
    editState: false
};

const mutations = {
    'EDIT' (state) {
        state.editState = true;
    },
    'HIDE_EDIT' (state) {
        state.editState = false;
        window.removeBodyModalOpen();
    }
};

export default {
    state,
    mutations
};
