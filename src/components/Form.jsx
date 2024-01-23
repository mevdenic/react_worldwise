import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { Message } from "./Message";
import { Spinner } from "./Spinner";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../context/CitiesContext";

function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function Form() {
    const navigate = useNavigate();
    const [lat, lng] = useUrlPosition();
    const { addCity, isLoading } = useCities();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [emoji, setEmoji] = useState("");
    const [geocodingError, setGeocodingError] = useState("");

    useEffect(
        function () {
            if (!lat && !lng) return;
            async function fetchCityData() {
                try {
                    setIsLoadingGeocoding(true);
                    setGeocodingError("");
                    const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                    const data = await res.json();
                    setCityName(data.city || data.locality || "");
                    setCountry(data.countryName);
                    setEmoji(convertToEmoji(data.countryCode));
                    if (!data.countryCode) {
                        throw new Error("That doesn't seem to be a city. Click somewhere else.");
                    }
                } catch (err) {
                    setGeocodingError(err.message);
                    console.error(err.message);
                } finally {
                    setIsLoadingGeocoding(false);
                }
            }
            fetchCityData();
        },
        [lat, lng]
    );

    async function handleSubmit(e) {
        e.preventDefault();
        if (!cityName || !date) return;
        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: { lat, lng },
        };
        await addCity(newCity);
        navigate("/app");
    }

    if (isLoadingGeocoding) return <Spinner />;
    if (!lat && !lng) return <Message message="Start by clicking somewhere on the map!" />;
    if (geocodingError) return <Message message={geocodingError}></Message>;
    return (
        <form
            className={`${styles.form} ${isLoading ? styles.loading : ""}`}
            onSubmit={handleSubmit}
        >
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji || ""}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <ReactDatePicker
                    id="date"
                    onChange={(date) => setDate(date)}
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <Button
                    type="back"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }}
                >
                    &larr; Back
                </Button>
            </div>
        </form>
    );
}
