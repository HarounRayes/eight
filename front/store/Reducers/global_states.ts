import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
    isMobile: boolean;
    showSidebar: boolean;
    hasTerm: boolean;
}

const initialState: GlobalState = {
    isMobile: false,
    showSidebar: false,
    hasTerm: false
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsMobile(state, action: PayloadAction<boolean>) {
            state.isMobile = action.payload;
        },
        toggleIsMobile(state) {
            state.isMobile = !state.isMobile;
        },
        setShowSidebar(state, action: PayloadAction<boolean>) {
            state.showSidebar = action.payload;
        },
        toggleShowSidebar(state) {
            state.showSidebar = !state.showSidebar;
        },
        setHasTerm(state, action: PayloadAction<boolean>) {
            state.hasTerm = action.payload;
        },
        toggleHasTerm(state) {
            state.hasTerm = !state.hasTerm;
        },
    },
});

export const { setIsMobile, toggleIsMobile, setShowSidebar, toggleShowSidebar, setHasTerm, toggleHasTerm } = globalSlice.actions;
export default globalSlice.reducer;