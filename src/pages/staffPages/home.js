import { useContext } from "react";
import { AuthContext } from "../../authcontext/authcontext";
import { Container } from 'react-bootstrap';

export default function SatffHome() {
    const { auth } = useContext(AuthContext);

    return (
        <Container className="my-4">


            <section>
                {auth === null ? <h2>session expire</h2> :

                    <h1> Satff Home</h1>
                }
            </section>
        </Container>
    )
}