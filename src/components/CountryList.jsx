import { CountryItem } from "./CountryItem";
import styles from "./CountryList.module.css";
import { Spinner } from "./Spinner";
import { Message } from "./Message";
import { useCities } from "../context/CitiesContext";

export function CountryList() {
    const { cities, isLoading } = useCities();
    if (isLoading) return <Spinner />;
    if (!cities.length)
        return <Message message="Add your first city by clicking on a city on the map." />;

    const countries = cities.reduce((arr, city) => {
        if (!arr.some((el) => el.country === city.country)) {
            return [...arr, { country: city.country, emoji: city.emoji }];
        } else return arr;
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country, i) => (
                <CountryItem country={country} key={country.country + i} />
            ))}
        </ul>
    );
}
