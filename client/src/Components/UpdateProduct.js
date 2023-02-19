import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
export function UpdateProduct() {
    const navigate = useNavigate();
    if (!localStorage.getItem('email')) {
        navigate("/signin")
    }
    const [product_name, setProduct_name] = useState("");
    const [edit, setEdit] = useState(false);
    const [pro_image, setProImage] = useState("");
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [pro_cat, setPro_cat] = useState("");
    const [edit_data, setEdit_data] = useState([]);
    const [productInfo, setProductInfo] = useState({
        // product_name: "", description: "", price: "", created_at: "", updated_at: ""
        category: "", product_name: "", description: "", price: "", updated_at: ""
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

    useEffect(() => {
        const editClick = async () => {
            const eVar = localStorage.getItem("productId");
            const e = eVar;
            // console.log(e);
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

    const updateProduct = async (e) => {
        e.preventDefault();
        const date = new Date();
        const d = date.toLocaleTimeString();

        const { category, product_name, description, price, updated_at } = productInfo;
        console.log(productInfo);


       const formData = new FormData();
        formData.append('product_image', pro_image);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('updated_at', d);
        formData.append('product_name', product_name);

        const res = await fetch("/update_product", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (res.ok) {
            console.log("Photo Saved Successfully");
            // setEdit(false);
            // navigate("/about");
        } else {
            console.log(data.error);
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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        edit_data.map(update_pro => {
                                            return <tr>
                                                <td>{update_pro.category}<select className="form-control mb-3" name="category" onChange={handleFormData}>
                                                    <option value="">Select Category</option>
                                                    {
                                                        category.map(get_cat =>
                                                            <option value={get_cat.category_name}>{get_cat.category_name}</option>
                                                        )
                                                    }
                                                </select></td>
                                                <td>
                                                {update_pro.product_name}
                                                <input type="text" name="product_name" value={productInfo.product_name = update_pro.product_name} className="form-control" placeholder={update_pro.product_name} onInput={handleFormData} readOnly></input>
                                                </td>
                                                <td>{update_pro.description} <textarea name="description" value={productInfo.description} onChange={handleFormData} className="form-control" placeholder="Enter Product Description" /></td>
                                                <td>{update_pro.price}<input type="number" name="price" value={productInfo.price} onChange={handleFormData} className="form-control" placeholder="Enter Product Price"></input></td>
                                                <td>
                                                <img src={update_pro.product_image} className="img-fluid" height="70px" width="70px" ></img>
                                                {/* Image Updated */}
                                                    <form method='POST' encType='multipart/form-data'>
                                                        <input type="file" name="pro_image" onChange={handleImageData} />
                                                        {/* <button onClick={updatePic}>Save Image</button> */}
                                                    </form>                                        
                                                </td>
                                                <td><button className="btn btn-dark bg-fur" onClick={updateProduct}>Update</button> &nbsp; <button className="btn btn-danger">Delete</button> </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Link to="/product" className="btn bg-input input-group mb-3" onClick={() => localStorage.removeItem("productId")}>Back</Link>
            </section>
        </>
    )
}
