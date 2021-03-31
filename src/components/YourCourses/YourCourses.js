import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './YourCourses.css';
import * as ReactBootStrap from 'react-bootstrap';
import firebase from '../../firebase';

export default function YourCourses(props) {
    const [credits, setCredits] = useState(10);
    const [schedule, setSchedule] = useState([[{}]]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    const timeSlots = ["8:10", "9:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10","17:10", "18:30", "19:25", "20:25"];

    useEffect(() => {
        if (currentUser) {
            firebase.database().ref("Users/Students")
            .orderByChild("email")
            .equalTo(currentUser.email)
            .once("value", snapshot => {
                if (!snapshot.exists()) {
                    console.log("No users found");
                } else {
                    let emialSubString = currentUser.email.substring(0, 8);
                    let user = snapshot.child(emialSubString).val();
                    setSchedule(user.schedule);
                    setCredits(props.user.credits);
                    setLoading(false);
                }
            });
        } else {
            setError("⚠ Please login first.");
        }
    }, [currentUser, props.user.credits, props.user.schedule, schedule]);

    if (!currentUser) {
        return (
            <div className="loading">
                {error && <ReactBootStrap.Alert className="error-msg">{error}</ReactBootStrap.Alert>}
            </div>
        );
    }

    if (loading) {
        return (
            <div className="loading">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
         <div className="main">
            <h1 className="title">109-2 Time Table</h1>
            {error && <ReactBootStrap.Alert className="error-msg">{error}</ReactBootStrap.Alert>}
            <p className="credits-count">Credits: {credits}/25</p>
            <ReactBootStrap.Table striped bordered hover variant="dark" className="table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                </thead>
                {
                    <tbody className="schedule-body">
                        <tr>
                            <td>{timeSlots[0]}</td>
                            <td>
                                <h6>{schedule.mon[0].name}</h6>
                                <p className="classroom-txt">{schedule.mon[0].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.tue[0].name}</h6>
                                <p className="classroom-txt">{schedule.tue[0].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.wed[0].name}</h6>
                                <p className="classroom-txt">{schedule.wed[0].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.thu[0].name}</h6>
                                <p className="classroom-txt">{schedule.thu[0].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.fri[0].name}</h6>
                                <p className="classroom-txt">{schedule.fri[0].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sat[0].name}</h6>
                                <p className="classroom-txt">{schedule.sat[0].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sun[0].name}</h6>
                                <p className="classroom-txt">{schedule.sun[0].classroom}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{timeSlots[1]}</td>
                            <td>
                                <h6>{schedule.mon[1].name}</h6>
                                <p className="classroom-txt">{schedule.mon[1].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.tue[1].name}</h6>
                                <p className="classroom-txt">{schedule.tue[1].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.wed[1].name}</h6>
                                <p className="classroom-txt">{schedule.wed[1].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.thu[1].name}</h6>
                                <p className="classroom-txt">{schedule.thu[1].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.fri[1].name}</h6>
                                <p className="classroom-txt">{schedule.fri[1].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sat[1].name}</h6>
                                <p className="classroom-txt">{schedule.sat[1].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sun[1].name}</h6>
                                <p className="classroom-txt">{schedule.sun[1].classroom}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{timeSlots[2]}</td>
                            <td>
                                <h6>{schedule.mon[2].name}</h6>
                                <p className="classroom-txt">{schedule.mon[2].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.tue[2].name}</h6>
                                <p className="classroom-txt">{schedule.tue[2].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.wed[2].name}</h6>
                                <p className="classroom-txt">{schedule.wed[2].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.thu[2].name}</h6>
                                <p className="classroom-txt">{schedule.thu[2].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.fri[2].name}</h6>
                                <p className="classroom-txt">{schedule.fri[2].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sat[2].name}</h6>
                                <p className="classroom-txt">{schedule.sat[2].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sun[2].name}</h6>
                                <p className="classroom-txt">{schedule.sun[2].classroom}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{timeSlots[3]}</td>
                            <td>
                                <h6>{schedule.mon[3].name}</h6>
                                <p className="classroom-txt">{schedule.mon[3].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.tue[3].name}</h6>
                                <p className="classroom-txt">{schedule.tue[3].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.wed[3].name}</h6>
                                <p className="classroom-txt">{schedule.wed[3].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.thu[3].name}</h6>
                                <p className="classroom-txt">{schedule.thu[3].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.fri[3].name}</h6>
                                <p className="classroom-txt">{schedule.fri[3].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sat[3].name}</h6>
                                <p className="classroom-txt">{schedule.sat[3].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sun[3].name}</h6>
                                <p className="classroom-txt">{schedule.sun[3].classroom}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{timeSlots[4]}</td>
                            <td>
                                <h6>{schedule.mon[4].name}</h6>
                                <p className="classroom-txt">{schedule.mon[4].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.tue[4].name}</h6>
                                <p className="classroom-txt">{schedule.tue[4].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.wed[4].name}</h6>
                                <p className="classroom-txt">{schedule.wed[4].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.thu[4].name}</h6>
                                <p className="classroom-txt">{schedule.thu[4].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.fri[4].name}</h6>
                                <p className="classroom-txt">{schedule.fri[4].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sat[4].name}</h6>
                                <p className="classroom-txt">{schedule.sat[4].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sun[4].name}</h6>
                                <p className="classroom-txt">{schedule.sun[4].classroom}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{timeSlots[5]}</td>
                            <td>
                                <h6>{schedule.mon[5].name}</h6>
                                <p className="classroom-txt">{schedule.mon[5].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.tue[5].name}</h6>
                                <p className="classroom-txt">{schedule.tue[5].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.wed[5].name}</h6>
                                <p className="classroom-txt">{schedule.wed[5].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.thu[5].name}</h6>
                                <p className="classroom-txt">{schedule.thu[5].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.fri[5].name}</h6>
                                <p className="classroom-txt">{schedule.fri[5].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sat[5].name}</h6>
                                <p className="classroom-txt">{schedule.sat[5].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sun[5].name}</h6>
                                <p className="classroom-txt">{schedule.sun[5].classroom}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{timeSlots[6]}</td>
                            <td>
                                <h6>{schedule.mon[6].name}</h6>
                                <p className="classroom-txt">{schedule.mon[6].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.tue[6].name}</h6>
                                <p className="classroom-txt">{schedule.tue[6].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.wed[6].name}</h6>
                                <p className="classroom-txt">{schedule.wed[6].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.thu[6].name}</h6>
                                <p className="classroom-txt">{schedule.thu[6].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.fri[6].name}</h6>
                                <p className="classroom-txt">{schedule.fri[6].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sat[6].name}</h6>
                                <p className="classroom-txt">{schedule.sat[6].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sun[6].name}</h6>
                                <p className="classroom-txt">{schedule.sun[6].classroom}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{timeSlots[7]}</td>
                            <td>
                                <h6>{schedule.mon[7].name}</h6>
                                <p className="classroom-txt">{schedule.mon[7].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.tue[7].name}</h6>
                                <p className="classroom-txt">{schedule.tue[7].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.wed[7].name}</h6>
                                <p className="classroom-txt">{schedule.wed[7].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.thu[7].name}</h6>
                                <p className="classroom-txt">{schedule.thu[7].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.fri[7].name}</h6>
                                <p className="classroom-txt">{schedule.fri[7].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sat[7].name}</h6>
                                <p className="classroom-txt">{schedule.sat[7].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sun[7].name}</h6>
                                <p className="classroom-txt">{schedule.sun[7].classroom}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{timeSlots[8]}</td>
                            <td>
                                <h6>{schedule.mon[8].name}</h6>
                                <p className="classroom-txt">{schedule.mon[8].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.tue[8].name}</h6>
                                <p className="classroom-txt">{schedule.tue[8].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.wed[8].name}</h6>
                                <p className="classroom-txt">{schedule.wed[8].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.thu[8].name}</h6>
                                <p className="classroom-txt">{schedule.thu[8].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.fri[8].name}</h6>
                                <p className="classroom-txt">{schedule.fri[8].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sat[8].name}</h6>
                                <p className="classroom-txt">{schedule.sat[8].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sun[8].name}</h6>
                                <p className="classroom-txt">{schedule.sun[8].classroom}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{timeSlots[9]}</td>
                            <td>
                                <h6>{schedule.mon[9].name}</h6>
                                <p className="classroom-txt">{schedule.mon[9].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.tue[9].name}</h6>
                                <p className="classroom-txt">{schedule.tue[9].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.wed[9].name}</h6>
                                <p className="classroom-txt">{schedule.wed[9].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.thu[9].name}</h6>
                                <p className="classroom-txt">{schedule.thu[9].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.fri[9].name}</h6>
                                <p className="classroom-txt">{schedule.fri[9].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sat[9].name}</h6>
                                <p className="classroom-txt">{schedule.sat[9].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sun[9].name}</h6>
                                <p className="classroom-txt">{schedule.sun[9].classroom}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{timeSlots[10]}</td>
                            <td>
                                <h6>{schedule.mon[10].name}</h6>
                                <p className="classroom-txt">{schedule.mon[10].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.tue[10].name}</h6>
                                <p className="classroom-txt">{schedule.tue[10].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.wed[10].name}</h6>
                                <p className="classroom-txt">{schedule.wed[10].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.thu[10].name}</h6>
                                <p className="classroom-txt">{schedule.thu[10].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.fri[10].name}</h6>
                                <p className="classroom-txt">{schedule.fri[10].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sat[10].name}</h6>
                                <p className="classroom-txt">{schedule.sat[0].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sun[10].name}</h6>
                                <p className="classroom-txt">{schedule.sun[10].classroom}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{timeSlots[11]}</td>
                            <td>
                                <h6>{schedule.mon[11].name}</h6>
                                <p className="classroom-txt">{schedule.mon[11].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.tue[11].name}</h6>
                                <p className="classroom-txt">{schedule.tue[11].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.wed[11].name}</h6>
                                <p className="classroom-txt">{schedule.wed[11].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.thu[11].name}</h6>
                                <p className="classroom-txt">{schedule.thu[11].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.fri[11].name}</h6>
                                <p className="classroom-txt">{schedule.fri[11].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sat[11].name}</h6>
                                <p className="classroom-txt">{schedule.sat[11].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sun[11].name}</h6>
                                <p className="classroom-txt">{schedule.sun[11].classroom}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>{timeSlots[12]}</td>
                            <td>
                                <h6>{schedule.mon[12].name}</h6>
                                <p className="classroom-txt">{schedule.mon[12].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.tue[12].name}</h6>
                                <p className="classroom-txt">{schedule.tue[12].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.wed[12].name}</h6>
                                <p className="classroom-txt">{schedule.wed[12].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.thu[12].name}</h6>
                                <p className="classroom-txt">{schedule.thu[12].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.fri[12].name}</h6>
                                <p className="classroom-txt">{schedule.fri[12].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sat[12].name}</h6>
                                <p className="classroom-txt">{schedule.sat[12].classroom}</p>
                            </td>
                            <td>
                                <h6>{schedule.sun[12].name}</h6>
                                <p className="classroom-txt">{schedule.sun[12].classroom}</p>
                            </td>
                        </tr>
                    </tbody> 
                }
            </ReactBootStrap.Table>
        </div>
    )
}
