import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Account.css';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

export default function ResetPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            setError("");
            setMessage("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Please check your inbox.");
        } catch {
            setError("⚠ User not found!");
        }
        setLoading(false);
    }

    return (
        <div className="reset-panel">
            <Card className="bg-transparent border-0">
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    {error && <Alert className="error-msg">{error}</Alert>}
                    {message && <Alert className="success-msg">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <p>Don't worry, happens to the best of us.</p>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 text-center mt-2" type="submit">
                            Reset
                        </Button>
                        <div className="forgot-btn">
                            <Link className="forgot-link" to="account">Back to login</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}