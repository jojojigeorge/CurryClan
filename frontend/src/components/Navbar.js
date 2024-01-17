import React from 'react'
import { Link ,useNavigate} from "react-router-dom";
import { useCart } from './ContextReducer';

export default function Navbar() {
    let cartData=useCart()
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('jwtoken')
        navigate("/")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white fw-bold fst-italic fs-3" to="/">CurryClan</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto  mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* <Link className="nav-link text-white fs-5 " aria-current="page" to="/">Home</Link> */}
                            </li>
                        </ul>
                        {
                            (localStorage.getItem('jwtoken')) ?
                                <div>
                                    <Link className="btn bg-white text-info  mx-1" to="/myorder">MyOrder</Link>
                                    <Link className="btn bg-white text-info  mx-1" to="/cart">Cart <span className="badge bg-success">{cartData.length}</span></Link>
                                    <Link className="btn  fw-normal bg-white text-info   mx-1" onClick={handleLogout} to="/">Logout</Link>
                                </div>
                                : ''


                        }
                        {
                            (!localStorage.getItem('jwtoken')) ?
                                <div className='d-flex'>
                                    <Link className="btn bg-white text-info  mx-1" to="/login">Login</Link>
                                    <Link className="btn bg-white text-info mx-1" to="/signup">Signup</Link>
                                </div>
                                : ''
                        }

                        {/* <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/">Action</Link></li>
                                <li><Link className="dropdown-item" to="/">Another action</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                            </ul>
                        </li> */}
                        {/* <li className="nav-item">
                                <Link className="nav-link disabled">Disabled</Link>
                            </li> */}
                        {/* <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </div>
    )
}
