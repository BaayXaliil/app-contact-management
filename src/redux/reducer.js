import * as types from './actionType'
const initialState = {
    users: [],
    user: {},
    loading: true
}

const userReducers = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_USERS:
            let users = action.payload.map(obj => {
                var rObj = {};
                rObj["key"] = obj._id;
                rObj["name"] = obj.name;
                rObj["email"] = obj.email;
                rObj["contact"] = obj.contact;
                rObj["address"] = obj.address;
                return rObj;
            });
            return { ...state, users, loading: false } ;
        case types.DELETE_USER:
            return {...state, loading: false};
        case types.ADD_USER:
                return {user: action.payload, loading: false};
        case types.EDIT_USER:
            return {user: action.payload, loading: false};
        case types.GET_SINGLE_USERS:
            return {...state, user: action.payload, loading: false}
        default: 
        return state;
    }
} 

export default userReducers;