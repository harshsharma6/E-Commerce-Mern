import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
export function AdminPage() {
    const [storeData, setStoreData] = useState("");
    function removeStorage() {
        localStorage.removeItem('email');
        navigate('/signin');
    }
    const navigate = useNavigate();


    const [user, setUser] = useState({
        name: ""
    });

    let name, value;
    const handleFormData = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    useEffect(() => {

        const fetchInfo = async () => {

            const user = localStorage.getItem('email');
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

    const postCategory = async () => {
        const { name } = user;
        console.log(name);
        const res = await fetch("/add_category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name
            })
        });


        const data = await res.json();
        console.log(data);


        if (res.ok) {
            console.log("Added Category");
            // localStorage.setItem('email',email);
            // navigate('/adminpage');
        } else {
            alert(data.error);
        }
    }

    return (
        <>
            <section className="signup mb-3">
                <div className="container">
                    <div className="row">
                        <div className="text-small col">
                            Admin Page

                        </div>
                        <div className="col">
                            <div className="input-group border-bottom mb-3">
                                <button className="btn bg-fur" onClick={postCategory}>Add Category</button>
                                <input type="text" name="name" className="form-control" onChange={handleFormData} placeholder="Enter Category Name"></input>
                            </div>
                            <div className="mb-3">
                                <Link to="/product"><button className="btn bg-fur">Add Product</button></Link>
                            </div>
                            <div className="mb-3">
                                <button className="btn bg-fur">Add Admin</button>
                            </div>
                        </div>
                        <button className="btn bg-input" onClick={removeStorage}>Log Out</button>
                    </div>
                </div>
            </section>
        </>
    )
}