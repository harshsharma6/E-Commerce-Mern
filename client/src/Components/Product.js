import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export function Product() {
    
    const navigate = useNavigate();
    const [pro_image,setProImage] = useState("");

    const [ productInfo, setProductInfo ] = useState({
        product_name: "", description: "", price: "", product_image: "", created_at: "", updated_at: ""
    });

    let name, value;
    const handleFormData = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;

        setProductInfo({...productInfo, [name]:value });
        // console.log(productInfo)
    }

    const handleImageData = (e) =>{
        // console.log(e);
        setProImage(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    const postProduct = async (e) => {
        e.preventDefault();
        const date = new Date();
        const d = date.toLocaleTimeString();
        console.log(d);
        const {product_name, description, price, created_at, updated_at} = productInfo;
        
        const formData = new FormData();
        formData.append('product_image', pro_image);
        formData.append('product_name',product_name)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('created_at', d);
        formData.append('updated_at',"")
        console.log(formData);
        
        const res =  await fetch("/add_product", {
            method: "POST",
            body : formData
        });

        const data = await res.json();
        if(data.status===422 || !data){
            window.alert("Invalid Product Information");
        }else{
            window.alert("Product Saved Successfully");
            // navigate('/register');
        }
    }

    return (

        <>
            <section className="admin mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <span className="input-group border-bottom mb-3 txt-20">Choose Category</span>
                            <select className="form-control mb-3" >
                                <option value="">SELECT FROM HERE</option>
                                <option value="123">123</option>
                            </select>
                        </div>
                        <div className="col">
                            <span className="input-group border-bottom mb-3 txt-20">Add Product In -CATEGORYNAME-</span>
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