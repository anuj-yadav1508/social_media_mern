import React, { useContext, useEffect, useReducer } from 'react'
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem('user')) || null,
    isFetching:false,
    isError:false
}

const AuthContext = React.createContext(INITIAL_STATE)

const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])
    return(
        <AuthContext.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            isError:state.isError,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AuthContext)
}

export {AuthContext, AuthContextProvider}