import { useNavigate } from "react-router-dom";
export function About(){
    function removeStorage() {
        localStorage.removeItem('email');
        navigate('/signin');}
        const navigate = useNavigate();
    return(
        
        <>
            <div className="text-small">About Us Page</div>
            

        <a href="" className="ms-5" onClick={removeStorage}>Log Out</a>
        </>
    )
}