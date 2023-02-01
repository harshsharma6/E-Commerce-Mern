import { useState } from 'react';
export function Contact(){
    const [print, setPrint] = useState(false);
    const [id,setId] = useState(null);
    const [name,setName] = useState("");
    const [for_name,setForName] = useState(/^[A-Z]{1}[a-z]{2,} [A-Z]{1}[a-z]{0,}$/gm);
    const [for_email,setForEmail] = useState(/^[a-z]+[0-9]*[@]{1}[a-z]{2,8}[.]{1}[a-z]{2,8}$/gm);
    const [errmsg,setErrMsg] = useState(false);
    function getName(valName) {
        setName(valName.target.value);
        if (name.length <= 3 ) {
            setErrMsg(true);
            console.log("Name Must Be Of Atlease 3 char");
        }else{
            setErrMsg(false);
        } 
        
    }
    const [email,setEmail] = useState("");
    function getEmail(valEmail) {
        setEmail(valEmail.target.value);
    }
    const [message,setMessage] = useState("");
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
            alert ("Write Valid Email!");   
        }
        if (message == "") {
            alert("Please Enter Message");
        }  
    }
    return(    
        <>
            <div className="text-small">Contact Page</div>
            <div style={{ backgroundColor: "" }}>
                <div className="row">
                        <form onSubmit={checkName}>
                            <table style={{ width: "600px" }}>
                                <tr>
                                    <td>
                                        <div>Name</div>
                                    </td>
                                    <td><input type="text" onChange={getName}></input></td>
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
                                        <div>Message</div>
                                    </td>
                                    <td><textarea onChange={getMessage}/></td>
                                </tr>
                                <tr>
                                    <td></td><td><button onClick={() => setPrint(true)}>Submit</button></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </div>
        </>
    )
}