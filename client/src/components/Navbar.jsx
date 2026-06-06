import { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User, CheckSquare } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
        setShowConfirm(false);
    };


    return (
        <nav className="animate-slide-down" style={styles.nav}>
            <Link to="/" style={styles.logo} className="logo-hover">

                <CheckSquare size={28} color="var(--primary)" />
                <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>TaskFlow</span>
            </Link>
            <div style={styles.links}>
                {user ? (
                    <>
                        <div style={styles.userInfo}>
                            <User size={18} />
                            <span>{user.name}</span>
                        </div>
                        <button onClick={() => setShowConfirm(true)} style={styles.logoutBtn}>
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>

                        {showConfirm && (
                            <div style={styles.toastOverlay}>
                                <div className="glass-card animate-fade" style={styles.confirmToast}>
                                    <p style={{marginBottom: '15px', fontWeight: '500'}}>Confirm Logout?</p>
                                    <div style={{display: 'flex', gap: '10px'}}>
                                        <button onClick={handleLogout} className="btn-primary" style={{padding: '5px 15px', fontSize: '0.8rem'}}>Yes</button>
                                        <button onClick={() => setShowConfirm(false)} className="btn-secondary" style={{padding: '5px 15px', fontSize: '0.8rem'}}>No</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>

                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.registerBtn}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        height: '74px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        background: 'rgba(15, 23, 42, 0.7)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        color: 'var(--text-main)',
        transition: 'transform 0.3s ease',
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 12px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '20px',
        color: 'var(--text-main)',
        fontSize: '0.9rem',
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 18px',
        background: 'rgba(244, 63, 94, 0.1)',
        color: 'var(--accent-red)',
        border: '1px solid rgba(244, 63, 94, 0.2)',
        borderRadius: '10px',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    link: {
        textDecoration: 'none',
        color: 'var(--text-soft)',
        fontSize: '0.95rem',
        transition: 'color 0.2s ease',
    },
    registerBtn: {
        textDecoration: 'none',
        background: 'var(--primary)',
        color: 'white',
        padding: '8px 20px',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: '600',
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
    },
    toastOverlay: {
        position: 'fixed',
        top: '80px',
        right: '5%',
        zIndex: 1000,
    },
    confirmToast: {
        padding: '20px',
        width: '240px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
        border: '1px solid var(--primary)',
    }
};


export default Navbar;
