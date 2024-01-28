import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
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
import { AuthProvider } from "../context/FakeAuthContext";
import { ProtectedRoute } from "../pages/ProtectedRoute";

//FOR THE APP TO WORK YOU NEED TO START AN ALREADY SET UP LOCAL SERVER BY TYPING IN THE TERMINAL "npm run server"

function App() {
    return (
        <CitiesProvider>
            <AuthProvider>
                <HashRouter>
                    <Routes>
                        <Route index element={<Homepage />} />
                        <Route path="product" element={<Product />} />
                        <Route path="pricing" element={<Pricing />} />
                        <Route path="login" element={<Login />} />
                        <Route
                            path="app"
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Navigate replace to="cities" />} />

                            <Route path="cities" element={<CityList />} />
                            <Route path="cities/:id" element={<City />} />
                            <Route path="countries" element={<CountryList />} />
                            <Route path="form" element={<Form />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </HashRouter>
            </AuthProvider>
        </CitiesProvider>
    );
}

export default App;
