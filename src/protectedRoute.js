import React, { Component } from 'react';
import {Route , Navigate} from 'react-router-dom';

const ProtectedRoute=({isLoggedIn,component:Component,...rest})=>{
    return (
        <Route {...rest} render={(props)=>{
            if(isLoggedIn) return <Component {...props} />
            if(!isLoggedIn) return <Navigate to={{path:'/',state:{from:props.location}}} />
        }} />
    )
}
export default ProtectedRoute;