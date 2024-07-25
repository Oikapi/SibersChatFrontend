import React, { Component } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/reduxTs';
import Cookies from 'js-cookie';
import { setToken } from '../store/AuthSlice';

type RequireAuthProps = {
    children: React.ReactNode,

}


function RequireAuth({ children }: RequireAuthProps) {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const dispatch = useAppDispatch();
    // console.log(!token)
    const location = useLocation();
    const navigate = useNavigate();
    if (Cookies.get("authToken")) {
        dispatch(setToken(true));
    }

    if (!Cookies.get("authToken")) {
        return (<Navigate to="login" />)
    }

    return children;
}

export default RequireAuth