import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const AdminLogin = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setData(() => ({ ...data, [e.target.name]: e.target.value }))
    }
    //Submit function
    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            console.log("jvndfk")
            const res = await axios.post("http://localhost:5000/api/admin/login", data);
            if (res.data.msg == "Success") {
                //console.log(res);
                //console.log("jvndfk")

             
                 localStorage.setItem("name",res.data.name)
                localStorage.setItem("role",res.data.role)
               localStorage.setItem("token",res.data.token)
               localStorage.setItem("adminId",res.data.adminId)
              Navigate('/admin/dashboard')
              
                alert("successfully logged In")
            } else {
                console.log(res);
                alert(res);
            }
        } catch (e) {
            console.log(er);
            alert("server error")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                Enter Email:
                <input type="email" name="email" onChange={handleChange} />
                <br />
                Password:
                <input type="Password" name='password' onChange={handleChange} />
                <input type="submit" />
            </form>
        </div>
    )
}

export default AdminLogin