import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Product from "./pages/Product.jsx";
import Homepage from "./pages/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Pricing from "./pages/Pricing.jsx";
import Login from "./pages/Login.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";

export default function App() {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const resp = await fetch(`http://localhost:8000/cities`);
                const data = await resp.json();
                setCities(data)
            } catch (error) {
                throw new Error(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCities();
    }, []);

    return (
        <>
            <div>
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
                               element={<AppLayout/>}>
                            <Route index
                                   element={<CityList cities={cities}
                                                      isLoading={isLoading}/>}/>
                            <Route path='cities'
                                   element={
                                       <CityList cities={cities}
                                                 isLoading={isLoading}/>
                                   }/>
                            <Route path='cities/:id'
                                   element={
                                       <City/>
                                   }/>
                            <Route path='countries'
                                   element={
                                       <CountryList cities={cities}
                                                    isLoading={isLoading}/>
                                   }/>
                            <Route path='form'
                                   element={
                                       <p>Form</p>
                                   }/>
                        </Route>
                        <Route path="*"
                               element={<PageNotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}