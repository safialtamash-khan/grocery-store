import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../authcontext/authcontext';

export default function Invoice() {

    const [responseData, setResponseData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [showDetails, setShowDetails] = useState([]);
    const [productData, setProductData] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [showTable, setShowTable] = useState(true);
    // const [render , setRender] = useState(true);

    const { auth } = useContext(AuthContext)


    let showTableData = () => {
        setShowTable(!showTable);
    }


    async function fetchCustomerData() {

        let res = await fetch("http://localhost:8080/api/customers", {
            "method": 'GET',
            header: {
                "Content-Type": "application/json"
            }
        });
        const response = await res.json();
        return response;
    }

    useEffect(
        () => {
            fetchCustomerData().then(response => {
                if (response.code === 200) {
                    setResponseData(response.data);
                    setDisplayData(response.data);
                    console.log(displayData);
                }
                else {
                    console.log(response.message);
                }
            });
        }, []);

    const viewDetails = (data, productlist) => {
        showTableData();
        setShowDetails(data);
        // console.log(data.productList);
        setProductData(productlist);
        setTotalCost(productlist.reduce((total, product) => {
            return total + product.productQuantity * product.productPrice
        }, 0));
        // responseData.forEach(customer =>{
        //     setTotalCost(customer.productList.reduce((total , product) => {
        //     setTotalCost(productlist.reduce((total , product) => {
        //         return total + product.productQuantity * product.productPrice
        //     }, 0));
        // });
        // setRender(!render);
    }


    return (

        <>
        
            <Container className="my-4 border">
                {auth === null ? <h2>session expired</h2> :
                    <div>
                        <Form>
                            {showTable === false ?
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Customer Name</th>
                                            <th>Customer Number</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>
                                                <Button variant="outline-danger" onClick={() => setShowTable(!showTable)}>
                                                    close
                                                </Button>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>

                                            <td>{showDetails.customerName}</td>
                                            <td>{showDetails.customerMobile}</td>
                                            <td></td>
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

                                    {
                                        productData.map((product) => (
                                            <tr>
                                                <td>{product.productName}</td>
                                                <td>{product.productCategory}</td>
                                                <td>{product.productSubCategory}</td>
                                                <td>{product.productQuantity}</td>
                                                <td>{product.productPrice}</td>
                                                <td>{product.productQuantity * product.productPrice}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td>
                                            TOTAL COST : {totalCost}
                                        </td>
                                    </tr>
                                </Table>
                                : <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>
                                                Customer Name
                                            </th>
                                            <th>
                                                Customer Number
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <thead>
                                        {
                                            responseData.map((customer) => (
                                                <tr key={customer.customerId}>
                                                    <th>
                                                        {customer.customerName}
                                                    </th>
                                                    <th>
                                                        {customer.customerMobile}
                                                    </th>
                                                    <td>
                                                        <Button variant="outline-info" onClick={() => viewDetails(customer, customer.productList)}>
                                                            Info
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </thead>
                                </Table>}
                        </Form>
                    </div>
                 } 
            </Container>
        </>
    );

}