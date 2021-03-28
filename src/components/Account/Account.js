import React, { useState } from 'react';
import './Account.css';
import { useAuth } from '../../contexts/AuthContext';
import Login from './Login';
import Info from './Info';

export default function Account(props) {
    const { currentUser } = useAuth();
    const [isLoggedIn] = useState(currentUser);
    let user = props.user;

    if (isLoggedIn) {
        return <Info user={user}/>
    } else {
        return <Login />
    }
}