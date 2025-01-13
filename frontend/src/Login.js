import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setMessage(''); // Clear previous messages

        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                username: username,
                password: password,
            });

            if (response.status === 200) {
                // Assuming your backend sends a success message and user_id
                setMessage('Login successful!');
                localStorage.setItem('user_id', response.data.user_id); // Save user_id locally
            }
        } catch (error) {
            // Handle errors
            if (error.response && error.response.status === 401) {
                setError('Invalid username or password');
            } else if (error.response && error.response.status === 404) {
                setError('User not found');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div style={{ margin: '50px' }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>Login</button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
        </div>
    );
}

export default Login;