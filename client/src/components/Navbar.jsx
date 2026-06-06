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
        <nav style={styles.nav}>
            <Link to="/" style={styles.logo}>
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
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        background: 'var(--glass)',
        borderBottom: '1px solid var(--glass-border)',
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
        color: 'var(--text-soft)',
        fontSize: '0.9rem',
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: 'transparent',
        color: 'var(--accent-red)',
        border: '1px solid var(--accent-red)',
        borderRadius: '8px',
        fontSize: '0.9rem',
        cursor: 'pointer',
    },
    link: {
        textDecoration: 'none',
        color: 'var(--text-main)',
        fontSize: '0.9rem',
    },
    registerBtn: {
        textDecoration: 'none',
        background: 'var(--primary)',
        color: 'white',
        padding: '8px 20px',
        borderRadius: '8px',
        fontSize: '0.9rem',
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
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        border: '1px solid var(--primary)',
    }
};


export default Navbar;
