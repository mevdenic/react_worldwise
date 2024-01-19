import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "../App.css";
import { Product } from "../pages/Product";
import { Homepage } from "../pages/Homepage";
import { Pricing } from "../pages/Pricing";
import { PageNotFound } from "../pages/PageNotFound";
import { Login } from "../pages/Login";
import { AppLayout } from "../pages/AppLayout";
import { CityList } from "./CityList";
import { City } from "./City";
import { Form } from "./Form";
import { CountryList } from "./CountryList";
import { CitiesProvider } from "../context/CitiesContext";

function App() {
    return (
        <CitiesProvider>
            <BrowserRouter basename="/react_worldwise">
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path="product" element={<Product />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="login" element={<Login />} />
                    <Route path="app" element={<AppLayout />}>
                        <Route index element={<Navigate replace to="cities" />} />

                        <Route path="cities" element={<CityList />} />
                        <Route path="cities/:id" element={<City />} />
                        <Route path="countries" element={<CountryList />} />
                        <Route path="form" element={<Form />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </CitiesProvider>
    );
}

export default App;
