import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginAPI } from '../../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginAPI({ email, password });
            login(res.data.token, res.data.user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f8fafc" }}>
            <div className="bg-white p-5 rounded shadow-sm" style={{ width: "400px", border: "1px solid #dbeafe" }}>
                <h3 className="fw-bold text-center text-primary mb-1">Welcome Back</h3>
                <p className="text-center text-muted mb-4">Please log in to your account</p>

                {error && <div className="alert alert-danger p-2">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="fw-semibold mb-1">Email Address</label>
                        <input type="email" required className="form-control" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="fw-semibold mb-1">Password</label>
                        <input type="password" required className="form-control" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mb-3">Login</button>
                    
                    <div className="text-center">
                        <span className="text-muted">Don't have an account? </span>
                        <Link to="/signup" className="text-decoration-none fw-bold">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
