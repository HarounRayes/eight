import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import searchService from '@/store/api/search_api';
import { ResponseType } from '@/types/search_response_type.';

const initialState = {
    data: {} as ResponseType,
    loading: false,
};


export const search = createAsyncThunk('search/items', async (query: string, thunkApi) => {
    try {
        const response = await searchService.search(query);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error);
    }
});


const searchSlice = createSlice({
    name: 'search/items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(search.pending, (state) => {
                state.loading = true;
                state.data = {} as any;
            })
            .addCase(search.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload as ResponseType;
            })
            .addCase(search.rejected, (state, _) => {
                state.loading = false;
                state.data = {} as any;
            });
    },
});

export default searchSlice.reducer;
