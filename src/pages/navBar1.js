import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Outlet , Link} from 'react-router-dom';


export default function Navbar1(){

    return(

      
        // <Navbar bg="dark" variant="dark">
        <Container>
          {/* <Navbar.Brand href="/" >Navbar</Navbar.Brand> */}
          <Nav className="me-auto">
            <Nav.Link  as={Link} to="/home" >Home</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            {/* <Nav.Link href="/registration">Registration</Nav.Link> */}
            <Nav.Link as={Link} to="/logout" >Logout</Nav.Link>
          </Nav>
          <Outlet></Outlet>
        </Container>
      // </Navbar>
    );
} 