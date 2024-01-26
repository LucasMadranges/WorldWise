import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

export default function App() {
    return (
        <>
            <div>
                <h1>hello router!</h1>

                <BrowserRouter>
                    <Routes>
                        <Route path="/"
                               element={<Homepage/>}/>
                        <Route path="product"
                               element={<Product/>}/>
                        <Route path="pricing"
                               element={<Pricing/>}/>
                        <Route path="*"
                               element={<PageNotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}