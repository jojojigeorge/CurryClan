import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
	const [credentials, Setcredentials] = useState({ email: '', password: '' })
	let navigate = useNavigate()
	const handleSubmit = (event) => {
		event.preventDefault();
		axios.put('http://localhost:5000/userrouter/login', { email: credentials.email, password: credentials.password })
			.then(res => {
				// console.log('result after login check',res)
				if (res.data.login) {
					navigate("/")
					localStorage.setItem("jwtoken", res.data.jwToken)
					localStorage.setItem("userEmail", credentials.email)
				} else {
					alert("Enter Valid Credentials")
				}
			}).catch(err => console.log(err))
	}
	const onChange = (event) => {
		Setcredentials({ ...credentials, [event.target.name]: event.target.value })
	}
	return (
		<div>
			<Navbar />
			<div className="container mt-5 " style={{ flex: 1, minHeight: '70vh' }}>
				<div className="card container shadow-lg " style={{ "width": "30rem" }}>
					<div className="display-5 text-center mt-4">Login </div>
					<hr />
					<div className="card-body  ">
						<form onSubmit={handleSubmit}>

							<div className="mb-">
								<label htmlFor="email-reg" className="form-label">Username</label>
								<input type="text" onChange={onChange} className="form-control" placeholder="Enter Username" id="email-reg" value={credentials.email} name="email" />
							</div>
							<div className="mb-3">
								<label htmlFor="password-reg" className="form-label">Password</label>
								<input type="password" onChange={onChange} className="form-control" placeholder="Enter Password" id="password-reg" value={credentials.password} name="password" />
							</div>
							{/* {{#if loginErr}}
                        <div className="text-center">
                            <P className="text-danger ">{{loginErr}}</P>
                        </div>
                    {{/if}} */}
							<div className="text-center">
								<button type="submit" className="btn btn-primary">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer />

		</div>
	)
}
