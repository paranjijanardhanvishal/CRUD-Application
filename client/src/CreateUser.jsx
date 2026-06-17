import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [education, setEducation] = useState("");
    const [skills, setSkills] = useState([]);
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const handleSkillChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setSkills([...skills, value]);
        } else {
            setSkills(skills.filter((skill) => skill !== value));
        }
    };

    const Submit = (e) => {
        e.preventDefault();

        if (skills.length === 0) {
            alert("Please select at least one skill.");
            return;
        }

        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("age", age);
        formData.append("gender", gender);
        formData.append("education", education);
        formData.append("skills", JSON.stringify(skills));

        if (file) {
            formData.append("resume", file);
        }

        axios.post(`${API_URL}/create`, formData)
            .then(result => {
                console.log(result);
                navigate("/");
            })
            .catch(err => console.log(err));
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #f8fbff 0%, #edf5ff 50%, #dbeafe 100%)"
            }}
        >
            <div
                className="p-4"
                style={{
                    width: "600px",
                    background: "#ffffff",
                    borderRadius: "18px",
                    border: "1px solid #dbeafe",
                    boxShadow: "0 4px 20px rgba(59,130,246,0.08)"
                }}
            >
                <form onSubmit={Submit}>
                    <Link
                        to="/"
                        className="btn text-white mb-3"
                        style={{
                            background: "#64748b",
                            border: "none",
                            borderRadius: "8px"
                        }}
                    >
                        ← Back
                    </Link>

                    <h2
                        className="text-center mb-1"
                        style={{
                            fontWeight: "700",
                            color: "#2563eb"
                        }}
                    >
                        Add User
                    </h2>

                    <p
                        className="text-center mb-4"
                        style={{
                            color: "#64748b"
                        }}
                    >
                        Create a new user profile
                    </p>

                    <div className="mb-3">
                        <label className="fw-semibold mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{
                                borderRadius: "10px",
                                border: "1px solid #cbd5e1"
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="fw-semibold mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                borderRadius: "10px",
                                border: "1px solid #cbd5e1"
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="fw-semibold mb-2">Age</label>
                        <input
                            type="number"
                            placeholder="Enter Age"
                            className="form-control"
                            onChange={(e) => setAge(e.target.value)}
                            required
                            style={{
                                borderRadius: "10px",
                                border: "1px solid #cbd5e1"
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="fw-semibold d-block mb-2">
                            Gender
                        </label>

                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                        <label className="ms-2 me-4">Male</label>

                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <label className="ms-2">Female</label>
                    </div>

                    <div className="mb-3">
                        <label className="fw-semibold mb-2">
                            Education
                        </label>

                        <select
                            className="form-control"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            required
                            style={{
                                borderRadius: "10px",
                                border: "1px solid #cbd5e1"
                            }}
                        >
                            <option value="">Select Education</option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="B.Sc">B.Sc</option>
                            <option value="BCA">BCA</option>
                            <option value="MCA">MCA</option>
                            <option value="M.Tech">M.Tech</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="fw-semibold d-block mb-2">
                            Skills
                        </label>

                        <input
                            type="checkbox"
                            value="Java"
                            onChange={handleSkillChange}
                        />
                        <label className="ms-2 me-3">Java</label>

                        <input
                            type="checkbox"
                            value="Python"
                            onChange={handleSkillChange}
                        />
                        <label className="ms-2 me-3">Python</label>

                        <input
                            type="checkbox"
                            value="React"
                            onChange={handleSkillChange}
                        />
                        <label className="ms-2 me-3">React</label>

                        <input
                            type="checkbox"
                            value="MongoDB"
                            onChange={handleSkillChange}
                        />
                        <label className="ms-2">MongoDB</label>
                    </div>

                    <div className="mb-4">
                        <label className="fw-semibold mb-2">
                            Resume (PDF)
                        </label>

                        <input
                            type="file"
                            className="form-control"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{
                                borderRadius: "10px",
                                border: "1px solid #cbd5e1"
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn text-white w-100 fw-semibold"
                        style={{
                            background: "#2563eb",
                            border: "none",
                            borderRadius: "10px",
                            padding: "12px"
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;