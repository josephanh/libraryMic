// src/components/AddBook.jsx
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";

const AddBook = () => {
    const [book, setBook] = useState({
        ma_sach: "",
        name: "",
        tac_gia: "",
        mo_ta: "",
        nha_xuat_ban: "",
        nam_xuat_ban: "",
        ton_kho: "",
        hinh: null,
        ma_loai: "",
    });
    const [loaiSach, setLoaiSach] = useState([]);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchLoaiSach = async () => {
            try {
                const response = await fetch("/api/loai-sach");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log(data); // Kiểm tra dữ liệu nhận được
                setLoaiSach(data);
            } catch (error) {
                console.error("Fetch error:", error); // Xử lý lỗi
            }
        };

        fetchLoaiSach();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleFileChange = (e) => {
        setBook({ ...book, hinh: e.target.files[0] });
    };

    const validate = () => {
        const errors = {};
        if (!book.ma_sach) errors.ma_sach = "Mã sách là bắt buộc";
        if (!book.name) errors.name = "Tên sách là bắt buộc";
        if (!book.tac_gia) errors.tac_gia = "Tác giả là bắt buộc";
        if (!book.nha_xuat_ban)
            errors.nha_xuat_ban = "Nhà xuất bản là bắt buộc";
        if (!book.nam_xuat_ban)
            errors.nam_xuat_ban = "Năm xuất bản là bắt buộc";
        if (!book.ton_kho) errors.ton_kho = "Tồn kho là bắt buộc";
        if (!book.ma_loai) errors.ma_loai = "Mã loại là bắt buộc";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        for (const key in book) {
            formData.append(key, book[key]);
        }

        try {
            const response = await axios.post("/api/sach", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccessMessage(response.data.message);
            setErrors({});
            setBook({
                ma_sach: "",
                name: "",
                tac_gia: "",
                mo_ta: "",
                nha_xuat_ban: "",
                nam_xuat_ban: "",
                ton_kho: "",
                hinh: null,
                ma_loai: "",
            });
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ server: "Đã xảy ra lỗi!" });
            }
        }
    };

    return (
        <Layout>
            <div className="container">
                <h3 className="mt-5">Thêm Sách</h3>
                {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                )}
                {errors.server && (
                    <div className="alert alert-danger">{errors.server}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Mã sách</label>
                        <input
                            type="text"
                            name="ma_sach"
                            value={book.ma_sach}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.ma_sach && (
                            <div className="text-danger">{errors.ma_sach}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tên sách</label>
                        <input
                            type="text"
                            name="name"
                            value={book.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.name && (
                            <div className="text-danger">{errors.name}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tác giả</label>
                        <input
                            type="text"
                            name="tac_gia"
                            value={book.tac_gia}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.tac_gia && (
                            <div className="text-danger">{errors.tac_gia}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mô tả</label>
                        <textarea
                            name="mo_ta"
                            value={book.mo_ta}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nhà xuất bản</label>
                        <input
                            type="text"
                            name="nha_xuat_ban"
                            value={book.nha_xuat_ban}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.nha_xuat_ban && (
                            <div className="text-danger">
                                {errors.nha_xuat_ban}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Năm xuất bản</label>
                        <input
                            type="number"
                            name="nam_xuat_ban"
                            value={book.nam_xuat_ban}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.nam_xuat_ban && (
                            <div className="text-danger">
                                {errors.nam_xuat_ban}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tồn kho</label>
                        <input
                            type="number"
                            name="ton_kho"
                            value={book.ton_kho}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.ton_kho && (
                            <div className="text-danger">{errors.ton_kho}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Hình ảnh</label>
                        <input
                            type="file"
                            name="hinh"
                            onChange={handleFileChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mã loại</label>
                        <select
                            name="ma_loai"
                            value={book.ma_loai}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Chọn loại sách</option>
                            {loaiSach.map((item) => (
                                <option key={item.ma_loai} value={item.ma_loai}>
                                    {item.name} {/* Thay đổi 'name' nếu cần */}
                                </option>
                            ))}
                        </select>
                        {errors.ma_loai && (
                            <div className="text-danger">{errors.ma_loai}</div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Thêm Sách
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default AddBook;
