import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './MainPanel.css';
import HamburgerMenu from '../NavMenu/HamburgerMenu';
import About from '../About/About'
import AllCourses from '../AllCourses/AllCourses';
import YourCourses from '../YourCourses/YourCourses';
import Account from '../Account/Account';
import ResetPassword from '../Account/ResetPassword';
import EditInfo from '../Account/EditInfo';
import NewCourse from '../NewCourse/NewCourse';
import MakeAnnouncement from '../MakeAnnouncement/MakeAnnouncement';
import Term from '../Term/Term';
import accountIcon from '../../images/account_icon.png';
import { useAuth } from '../../contexts/AuthContext';
import firebase from '../../firebase';
import { TweenLite, Power3, gsap } from 'gsap'; 
import { CSSPlugin } from 'gsap/CSSPlugin'
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const MainPanel =(() => {
    const { currentUser } = useAuth();
    const [user, setUser] = useState({});  
    const [isTeacher, setIsTeacher] = useState(); 
    const [courseList, setCourseList] = useState([]); 
    const [defaultCourseList, setDefaultCourseList] = useState([]); 

    // For animations
    let mainRef = useRef(null);
    
    useEffect(() => {
        gsap.registerPlugin(CSSPlugin);
        TweenLite.to(mainRef, 3.2, { opacity: 1, ease: Power3.easeOut, delay: .1});
        
        if (currentUser) {
            if (currentUser.email.charAt(0) === 't') {
                setIsTeacher(true);

                firebase.database().ref("Users/Teachers")
                .orderByChild("email")
                .equalTo(currentUser.email)
                .once("value", snapshot => {
                    if (!snapshot.exists()) {
                        console.log("No users found");
                    } else {
                        let emialSubString = currentUser.email.substring(0, 8);
                        let user = snapshot.child(emialSubString).val();
                        setUser(user);
                    }
                });

            } else {
                setIsTeacher(false);

                firebase.database().ref("Users/Students")
                .orderByChild("email")
                .equalTo(currentUser.email)
                .once("value", snapshot => {
                    if (!snapshot.exists()) {
                        console.log("No users found");
                    } else {
                        let emialSubString = currentUser.email.substring(0, 8);
                        let user = snapshot.child(emialSubString).val();
                        setUser(user);

                        const coursesRef = firebase.database().ref("Courses");
                        coursesRef.on("value", (snapshot) => {
                            const courses = snapshot.val();
                            const list = [];
                            const defaultList = [];
                            const enrolledRef = firebase.database().ref("Users/Students/" + user.id + "/enrolled");

                            enrolledRef.on("value", (snapshot) => {
                                const enrolledList = snapshot.val();
                                for (let id in courses) {
                                    if (enrolledList[id] !== id) {
                                        list.push(courses[id]);
                                    }
                                    defaultList.push(courses[id]);
                                }
                                setCourseList(list); 
                                setDefaultCourseList(defaultList);
                            })
                        })
                    }
                });
            }
        }
    }, [currentUser]);

    return (
        <Router>
            <Switch>
                <div className="main-panel" ref={ele => {mainRef = ele}}>
                    <Link className="account-btn" to="/fcu/account">
                        <img className="account-img" src={currentUser ? user.avatar :accountIcon} alt="Account" />
                        <p className="user-name">{currentUser ? user.name : "Login"}</p>
                    </Link>
                    <HamburgerMenu isTeacher={isTeacher}/>
                    <NotificationContainer />
                    
                    <Route path="/fcu/" exact component={About} />
                    <Route
                        path="/fcu/allcourses"
                        render={(props) => (<AllCourses {...props} user={user} courses={courseList} />)}
                    />
                    <Route
                        path="/fcu/yourcourses"
                        render={(props) => (<YourCourses {...props} user={user} courses={defaultCourseList} />)}
                    />
                    <Route
                        path="/fcu/account"
                        render={(props) => (<Account {...props} user={user} isTeacher={isTeacher} />)}
                    />
                    <Route
                        path="/fcu/newcourse"
                        render={(props) => (<NewCourse {...props} user={user} />)}
                    />
                    <Route
                        path="/fcu/make-announcement"
                        render={(props) => (<MakeAnnouncement {...props} user={user} />)}
                    />
                    <Route
                        path="/fcu/edit-info"
                        render={(props) => (<EditInfo {...props} user={user} />)}
                    />
                    <Route path="/fcu/term" component={Term} />
                    <Route path="/fcu/reset-password" component={ResetPassword} />
                </div>
            </Switch>
        </Router>
    );
})

export default MainPanel;
