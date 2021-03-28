import React from 'react';
import './About.css'

export default function About() {
    return (
        <div className="about">
            <h1>FCU course registration system</h1>
            <h3 className="red-text">2021 Spring Semester: Payment made for course(s) dropped on or after March 5 will not be refunded (adding a course to replace the dropped course(s) is not allowed).</h3>
            <br/>
            <br/>
            <h4> 1.Posting of course selection information:</h4>
            <p>(1)Date: Beginning on 2020/12/17, After 09:00</p>
            <p>Instructions: MyFCU Information System (https://myfcu.fcu.edu.tw) → NID Login → Courses → Course Selection Information → My Schedule Inquiry.</p>
            <br/>
            <br/>
            <h4>2.Posting of course selection (2020/12/22~2020/12/29) results</h4>
            <p>(1)Date: 2021/1/28, After 09:00 </p>
            <p>(2)Instructions: MyFCU Information System (https://myfcu.fcu.edu.tw) → NID Login → Courses → Course Selection Information → My Schedule Inquiry.</p>
        </div>
    )
}
