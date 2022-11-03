import { useContext, useEffect } from "react";
import { AuthContext } from "../authcontext/authcontext";
import { Container } from 'react-bootstrap';

export default function Logout() {
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        setAuth(null);
    },
        [setAuth]);

    return (
        <>
            <Container className="my-4">
                <h1>You Have Been Logout</h1>
            </Container>

        </>);
}