import React from "react";

import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";


const UserSignIn = () => {
    const navigate = useNavigate();
    const [ user, setUser ] = useState({
        email: "", password: ""
    });

    let name, value;
    const handleFormData = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value });
    }

    const postData = async (e) => {
        e.preventDefault();

        const {email, password} = user;
        console.log(email,password);
        const res =  await fetch("/usersignin", {
            method: "POST",
            headers :{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                email, password
            })
        });


        const data = await res.json();
        console.log(data);


        if (res.ok) {
            localStorage.setItem('useremail',email);
            navigate('/profile');
        }else{
            alert(data.error);
        }
        // if(data.status===422 || !data){
        //     window.alert("Login Unsuccessful");
        // }else{
        //     window.alert("Login Successfull");
        //     // hook used to redirect 
        //     navigate('/about');
        // }
    }


    return (
        <>
            <section className="signup">
                <div className="container mt-5 signupbox">
                    <div className="signup-image mt-5">
                        {/* <img src={loginpic} className="img-fluid" /> */}
                        {/* <p className='text-center mt-4'><Link to="/register" class="nav-link me-4 text-primary">Create An Account !!</Link></p> */}
                    </div>
                    <div className="signup-form mt-5">
                        <h2 className='form-title text-center mb-4'>Sign In</h2>
                        <form className='register-form' onSubmit={postData}>

                            <div class="input-group border-bottom mb-3">
                                <span class="input-group-text bg-input"><i class="zmdi zmdi-email"></i></span>
                                <input type="email" className="form-control" value={user.email} name="email" placeholder="Enter Email" onChange={handleFormData}/>
                            </div>
                            
                            <div class="input-group border-bottom mb-3">
                                <span class="input-group-text bg-input"><i class="zmdi zmdi-lock"></i></span>
                                <input type="password" className="form-control" value={user.password} name="password" placeholder="Enter Password" onChange={handleFormData}/>
                            </div>

                            <div class="input-group mb-3">
                                <input type="submit" className="btn btn-light bg-input form-control" value="Login" />
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserSignIn;