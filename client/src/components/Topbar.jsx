import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaBars, FaSun, FaMoon } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Topbar = ({ toggleSidebar }) => {
    const location = useLocation();
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const path = location.pathname;

    let pageTitle = "Dashboard";
    if (path.includes('/users/add')) pageTitle = "Add User";
    else if (path.includes('/users/edit')) pageTitle = "Edit User";
    else if (path.includes('/users')) pageTitle = "User List";
    else if (path.includes('/skills/add')) pageTitle = "Add Skill";
    else if (path.includes('/skills')) pageTitle = "Skill List";
    else if (path.includes('/resumes/add')) pageTitle = "Add Resume";
    else if (path.includes('/resumes')) pageTitle = "Resume List";

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-4 py-3" style={{ position: 'sticky', top: 0, zIndex: 1030 }}>
            <div className="d-flex align-items-center">
                <button 
                    className="btn btn-outline-secondary d-md-none me-3" 
                    onClick={toggleSidebar}
                >
                    <FaBars />
                </button>
                <h4 className="m-0 fw-bold text-primary">{pageTitle}</h4>
            </div>
            
            <div className="ms-auto d-flex align-items-center gap-3">
                <button 
                    onClick={toggleTheme} 
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center" 
                    style={{ width: "36px", height: "36px", borderRadius: "50%", padding: 0 }}
                >
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                </button>
                <div className="d-none d-md-block text-muted">
                    <small>{user ? user.role : 'Guest'} / {pageTitle}</small>
                </div>
            </div>
        </nav>
    );
};

export default Topbar;
