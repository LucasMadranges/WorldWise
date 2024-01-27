import styles from './CountryList.module.css'
import Spinner from "../Spinner/Spinner.jsx";
import Message from "../Message/Message.jsx";
import CountryItem from "./CountryItem.jsx";
import {useCities} from "../../contexts/CitiesContext.jsx";

export default function CountryList() {
    const {cities, isLoading} = useCities();

    if (isLoading) return <Spinner/>

    if (!cities.length) return <Message message='Add your first city by clicking on a city on the map'/>

    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country)) {
            return [...arr, {country: city.country, emoji: city.emoji}]
        } else {
            return arr;
        }
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country, index) => <CountryItem country={country}
                                                            key={index}/>)}
        </ul>
    )
}