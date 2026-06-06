import { useState, useContext } from 'react';
import toast from 'react-hot-toast';

import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Login successful!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        }
    };


    return (
        <div style={styles.container}>
            <div className="glass-card animate-fade animate-float" style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Welcome Back</h1>
                    <p style={styles.subtitle}>Enter your credentials to access your tasks.</p>
                </div>
                <form onSubmit={handleSubmit} style={styles.form}>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <div style={styles.inputWrapper}>
                            <Mail size={18} color="var(--text-soft)" />
                            <input 
                                type="email" 
                                placeholder="name@company.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                                style={styles.input}
                            />
                        </div>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.inputWrapper}>
                            <Lock size={18} color="var(--text-soft)" />
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                                style={styles.input}
                            />
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary" style={styles.submitBtn}>
                        {loading ? 'Logging in...' : 'Sign In'}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>
                <p style={styles.footer}>
                    Don't have an account? <Link to="/register" style={styles.link}>Sign up for free</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 70px)',
        padding: '20px',
    },
    card: {
        width: '100%',
        maxWidth: '440px',
        padding: '40px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: '700',
        marginBottom: '10px',
    },
    subtitle: {
        color: 'var(--text-soft)',
        fontSize: '0.95rem',
    },
    error: {
        padding: '12px',
        background: 'rgba(239, 68, 68, 0.1)',
        color: 'var(--accent-red)',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '0.9rem',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '500',
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 15px',
        background: 'var(--glass)',
        border: '1px solid var(--glass-border)',
        borderRadius: '8px',
    },
    input: {
        background: 'transparent',
        border: 'none',
        width: '100%',
        paddingLeft: '10px',
    },
    submitBtn: {
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        height: '45px',
    },
    footer: {
        marginTop: '30px',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: 'var(--text-soft)',
    },
    link: {
        color: 'var(--primary)',
        textDecoration: 'none',
        fontWeight: '600',
    }
};

export default Login;
