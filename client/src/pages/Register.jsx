import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ name, email, password });
            toast.success('Registration successful');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to register');
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-panel">
                <h2>Create Account</h2>
                <p>Join us to start managing tasks efficiently</p>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <FiUser style={{ position: 'absolute', top: '12px', left: '12px', color: '#94a3b8' }} />
                            <input 
                                type="text" 
                                placeholder="John Doe" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                style={{ paddingLeft: '2.5rem' }}
                                required 
                            />
                        </div>
                    </div>
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
                    <button type="submit" className="btn">Sign Up</button>
                </form>
                <p className="mt-4" style={{ marginBottom: 0 }}>
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
