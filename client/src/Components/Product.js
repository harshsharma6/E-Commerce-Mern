import { useNavigate, Link } from "react-router-dom";
export function Product(){
    function removeStorage() {
        localStorage.removeItem('email');
        navigate('/signin');}
        const navigate = useNavigate();
    return(
        
        <>
            <div className="text-small">Add Product</div>
            
            <Link to="/adminpage"><a href="" className="ms-5" >Back</a></Link> 
        </>
    )
}