import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from '../../firebase';
import {NotificationManager} from 'react-notifications';

export class Course {
  constructor(name, id, date, start, end, credit, classroom, teacher, vacancy) {
    this.name = name;
    this.id = id;
    this.date = date;
    this.start = start;
    this.end = end;
    this.credit = credit;
    this.classroom = classroom;
    this.teacher = teacher;
    this.vacancy = vacancy;
  }
}

export default function NewCourse() {
    const [courseName, setCourseName] = useState(' ');
    const [courseId, setCourseId] = useState(' ');
    const [date, setDate] = useState('MON');
    const [startTime, setStartTime] = useState(810);
    const [endTime, setEndTime] = useState(900);
    const [credit, setCredit] = useState(0);
    const [classroom, setClassroom] = useState(' ');

    async function handleUpdate(e) {
        let newCourse = new Course(courseName, courseId, date, startTime, endTime, credit, classroom, "Test", 70);

        try {
            firebase.database().ref("Courses/").update({[courseId]: newCourse});
            createNotification('success', courseName);
            e.preventDefault();
        } catch {
            console.log("⚠ Failed to update!");
        }
    }

    const createNotification = (type, name) => {
        switch (type) {
            case 'info':
                return NotificationManager.info('Info.');
            case 'success':
                return NotificationManager.success(name + ' is added to course list.', 'Success');
            case 'warning':
                return NotificationManager.warning('Something went wrong', 'Close', 1000);
            case 'error':
                return NotificationManager.error('Error!', 'Dismiss!', 5000, () => {
                    alert('callback');
                });
            default:
        }
    };

    function handleDateChange(e) {
        setDate(e.target.value);
    }

    function handleStartTimeChange(e) {
        setStartTime(parseInt(e.target.value));
    }

    function handleEndTimeChange(e) {
        setEndTime(parseInt(e.target.value));
    }

    function handleCreditChange(e) {
        setCredit(parseInt(e.target.value));
    }

    return (
        <div className="edit-panel">
            <h2 className="info-title">Create New Course</h2>
            <Form onSubmit={handleUpdate} className="w-auto">
                <Form.Group controlId="courseName">
                    <Form.Label for="courseName">Course Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Course Name"
                        value={courseName}
                        onChange={(e) => {setCourseName(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="courseID">
                    <Form.Label for="courseID">Course Id</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Course Id"
                        value={courseId}
                        onChange={(e) => {setCourseId(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="date">
                    <Form.Label for="dateSelect">DATE</Form.Label>
                    <Form.Control as="select" onChange={handleDateChange.bind(this)}>
                        <option>MON</option>
                        <option>TUE</option>
                        <option>WED</option>
                        <option>THU</option>
                        <option>FRI</option>
                        <option>SAT</option>
                        <option>SUN</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="startTime">
                    <Form.Label for="startTimeSelect">Start time</Form.Label>
                    <Form.Control as="select" onChange={handleStartTimeChange.bind(this)}>
                        <option>810</option>
                        <option>910</option>
                        <option>1010</option>
                        <option>1110</option>
                        <option>1210</option>
                        <option>1310</option>
                        <option>1410</option>
                        <option>1510</option>
                        <option>1610</option>
                        <option>1710</option>
                        <option>1830</option>
                        <option>1925</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="endTime">
                    <Form.Label for="endTimeSelect">End time</Form.Label>
                    <Form.Control as="select" onChange={handleEndTimeChange.bind(this)}>
                        <option>900</option>
                        <option>1000</option>
                        <option>1100</option>
                        <option>1200</option>
                        <option>1300</option>
                        <option>1400</option>
                        <option>1500</option>
                        <option>1600</option>
                        <option>1700</option>
                        <option>1800</option>
                        <option>1920</option>
                        <option>2015</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="credit">
                    <Form.Label for="creditSelect">Credit</Form.Label>
                    <Form.Control as="select" onChange={handleCreditChange.bind(this)}>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="classroomEdit">
                    <Form.Label for="classroomEdit">Classroom</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={1}  
                        placeholder="Classroom"
                        value={classroom}
                        onChange={(e) => {setClassroom(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <div className="update-btn-container">
                    <Button className="update-btn btn-info text-center mt-2" varient="link" type="submit">Submit</Button>
                </div>
            </Form>
        </div>
    )
}
