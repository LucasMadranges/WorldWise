import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {CitiesProvider} from "./contexts/CitiesContext.jsx";

import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Pricing from "./pages/Pricing.jsx";
import Login from "./pages/Login.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CityList from "./components/City/CityList.jsx";
import CountryList from "./components/Country/CountryList.jsx";
import City from "./components/City/City.jsx";
import Form from "./components/Form/Form.jsx";
import {AuthProvider} from "./contexts/FakeAuthContext.jsx";
import {ProtectedRoute} from "./pages/ProtectedRoute.jsx";

export default function App() {
    return (
        <>
            <AuthProvider>
                <CitiesProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route index
                                   element={<Homepage/>}/>
                            <Route path="product"
                                   element={<Product/>}/>
                            <Route path="pricing"
                                   element={<Pricing/>}/>
                            <Route path="login"
                                   element={<Login/>}/>
                            <Route path="app"
                                   element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
                                <Route index
                                       element={<Navigate replace
                                                          to="cities"/>}/>
                                <Route path="cities"
                                       element={
                                           <CityList/>
                                       }/>
                                <Route path="cities/:id"
                                       element={
                                           <City/>
                                       }/>
                                <Route path="countries"
                                       element={
                                           <CountryList/>
                                       }/>
                                <Route path="form"
                                       element={
                                           <Form/>
                                       }/>
                            </Route>
                            <Route path="*"
                                   element={<PageNotFound/>}/>
                        </Routes>
                    </BrowserRouter>
                </CitiesProvider>
            </AuthProvider>
        </>
    );
}