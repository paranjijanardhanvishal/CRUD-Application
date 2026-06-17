import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function UpdateUser() {
    const { id } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [education, setEducation] = useState("");
    const [skills, setSkills] = useState([]);
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/getUser/` + id)
            .then(result => {
                setName(result.data.name || "");
                setEmail(result.data.email || "");
                setAge(result.data.age || "");
                setGender(result.data.gender || "");
                setEducation(result.data.education || "");
                setSkills(result.data.skills || []);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSkillChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setSkills([...skills, value]);
        } else {
            setSkills(skills.filter(skill => skill !== value));
        }
    };

    const removeResume = () => {
        axios.put(`${API_URL}/removeResume/` + id)
            .then(() => {
                alert("Resume Removed");
                navigate("/");
            })
            .catch(err => console.log(err));
    };

    const Update = (e) => {
        e.preventDefault();

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

        axios.put(
            `${API_URL}/updateUser/` + id,
            formData
        )
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
                <form onSubmit={Update}>

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
                        Update User
                    </h2>

                    <p
                        className="text-center mb-4"
                        style={{
                            color: "#64748b"
                        }}
                    >
                        Modify existing user details
                    </p>

                    <div className="mb-3">
                        <label className="fw-semibold mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
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
                            value={email}
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
                            value={age}
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
                            checked={gender === "Male"}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                        <label className="ms-2 me-4">Male</label>

                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={gender === "Female"}
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
                            checked={skills.includes("Java")}
                            onChange={handleSkillChange}
                        />
                        <label className="ms-2 me-3">Java</label>

                        <input
                            type="checkbox"
                            value="Python"
                            checked={skills.includes("Python")}
                            onChange={handleSkillChange}
                        />
                        <label className="ms-2 me-3">Python</label>

                        <input
                            type="checkbox"
                            value="React"
                            checked={skills.includes("React")}
                            onChange={handleSkillChange}
                        />
                        <label className="ms-2 me-3">React</label>

                        <input
                            type="checkbox"
                            value="MongoDB"
                            checked={skills.includes("MongoDB")}
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

                    <div className="d-flex gap-2">
                        <button
                            type="submit"
                            className="btn text-white fw-semibold flex-fill"
                            style={{
                                background: "#2563eb",
                                border: "none",
                                borderRadius: "10px",
                                padding: "12px"
                            }}
                        >
                            Update User
                        </button>

                        <button
                            type="button"
                            onClick={removeResume}
                            className="btn text-white fw-semibold"
                            style={{
                                background: "#ef4444",
                                border: "none",
                                borderRadius: "10px",
                                padding: "12px 20px"
                            }}
                        >
                            Remove Resume
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default UpdateUser;