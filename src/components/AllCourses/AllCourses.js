import React, { useState, useEffect } from 'react';
import './AllCourses.css';
import SearchBar from '../SearchBar/SearchBar';
import CourseList from './CourseList';
import { useAuth } from '../../contexts/AuthContext';
import * as ReactBootStrap from 'react-bootstrap';

export default function AllCourses(props) {
    const [input, setInput] = useState('');
    const [courseListDefault, setCourseListDefault] = useState([]);
    const [courseList, setCourseList] = useState(props.courses);
    const [error, setError] = useState("");
    const { currentUser } = useAuth();

    let user = props.user;

    const updateInput = (input) => {
        const filtered = courseListDefault.filter(course => {
            if (isNaN(input)) {
                return course.name.toLowerCase().includes(input.toLowerCase()) || course.date.includes(input.toUpperCase()) || course.teacher.includes(input.toLowerCase());
            }
            return course.id.includes(input);
        })
        setInput(input);
        setCourseList(filtered);
    }

    useEffect(() => {
        if (currentUser) {
            setError("");
            setCourseList(props.courses);
            setCourseListDefault(props.courses);
        } else {
            setError("⚠ Please login first.");
        }
    }, [currentUser, props.courses]);

    return (
        <div className="main">
            <SearchBar 
                keyword={input} 
                setKeyword={updateInput}
            />
            <ReactBootStrap.Table striped bordered hover variant="dark" className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Course Name</th>
                        <th>Teacher</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Classroom</th>
                        <th>Vacancy</th>
                        <th>Credit</th>
                    </tr>
                </thead>
                <tbody>
                    <CourseList courseList={courseList} user={user} isTeacher={props.isTeacher}/>
                </tbody>
            </ReactBootStrap.Table>
            {error && <ReactBootStrap.Alert className="error-msg">{error}</ReactBootStrap.Alert>}
        </div>
    )
}
