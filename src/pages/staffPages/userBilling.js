

import { Form, Row, Col, Button } from "react-bootstrap"
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { ImCancelCircle } from "react-icons/im";
import { MdDone } from "react-icons/md";
import { useContext, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../authcontext/authcontext";



const style = {
    color: "red"
}


export default function UserBilling() {

    const { auth } = useContext(AuthContext);

    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productList, setProductList] = useState([]);
    const [render, setRender] = useState('');
    const [productId, setProductId] = useState('');



    //////change table //////
    const [table, setTable] = useState(false);

    //////////////////////customer state //////////////////////

    const [customerName, setCustomerName] = useState('');
    const [customerNumber, setCustomerNumber] = useState('');
    const [displayData, setDisplayData] = useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [generateTable, setGenerateTable] = useState(true);

    const [productNameErr, setProductNameErr] = useState(false);

    const Category = ['select the category', 'basket', 'freezer'];
    const basketCategoryArr = ['select', 'Vegetables', 'Fruites'];
    const frezeerCategoryArr = ['select', 'Drinks', 'Juices'];
    const selectArr = ['select the category'];


    const nameHandler = e => {

        let value = e.target.value;
        setProductNameErr(false);
        const Regex = /[^A-Za-z]/;
        if (Regex.test(value)) {
            setProductNameErr(true);
        } else {
            setProductName(value);
        }
    }

    const categoryHandler = e => {
        setCategory(e.target.value);
    }

    const subCategoryHandler = e => {
        setSubCategory(e.target.value);
    }

    const priceHandler = e => {
        let value = e.target.value;
        setProductPrice(value);
    }

    const QuantityHandler = e => {
        let value = e.target.value;
        setProductQuantity(value);
    }



    useEffect(() => {
        setProductList(productList);
    }, [productList]);


    const submitHandler = e => {
        e.preventDefault();
        if (inputsEmpty() === true) {

            let productData = {
                productId: productList.length + 1,
                productName: productName,
                productCategory: category,
                productSubCategory: subCategory,
                productQuantity: productQuantity,
                productPrice: productPrice,

            }
            if (productId === "" || productId === undefined) {
                productList.push(productData);
                console.log(productList)

            }
            else {
                let productData1 = {
                    productName: productName,
                    productCategory: category,
                    productSubCategory: subCategory,
                    productQuantity: productQuantity,
                    productPrice: productPrice,
                    productId: productId,

                }
                const productIndex = productList.findIndex((product => product.productId === productId));
                productList[productIndex] = productData1;
            }
            setProductList(productList);
            resetHandler();
        }
        else {
            toast.error("some thing is missing");
        }
    }


    const editHandler = (product) => {
        setProductName(product.productName);
        setCategory(product.productCategory);
        setSubCategory(product.productSubCategory);
        setProductQuantity(product.productQuantity);
        setProductPrice(product.productPrice);
        setProductId(product.productId);

    }



    const deleteHandler = (productId) => {

        const productIndex = productList.findIndex((product => product.Id === productId));
        productList.splice(productIndex, 1);
        setProductList(productList);
        setRender(!render);
        resetHandler();
    }

    const inputsEmpty = () => {

        if (productName === "") {
            productNameRef.current.focus();
            return false;
        } else if (category === "") {
            productCategoryRef.current.focus();
            return false;
        } else if (subCategory === "") {
            productSubCategoryRef.current.focus();
            return false;
        } else if (productQuantity === "") {
            productQuantityRef.current.focus();
            return false;
        } else if (productPrice === "") {
            productPriceRef.current.focus();
            return false;
        }
        return true;
    }

    const productNameRef = useRef();
    const productCategoryRef = useRef();
    const productSubCategoryRef = useRef();
    const productQuantityRef = useRef();
    const productPriceRef = useRef();

    const resetHandler = () => {
        setProductName("");
        setCategory("");
        setSubCategory('');
        setProductQuantity('');
        setProductPrice('');
        setProductId("");
    }


    //////////////////// customer ////////////////////


    const customerNameHandler = (e) => {
        let value = e.target.value;
        setCustomerName(value);
    }

    const customerNumberHandler = (e) => {
        let value = e.target.value;
        setCustomerNumber(value);
        if (value.length > 10) {
            toast.error("length");
        }
    }



    const changeState = () => {
        setTable(!table);
        setCustomerName('');
        setCustomerNumber('');
    }

    async function fethAllCustomerData(request) {

        let res = await fetch("http://localhost:8080/api/customers", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(request)
        });
        const response = res.json();
        return response;

    }

    const changeState2 = () => {
        setGenerateTable(!generateTable);
        setCustomerName('');
        setCustomerNumber('');
    }

    const generateHandler = () => {
        if (isCustomerInputsEmpty() === true) {
            const customerData = {
                customerName: customerName,
                customerMobile: customerNumber,
                productList: productList
            }
            console.log(customerData);

            fethAllCustomerData(customerData).then(response => {
                if (response.code === 201) {
                    setDisplayData(customerData);
                    toast.success(response.message);
                    setTotalCost(productList.reduce((total, product) => {
                        return total + product.productQuantity * product.productPrice;
                    }, 0));
                } else {
                    toast.error('opps something is wrong');
                }
            });
            changeState2();
        }
    }

    const isCustomerInputsEmpty = () => {
        if (customerName === "") {
            toast.error("name is empty ");
            return false;
        } else if (customerNumber === "") {
            toast.error("number is empty");
            return false;
        }
        return true;
    }


    return (
        <>
            <ToastContainer theme="dark" position={toast.POSITION.BOTTOM_RIGHT}> </ToastContainer>
            {auth === null ? <h2>session expire</h2> :
                <div >
                    <Container className="my-4 border">

                        <Row  >
                            <Col >
                                <h1 >
                                    Billing
                                </h1>
                            </Col>
                        </Row>


                        <hr></hr>
                        {table === true ? <div className="table2">
                            <Form>
                                {generateTable === true ?
                                    <Table responsive >
                                        <thead>
                                            <tr>
                                                <th>customer Name</th>
                                                <th>customer mobile</th>
                                                <th>Generate</th>
                                                <th>Cancel</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>


                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Name"
                                                        required
                                                        value={customerName}
                                                        onChange={customerNameHandler}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="mobile number"
                                                        required
                                                        name="customerNumber"
                                                        value={customerNumber}
                                                        onChange={customerNumberHandler}
                                                    />
                                                </td>

                                                <td>
                                                    <Button
                                                        variant="outline-success"
                                                        type="button"
                                                        onClick={generateHandler}>
                                                        Generate
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="outline-danger"
                                                        type="button"
                                                        onClick={changeState}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    :

                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Customer Name</th>
                                                <th>Customer Mobile</th>
                                                <th>Purchase Date</th>
                                                <th>
                                                    <Button
                                                        variant="outline-success"
                                                        type="button"
                                                        onClick={() => setGenerateTable(!generateTable)}>
                                                        Back
                                                    </Button>

                                                </th>
                                                <th></th>
                                                <th></th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {displayData.customerName}
                                                </td>
                                                <td>
                                                    {displayData.customerMobile}
                                                </td>
                                                <td>
                                                    {
                                                        new Date().toLocaleDateString()
                                                    }
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>

                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>category</th>
                                                <th>sub-Categoty</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                displayData.productList !== undefined && displayData.productList.map(
                                                    (product) => {
                                                        return (
                                                            <tr key={product.productId}>
                                                                <td>{product.productName}</td>
                                                                <td>{product.productCategory}</td>
                                                                <td>{product.productSubCategory}</td>
                                                                <td>{product.productQuantity}</td>
                                                                <td>{product.productPrice}</td>
                                                                <td>{product.productQuantity * product.productPrice}</td>
                                                            </tr>
                                                        )
                                                    }
                                                )
                                            }
                                            <tr>
                                                <td colSpan={6}>
                                                    Total : {totalCost}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                }
                            </Form>


                        </div>
                            :
                            <div className="table1">
                                <Form>
                                    <Table hover responsive>
                                        <thead>
                                            <tr>
                                                <th> Name</th>
                                                <th>  Category</th>
                                                <th> Sub-Category </th>
                                                <th> Quantity</th>
                                                <th> Price</th>
                                                <th>Register</th>
                                                <th>Cancel</th>
                                                <th>Order</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Product Name"
                                                        required
                                                        value={productName}
                                                        onChange={nameHandler}
                                                        ref={productNameRef}
                                                    />
                                                    <span style={style}>{productNameErr ? "*" : ''}</span>
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        as="select"
                                                        required
                                                        name="productCategroy"
                                                        value={category}
                                                        onChange={categoryHandler}
                                                        ref={productCategoryRef}
                                                    >
                                                        {
                                                            Category.map((item) => (
                                                                <option key={item}>{item}</option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        as="select"
                                                        required
                                                        name="productSubCategroy"
                                                        value={subCategory}
                                                        onChange={subCategoryHandler}
                                                        ref={productSubCategoryRef}
                                                    >
                                                        {
                                                            category === "basket" ? basketCategoryArr.map(
                                                                (item) => (<option key={item}>{item}</option>)) :
                                                                category === "freezer" ? frezeerCategoryArr.map(
                                                                    (item) => (<option key={item}>{item}</option>)) :
                                                                    selectArr.map((item) => (<option key={item}>{item}</option>))
                                                        }
                                                    </Form.Control>
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Quantity"
                                                        required
                                                        name="productQuantity"
                                                        value={productQuantity}
                                                        onChange={QuantityHandler}
                                                        ref={productQuantityRef}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="price"
                                                        required
                                                        name="productPrice"
                                                        value={productPrice}
                                                        onChange={priceHandler}
                                                        ref={productPriceRef}
                                                    />
                                                </td>


                                                <td>
                                                    <Button
                                                        variant="outline-success"
                                                        type="button"
                                                        onClick={submitHandler}
                                                    > {<MdDone />}
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
                                                <td>
                                                    <Button
                                                        variant="outline-success"
                                                        type="button"
                                                        onClick={changeState}
                                                    >
                                                        Order
                                                    </Button>
                                                </td>
                                            </tr>

                                        </tbody>

                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Sub-Category</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>


                                            {
                                                productList.map(product => {
                                                    return (<>
                                                        <tr key={product.productId}>

                                                            <td>{product.productId}</td>
                                                            <td>{product.productName}</td>
                                                            <td>{product.productCategory}</td>
                                                            <td>{product.productSubCategory}</td>
                                                            <td>{product.productQuantity}</td>
                                                            <td>{product.productPrice}</td>


                                                            <td>
                                                                <Button
                                                                    variant="outline-success"
                                                                    type="button"
                                                                    onClick={() => editHandler(product)}
                                                                >Edit</Button>

                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="outline-danger"
                                                                    type="button"
                                                                    onClick={() => deleteHandler(product.productId)}
                                                                >Delete</Button>
                                                            </td>
                                                        </tr>

                                                    </>);
                                                })
                                            }

                                        </tbody>

                                    </Table>
                                </Form>
                            </div>

                        }
                    </Container>
                </div>
             }  
        </>
    );
}