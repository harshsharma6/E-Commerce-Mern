import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <>
            <nav class="navbar navbar-expand-sm navbar-dark bg-fur bg-gradient p-4">
                <div class="container">
                    <a class="navbar-brand ms-5" href="javascript:void(0)">Furnish</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="mynavbar">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <Link to="/" class="nav-link me-4">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/about" class="nav-link me-4">About</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/contact" class="nav-link me-4">Contact</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/usersignin" class="nav-link me-4">SignIn</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/userregistration" class="nav-link me-4">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav;