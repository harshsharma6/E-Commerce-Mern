import { useState } from 'react';
export function SignUp() {

    const [print, setPrint] = useState(false);
    // const [id, setId] = useState(null);
    const [name, setName] = useState("");
    // const [gen_m, setGen_m] = useState("");
    // const [gen_f, setGen_f] = useState("");
    const [city, setCity] = useState("");
    const [for_name, setForName] = useState(/^[A-Z]{1}[a-z]{2,} [A-Z]{1}[a-z]{0,}$/gm);
    const [for_email, setForEmail] = useState(/^[a-z]+[0-9]*[@]{1}[a-z]{2,8}[.]{1}[a-z]{2,8}$/gm);
    const [for_contact, setForContact] = useState(/^[789]{1}[0-9]{9}$/gm);
    const [for_pass, setForPass] = useState(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^+&=)(-])(?=\S+$).{8,20}$/gm);
    const [for_pincode, setForPincode] = useState(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/gm);
    const [errmsg, setErrMsg] = useState(false);
    // function getId(valId) {
    //     setId(valId.target.value);
    // }
    const [gen, setGen] = useState("");
    function getGen(valGender) {
        setGen(valGender.target.value)
    }

    // function getGen_m(valGen_m) {
    //     setGen_m(valGen_m.target.value)
    // }
    // function getGen_f(valGen_f) {
    //     setGen_f(valGen_f.target.value)
    // }
    function getCity(valCity) {
        setCity(valCity.target.value)
    }

    function getName(valName) {
        setName(valName.target.value);
        if (name.length <= 3) {
            setErrMsg(true);
            console.log("Name Must Be Of Atlease 3 char");
        } else {
            setErrMsg(false);
        }

    }
    const [email, setEmail] = useState("");
    function getEmail(valEmail) {
        setEmail(valEmail.target.value);
    }
    const [contact, setContact] = useState("");
    function getContact(valContact) {
        setContact(valContact.target.value);
    }
    const [pass, setPass] = useState("");
    function getPass(valPass) {
        setPass(valPass.target.value);
    }
    const [confirm_pass, setConfirm_Pass] = useState("");
    function getConfirm_Pass(valConfirm_Pass) {
        setConfirm_Pass(valConfirm_Pass.target.value);
        if (confirm_pass!==pass) {
            setErrMsg(true);
            console.log("Password and Confirm Password must match");
            // alert("Password and Confirm Password must match");
        }else{
            setErrMsg(false);
            console.log("Matched");
        }      
    }
    const [address, setAddress] = useState("");
    function getAddress(valAddress) {
        setAddress(valAddress.target.value);
    }
    const [pincode, setPincode] = useState("");
    function getPincode(valPincode) {
        setPincode(valPincode.target.value);
    }
    function checkName(e) {
        // e.preventDefault();
        console.log(name);
        if (!name.match(for_name)) {
            alert("Please Enter Name");
        }
        // if (gen_m == false && gen_f == false) {
        //     alert("Select Gender");
        // }
        if (!email.match(for_email)) {
            alert("Write Valid Email!");
        }
        if (!contact.match(for_contact)) {
            alert("Write Valid Contact Number!");
        }
        if (!pass.match(for_pass)) {
            alert("Password must be of atleast 8 character and contain atleast 1 uppercase letter, lowercase letter,number and special character");
        }
        if (confirm_pass == "") {
            alert("Please Enter Confirm Password Field");
        }
        if (address == "") {
            alert("Please Enter Address");
        }
        if (!pincode.match(for_pincode)) {
            alert("Please Correct Pincode");
        }
        if (city == "") {
            alert("Please Select City");
        }
    }

    const postData = async (e) => {
        e.preventDefault();
        try {
            const data = {
                name,
                gen,
                email,
                contact,
                pass,
                confirm_pass,
                address,
                pincode,
                city
            }
            
            const usePromise = await fetch("http://localhost:3100/post_signup_info", {
                method: "POST",
                headers: {
                    'Content-type': "application/json",
                    'Accept': "application/json"
                },
                body: JSON.stringify(data)
            })
            console.log(usePromise);
            const promiseData = await usePromise.json();
            console.log(promiseData)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="text-small">SignUp Page</div>
                <div style={{ backgroundColor: "" }}>
                    <div className="row">
                        <form onSubmit={checkName}>
                            <table style={{ width: "600px" }}>
                                {/* <tr>
                                    <td>
                                        <div>ID</div>
                                    </td>
                                    <td><input type="number" onChange={getId}></input></td>
                                </tr> */}
                                <tr>
                                    <td>
                                        <div>Name</div>
                                    </td>
                                    <td><input type="text" onChange={getName}></input></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Gender</div>
                                    </td>
                                    <td>Male<input type="radio" value="Male" name="gender" onClick={getGen}></input>&nbsp;
                                    Female<input type="radio" value="Female" name="gender" onClick={getGen}></input></td>
                                </tr>
                                <tr>
                                    {/* {errmsg ? "Name char atleast 3":""} */}
                                </tr>
                                <tr>
                                    <td>
                                        <div>Email</div>
                                    </td>
                                    <td><input type="email" onChange={getEmail}></input></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Contact</div>
                                    </td>
                                    <td><input type="number" onChange={getContact}></input></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Password</div>
                                    </td>
                                    <td><input type="text" onChange={getPass}></input></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Confirm Password</div>
                                    </td>
                                    <td><input type="text" onKeyUp={getConfirm_Pass}></input></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Address</div>
                                    </td>
                                    <td><textarea onChange={getAddress}/></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>Pincode</div>
                                    </td>
                                    <td><input type="number" onChange={getPincode}></input></td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>City</div>
                                    </td>
                                    <td>
                                        <select name='city' onChange={getCity}>
                                            <option value="">------------Select------------</option>
                                            <option value="Indore">Indore</option>
                                            <option value="Bhopal">Bhopal</option>
                                            <option value="Ujjain">Ujjain</option>
                                            <option value="Dewas">Dewas</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td><td><button onClick={postData}>Submit</button></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </div>
        </>
    )
}