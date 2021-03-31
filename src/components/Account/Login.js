import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Account.css';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    let history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            // window.location.reload();
            history.push("/fcu/allcourses");
        } catch {
            setError("⚠ Failed to login!");
        }
        setLoading(false);
    }

    return (
        <div className="login-panel">
            <Card className="bg-transparent border-0">
                <Card.Body>
                    <h2 className="text-center mb-4">NTD Login</h2>
                    {error && <Alert className="error-msg">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 text-center mt-2" type="submit">
                            Login
                        </Button>
                        <div className="forgot-btn">
                            <Link className="forgot-link" to="reset-password">Forgot password?</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}