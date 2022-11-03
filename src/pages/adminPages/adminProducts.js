
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

export default function AdminProducts() {

    const {auth} = useContext(AuthContext);


    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [productStock, setProductStock] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [responseData, setResponseData] = useState([]);
    const [render, setRender] = useState('');
    const [productId, setProductId] = useState('');




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

    const stockHandler = e => {
        let value = e.target.value;
        setProductStock(value);
    }


    async function fetchInsertDetails(request) {
        let res = await fetch("http://localhost:8080/api/products", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(request)
        });
        const response = res.json();
        return response;
    }


    const fetchProductsData = () => {
        let productData = {
            productName: productName,
            productCategory: category,
            productSubCategory: subCategory,
            productStock: productStock,
            productPrice: productPrice
        }
        fetchInsertDetails(productData).then(response => {
            if (response.code === 201) {

                toast.success(response.message);
                resetHandler();
                setRender(!render);
            }
            else {

                toast.error(response.message);

            }
        });
    }

    const submitHandler = e => {
        e.preventDefault();
        if (inputsEmpty() === true) {

            if (productId === "") {
                fetchProductsData();
            } else {
                updateHandler();
            }

        }
        else {
            toast.error("some thing is missing");
        }
    }


    const edirHandler = (product) => {
        setProductName(product.productName);
        setCategory(product.productCategory);
        setSubCategory(product.productSubCategory);
        setProductStock(product.productStock);
        setProductPrice(product.productPrice);
        setProductId(product.productId);
    }

    async function fetchUpdateProduct(data) {
        let res = await fetch("http://localhost:8080/api/products", {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let response = await res.json();
        return response;

    }

    const updateHandler = () => {
        let productData = {
            productName: productName,
            productCategory: category,
            productSubCategory: subCategory,
            productStock: productStock,
            productPrice: productPrice,
            productId: productId
        }
        fetchUpdateProduct(productData).then(response => {
            if (response.code === 200) {

                toast.success(response.message);

                setRender(!render);
            }
            else {

                toast.error(response.message);

            }
        });
    }



    async function fetchAllProducts() {
        let res = await fetch("http://localhost:8080/api/products", {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            }
        });
        const response = await res.json();
        return response;
    }

    useEffect(() => {
        fetchAllProducts().then(response => {
            if (response.code === 200) {
                setResponseData(response.data);
                // toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        })
    }, [render])

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
        } else if (productStock === "") {
            productStockRef.current.focus();
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
    const productStockRef = useRef();
    const productPriceRef = useRef();

    const resetHandler = () => {
        setProductName("");
        setCategory("");
        setSubCategory('');
        setProductStock('');
        setProductPrice('');
        setProductId("");
    }


    async function fetchDeletProduct(id) {
        let res = await fetch("http://localhost:8080/api/products/" + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            },
        });
        let response = await res.json();
        return response;

    }

    const deleteHandler = id => {
        console.log(id);
        fetchDeletProduct(id).then(response => {
            if (response.code === 200) {

                toast.success(response.message);
                setRender(!render);
            }
            else {

                toast.error(response.message);
            }
        });
    }

    return (
        <>
            <ToastContainer theme="dark" position={toast.POSITION.BOTTOM_RIGHT} > </ToastContainer>
            
            {auth === null ? <h2>session expire</h2> : 
            <div >
                <Container className="my-4 border">
                    <Row  >
                        <Col >
                            <h1 >
                                Admin Product
                            </h1>
                        </Col>
                    </Row>


                    <hr></hr>
                    <Form>

                        <Table hover>

                            <thead>
                                <tr>
                                    <th> Name</th>
                                    <th>  Category</th>
                                    <th> Sub-Category </th>
                                    <th> Stock</th>
                                    <th> Price</th>
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
                                            placeholder="Stock"
                                            required
                                            name="productStock"
                                            value={productStock}
                                            onChange={stockHandler}
                                            ref={productStockRef}
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
                                    <td></td>
                                </tr>

                                <tr>

                                </tr>

                            </tbody>


                            <tbody>


                                {
                                    responseData.map(product => {
                                        return (<>
                                            <tr key={product.productId}>

                                                <td>{product.productId}</td>
                                                <td>{product.productName}</td>
                                                <td>{product.productCategory}</td>
                                                <td>{product.productSubCategory}</td>
                                                <td>{product.productStock}</td>
                                                <td>{product.productPrice}</td>
                                                <td>
                                                    <Button
                                                        variant="outline-success"
                                                        type="button"
                                                        onClick={() => edirHandler(product)}
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


                                {/* <tr>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>********</td>
                                    <td>********</td>
                                    <td>
                                        <Button
                                            variant="outline-success"
                                            type="submit"
                                        // onClick={editHandler}
                                        >{<BsPencilSquare />}</Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="outline-danger"
                                            type="submit"
                                        // onClick={() => deleteHandler(userId)}
                                        >{<MdDeleteForever />}</Button>
                                    </td>
                                </tr> */}

                            </tbody>

                        </Table>
                    </Form>

                </Container>
            </div>
   } 
        </>
    );
}