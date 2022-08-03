import axios from 'axios';
import * as types from './actionType';

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users
});

const getUser = (user) => ({ type: types.GET_SINGLE_USERS, payload: user })

const userDeleted = () => ({ type: types.DELETE_USER })

const userAdded = (user) => ({ type: types.ADD_USER, payload: user })

const userEdited = (user) => ({ type: types.EDIT_USER, payload: user })

export const loadUsers = () => {
    return function(dispatch) {
        axios.get(`${process.env.REACT_APP_API}`).then(res => {
            dispatch(getUsers(res.data))
        }).catch((error) => console.log(error));
    }
}

export const getSingleUser = (id) => {
    return function(dispatch) {
        axios.get(`${process.env.REACT_APP_API}/${id}`).then(res => {
            dispatch(getUser(res.data))
        }).catch((error) => console.log(error));
    }
}

export const deleteUser = (id) => {
    return function(dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/delete/${id}`).then(res => {
            dispatch(userDeleted())
            dispatch(loadUsers())
        }).catch((error) => console.log(error));
    }
}

export const addUser = (user) => {
    return function(dispatch) {
        axios.post(`${process.env.REACT_APP_API}/add`, user).then(res => {
            dispatch(userAdded(user))
            dispatch(loadUsers())
        }).catch((error) => console.log(error));
    }
}

export const editUser = (id, user) => {
    return function(dispatch) {
        axios.put(`${process.env.REACT_APP_API}/update/${id}`, user).then(res => {
            dispatch(userEdited(user))
            dispatch(loadUsers())
        }).catch((error) => console.log(error));
    }
}