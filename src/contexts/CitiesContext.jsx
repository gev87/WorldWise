import { createContext, useCallback, useEffect, useReducer } from "react";
import { BASE_URL } from "../constants";
import { delay } from "../utils";

const CitiesContext = createContext();

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };
		case "cities/loaded":
			return { ...state, isLoading: false, cities: action.payload };
		case "city/loaded":
			return { ...state, isLoading: false, currentCity: action.payload };
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
				cities: state.cities.filter((city) => city.id !== action.payload),
				currentCity: {},
			};
		case "rejected":
			return { ...state, loading: false, error: action.payload };
		default:
			throw new Error("Unknown action type");
	}
}

function CitiesProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { cities, isLoading, currentCity, error } = state;

	const getCity = useCallback( async function(id) {
		if (id === currentCity.id) return;
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			await delay(500);
			const data = await res.json();
			dispatch({ type: "city/loaded", payload: data });
		} catch {
			dispatch({ type: "rejected", payload: "There was an error loading current city." });
		}
	},[currentCity.id])

	async function createCity(newCity) {
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: { "Content-Type": "application/json" },
			});
			await delay(500);
			const data = await res.json();
			dispatch({ type: "city/created", payload: data });
		} catch {
			dispatch({ type: "rejected", payload: "There was an error creating current city." });
		}
	}

	async function deleteCity(id) {
		dispatch({ type: "loading" });
		try {
			await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
			await delay(500);
			dispatch({ type: "city/deleted", payload: id });
		} catch {
			dispatch({ type: "rejected", payload: "There was an error on deleting city." });
		}
	}

	useEffect(() => {
		async function fetchCities() {
			dispatch({ type: "loading" });
			try {
				const res = await fetch(`${BASE_URL}/cities`);
				await delay(500);
				const data = await res.json();
				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({ type: "rejected", payload: "There was an error loading cities..." });
			}
		}
		fetchCities();
	}, []);

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				error,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

export { CitiesProvider, CitiesContext };
