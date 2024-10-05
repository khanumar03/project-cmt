import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface State {
    currDomain: string | undefined
}

const initialState: State = {
    currDomain: undefined
}


export const Slice = createSlice({
    name: "data",
    initialState,
    reducers: {
        updateCurrDomain: (state, action: PayloadAction<any>) => {
            state.currDomain = action.payload;
        }
    }
}) 

export const {
    updateCurrDomain
} = Slice.actions

export default Slice.reducer