
const state = {
    addState: false,
    transferState: false
};

const mutations = {
    'ADD' (state) {
        state.addState = true;
    },
    'HIDE_ADD' (state) {
        state.addState = false;
        window.removeBodyModalOpen();
    },
    'TRANSFER' (state) {
        state.transferState = true;
    },
    'HIDE_TRANSFER' (state) {
        state.transferState = false;
        window.removeBodyModalOpen();
    }
};

export default {
    state,
    mutations
};
