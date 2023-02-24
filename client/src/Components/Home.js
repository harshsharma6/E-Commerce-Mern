import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [edit_data, setEdit_data] = useState([]);
    const [pro_image, setProImage] = useState("");
    const [product, setProduct] = useState([]);
    const [pro_cat, setPro_cat] = useState("");

    function toProfile(){
        if(localStorage.getItem("useremail")){
            navigate("/profile");
        }else{
            window.alert("Please Signin To Visit Your Profile")
            navigate("/usersignin");
        }
    } 

    useEffect(() => {
        const fetchProduct = async () => {

            const res = await fetch("/get_product")
            const data = await res.json();

            console.log(data);
            // console.log(typeof(data));
            // const category_data = Object.values(data);
            // console.log(Object.values(data.category_name));
            // console.log(category_data[0].category_name);
            setProduct(data);
        }
        fetchProduct();
    }, [])

    const editClick = async (e) => {
        const eVar = e;
        console.log(e);
        const res = await fetch("/get_pro_id/" + eVar)
        const data = await res.json();
        if (res.ok) {
            console.log("Edit Working");
            console.log(data)
            setEdit_data(data)
            setEdit(true)
            localStorage.setItem("addtocartId", eVar)
            navigate("/cart")
        } else {
            console.log("Not Working");
        }
    }

    return (
        <>
            <div className='home'>
                {/* <div className='flt-r'>
                    <button className='btn btn-dark bg-fur' onClick={toProfile}>Profile</button>
                </div> */}
                <div className='home-flex'>
                    <div className='row'>
                        {
                            product.map(get_pro => {
                                return <div className='wrapper wrapper-s bg-fur bg'>
                                    <div className='proimg proimg-s'>
                                        <img src={get_pro.product_image} height="200px" width="200px" ></img>
                                    </div>
                                    <div className='prodetails prodetails-s'>
                                        <div className='protxt protxt-s'>
                                            <h1>{get_pro.product_name}</h1>
                                            <p>{get_pro.description}</p>
                                        </div>
                                        <div className='pro-price pro-price-s'>
                                            <p>₹ <span>{get_pro.price}</span></p>
                                            <button className='btn btn-dark bg-input' onClick={() => editClick(get_pro._id)}>Add To Cart</button>
                                            {/* <button className="btn btn-dark bg-fur" onClick={() => editClick(get_pro._id)}>Edit</button> */}
                                            {/* <td><Link to="/updateproduct" className="btn btn-dark bg-fur">Edit/Update</Link> &nbsp; <button className="btn btn-danger">Delete</button> </td> */}
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;