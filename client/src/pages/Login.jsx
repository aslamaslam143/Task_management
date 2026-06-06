import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser({ email, password });
            toast.success('Logged in successfully');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-panel">
                <h2>Welcome Back</h2>
                <p>Sign in to manage your tasks</p>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <FiMail style={{ position: 'absolute', top: '12px', left: '12px', color: '#94a3b8' }} />
                            <input 
                                type="email" 
                                placeholder="name@example.com" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                style={{ paddingLeft: '2.5rem' }}
                                required 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <FiLock style={{ position: 'absolute', top: '12px', left: '12px', color: '#94a3b8' }} />
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                style={{ paddingLeft: '2.5rem' }}
                                required 
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn">Sign In</button>
                </form>
                <p className="mt-4" style={{ marginBottom: 0 }}>
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
