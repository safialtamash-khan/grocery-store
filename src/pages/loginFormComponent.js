import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import { AuthContext } from "../authcontext/authcontext";

export default function LoginFormComponent() {

    const spanStyle = {
        color: "red",
        fontWeight: "bold"
    }

    const {setAuth} = useContext(AuthContext);
    const [loginMail, setLoginMail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const[message , setMessage] = useState("");
    const navigateTo = useNavigate();

    const emailHandler = (e) => {
        setLoginMail(e.target.value);
    }

    const passwordHandler = (e) => {
        setLoginPassword(e.target.value);
    }

    const loginHandler=()=>{
        console.log('login');
        fetch("http://localhost:8080/api/authenticate",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userEmail:loginMail,
                userPassword:loginPassword
            })
        }).then(res=>res.json()).then(
            response=>{
                const userRoles = response.data.userRole;
                console.log(userRoles);
                if (response.code===200 && userRoles==="admin") {
                    setAuth({userRoles});
                    navigateTo("/adminHome");
                } else if (response.code===200 && userRoles==="user") {
                    setAuth({userRoles});
                    navigateTo("/staffhome");
                } else{
                    setMessage(response.message)
                }
            }
        );
     }


    return (
        <>
            
            <div className="container-fluid border py-4 " id="container">
                <div className="row ">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">

                        <form action="" className="py-4 bg-white align-items-center" >

                            <div className="row my-4 px-4">
                                <div className="col-md-12">
                                    <h1 className="text-center" >Login Form</h1>
                                </div>
                            </div>

                            <div className="row my-4 px-4">
                                <div className="col-md-12">
                                    <label htmlFor="emailPassword" className="form-label fw-bold">Email</label>
                                    <span id="" style={spanStyle}>*</span>
                                    <input
                                        type="text"
                                        id="loginEmailPassword"
                                        className="form-control"
                                        value={loginMail}
                                        onChange={emailHandler} />
                                </div>
                            </div>


                            <div className="row my-4 px-4" >
                                <div className="col-md-12">
                                    <label htmlFor="loginPassword" className="form-label fw-bold">Password</label>
                                    <span id="" style={spanStyle}>*</span>
                                    <input
                                        type="password"
                                        id="loginPassword"
                                        className="form-control"
                                        value={loginPassword}
                                        onChange={passwordHandler} />
                                </div>
                            </div>

                            <div className="row my-4 px-4">
                                <div className="col-md-12">
                                    <Link to="#" className="link-primary text-decoration-none">Forget Password</Link>
                                </div>
                            </div>

                            <div className="row my-5 px-4">
                                <div className="col-md-12">
                                    <div className="d-grid d-md">
                                        <button className="btn btn-primary" type="button" onClick={loginHandler}>LOGIN</button>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-2 px-4">
                                <div className="col-md-12 d-flex justify-content-center">
                                    <p >Not a member?<Link to="#" className="link-primary text-decoration-none"> SignUP Now</Link></p>
                                </div>
                            </div>
                            <div className="col-md-3">{message} </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
} 