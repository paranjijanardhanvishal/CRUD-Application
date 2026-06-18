import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';

import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import DashboardPage from '../pages/dashboard/DashboardPage';
import UserList from '../pages/users/UserList';
import AddUser from '../pages/users/AddUser';
import EditUser from '../pages/users/EditUser';
import SkillList from '../pages/skills/SkillList';
import AddSkill from '../pages/skills/AddSkill';
import ResumeList from '../pages/resumes/ResumeList';
import AddResume from '../pages/resumes/AddResume';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/" element={<ProtectedRoute><MainLayout><DashboardPage /></MainLayout></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute allowedRoles={['Admin', 'Editor']}><MainLayout><UserList /></MainLayout></ProtectedRoute>} />
            <Route path="/users/add" element={<ProtectedRoute allowedRoles={['Admin', 'Editor']}><MainLayout><AddUser /></MainLayout></ProtectedRoute>} />
            <Route path="/users/edit/:id" element={<ProtectedRoute><MainLayout><EditUser /></MainLayout></ProtectedRoute>} />
            
            <Route path="/skills" element={<ProtectedRoute allowedRoles={['Admin', 'Editor']}><MainLayout><SkillList /></MainLayout></ProtectedRoute>} />
            <Route path="/skills/add" element={<ProtectedRoute allowedRoles={['Admin', 'Editor']}><MainLayout><AddSkill /></MainLayout></ProtectedRoute>} />
            
            <Route path="/resumes" element={<ProtectedRoute allowedRoles={['Admin']}><MainLayout><ResumeList /></MainLayout></ProtectedRoute>} />
            <Route path="/resumes/add" element={<ProtectedRoute allowedRoles={['Admin']}><MainLayout><AddResume /></MainLayout></ProtectedRoute>} />
        </Routes>
    );
};

export default AppRoutes;
