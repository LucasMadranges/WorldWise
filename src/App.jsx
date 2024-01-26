import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import PageNav from "./components/PageNav.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import AppNav from "./components/AppNav.jsx";

export default function App() {
    return (
        <>
            <div>
                <h1>hello router!</h1>

                <BrowserRouter>
                    <PageNav/>
                    <AppNav/>

                    <Routes>
                        <Route path="/"
                               element={<Homepage/>}/>
                        <Route path="product"
                               element={<Product/>}/>
                        <Route path="pricing"
                               element={<AppLayout/>}/>
                        <Route path="*"
                               element={<PageNotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}