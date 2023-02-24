import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState} from 'react';

const UserRegistration = () => {
    const navigate = useNavigate();
    const [image,setImage] = useState("");

    const [ user, setUser ] = useState({
        name: "", email: "", password: "", cpassword: "", phone: ""
    });

    let name, value;
    const handleFormData = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value });
    }

    const handleImageData = (e) =>{
        // console.log(e);
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    const postData = async (e) => {
        e.preventDefault();

        const {name, email, password, cpassword, phone} = user;
        
        const formData = new FormData();
        formData.append('pic', image);
        formData.append('name',name)
        formData.append('email',email)
        formData.append('password',password)
        formData.append('cpassword', cpassword);
        formData.append('phone',phone)
        console.log(formData);
        
        const res =  await fetch("/register", {
            method: "POST",
            // headers :{
            //     "Content-Type":"application/json"
            // },
            // body : JSON.stringify({
            //     name, email, password, cpassword, work, phone 
            // })
            body : formData
        });

        const data = await res.json();
        if(data.status===422 || !data){
            window.alert("Invalid registration");
        }else{
            window.alert("Registration Successfull");
            // navigate('/register');
        }
    }

    return (
        <>
            <section className="signup">
                <div className="container mt-5 signupbox">
                    <div className="signup-form">
                        <h2 className='form-title text-center mb-4'>Sign Up</h2>
                        <form className='register-form' method='POST' encType='multipart/form-data'>
                            <div className="input-group border-bottom mb-3">
                                <span className="input-group-text bg-input"><i className="zmdi zmdi-upload"></i></span>
                                <input type="file" className="form-control" name="pic"
                                 
                                 onChange={handleImageData}/>
                            </div>
                            <div class="input-group border-bottom mb-3">
                                <span className="input-group-text bg-input"><i className="zmdi zmdi-account"></i></span>
                                <input type="text" className="form-control" name="name"
                                 value={user.name}
                                 onChange={handleFormData}
                                placeholder="Enter Name" />
                            </div>
                            <div className="input-group border-bottom mb-3">
                                <span className="input-group-text bg-input"><i className="zmdi zmdi-email"></i></span>
                                <input type="email" className="form-control" name="email"
                                 value={user.email}
                                 onChange={handleFormData}
                                placeholder="Enter Email" />
                            </div>
                            <div class="input-group border-bottom mb-3">
                                <span className="input-group-text bg-input"><i className="zmdi zmdi-lock"></i></span>
                                <input type="password" class="form-control" name="password"
                                 value={user.password}
                                 onChange={handleFormData}
                                placeholder="Enter Password" />
                            </div>
                            <div class="input-group border-bottom mb-3">
                                <span className="input-group-text bg-input"><i className="zmdi zmdi-lock"></i></span>
                                <input type="password" className="form-control" name="cpassword"
                                 value={user.cpassword}
                                 onChange={handleFormData}
                                placeholder="Enter Confirm password" />
                            </div>
                            <div class="input-group border-bottom mb-3">
                                <span className="input-group-text bg-input"><i className="zmdi zmdi-phone-in-talk"></i></span>
                                <input type="number" className="form-control" name="phone"
                                 value={user.phone}
                                 onChange={handleFormData}
                                placeholder="Enter Contact" size="27" />
                            </div>
                            <div class="input-group border-bottom mb-3">
                                <input type="submit" className="btn btn-light bg-input form-control" value="Register" onClick={postData}/>
                            </div>
                        </form>
                    </div>
                    {/* <div className="signup-image">
                        <p className='text-center mt-4'><Link to="/usersignin" class="nav-link me-4 text-primary">I am Already Registered !!</Link></p>
                    </div> */}
                </div>
            </section>
        </>
    )
}

export default UserRegistration;