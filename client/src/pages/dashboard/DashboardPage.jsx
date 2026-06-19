import React, { useEffect, useState } from "react";
import { fetchUsers, fetchUserById } from "../../services/api";
import { FaUsers, FaMale, FaFemale, FaFileAlt, FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const DashboardPage = () => {
    const [stats, setStats] = useState({
        total: 0,
        male: 0,
        female: 0,
        withResume: 0
    });
    const { user } = useAuth();
    const [personalStats, setPersonalStats] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            if (user?.role === 'User') {
                try {
                    const data = await fetchUserById(user.id);
                    setPersonalStats(data);
                } catch(e) {}
            } else if (user?.role === 'Admin') {
                const data = await fetchUsers();
                if (data) {
                    setStats({
                        total: data.length,
                        male: data.filter(u => u.gender?.toLowerCase() === 'male').length,
                        female: data.filter(u => u.gender?.toLowerCase() === 'female').length,
                        withResume: data.filter(u => u.resume).length
                    });
                }
            }
        };
        loadData();
    }, [user]);

    if (user?.role === 'User') {
        return (
            <div className="container-fluid">
                <h2 className="mb-4 fw-bold text-dark">Welcome, {user.name}!</h2>
                <div className="row g-4">
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
                            <div className="card-body p-4 d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="text-primary text-uppercase fw-bold mb-2" style={{ letterSpacing: "1px" }}>Profile Status</h6>
                                    <h3 className="fw-bolder text-dark mb-0">{personalStats?.age ? 'Completed' : 'Incomplete'}</h3>
                                </div>
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}>
                                    <FaUser />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2 className="mb-4 fw-bold text-dark">Overview Statistics</h2>
            
            <div className="row g-4">
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
                        <div className="card-body p-4 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-primary text-uppercase fw-bold mb-2" style={{ letterSpacing: "1px" }}>Total Users</h6>
                                <h2 className="fw-bolder text-dark mb-0">{stats.total}</h2>
                            </div>
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}>
                                <FaUsers />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
                        <div className="card-body p-4 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-success text-uppercase fw-bold mb-2" style={{ letterSpacing: "1px" }}>Male Users</h6>
                                <h2 className="fw-bolder text-dark mb-0">{stats.male}</h2>
                            </div>
                            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}>
                                <FaMale />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
                        <div className="card-body p-4 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-danger text-uppercase fw-bold mb-2" style={{ letterSpacing: "1px" }}>Female Users</h6>
                                <h2 className="fw-bolder text-dark mb-0">{stats.female}</h2>
                            </div>
                            <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}>
                                <FaFemale />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
                        <div className="card-body p-4 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-warning text-uppercase fw-bold mb-2" style={{ letterSpacing: "1px" }}>Resumes Uploaded</h6>
                                <h2 className="fw-bolder text-dark mb-0">{stats.withResume}</h2>
                            </div>
                            <div className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}>
                                <FaFileAlt />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
