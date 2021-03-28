import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './YourCourses.css';
import TimeTable from './TimeTable';
import firebase from '../../firebase';
import * as ReactBootStrap from 'react-bootstrap';

export default function YourCourses(props) {
    const [schedule, setSchedule] = useState();
    const [courses, setCourses] = useState([]);
    const { currentUser } = useAuth();

    const timeSlots = ["8:10", "9:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10","17:10", "18:30", "19:25", "20:25"];
    let data = [[], [], [], [], [], [], []];

    useEffect(() => {
        if (currentUser) {
            setSchedule(props.user.schedule);
            if (schedule) {
                fetchCourses(data[0], schedule.mon);
                fetchCourses(data[1], schedule.tue);
                fetchCourses(data[2], schedule.wed);
                fetchCourses(data[3], schedule.thu);
                fetchCourses(data[4], schedule.fri);
                fetchCourses(data[5], schedule.sat);
                fetchCourses(data[6], schedule.sun);
                setCourses(data);
            }
        }
    }, [currentUser, props.user, schedule]);

    console.log(courses);

    const fetchCourses = (dateArray, courseId) => {
        if (schedule) {
            for (let i = 0; i < 13; i++) {
                let courseRef = firebase.database().ref("Courses/" + courseId[i]);
                courseRef.on("value", function(snapshot) {
                    if (!snapshot.exists()) {
                        console.log("No such course");
                    }
                    dateArray[i] = snapshot.val();
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            }
        }
    }

    return (
         <div className="main">
            <h1 className="title">109-2 Time Table</h1>
            {/* <TimeTable data={courses} /> */}
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
                        <th>Su nday</th>
                    </tr>
                </thead>
                {
                    courses &&
                    <tbody>
                        {/* {timeSlots.map((row) => 
                        <tr>
                            <td>{row}</td>
                        </tr>)} */}
                        {courses && courses.map((row) => (
                            <tr>
                            </tr> 
                        ))}
                    </tbody> 
                }
            </ReactBootStrap.Table>
            <p className="credits-count">Credits: 0/25</p>
        </div>
    )
}