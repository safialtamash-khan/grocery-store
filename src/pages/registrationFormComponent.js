import { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Form, Container, Button } from "react-bootstrap";
import Layout from "./Layout";

export default function RegistrationFormComponent() {

    const spanStyle = {
        color: "red",
        fontWeight: "bold"
    }

    // useState forhtml inputs

    const [staffName, setStaffName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPasssword] = useState('');
    const [message , setMessage]=useState('');



    // usestate forhtml validation

    const [staffNameErr, setStaffNameErr] = useState(false);
    const [mobileNumberErr, setMobileNumberErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);


    const btnSpace = {
        'margin': '10px',
        'paddding': '10px'
    }

    const resetHandler = () => {

        setStaffName('');
        setMobileNumber('');
        setEmail('');
        setPassword('');
        setConfirmPasssword('');
    }

    const staffNameHandler = (e) => {
        const value = e.target.value;

        setStaffNameErr(false);
        const Regex = /[^A-Z a-z]/;
        if (Regex.test(value)) {
            setStaffNameErr(true);
        } else {
            setStaffName(value);
        }
    }

    const MobileHandler = (e) => {
        const value = e.target.value;
        setMobileNumberErr(false);
        const NumRegex = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{11}\s*,?$/;
    
        if (NumRegex.test(value)) {
            setMobileNumberErr(true);
        } else {
            setMobileNumber(value);
            console.log(mobileNumber.length)
        }
    }

    const emailHandler = (e) => {
        const value = e.target.value;
        setEmailErr(false);
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{4,6}$/i;
        if (emailRegex.test(value)) {
            setEmailErr(true);
        } else {
            setEmail(value);
        }
    }

    const passwordHandler = (e) => {
        const value = e.target.value;
        setPasswordErr(false);
        setPassword(value);

        if (value.length <= 8) {
            setPasswordErr(true);
        }
    }

    const confirmPasswordHandler = (e) => {
        const value = e.target.value;
        setConfirmPasssword(value);

    }

    useEffect(() => {
        setConfirmPasswordErr(false);
        if (password !== confirmPassword) {
            setConfirmPasswordErr(true);
        }

    }, [password, confirmPassword])



    const registerHandler = () => {

        if ((isInputEmpty()) === true) {
            const InputData = {
                'userName': staffName,
                'userMobile': mobileNumber,
                'userEmail': email,
                'userPassword': password,
                'userConfirm':confirmPassword,
                'userRole':false
            }
            fetch("http://192.168.1.38:8080/api/users" , {
                method:"POST",
                headers:{
                    "Content-type":'application/json'
                },
                body:JSON.stringify(InputData)
            }).then(res=>res.json()).then(response=>{
                if (response.code===201) {
                    setMessage(response.message);
                    resetHandler();
                }else{
                    setMessage(response.message);
                }
            });
        }
    }

    // let nameRef = useRef(null);
    // let mobileRef = useRef(null);
    // let emailRef = useRef(null);
    // let passwordRef = useRef(null);
    // let confirmRef = useRef(null);


    let isInputEmpty = () => {

        if (staffName === "") {
            // nameRef.current.focus();
            alert('error name is empty');
            return false;
        } else if (mobileNumber === "") {
            // mobileRef.current.focus();
            alert('error mobile is empty');
            return false;
        } else if (mobileNumber.length <= 9) {
            // mobileRef.current.focus();
            alert('error length is small');
            return false;
        } else if (email === "") {
            // emailRef.current.focus();
            alert('error email is empty');
            return false;
        } else if (password === "") {
            // passwordRef.current.focus();
            alert('error password  is empty');
            return false;
        } else if (confirmPassword === "") {
            // confirmRef.current.focus();
            alert('confirm password is empty');
            return false;
        }
        return true;

    }

    return (
        <>
            {/* <Layout /> */}
            <Container className='w-50 border mb-4 my-4 p-4'>
                <Form>
                    <Row>
                        <Col><h2 align='center'>staff registration form</h2></Col>
                        <hr />
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    name="staffName"
                                    id='staffName'
                                    type="text"
                                    placeholder="Full Name"
                                    value={staffName}
                                    onChange={staffNameHandler}
                                />
                                <Form.Text>
                                    <span style={spanStyle}>{staffNameErr ? '*' : " "}</span>
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="mobileNumber"
                                    placeholder="Enter Mobile Number"
                                    value={mobileNumber}
                                    onChange={MobileHandler}
                                />
                                <Form.Text>
                                    <span style={spanStyle} > {mobileNumberErr ? "*" : " "} </span>
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3"  >
                                <Form.Label> Email</Form.Label>
                                <Form.Control
                                    name='staffEmail'
                                    id='staffEmail'
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={emailHandler}
                                />
                                <Form.Text>
                                    <span style={spanStyle} > {emailErr ? "*" : " "}</span>
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3"  >
                                <Form.Label> Create Password</Form.Label>
                                <Form.Control
                                    name="createPassword"
                                    id='createPassword'
                                    type="text"
                                    placeholder="create Password "
                                    value={password}
                                    onChange={passwordHandler}
                                />
                                <Form.Text>
                                    <span style={spanStyle} >{passwordErr ? "*" : " "} </span>
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3"  >
                                <Form.Label> Confirm  Password</Form.Label>
                                <Form.Control
                                    name="ConfirmPassword"
                                    id='ConfirmPassword'
                                    type="text"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={confirmPasswordHandler}
                                />
                                <Form.Text>
                                    <span style={spanStyle} >{confirmPasswordErr ? "not match" : " "} </span>
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button style={btnSpace} type="button" variant="primary" onClick={registerHandler}>Submit</Button>
                            <Button type="reset" variant="danger" onClick={resetHandler} >cancel</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {message}
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
}
