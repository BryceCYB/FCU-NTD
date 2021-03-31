import React, { useState, useEffect } from 'react';
import './AllCourses.css';
import firebase from '../../firebase';

const CourseList = ({courseList, user}) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(courseList);
    }, [courseList])

    const handleUpdate = (course) => {
        let date = course.date.toLowerCase();
        let startTime = getStartTime(course.start);
        let endTime = getEndTime(course.end);
        let intStartTime = parseInt(startTime);
        let intEndTime = parseInt(endTime);

        for (let i = intStartTime; i < intEndTime; i++) {
            firebase.database().ref("Users/Students/" + user.id + "/schedule/" + date).update({[i]: course});
        }
        firebase.database().ref("Users/Students/" + user.id).update({credits: user.credits += course.credit});
        firebase.database().ref("Users/Students/" + user.id + "/enrolled").update({[course.id]: course.id});
        firebase.database().ref("Courses/" + course.id).update({vacancy: course.vacancy -= 1});
        removeCourse(course);
    }

    const removeCourse = (course) => {
        const index = courses.indexOf(course);
        if (index > -1) {
            setCourses(courseList.splice(index, 1));
        }
    }
    
    return (
        <>
            { courses.map((course, index) => {
                if (course) {
                    return (
                        <tr className="courses-row" key={index}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course.teacher}</td>
                            <td>{course.date}</td>
                            <td>{course.start}</td>
                            <td>{course.end}</td>
                            <td>{course.classroom}</td>
                            <td>{course.vacancy}/70</td>
                            <td>{course.credit}</td>
                            <td><button className="add-btn" onClick={() => handleUpdate(course)} >ADD</button></td>
                        </tr>
                    )	
                }
                return null
            })}
        </>
    );
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

export default CourseList
