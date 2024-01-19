import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const tempData = [
    {
        cityName: "Lisbon",
        country: "Portugal",
        emoji: "🇵🇹",
        date: "2027-10-31T15:59:59.138Z",
        notes: "My favorite city so far!",
        position: {
            lat: 38.727881642324164,
            lng: -9.140900099907554,
        },
        id: 73930385,
    },
    {
        cityName: "Madrid",
        country: "Spain",
        emoji: "🇪🇸",
        date: "2027-07-15T08:22:53.976Z",
        notes: "",
        position: {
            lat: 40.46635901755316,
            lng: -3.7133789062500004,
        },
        id: 17806751,
    },
    {
        cityName: "Berlin",
        country: "Germany",
        emoji: "🇩🇪",
        date: "2027-02-12T09:24:11.863Z",
        notes: "Amazing 😃",
        position: {
            lat: 52.53586782505711,
            lng: 13.376933665713324,
        },
        id: 98443197,
    },
];

const BASE_URL = "http://localhost:8000/cities";

export function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(function () {
        setCities(tempData);
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

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
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
