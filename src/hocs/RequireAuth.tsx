import React, { Component } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxTs';
import Cookies from 'js-cookie';

type RequireAuthProps = {
    children: React.ReactNode,

}


function RequireAuth({ children }: RequireAuthProps) {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    // console.log(!token)
    const location = useLocation();
    const navigate = useNavigate();

    console.log(!Cookies.get("authToken"))
    if (!Cookies.get("authToken")) {
        return (<Navigate to="login" />)
    }

    return children;
}

export default RequireAuth