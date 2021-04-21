import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './MainPanel.css';
import HamburgerMenu from '../NavMenu/HamburgerMenu';
import About from '../About/About'
import AllCourses from '../AllCourses/AllCourses';
import YourCourses from '../YourCourses/YourCourses';
import Account from '../Account/Account';
import ResetPassword from '../Account/ResetPassword';
import EditInfo from '../Account/EditInfo';
import Term from '../Term/Term';
import accountIcon from '../../images/account_icon.png';
import { useAuth } from '../../contexts/AuthContext';
import firebase from '../../firebase';

const MainPanel =(() => {
    const { currentUser } = useAuth();
    const [user, setUser] = useState({});   
    const [courseList, setCourseList] = useState([]); 
    
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
                    setUser(user);

                    const coursesRef = firebase.database().ref("Courses");
                    coursesRef.on("value", (snapshot) => {
                        const courses = snapshot.val();
                        const courseList = [];
                        for (let id in courses) {
                            courseList.push(courses[id]);
                        }
                        setCourseList(courseList);
                    })
                }
            });
        }
    }, [currentUser]);

    return (
        <Router>
            <Switch>
                <div className="main-panel">
                    <Link className="account-btn" to="/fcu/account">
                        <img className="account-img" src={currentUser ? user.avatar :accountIcon} alt="Account" />
                        <p className="user-name">{currentUser ? user.name : "Login"}</p>
                    </Link>
                    <HamburgerMenu/>
                    
                    <Route path="/fcu/" exact component={About} />
                    <Route
                        path="/fcu/allcourses"
                        render={(props) => (<AllCourses {...props} user={user} courses={courseList} />)}
                    />
                    <Route
                        path="/fcu/yourcourses"
                        render={(props) => (<YourCourses {...props} user={user} courses={courseList} />)}
                    />
                    <Route
                        path="/fcu/account"
                        render={(props) => (<Account {...props} user={user} />)}
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
