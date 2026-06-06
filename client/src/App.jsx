import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { TaskProvider } from './context/TaskProvider';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';


function App() {
    return (
        <AuthProvider>
            <TaskProvider>
                <Router>
                    <Toaster position="top-center" reverseOrder={false} />
                    <Navbar />

                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } 
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<div style={{textAlign: 'center', padding: '100px'}}><h1>404 Page Not Found</h1></div>} />
                    </Routes>
                </Router>
            </TaskProvider>
        </AuthProvider>
    );
}

export default App;
