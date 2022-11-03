import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Outlet , Link} from 'react-router-dom';

export default function Navbar2(){

    return(

        // <Navbar bg="dark" variant="dark">
        <Container>    
          <Nav bg="dark" variant="dark" className="me-auto">
            <Nav.Link   as={Link} to="/adminRegister">Admin Register</Nav.Link>
            <Nav.Link as={Link} to="/adminProducts">Admin Products</Nav.Link>
            <Nav.Link as={Link} to="/invoice">Invoice </Nav.Link>
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          </Nav>
          <Outlet></Outlet>
          
        </Container>
      // </Navbar>
    );
} 