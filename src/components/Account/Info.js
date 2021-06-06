import React, { useState, useEffect } from 'react';
import './Account.css';
import { Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from "react-router-dom";

export default function Info(props) {
    const { logout } = useAuth();
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const history = useHistory();

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);
    
    async function handleLogout() {
        setError("");

        try {
            await logout();
            history.push("/fcu/");
        } catch {
            setError("Failed to logout!");
        }
    }

    function handleEdit() {
        history.push("/fcu/edit-info");
    }

    return (
        <div className="info-panel">
            <h2 className="info-title">{props.isTeacher ? 'Teacher Info' : 'Student Info'}</h2>
            {error && <Alert className="error-msg">{error}</Alert>}
            <div className="details">
                <div className="avatar-container">
                    <img className="avatar" src={user.avatar} alt=" "/>
                </div>
                <h5 className="info-row">Name: {user.name}</h5>
                <h5 className="info-row">{props.isTeacher ? 'Staff Id' : 'Student Info'}: {user.id}</h5>
                <h5 className="info-row">Age: {user.age}</h5>
                <h5 className="info-row">Department: {user.department}</h5>
                <h5 className="info-row">Email: {user.email}</h5>
                <h5 className="info-row">Mobile: {user.mobile}</h5>
                <h5 className="info-row">Address: {user.address}</h5>
                <h5 className="info-row">Bio: {user.bio}</h5>
            </div>
            <Button className="logout-btn btn-info mt-4" varient="link" onClick={handleEdit}>Edit info</Button>
            <Button className="logout-btn btn-warning" varient="link" onClick={handleLogout}>Logout</Button>
        </div>
    )
}