import { createSlice } from '@reduxjs/toolkit'
import { removeItem, setItem } from '../helpers/persistance-storage'

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
        logoutUser: (state) => {
            state.loggedin = false
            state.user = null
            removeItem('token')
        }
    }
})


export const {signUserStart, signUserSuccess, signUserFailure, logoutUser} = authSlice.actions
export default authSlice.reducer