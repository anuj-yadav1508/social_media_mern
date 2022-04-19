export const LoginStart = (userCredentials) => ({
    type:"LOGIN_START",
})

export const LoginSuccess = (user) => {
    return(
        {
            type:"LOGIN_SUCCESS",
            payload:user,
        }
    )
}

export const LoginFailure = (error) => (
    {
        type:"LOGIN_FAILURE",
        payload: error,
    }
)

export const UserFollow = (userId) => (
    {
        type: "FOLLOW",
        payload: userId
    }
)

export const UserUnfollow = (userId) => (
    {
        type: "UNFOLLOW",
        payload: userId
    }
)

export const UserLogout = () => (
    {
        type:'LOGOUT'
    }
)