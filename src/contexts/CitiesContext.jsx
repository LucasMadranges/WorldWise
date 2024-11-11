import {createContext, useContext, useEffect, useState} from "react";

const CitiesContext = createContext();

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContext was used outside the CitiesProvider");
    return context;
}

const BASE_URL = "http://localhost:8000/";

function CitiesProvider({children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const resp = await fetch(`${BASE_URL}cities`);
                const data = await resp.json();
                setCities(data);
            } catch (error) {
                throw new Error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true);
            const resp = await fetch(`${BASE_URL}cities/${id}`);
            const data = await resp.json();
            setCurrentCity(data);
        } catch (error) {
            throw new Error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const resp = await fetch(`${BASE_URL}cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await resp.json();

            setCities(cities => [...cities, data]);
        } catch (error) {
            throw new Error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true);
            const resp = await fetch(`${BASE_URL}cities/${id}`, {
                method: "DELETE",
            });

            setCities(cities => cities.filter(city => city.id !== id));
        } catch (error) {
            throw new Error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity,
        }}>
            {children}
        </CitiesContext.Provider>
    );
}

export {CitiesProvider, useCities};