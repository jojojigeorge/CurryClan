import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div style={{ }}>
      <footer className="  d-flex flex-wrap justify-content-end align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
            {/* <i class="fa-solid fa-closed-captioning fa-2xl"></i> */}
            <span className='fst-italic'>CurryClan</span>
          </Link>
          <span className="mb-3 mb-md-0 text-muted ">© 2023 Company, Inc</span>
          <ul className="nav col-md-4 justify-content-start list-unstyled d-flex alignItems-center me-2">
            <li className="ms-3"><Link className="text-muted" href="#"><i className="fa-brands fa-instagram fa-lg"></i></Link></li>
            <li className="ms-3"><Link className="text-muted" href="#"><i className="fa-brands fa-facebook fa-lg"></i></Link></li>
            <li className="ms-3"><Link className="text-muted" href="#"><i className="fa-brands fa-twitter"></i></Link></li>
          </ul>
        </div>


      </footer>
    </div>
  )
}
