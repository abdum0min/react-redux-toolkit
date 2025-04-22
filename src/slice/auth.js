import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    loggedin: false,
    error: null,
    user: null, 
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // sign
        signUserStart:  state => {
            state.isLoading = true
        },
        signUserSuccess:  (state, action) => {
            state.loggedin = true
            state.isLoading = false
            state.user = action.payload
        },
        signUserFailure:  (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})


export const {signUserStart, signUserSuccess, signUserFailure} = authSlice.actions
export default authSlice.reducer