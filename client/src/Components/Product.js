import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
export function Product() {
 
    const navigate = useNavigate();
    if (!localStorage.getItem('email')) {
        navigate("/signin")
    }
    const [edit, setEdit] = useState(false);
    const [pro_image, setProImage] = useState("");
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [pro_cat, setPro_cat] = useState("");
    const [edit_data, setEdit_data] = useState([]);
    // console.log(category);
    // const [updated_at,setUpdated_at] = useState("");

    const [productInfo, setProductInfo] = useState({
        // product_name: "", description: "", price: "", created_at: "", updated_at: ""
        category: "", product_name: "", description: "", price: "", created_at: "", updated_at: ""
    });

    let name, value;
    const handleFormData = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;

        setProductInfo({ ...productInfo, [name]: value });
        setPro_cat(productInfo.category)
        console.log(productInfo.category)
        console.log(productInfo)
    }

    const handleImageData = (e) => {
        // console.log(e);
        setProImage(e.target.files[0]);
        console.log(e.target.files[0]);
    }


    useEffect(() => {

        const fetchInfo = async () => {

            const res = await fetch("/get_category")
            const data = await res.json();

            console.log(data);
            // const category_data = Object.values(data);
            // console.log(Object.values(data.category_name));
            // console.log(category_data[0].category_name);
            setCategory(data);
        }
        fetchInfo();
    }, [])

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
            const res = await fetch("/get_pro_id/"+ eVar)
            const data = await res.json();
            if (res.ok){
                console.log("Edit Working");
                console.log(data)
                setEdit_data(data)
                setEdit(true)
                localStorage.setItem("productId",eVar)
                navigate("/updateproduct")
            }else{
                console.log("Not Working");
            }
        }
        

    const postProduct = async (e) => {
        e.preventDefault();
        const date = new Date();
        const d = date.toLocaleTimeString();
        console.log(d);

        const { category, product_name, description, price, created_at, updated_at } = productInfo;

        const formData = new FormData();
        formData.append('product_image', pro_image);
        formData.append('category', category);
        formData.append('product_name', product_name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('created_at', d);
        formData.append('updated_at', d);
        console.log(formData);

        const res = await fetch("/add_product", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        if (data.status === 422 || !data) {
            window.alert("Invalid Product Information");
        } else {
            window.alert("Product Saved Successfully");
            navigate('/product');
        }
    }

    // const updateProduct = async (e) => {
    //     e.preventDefault();
    //     const date = new Date();
    //     const d = date.toLocaleTimeString();

    //     const { category, product_name, description, price, updated_at } = productInfo;
    //     console.log(productInfo);
    //     const res = await fetch("/update_product", {
    //         method: "POST",
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             category, product_name, description, price, updated_at: d
    //         })
    //     });
    //     const data = await res.json();

    //     if (res.ok) {
    //         setEdit(false);
    //         navigate("/product");
    //     } else {
    //         console.log(data.error);
    //     }

    // }
    return (

        <>
            <section className="admin mb-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8 col-s-6">
                            <table className="table table-bordered bg-input">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Product Name</th>
                                        <th>Product Description</th>
                                        <th>Product Price</th>
                                        <th>Product Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.map(get_pro => {
                                            return <tr>
                                                <td>{get_pro.category}</td>
                                                <td>{get_pro.product_name}</td>
                                                <td>{get_pro.description}</td>
                                                <td>{get_pro.price}</td>
                                                <td><img src={get_pro.product_image} className="img-fluid" height="70px" width="70px" ></img></td>
                                                <td><button className="btn btn-dark bg-fur" onClick={()=>editClick(get_pro._id)}>Edit</button></td>
                                                {/* <td><Link to="/updateproduct" className="btn btn-dark bg-fur">Edit/Update</Link> &nbsp; <button className="btn btn-danger">Delete</button> </td> */}
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="col col-s-6">
                            <span className="input-group border-bottom mb-3 txt-20">Choose Category</span>
                            <select className="form-control mb-3" name="category" onChange={handleFormData}>
                                <option value="">SELECT FROM HERE</option>
                                {
                                    category.map(get_cat =>
                                        <option value={get_cat.category_name}>{get_cat.category_name}</option>
                                    )
                                }
                            </select>
                            <span className="input-group border-bottom mb-3 txt-20">Add Product in {pro_cat}</span>
                            <form method="POST" encType="multipart/form-data">
                                <div>
                                    <input type="text" name="product_name" value={productInfo.product_name} onChange={handleFormData} className="form-control" placeholder="Enter Product Name"></input>
                                    <textarea name="description" value={productInfo.description} onChange={handleFormData} className="form-control" placeholder="Enter Product Description" />
                                    <input type="number" name="price" value={productInfo.price} onChange={handleFormData} className="form-control" placeholder="Enter Product Price"></input>
                                    <input type="file" name="product_image" className="form-control" onChange={handleImageData}></input>
                                    {/* <input type="date" name="created_at" className="form-control"></input>
                                    <input type="date" name="updated_at" className="form-control"></input> */}
                                    <button className="btn bg-fur" onClick={postProduct}>Add Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Link to="/adminpage" className="btn bg-input input-group mb-3">Back</Link>
            </section>
        </>
    )
}