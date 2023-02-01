import { useNavigate, Link } from "react-router-dom";
export function Product(){
    function removeStorage() {
        localStorage.removeItem('email');
        navigate('/signin');}
        const navigate = useNavigate();
    return(
        
        <>
        <section className="admin mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            Choose Category
                            <select>
                                <option value="Null">Null</option>
                            </select>
                        </div>
                        <div className="col">
                            <div className="input-group border-bottom mb-3">
                                <button className="btn bg-fur">Add Product</button>
                                <input type="text" name="name" className="form-control" placeholder="Enter Product Name"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/adminpage"><button className="btn bg-fur">Back</button></Link> 
            </section>
        </>
    )
}