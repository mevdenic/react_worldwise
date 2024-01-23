import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000/cities";

export function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}`);
                const data = await res.json();
                setCities(data);
            } catch {
                alert("There was an error loading data.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch {
            alert("There was an error loading data.");
        } finally {
            setIsLoading(false);
        }
    }

    async function addCity(newCity) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setCities([...cities, data]);
        } catch {
            alert("There was an error adding city.");
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true);
            await fetch(`${BASE_URL}/${id}`, {
                method: "DELETE",
            });
            setCities((cities) => cities.filter((city) => city.id !== id));
        } catch {
            alert("There was an error deleting city.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                addCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

export function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContext was used outside of provider.");
    return context;
}
