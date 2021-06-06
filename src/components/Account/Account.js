import React, { useState, useEffect } from 'react';
import './Account.css';
import { useAuth } from '../../contexts/AuthContext';
import Login from './Login';
import Info from './Info';
import firebase from '../../firebase';

export default function Account(props) {
    const { currentUser } = useAuth();
    const [user, setUser] = useState({}); 
    const [isLoggedIn] = useState(currentUser);
    
    useEffect(() => {
        if (currentUser) {
            let path = props.isTeacher ? 'Teachers' : 'Students';

            firebase.database().ref("Users/" + path)
            .orderByChild("email")
            .equalTo(currentUser.email)
            .once("value", snapshot => {
                if (!snapshot.exists()) {
                    console.log("No users found");
                } else {
                    let emialSubString = currentUser.email.substring(0, 8);
                    let user = snapshot.child(emialSubString).val();
                    setUser(user);
                }
            });
        }
    }, [currentUser, props.isTeacher]);

    if (isLoggedIn) {
        return <Info user={user} isTeacher={props.isTeacher}/>
    } else {
        return <Login />
    }
}