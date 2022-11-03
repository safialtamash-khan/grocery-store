import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Outlet , Link} from 'react-router-dom';

export default function Navbar3(){

    return(

        // <Navbar bg="dark" variant="dark">
        <Container>    
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/billing">User Billing</Nav.Link>
            <Nav.Link as={Link} to="/invoice">Invoice </Nav.Link>
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          </Nav>
          <Outlet></Outlet>

        </Container>
      // </Navbar>
    );
} 