import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
export function AdminPage(){
    function removeStorage() {
        localStorage.removeItem('email');
        navigate('/signin');}
        const navigate = useNavigate();

        
        const [ user, setUser ] = useState({
            name : ""
        });
    
        let name, value;
        const handleFormData = (e) => {
            // console.log(e);
            name = e.target.name;
            value = e.target.value;
    
            setUser({...user, [name]:value });
        }

        const postCategory = async () => {
            const {name} = user;
        console.log(name);
        const res =  await fetch("/add_category", {
            method: "POST",
            headers :{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                name
            })
        });


        const data = await res.json();
        console.log(data);


        if (res.ok) {
            console.log("Added Category");
            // localStorage.setItem('email',email);
            // navigate('/adminpage');
        }else{
            alert(data.error);
        }
        }

    return(
        <>
            <div className="text-small">Admin Page</div>
            <button onClick={postCategory}>Add Category</button>
            <input type="text" onChange={handleFormData} name="name"></input>


            <Link to="/product"><button>Add Product</button></Link>
            
            <button>Add Admin</button>

            <a href="" className="ms-5" onClick={removeStorage}>Log Out</a>
        </>
    )
}