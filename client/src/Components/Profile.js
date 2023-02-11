import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export function Profile(){
    const navigate = useNavigate();
    const [storeData, setStoreData] = useState("");
    useEffect(() => {
    
            const fetchInfo = async () => {
    
                const user = localStorage.getItem('useremail');
                const email = user;
    
                const res = await fetch("/get_admin_data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email
                    })
                });
    
                const data = await res.json();
                setStoreData(data);
                console.log(data);
            }
            fetchInfo();
    
    
        }, [])
    return(
        
        <>
            <div className="home">Profile
            <Link to="/usersignin" className="btn btn-light bg-input" onClick={()=>{localStorage.removeItem("useremail")}}>Logout</Link>
            
            </div>
        </>
    )
}

