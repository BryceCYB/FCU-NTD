import React, { useState, useEffect } from 'react';
import './Account.css';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import firebase from '../../firebase';

export default function EditInfo(props) {
    const [userName, setUserName] = useState();
    const [userAge, setUserAge] = useState();
    const [userMobile, setUserMobile] = useState();
    const [userAddress, setUserAddress] = useState();
    const [userBio, setUserBio] = useState();
    const [userAvatar, setUserAvatar] = useState();
    const history = useHistory();

    useEffect(() => {
        setUserName(props.user.name);
        setUserAge(props.user.age);
        setUserMobile(props.user.mobile);
        setUserAddress(props.user.address);
        setUserBio(props.user.bio);
    }, [props.user]);

    async function handleUpdate(e) {
        try {
            let userType = props.isTeacher ? "Users/Teachers/" : "Users/Students/";

            firebase.database().ref(userType + props.user.id).update({name: userName});
            firebase.database().ref(userType + props.user.id).update({age: userAge});
            firebase.database().ref(userType + props.user.id).update({mobile: userMobile});
            firebase.database().ref(userType + props.user.id).update({address: userAddress});
            firebase.database().ref(userType + props.user.id).update({bio: userBio});
            if (userAvatar) {
                e.preventDefault();
                handleUpload();
            } 
        } catch {
            console.log("⚠ Failed to update!");
        }
    }
    
    const handleFileSelected = (e) => {
        const file = e.target.files[0];
        setUserAvatar(file);
    }

    const handleUpload = () => {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(userAvatar.name);

        fileRef.put(userAvatar).then(() => {
            fileRef.getDownloadURL().then((url) => {
                console.log(url);
                firebase.database().ref("Users/Students/" + props.user.id).update({avatar: url});
            })
        }).then(() => {
            props.onInfoChange();
            history.push("/fcu/");
        })
    }

    function handleAgeChange(e) {
        setUserAge(e.target.value);
    }

    return (
        <div className="edit-panel">
            <h2 className="info-title">Edit Info</h2>
            <Form onSubmit={handleUpdate} className="w-auto">
                <Form.Group controlId="name">
                    <Form.Label for="name">Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Your Name"
                        value={userName}
                        onChange={(e) => {setUserName(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="ageSelect">
                    <Form.Label for="ageSelect">Age</Form.Label>
                    <Form.Control as="select" onChange={handleAgeChange.bind(this)}>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                        <option>25</option>
                        <option>26</option>
                        <option>27</option>
                        <option>28</option>
                        <option>29</option>
                        <option>30+</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="mobile">
                    <Form.Label for="mobile">Mobile</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Your mobile number"
                        value={userMobile}
                        onChange={(e) => {setUserMobile(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label for="address">Address</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Your main address"
                        value={userAddress}
                        onChange={(e) => {setUserAddress(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="bioEdit">
                    <Form.Label for="bioEdit">Bio</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={4}  
                        placeholder="Say something about yourself."
                        value={userBio}
                        onChange={(e) => {setUserBio(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="uploadPhoto">
                    <Form.File id="uploadPhoto" accept=".png, .jpg" label="Upload new avatar (png, jpg)" onChange={handleFileSelected}/>
                </Form.Group>
                <div className="update-btn-container">
                    <Button className="update-btn btn-info text-center mt-2" varient="link" type="submit">Update</Button>
                </div>
            </Form>
        </div>
    )
}
