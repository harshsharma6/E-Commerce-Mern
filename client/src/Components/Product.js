import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
export function Product() {

    const navigate = useNavigate();
    const [pro_image, setProImage] = useState("");
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [pro_cat, setPro_cat] = useState("");
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
            // console.log(typeof(data));
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

    return (

        <>
            <section className="admin mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <table className="table table-bordered">
                                <thead></thead>
                                <tr>
                                    <td>Category</td>
                                    <td>Product Name</td>
                                    <td>Product Description</td>
                                    <td>Product Price</td>
                                    <td>Product Image</td>
                                    <td>Action</td>
                                </tr>
                                {product.map(get_pro => {
                                    return <tr>
                                        <td>{get_pro.category}</td>
                                        <td>{get_pro.product_name}</td>
                                        <td>{get_pro.description}</td>
                                        <td>{get_pro.price}</td>
                                        <td>{get_pro.product_image}</td>
                                        <td><button className="btn bg-fur">Edit</button> &nbsp; <button className="btn btn-danger">Delete</button> </td>
                                    </tr>
                                })}
                            </table>
                        </div>
                        <div className="col">
                            <span className="input-group border-bottom mb-3 txt-20">Add Product in {pro_cat}</span>
                            <span className="input-group border-bottom mb-3 txt-20">Choose Category</span>
                            <select className="form-control mb-3" name="category" onChange={handleFormData}>
                                <option value="">SELECT FROM HERE</option>
                                {
                                    category.map(get_cat =>
                                        <option value={get_cat.category_name}>{get_cat.category_name}</option>
                                    )
                                }
                            </select>
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