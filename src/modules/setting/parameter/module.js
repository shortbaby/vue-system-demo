
const state = {
    addState: false
};

const mutations = {
    'ADD' (state) {
        state.addState = true;
    },
    'HIDE_ADD' (state) {
        state.addState = false;
        window.removeBodyModalOpen();
    }
};

export default {
    state,
    mutations
};