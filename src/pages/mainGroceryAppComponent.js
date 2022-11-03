import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginFormComponent from "./loginFormComponent";
import RegistrationFormComponent from "./registrationFormComponent";
import NoPage from "./NoPage";
import HomeComponent from "./home";
import Logout from "./logout";
import AdminRegister from "./adminPages/adminRegistration";
import AdminProducts from "./adminPages/adminProducts";
import AdminHome from "./adminPages/home";
import UserBilling from "./staffPages/userBilling";
import Invoice from "./invoce";
import SatffHome from "./staffPages/home";
import Layout from "./Layout";


export default function MainGroceryApp() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />} >
                        <Route path="home" element={<HomeComponent />} />
                        <Route path="login" element={<LoginFormComponent />} />
                        <Route path="registration" element={<RegistrationFormComponent />} />
                        <Route path="adminProducts" element={<AdminProducts />} />
                        <Route path="adminRegister" element={<AdminRegister />} />
                        <Route path="adminHome" element={<AdminHome />} />
                        <Route path="logout" element={<Logout />} />
                        <Route path="*" element={<NoPage />} />
                        <Route path="billing" element={<UserBilling />} />
                        <Route path="Invoice" element={<Invoice />} />
                        <Route path="staffhome" element={<SatffHome />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}