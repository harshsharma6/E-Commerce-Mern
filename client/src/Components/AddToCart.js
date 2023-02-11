import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export function AddToCart() {
    const [product, setProduct] = useState([]);
    const [edit, setEdit] = useState(false);
    const [edit_data, setEdit_data] = useState([]);
    useEffect(() => {
        const editClick = async () => {
            const eVar = localStorage.getItem("addtocartId");
            const e = eVar;
            console.log(e);
            const res = await fetch("/get_pro_id/" + eVar)
            const data = await res.json();
            if (res.ok) {
                // console.log("Edit Working");
                // console.log(data)

                setEdit_data(data)
                setEdit(true)
            } else {
                console.log("Not Working");
            }
        }
        editClick();
    }, [])

    return (

        <>
            <div className="home">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <table className="table table-bordered bg-input">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Product Name</th>
                                        <th>Product Description</th>
                                        <th>Product Price</th>
                                        <th>Product Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        edit_data.map(get_pro => {
                                            return <tr>
                                                <td>{get_pro.category}</td>
                                                <td>{get_pro.product_name}</td>
                                                <td>{get_pro.description}</td>
                                                <td>{get_pro.price}</td>
                                                <td><img src={get_pro.product_image} className="img-fluid" height="70px" width="70px" ></img></td>
                                                {/* <td><button className="btn btn-dark bg-fur" onClick={()=>editClick(get_pro._id)}>Edit</button></td> */}
                                                {/* <td><Link to="/updateproduct" className="btn btn-dark bg-fur">Edit/Update</Link> &nbsp; <button className="btn btn-danger">Delete</button> </td> */}
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <button className="btn btn-dark bg-input">Place Order</button>
                        <Link to="/" className="btn btn-dark bg-input" onClick={() => { localStorage.removeItem("addtocartId") }}>Back</Link>
                    </div>
                </div>
            </div>

        </>
    )
}