import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';

export default function TimeTable({ courses }) {
    const timeSlots = ["8:10", "9:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10","17:10", "18:30", "19:25", "20:25"];
    // const columns = courses[0] && Object.keys(courses[0]);
    console.log(courses);
    return (
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
            <tbody>
                {/* {timeSlots.map((row) => 
                <tr>
                    <td>{row}</td>
                </tr>)} */}
                {courses && courses.map((row) => (
                   <tr>
                       <td>{row[0].name}</td>
                   </tr> 
                ))}
            </tbody> 
        </ReactBootStrap.Table>
        
    );
}
