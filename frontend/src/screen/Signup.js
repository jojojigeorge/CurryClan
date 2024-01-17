import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'




export default function Signup() {
    const [credentials, Setcredentials] = useState({ name: '', email: '', password: '', location: '' })
    let navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/userrouter', { "name": credentials.name, "email": credentials.email, "password": credentials.password, "location": credentials.location })
            .then(res => {
                console.log(res.data)
                navigate("/")

                // props.addTask(res.data)
                // Settask('')
            }).catch(err => console.log(err))
    }
    const onChange = (event) => {
        Setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    // const handleSubmi=(e)=>{
    //     e.preventDefault();
    //     const response = fetch("http://locathost:5000/userrouter",{
    //         // method:'POST'----------------------------use axios
    //     })
    // }
    return (
        <>
            <Navbar />
            <div className="container mt-5 ">
                <div className="card container shadow-lg  " style={{ width: "30rem" }}>
                    <div className="display-6 text-center mt-5 ">Sign Up </div>
                    <hr />
                    <div className="card-body ">
                        <form onSubmit={handleSubmit}>
                            <div className="">
                                <label htmlFor="name-reg" className="form-label">Name</label>
                                <input type="text" onChange={onChange} className="form-control" id="name-reg" name="name" value={credentials.name} />
                            </div>
                            <div className="">
                                <label htmlFor="name-reg" className="form-label">Location</label>
                                <input type="text" onChange={onChange} className="form-control" name="location" value={credentials.location} />
                            </div>
                            <div className="">
                                <label htmlFor="email-reg" className="form-label">Email</label>
                                <input type="text" onChange={onChange} className="form-control" id="email-reg" name="email" value={credentials.email} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password-reg" className="form-label">Password</label>
                                <input type="password" onChange={onChange} className="form-control" id="password-reg" name="password" value={credentials.password} />
                            </div>


                            <div className="text-center">
                                <button type="submit" className="btn btn-success">Submit</button>
                                <Link to="/login" className="btn m-3 btn-primary">Already a user</Link>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
