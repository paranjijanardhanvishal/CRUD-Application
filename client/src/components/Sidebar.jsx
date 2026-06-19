import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaUserPlus, FaTools, FaFileAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen }) => {
    const { user, logout } = useAuth();
    
    return (
        <div className={`bg-white shadow-sm h-100 p-3 position-fixed top-0 start-0 z-3 transition-all ${isOpen ? 'translate-middle-x-0' : '-translate-middle-x-full d-none d-md-block'}`} style={{ width: "250px", borderRight: "1px solid #e2e8f0", zIndex: 1000, transition: "transform 0.3s ease" }}>
            <h4 className="fw-bold text-primary mb-4 mt-2 d-flex align-items-center gap-2">
                <FaTachometerAlt />
                Admin Panel
            </h4>

            <div className="d-flex flex-column gap-1">
                <p className="text-muted small fw-bold text-uppercase mb-2 mt-3 ps-2">Dashboard</p>
                <NavLink to="/" end className={({isActive}) => `text-decoration-none p-2 rounded fw-semibold d-flex align-items-center gap-2 ${isActive ? 'bg-primary text-white' : 'text-dark hover-bg-light'}`}>
                    <FaTachometerAlt /> Overview
                </NavLink>

                {user && user.role === 'User' && (
                    <>
                        <p className="text-muted small fw-bold text-uppercase mb-2 mt-3 ps-2">My Information</p>
                        <NavLink to={`/users/edit/${user.id}`} className={({isActive}) => `text-decoration-none p-2 rounded fw-semibold d-flex align-items-center gap-2 ${isActive ? 'bg-primary text-white' : 'text-dark hover-bg-light'}`}>
                            <FaUser /> My Profile
                        </NavLink>
                        <NavLink to={`/users/edit/${user.id}#skills`} className="text-decoration-none p-2 rounded fw-semibold d-flex align-items-center gap-2 text-dark hover-bg-light">
                            <FaTools /> My Skills
                        </NavLink>
                        <NavLink to={`/users/edit/${user.id}#resume`} className="text-decoration-none p-2 rounded fw-semibold d-flex align-items-center gap-2 text-dark hover-bg-light">
                            <FaFileAlt /> My Resume
                        </NavLink>
                    </>
                )}

                {user && user.role === 'Admin' && (
                    <>
                        <p className="text-muted small fw-bold text-uppercase mb-2 mt-3 ps-2">Users</p>
                        <NavLink to="/users/add" className={({isActive}) => `text-decoration-none p-2 rounded fw-semibold d-flex align-items-center gap-2 ${isActive ? 'bg-primary text-white' : 'text-dark hover-bg-light'}`}>
                            <FaUserPlus /> Add User
                        </NavLink>
                        <NavLink to="/users" end className={({isActive}) => `text-decoration-none p-2 rounded fw-semibold d-flex align-items-center gap-2 ${isActive ? 'bg-primary text-white' : 'text-dark hover-bg-light'}`}>
                            <FaUsers /> User List
                        </NavLink>

                        <p className="text-muted small fw-bold text-uppercase mb-2 mt-3 ps-2">Skills</p>
                        <NavLink to="/skills/add" className={({isActive}) => `text-decoration-none p-2 rounded fw-semibold d-flex align-items-center gap-2 ${isActive ? 'bg-primary text-white' : 'text-dark hover-bg-light'}`}>
                            <FaTools /> Add Skill
                        </NavLink>
                        <NavLink to="/skills" end className={({isActive}) => `text-decoration-none p-2 rounded fw-semibold d-flex align-items-center gap-2 ${isActive ? 'bg-primary text-white' : 'text-dark hover-bg-light'}`}>
                            <FaTools /> Skill List
                        </NavLink>
                        
                        <p className="text-muted small fw-bold text-uppercase mb-2 mt-3 ps-2">Resumes</p>
                        <NavLink to="/resumes/add" className={({isActive}) => `text-decoration-none p-2 rounded fw-semibold d-flex align-items-center gap-2 ${isActive ? 'bg-primary text-white' : 'text-dark hover-bg-light'}`}>
                            <FaFileAlt /> Add Resume
                        </NavLink>
                        <NavLink to="/resumes" end className={({isActive}) => `text-decoration-none p-2 rounded fw-semibold d-flex align-items-center gap-2 ${isActive ? 'bg-primary text-white' : 'text-dark hover-bg-light'}`}>
                            <FaFileAlt /> Resume List
                        </NavLink>
                        
                        <p className="text-muted small fw-bold text-uppercase mb-2 mt-3 ps-2">Admin</p>
                        <NavLink to="/users" className="text-decoration-none p-2 rounded fw-semibold d-flex align-items-center gap-2 text-dark hover-bg-light">
                            <FaUsers /> Role Management
                        </NavLink>
                    </>
                )}

                <div className="mt-auto pt-4 border-top">
                    <button onClick={logout} className="btn w-100 text-start text-danger hover-bg-light p-2 rounded fw-semibold d-flex align-items-center gap-2">
                        <FaSignOutAlt /> Logout ({user?.name})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
