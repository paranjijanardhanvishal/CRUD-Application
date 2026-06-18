import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Topbar = ({ toggleSidebar }) => {
    const location = useLocation();
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
            
            <div className="ms-auto d-none d-md-block text-muted">
                <small>Admin / {pageTitle}</small>
            </div>
        </nav>
    );
};

export default Topbar;
