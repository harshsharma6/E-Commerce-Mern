import { useState } from 'react';
export function Contact() {
    const [print, setPrint] = useState(false);
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [for_name, setForName] = useState(/^[A-Z]{1}[a-z]{2,} [A-Z]{1}[a-z]{0,}$/gm);
    const [for_email, setForEmail] = useState(/^[a-z]+[0-9]*[@]{1}[a-z]{2,8}[.]{1}[a-z]{2,8}$/gm);
    const [errmsg, setErrMsg] = useState(false);
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
    const [message, setMessage] = useState("");
    function getMessage(valMessage) {
        setMessage(valMessage.target.value);
    }
    function checkName(e) {
        // e.preventDefault();
        console.log(name);
        if (!name.match(for_name)) {
            alert("Please Enter Name");
        }
        if (!email.match(for_email)) {
            alert("Write Valid Email!");
        }
        if (message == "") {
            alert("Please Enter Message");
        }
    }
    return (
        <>
            <div className='signup'>
                <div className="signup-form mt-5">
                    {/* <div className="text-small">Contact Page</div> */}
                    <h2 className='form-title text-center mb-4'>Contact Page</h2>
                    <div style={{ backgroundColor: "" }}>
                        <div className="row ">
                            <form className='register-form' onSubmit={checkName}>
                                <div className="input-group border-bottom mb-3">
                                <input type="text" className='form-control' placeholder='Enter Name' onChange={getName}></input>
                                {/* {errmsg ? "Name char atleast 3":""} */}
                                </div>
                                <div className="input-group border-bottom mb-3">
                                <input type="email" className='form-control' placeholder='Enter Email' onChange={getEmail}></input>
                                </div>
                                <div className="input-group border-bottom mb-3">
                                <textarea className='form-control' placeholder='Enter Messsage' onChange={getMessage} />
                                </div>
                                <div className="input-group border-bottom mb-3">
                                <button className='btn btn-dark bg-input' onClick={() => setPrint(true)}>Submit</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}