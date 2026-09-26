import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import { API_BASE_URL } from '../../utils/apiConfig'

const AdminLogin = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (message) {
            setMessage('');
            setIsError(false);
        }
    };

    //Submit function
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const res = await axios.post(`${API_BASE_URL}/api/admin/login`, data);
            console.log("Login response:", res.data);

            if (res.data.msg === "Success") {
                localStorage.setItem("name", res.data.name);
                localStorage.setItem("role", res.data.role);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("adminId", res.data.adminId);
                setIsError(false);
                setMessage("Successfully logged in");
                navigate('/admin/');
            } else {
                setIsError(true);
                setMessage(res.data.msg || "Login failed");
            }
        } catch (e) {
            console.log(e);
            setIsError(true);
            setMessage(e.response?.data?.msg || "Server error");
        }
    }
    return (
        <>
            <Header />
            <main className="admin-login-page">
              <section className="admin-login-card">
                <p className="admin-login-eyebrow">ADMIN PORTAL</p>
                <h1 className="admin-login-title">Welcome <em>Back</em></h1>
                <p className="admin-login-subtitle">Sign in to manage your Softpro Innovation dashboard.</p>

                <form onSubmit={handleSubmit}>
                    {message && (
                        <div className={isError ? "alert alert-danger" : "alert alert-success"} role="alert">
                            {message}
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label-custom" htmlFor="admin-email">Email Address</label>
                        <input id="admin-email" className="form-input-custom" type="email" name="email" value={data.email} onChange={handleChange} placeholder="admin@softpro.com" required />
                    </div>
                    <div className="mb-4">
                        <label className="form-label-custom" htmlFor="admin-password">Password</label>
                        <input id="admin-password" className="form-input-custom" type="password" name="password" value={data.password} onChange={handleChange} placeholder="Enter your password" required />
                    </div>
                    <button className="btn-send w-100" type="submit">Login to Dashboard</button>
                </form>
                <p className="admin-login-footer">Secure administrator access</p>
              </section>
            </main>
        </>
    )
}

export default AdminLogin