import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Pricing from "./pages/Pricing.jsx";
import Login from "./pages/Login.jsx";
import AppLayout from "./pages/AppLayout.jsx";

export default function App() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/"
                               element={<Homepage/>}/>
                        <Route path="product"
                               element={<Product/>}/>
                        <Route path="pricing"
                               element={<Pricing/>}/>
                        <Route path="login"
                               element={<Login/>}/>
                        <Route path="app"
                               element={<AppLayout/>}/>
                        <Route path="*"
                               element={<PageNotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}