const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user:null,
                isFetching:true,
                isError:false
            }

        case 'LOGIN_SUCCESS':
            
            return {
                user:action.payload,
                isFetching:false,
                isError:false
            }
            
        case 'LOGIN_FAILURE': 
            return {
                user:null,
                isFetching:false,
                isError:action.payload
            }

        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload]
                }
            }

        case 'UNFOLLOW': 
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings.filter(following => following.id !== action.payload)]
                }
            }

        case 'LOGOUT':
            localStorage.removeItem('user')
            return {
                ...state,
                user: null
            }
            break;
        default:
            return state;
    }
}

export default AuthReducer