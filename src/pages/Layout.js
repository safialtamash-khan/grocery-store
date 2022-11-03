// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
import { useContext } from 'react';
import { AuthContext } from '../authcontext/authcontext';
import Navbar3 from '../navBar3';
import Navbar1 from './navBar1';
import Navbar2 from './navBar2';

export default function Layout() {

  const {auth} = useContext(AuthContext);

  return (
    <>
        { 
          auth === null ? <Navbar1></Navbar1> :  auth.userRoles ==="admin" ? <Navbar2></Navbar2> : <Navbar3></Navbar3>  
        }
      </>
  );
} 
