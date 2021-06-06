import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from '../../firebase';
import {NotificationManager} from 'react-notifications';

export class Announcement {
  constructor(date, message, author) {
    this.date = date;
    this.message = message;
    this.author = author;
  }
}

export default function MakeAnnouncement(props) {
    const [message, setMessage] = useState(' ');
    const [author, setAuthor] = useState(' ');

    useEffect(() => {
        setAuthor(props.user.name)
    }, [props.user.name])

    async function releaseAnnouncement(e) {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        const announcementRef = firebase.database().ref("Announcement/");

        try {
            let count = 0;
            announcementRef.on("value", (snapshot) => {
                count = snapshot.val().length;
            })

            let newAnnouncement = new Announcement(today, message, author);
            announcementRef.update({[count]: newAnnouncement});
            createNotification('success', ' ');
            setMessage("");
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
                return NotificationManager.success('Announcement has been made.', 'Success');
            case 'warning':
                return NotificationManager.warning('Something went wrong', 'Close', 1000);
            case 'error':
                return NotificationManager.error('Error!', 'Dismiss!', 5000, () => {
                    alert('callback');
                });
            default:
        }
    };
    
    return (
        <div className="edit-panel">
            <h2 className="info-title">Write a new message</h2>
            <Form onSubmit={releaseAnnouncement} className="w-auto">
                <Form.Group controlId="messageEdit">
                    <Form.Label for="messageEdit">Message</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3}  
                        placeholder="Say something nice...maybe?"
                        value={message}
                        onChange={(e) => {setMessage(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <p>By {author}</p>
                <div className="update-btn-container">
                    <Button className="update-btn btn-info text-center mt-2" varient="link" type="submit">Publish</Button>
                </div>
            </Form>
        </div>
    )
}
