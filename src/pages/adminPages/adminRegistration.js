import { useRef } from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap"
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { ImCancelCircle } from "react-icons/im";
import { AuthContext } from "../../authcontext/authcontext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminRegister() {
    const { auth } = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const [message, setMessage] = useState('');
    const [render, setRender] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const [userId, setUserId] = useState("");


    const [userNameErr, setUserNameErr] = useState(false);
    const [userEmailErr, setUserEmailErr] = useState(false);
    const [userMobileErr, setUserMobileErr] = useState(false);
    const [userPasswordErr, setUserPasswordErr] = useState(false);
    const [userConfirmPasswordErr, setUserConfirmPasswordErr] = useState(false);
    const [userRoleErr, setUserRoleErr] = useState(false);

    const userNameRef = useRef();
    const userEmailRef = useRef();
    const userMobileRef = useRef();
    const userPasswordRef = useRef();
    const userConfirmPasswordRef = useRef();
    const userRoleRef = useRef();

    const style = {
        color: "red"
    }

    const fullNameHandler = e => {
        let value = e.target.value;
        setUserNameErr(false);
        const Regex = /[^A-Z a-z]/;
        if (Regex.test(value)) {
            setUserNameErr(true);
        } else {
            setUserName(value);
        }
    }

    const onEmailHandler = e => {
        let value = e.target.value;
        setUserEmailErr(false);
        setUserEmail(value);
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (emailRegex.test(value)) {
            setUserEmail(value); 
        } else {
            setUserEmailErr(true);    
        }
    }

    const onMobileHandler = e => {
        let value = e.target.value;
        setUserMobileErr(false);
        const NumRegex = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{11}\s*,?$/;
        if (NumRegex.test(value)) {
            setUserMobileErr(true);
        } else {
            setUserMobile(value);
        }
    }
    const onPasswordHandler = e => {
        let value = e.target.value;
        setUserPassword(value)
        setUserPasswordErr(false)
        if (value.length <= 5) {
            setUserPasswordErr(true);
        }
    }

    const onConfirmPasswordHandler = e => {
        let value = e.target.value;
        setUserConfirmPassword(value)
    }

    useEffect(() => {
        setUserConfirmPasswordErr(false);
        if (userPassword !== userConfirmPassword) {
            setUserConfirmPasswordErr(true);
        }

    }, [userPassword, userConfirmPassword]);

    const onRoleHandler = e => {
        let value = e.target.value;
        setUserRole(value);
    }



    async function fetchInsertUser(request) {
        console.log('insertProduct')
        let res = await fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(request)
        });
        const response = await res.json();
        return response;
    }


    const insertData = () => {
        const userData = {
            userName: userName,
            userEmail: userEmail,
            userMobile: userMobile,
            userPassword: userPassword,
            userConfirm: userConfirmPassword,
            userRole: userRole
        }
        console.log(userData);

        fetchInsertUser(userData).then(response => {
            if (response.code === 201) {
                setMessage(response.message);
                toast.success(response.message)
                setRender(!render);
                resetHandler();
            }
            else {
                setMessage(response.message);
                toast.error(response.message)
            }
        });
    }


    const onclickHandler = (e) => {
        e.preventDefault();
        if (isInputEmpty() === true) {
            if (userId === "") {
                insertData();
            } else {
                updateHandler();
            }
        } else {
            toast.error("some thing is missing");
        }
    }


    async function fetchUpdateUser(data) {
        console.log(data);
        console.log('updateProduct');
        let res = await fetch("http://localhost:8080/api/users", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let response = await res.json();
        return response;

    }

    const updateHandler = () => {
        let userData = {
            userName: userName,
            userEmail: userEmail,
            userMobile: userMobile,
            userPassword: userPassword,
            userConfirm: userConfirmPassword,
            userRole: userRole,
            userId: userId
        }
        console.log(userData);
        fetchUpdateUser(userData).then(response => {
            if (response.code === 200) {
                toast.success(response.message);
                setRender(!render);
            }
            else {
                toast.error(response.message);
            }
        });
    }

    const editHandler = (user) => {
        setUserName(user.userName);
        setUserEmail(user.userEmail);
        setUserMobile(user.userMobile);
        setUserPassword(user.userConfirm);
        setUserConfirmPassword(user.userConfirm);
        setUserRole(user.userRole);
        setUserId(user.userId);
        console.log(user);
    }


    async function fetchAllUser() {
        let res = await fetch("http://localhost:8080/api/users", {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await res.json();
        return response;
    }

    useEffect(() => {
        fetchAllUser().then(response => {
            if (response.code === 200) {
                // toast.success(response.message);
                setResponseData(response.data);
            } else {
                toast.error(response.message);

            }
        })
    }, [render]);


    const resetHandler = () => {
        setUserName('');
        setUserEmail('');
        setUserMobile('');
        setUserPassword('');
        setUserConfirmPassword('');
        setUserRole('');
        setUserId('');
    }


    const isInputEmpty = () => {

        if (userName === "") {
            userNameRef.current.focus();
            return false;
        } else if (userEmail === "") {
            userEmailRef.current.focus();
            return false;
        } else if (userMobile === "") {
            userMobileRef.current.focus();
            return false;
        } else if (userMobile.length <= 9) {
            alert('error length is small');
            return false;
        } else if (userPassword === "") {
            userPasswordRef.current.focus();
            return false;
        } else if (userConfirmPassword === "") {
            userConfirmPasswordRef.current.focus();
            return false;
        } else if (userRole === '') {
            userRoleRef.current.focus();
            setUserRoleErr(true);
            return false;
        }
        return true;
    }



    async function fetchdeleteUser(id) {
        let res = await fetch("http://localhost:8080/api/users/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            },
            // body: JSON.stringify(id)
        });
        const response = await res.json();
        return response;
    }


    const deleteHandler = (id) => {
        console.log(id)
        fetchdeleteUser(id).then(response => {
            if (response.code === 200) {

                toast.success(response.message);
                setRender(!render);
            } else {
                toast.error(response.message);

            }
        })

    }

    return (
        <>
            <ToastContainer theme="dark"  position={toast.POSITION.BOTTOM_RIGHT}></ToastContainer>
            {auth === null ? <h2>session expire</h2> :
                <div>
                    <Container className="my-4 border">

                        <Row  >
                            <Col >
                                <h1 >
                                    Admin register
                                </h1>
                            </Col>
                        </Row>


                        <hr></hr>
                        <Form >

                            <Table hover cellSpacing={5} cellPadding={5}>

                                <thead>
                                    <tr>

                                        <th>Full Name</th>
                                        <th> Email</th>
                                        <th>Mobile Number</th>
                                        <th>Password</th>
                                        <th>Confirm Password</th>
                                        <th>Role</th>
                                        <th>Register</th>
                                        <th>Cancel</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>

                                        <td>
                                            <Form.Control
                                                type="text"
                                                placeholder="full-name"
                                                required
                                                hasvalidation="true"
                                                name="fullName"
                                                value={userName}
                                                onChange={fullNameHandler}
                                                ref={userNameRef}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="email"
                                                placeholder="name@example.com"
                                                required
                                                name="email"
                                                value={userEmail}
                                                onChange={onEmailHandler}
                                                ref={userEmailRef}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder="0123456789"
                                                required
                                                name="mobileNumber"
                                                value={userMobile}
                                                onChange={onMobileHandler}
                                                ref={userMobileRef}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="password"
                                                placeholder="password"
                                                required
                                                name="password"
                                                value={userPassword}
                                                onChange={onPasswordHandler}
                                                ref={userPasswordRef}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="password"
                                                placeholder="confirm-password"
                                                required
                                                name="confirmPassword"
                                                value={userConfirmPassword}
                                                onChange={onConfirmPasswordHandler}
                                                ref={userConfirmPasswordRef}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                as="select"
                                                required
                                                name="role"
                                                value={userRole}
                                                onChange={onRoleHandler}
                                                ref={userRoleRef}
                                            >
                                                <option value="">select</option>
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </Form.Control>

                                        </td>

                                        <td>
                                            <Button
                                                variant="outline-success"
                                                type="button"
                                                onClick={onclickHandler}>
                                                Register
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-danger"
                                                type="button"
                                                onClick={resetHandler}
                                            ><ImCancelCircle />
                                            </Button>
                                        </td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <td style={style}>{userNameErr ? 'Number not allowed' : ""}</td>
                                        <td style={style}>{userEmailErr ? 'Not valid' : ""}</td>
                                        <td style={style}>{userMobileErr ? '*' : " "}</td>
                                        <td style={style}>{userPasswordErr ? 'length > 5' : " "}</td>
                                        <td style={style}>{userConfirmPasswordErr ? 'password not match' : " "}</td>
                                        <td style={style}>{userRoleErr ? 'empty ' : " "}</td>
                                        <td colSpan={2}>{message}</td>
                                        <td></td>
                                    </tr>

                                </tbody>


                                <tbody>
                                    {
                                        responseData.map(user =>
                                            <tr key={user.userId}>
                                                <td>{user.userId}</td>
                                                <td>{user.userName}</td>
                                                <td>{user.userEmail}</td>
                                                <td>{user.userMobile}</td>
                                                <td>********</td>
                                                <td>********</td>
                                                <td>{user.userRole}</td>
                                                <td>
                                                    <Button
                                                        variant="outline-success"
                                                        type="button"
                                                        onClick={() => editHandler(user)}
                                                    >Edit</Button>

                                                </td>
                                                <td>
                                                    <Button
                                                        variant="outline-danger"
                                                        type="button"
                                                        onClick={() => deleteHandler(user.userId)}
                                                    >Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                    }


                                </tbody>

                            </Table>
                        </Form>
                        
                    </Container>

                </div>
    }
        </>
    );
}


