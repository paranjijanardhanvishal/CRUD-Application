import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaUserPlus, FaTools, FaPlus, FaFileAlt, FaUpload } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{
            width: '250px',
            background: '#1e293b',
            color: 'white',
            minHeight: '100vh',
            transition: 'all 0.3s',
            position: 'fixed',
            left: isOpen ? '0' : '-250px',
            zIndex: 1040,
            overflowY: 'auto'
        }}>
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
                <h4 className="m-0 text-white fw-bold">Admin Panel</h4>
                <button className="btn btn-sm btn-outline-light d-md-none" onClick={toggleSidebar}>
                    &times;
                </button>
            </div>

            <div className="p-3">
                <p className="text-uppercase text-secondary small fw-bold mb-2">Main</p>
                <div className="nav flex-column mb-4">
                    <NavLink to="/" className={({isActive}) => `nav-link text-white d-flex align-items-center gap-2 rounded mb-1 ${isActive ? 'bg-primary' : 'hover-bg-secondary'}`} end>
                        <FaTachometerAlt /> Dashboard
                    </NavLink>
                </div>

                <p className="text-uppercase text-secondary small fw-bold mb-2">Users</p>
                <div className="nav flex-column mb-4">
                    <NavLink to="/users/add" className={({isActive}) => `nav-link text-white d-flex align-items-center gap-2 rounded mb-1 ${isActive ? 'bg-primary' : 'hover-bg-secondary'}`}>
                        <FaUserPlus /> Add User
                    </NavLink>
                    <NavLink to="/users" className={({isActive}) => `nav-link text-white d-flex align-items-center gap-2 rounded mb-1 ${isActive ? 'bg-primary' : 'hover-bg-secondary'}`} end>
                        <FaUsers /> User List
                    </NavLink>
                </div>

                <p className="text-uppercase text-secondary small fw-bold mb-2">Skills</p>
                <div className="nav flex-column mb-4">
                    <NavLink to="/skills/add" className={({isActive}) => `nav-link text-white d-flex align-items-center gap-2 rounded mb-1 ${isActive ? 'bg-primary' : 'hover-bg-secondary'}`}>
                        <FaPlus /> Add Skill
                    </NavLink>
                    <NavLink to="/skills" className={({isActive}) => `nav-link text-white d-flex align-items-center gap-2 rounded mb-1 ${isActive ? 'bg-primary' : 'hover-bg-secondary'}`} end>
                        <FaTools /> Skill List
                    </NavLink>
                </div>

                <p className="text-uppercase text-secondary small fw-bold mb-2">Resumes</p>
                <div className="nav flex-column mb-4">
                    <NavLink to="/resumes/add" className={({isActive}) => `nav-link text-white d-flex align-items-center gap-2 rounded mb-1 ${isActive ? 'bg-primary' : 'hover-bg-secondary'}`}>
                        <FaUpload /> Add Resume
                    </NavLink>
                    <NavLink to="/resumes" className={({isActive}) => `nav-link text-white d-flex align-items-center gap-2 rounded mb-1 ${isActive ? 'bg-primary' : 'hover-bg-secondary'}`} end>
                        <FaFileAlt /> Resume List
                    </NavLink>
                </div>
            </div>
            <style>{`
                .hover-bg-secondary:hover {
                    background-color: rgba(255,255,255,0.1);
                }
                @media (min-width: 768px) {
                    .sidebar {
                        left: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Sidebar;
