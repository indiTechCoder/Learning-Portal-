
import {
  VALIDATE_EMAIL, VALIDATE_EMAIL_SUCCESS, VALIDATE_EMAIL_FAILURE,
  ME_FROM_TOKEN, ME_FROM_TOKEN_SUCCESS, ME_FROM_TOKEN_FAILURE, RESET_TOKEN,
  SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE, RESET_USER,
  SIGNIN_USER, SIGNIN_USER_SUCCESS,  SIGNIN_USER_FAILURE,GET_USERS,GET_USERS_SUCCESS,GET_USERS_FAILURE,
  LOGOUT_USER, UPDATE_USER_EMAIL ,SOCIAL_SIGNIN_USER ,SIGNIN_USER_ADMIN,SIGNIN_USER_ADMIN_FAILURE,SIGNIN_USER_ADMIN_SUCCESS,
  UPDATE_USER_PROFILE,UPDATE_USER_PROFILE_SUCCESS,UPDATE_USER_PROFILE_FAILURE
  
} from '../actions/users';



const INITIAL_STATE = {user: null, status:null, error:null, loading: false, userList : [], admin : false , userprojects : null};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

    case VALIDATE_EMAIL://check email verification token
    return { ...state, user: null, status:'validate_email', error:null, loading: true};
    case VALIDATE_EMAIL_SUCCESS:
    return { ...state, user: action.payload.data.user,userList: [], status:'authenticated', error:null, loading: false}; //<-- authenticated & email verified
    case VALIDATE_EMAIL_FAILURE:
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors       
    return { ...state, user:null, status:'validate_email', error:error, loading: false}; //<-- authenticated

    case ME_FROM_TOKEN:// loading currentUser("me") from jwttoken in local/session storage storage,
    return { ...state, user: null, status:'storage', error:null, loading: true}; 
    case ME_FROM_TOKEN_SUCCESS://return user, status = authenticated and make loading = false
    return { ...state, user: action.payload.data.user, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case ME_FROM_TOKEN_FAILURE:// return error and make loading = false
     error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors   
     return { ...state, user: null, status:'storage', error:error, loading: false};
    case RESET_TOKEN:// remove token from storage make loading = false
    return { ...state, user: null, status:'storage', error:null, loading: false};

    case SIGNUP_USER:// sign up user, set loading = true and status = signup
    return { ...state, user: null, status:'signup', error:null, loading: true}; 
    case SIGNUP_USER_SUCCESS://return user, status = authenticated and make loading = false
    return { ...state, user: action.payload.data.user, status:'signupsuccess', error:null, loading: false}; //<-- authenticated
    case SIGNUP_USER_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors      
    return { ...state, user: null, status:'signupfailure', error:error, loading: false};


    case GET_USERS:// sign in user,  set loading = true and status = signin
    return { ...state, userList: null, status:'authenticated', error:null, loading: true}; 
    case GET_USERS_SUCCESS://return authenticated user,  make loading = false and status = authenticated
    return { ...state, userList: action.payload.data.users, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case GET_USERS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors      
    return { ...state, userList : null, status:'authenticated', error:error, loading: false};

    case SIGNIN_USER:// sign in user,  set loading = true and status = signin
    return { ...state, user: null, status:'signin', error:null, loading: true}; 
     case SIGNIN_USER_SUCCESS://return authenticated user,  make loading = false and status = authenticated
    return { ...state, user: action.payload.data.user, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case SIGNIN_USER_ADMIN_SUCCESS://return authenticated user,  make loading = false and status = authenticated
    return { ...state, user: action.payload.data.user, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case SIGNIN_USER_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors      
    return { ...state, user: null, status:'signin', error:error, loading: false};

    case UPDATE_USER_PROFILE:// sign in user,  set loading = true and status = signin
    return { ...state, user: null, status:'update', error:null, loading: true}; 
    case UPDATE_USER_PROFILE_SUCCESS://return authenticated user,  make loading = false and status = authenticated
    return { ...state, user: action.payload.data.user, status:'updated', error:null, loading: false};
    case UPDATE_USER_PROFILE_FAILURE://return authenticated user,  make loading = false and status = authenticated
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors      
    return { ...state, user: null, status:'updated', error:error, loading: false};
    
  

    case UPDATE_USER_EMAIL:
    return{...state, user:{...state.user, email:action.payload.email}};
    case LOGOUT_USER:
    return {...state, user:null, status:'logout', error:null, loading: false};

    case RESET_USER:// reset authenticated user to initial state
    return { ...state, user: null, status:null, error:null, loading: false};
    
    default:
    return state;
}
}
