
import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserImportExport = () => {
    const [file, setFile] = useState(null);
    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);

    // Hàm để lấy danh sách người dùng
    const fetchUsers = async () => {
        const response = await axios.get("/api/users"); // Đảm bảo route này tồn tại
        setUsers(response.data);
    };

    // Gọi hàm fetchUsers khi component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Hàm xử lý file upload
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Hàm xử lý form submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("/api/users/import", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccessMessage(response.data.message);
            setErrorMessages([]);
            fetchUsers(); // Cập nhật danh sách người dùng sau khi import
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrorMessages(error.response.data.errors);
            } else {
                setErrorMessages(["An error occurred."]);
            }
        }
    };

    // Hàm để export user data
    const handleExport = () => {
        window.location.href = "/api/users/export"; // Đảm bảo route này tồn tại
    };

    return (
        <Layout>
        <div className="container">
            <div className="card mt-5">
                <h3 className="card-header p-3">
                    <i className="fa fa-star"></i> Laravel 11 Import Export
                    Excel to Database Example
                </h3>
                <div className="card-body">
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}

                    {errorMessages.length > 0 && (
                        <div className="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems
                            with your input.
                            <ul>
                                {errorMessages.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <input
                            type="file"
                            name="file"
                            className="form-control"
                            onChange={handleFileChange}
                        />
                        <br />
                        <button className="btn btn-success">
                            <i className="fa fa-file"></i> Import User Data
                        </button>
                    </form>

                    <table className="table table-bordered mt-3">
                        <thead>
                            <tr>
                                <th colSpan="3">
                                    List Of Users
                                    <button
                                        className="btn btn-warning float-end"
                                        onClick={handleExport}
                                    >
                                        <i className="fa fa-download"></i>{" "}
                                        Export User Data
                                    </button>
                                </th>
                            </tr>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default UserImportExport;
