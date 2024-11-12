import {createContext, useContext, useEffect, useReducer} from "react";

const CitiesContext = createContext();

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContext was used outside the CitiesProvider");
    return context;
}

const BASE_URL = "http://localhost:8000/";

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true,
            };
        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };
        case "city/loaded":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };
        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };
        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload),
            };
        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            throw new Error("Unknown action type");
    }
}

function CitiesProvider({children}) {
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        async function fetchCities() {
            dispatch({type: "loading"});
            try {
                const resp = await fetch(`${BASE_URL}cities`);
                const data = await resp.json();
                dispatch({type: "cities/loaded", payload: data});
            } catch (error) {
                dispatch({type: "rejected", payload: "There was an error loading data"});
            }
        }

        fetchCities();
    }, []);

    async function getCity(id) {
        if (+id === currentCity.id) return;

        dispatch({type: "loading"});
        try {
            const resp = await fetch(`${BASE_URL}cities/${id}`);
            const data = await resp.json();
            dispatch({type: "city/loaded", payload: data});
        } catch (error) {
            dispatch({type: "rejected", payload: "There was an error get data"});
        }
    }

    async function createCity(newCity) {
        dispatch({type: "loading"});
        try {
            const resp = await fetch(`${BASE_URL}cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await resp.json();

            dispatch({type: "city/created", payload: newCity});
        } catch (error) {
            dispatch({type: "rejected", payload: "There was an error create data"});
        }
    }

    async function deleteCity(id) {
        dispatch({type: "loading"});
        try {
            const resp = await fetch(`${BASE_URL}cities/${id}`, {
                method: "DELETE",
            });

            dispatch({type: "city/deleted", payload: id});
        } catch (error) {
            dispatch({type: "rejected", payload: "There was an error delete data"});
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            error,
            getCity,
            createCity,
            deleteCity,
        }}>
            {children}
        </CitiesContext.Provider>
    );
}

export {CitiesProvider, useCities};