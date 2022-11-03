import { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../authcontext/authcontext";

export default function AdminHome() {
    const { auth } = useContext(AuthContext);
    console.log(auth);

    return (

        <Container className="my-4">
            <section>
                {auth === null ? <h2>session expire</h2> :

                    <h1> Welcome To Admin Home</h1>
                }
            </section>
        </Container>
    )
}