import {createContext, useContext, useEffect, useState} from "react";

const CitiesContext = createContext()

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error('CitiesContext was used outside the CitiesProvider');
    return context;
}

function CitiesProvider({children}) {
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
        <CitiesContext.Provider value={{cities, isLoading}}>
            {children}
        </CitiesContext.Provider>
    )
}

export {CitiesProvider, useCities}