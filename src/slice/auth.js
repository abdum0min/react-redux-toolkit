import { createSlice } from '@reduxjs/toolkit'
import { setItem } from '../helpers/persistance-storage'

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
            setItem('token', action.payload.token)
        },
        signUserFailure:  (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})


export const {signUserStart, signUserSuccess, signUserFailure} = authSlice.actions
export default authSlice.reducer