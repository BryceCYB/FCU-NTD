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
    }, [currentUser, props.user.credits]);

    const handleDrop = (btnId) => {
        let targetDate = btnId.substring(0, 3);
        let targetTime = btnId.charAt(3);
        let courseCredit;
        let courseId;
        
        switch (targetDate) {
            case "mon":
                courseId = schedule.mon[targetTime].id;
                courseCredit = schedule.mon[targetTime].credit;
                break;
            case "tue":
                courseId = schedule.tue[targetTime].id;
                courseCredit = schedule.tue[targetTime].credit;
                break;
            case "wed":
                courseId = schedule.wed[targetTime].id;
                courseCredit = schedule.wed[targetTime].credit;
                break;
            case "thu":
                courseId = schedule.thu[targetTime].id;
                courseCredit = schedule.thu[targetTime].credit;
                break;
            case "fri":
                courseId = schedule.fri[targetTime].id;
                courseCredit = schedule.fri[targetTime].credit;
                break;
            case "sat":
                courseId = schedule.sat[targetTime].id;
                courseCredit = schedule.sat[targetTime].credit;
                break;
            case "sun":
                courseId = schedule.sun[targetTime].id;
                courseCredit = schedule.sun[targetTime].credit;
                break;
            default:
                // courseId = "0000";
                courseCredit = 2;
        }

        let courseList = props.courses;
        let targetCourse = courseList.find(course => course.id === courseId);
        let emptyCourse = courseList.find(course => course.id === "0000");

        // Clear cell with empty class
        let startTime = getStartTime(targetCourse.start);
        let endTime = getEndTime(targetCourse.end);
        let intStartTime = parseInt(startTime);
        let intEndTime = parseInt(endTime);

        for (let i = intStartTime; i < intEndTime; i++) {
            firebase.database().ref("Users/Students/" + props.user.id + "/schedule/" + targetDate).update({[i]: emptyCourse});
        }

        firebase.database().ref("Users/Students/" + props.user.id).update({credits: props.user.credits -= courseCredit});
        firebase.database().ref("Courses/" + targetCourse.id).update({vacancy: targetCourse.vacancy += 1});
    }

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

    function renderTableCell(index) {
        return (
            <tr>
                <td>{timeSlots[index]}</td>
                <td>
                    <h6>
                        {schedule.mon[index].name === '-' ? ' ' : schedule.mon[index].name}
                    </h6>
                    <p className="classroom-txt">
                        {schedule.mon[index].classroom === '-' ? ' ' : schedule.mon[index].classroom}
                    </p>
                    {schedule.mon[index].name === '-' ? ' ' : <button className="drop-btn" id = {"mon" + index} onClick={e => handleDrop(e.target.id)}>X</button>}
                </td>
                <td>
                    <h6>
                        {schedule.tue[index].name === '-' ? ' ' : schedule.tue[index].name}
                        
                    </h6>
                    <p className="classroom-txt">
                        {schedule.tue[index].classroom === '-' ? ' ' : schedule.tue[index].classroom}
                    </p>
                    {schedule.tue[index].name === '-' ? ' ' : <button className="drop-btn" id = {"tue" + index} onClick={e => handleDrop(e.target.id)}>X</button>}
                </td>
                <td>
                    <h6>
                        {schedule.wed[index].name === '-' ? ' ' : schedule.wed[index].name}
                    </h6>
                    <p className="classroom-txt">
                        {schedule.wed[index].classroom === '-' ? ' ' : schedule.wed[index].classroom}
                    </p>
                    {schedule.wed[index].name === '-' ? ' ' : <button className="drop-btn" id = {"wed" + index} onClick={e => handleDrop(e.target.id)}>X</button>}
                </td>
                <td>
                    <h6>
                        {schedule.thu[index].name === '-' ? ' ' : schedule.thu[index].name}
                    </h6>
                    <p className="classroom-txt">
                        {schedule.thu[index].classroom === '-' ? ' ' : schedule.thu[index].classroom}
                    </p>
                    {schedule.thu[index].name === '-' ? ' ' : <button className="drop-btn" id = {"thu" + index} onClick={e => handleDrop(e.target.id)}>X</button>}
                </td>
                <td>
                    <h6>
                        {schedule.fri[index].name === '-' ? ' ' : schedule.fri[index].name}
                    </h6>
                    <p className="classroom-txt">
                        {schedule.fri[index].classroom === '-' ? ' ' : schedule.fri[index].classroom}
                    </p>
                    {schedule.fri[index].name === '-' ? ' ' : <button className="drop-btn" id = {"fri" + index} onClick={e => handleDrop(e.target.id)}>X</button>}
                </td>
                <td>
                    <h6>
                        {schedule.sat[index].name === '-' ? ' ' : schedule.sat[index].name}
                    </h6>
                    <p className="classroom-txt">
                        {schedule.sat[index].classroom === '-' ? ' ' : schedule.sat[index].classroom}
                    </p>
                    {schedule.sat[index].name === '-' ? ' ' : <button className="drop-btn" id = {"sat" + index} onClick={e => handleDrop(e.target.id)}>X</button>}
                </td>
                <td>
                    <h6>
                        {schedule.sun[index].name === '-' ? ' ' : schedule.sun[index].name}
                    </h6>
                    <p className="classroom-txt">
                        {schedule.sun[index].classroom === '-' ? ' ' : schedule.sun[index].classroom}
                    </p>
                    {schedule.sun[index].name === '-' ? ' ' : <button className="drop-btn" id = {"sun" + index} onClick={e => handleDrop(e.target.id)}>X</button>}
                </td>
            </tr>
        )
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
                <tbody className="schedule-body">
                    {renderTableCell(0)}
                    {renderTableCell(1)}
                    {renderTableCell(2)}
                    {renderTableCell(3)}
                    {renderTableCell(4)}
                    {renderTableCell(5)}
                    {renderTableCell(6)}
                    {renderTableCell(7)}
                    {renderTableCell(8)}
                    {renderTableCell(9)}
                    {renderTableCell(10)}
                    {renderTableCell(11)}
                    {renderTableCell(12)}
                </tbody> 
            </ReactBootStrap.Table>
        </div>
    )
}

function getStartTime(startTime) {
    switch(startTime) {
            case 810:
                return "0";
            case 910:
                return "1";
            case 1010:
                return "2";
            case 1110:
                return "3";
            case 1210:
                return "4";
            case 1310:
                return "5";
            case 1410:
                return "6";
            case 1510:
                return "7";
            case 1610:
                return "8";
            case 1710:
                return "9";
            case 1830:
                return "10";
            case 1925:
                return "11";
            default:
                return "12";
        }
}

function getEndTime(endTime) {
    switch(endTime) {
            case 900:
                return "1";
            case 1000:
                return "2";
            case 1100:
                return "3";
            case 1200:
                return "4";
            case 1300:
                return "5";
            case 1400:
                return "6";
            case 1500:
                return "7";
            case 1600:
                return "8";
            case 1700:
                return "9";
            case 1800:
                return "10";
            case 1920:
                return "11";
            case 2015:
                return "12";
            default:
                return "13";
        }
}
