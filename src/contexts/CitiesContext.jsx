import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { delay } from "../utils";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity,setCurrentCity] = useState({});

	useEffect(() => {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				await delay(500);
				const data = await res.json();
				setCities(data);
			} catch {
				alert("There was an error loading cities...");
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			await delay(500);
			const data = await res.json();
			setCurrentCity(data);
		} catch {
			alert("There was an error loading current city...");
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<CitiesContext.Provider
			value={{
				cities,
				setCities,
				isLoading,
				setIsLoading,
				currentCity,
				setCurrentCity,
				getCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}



export { CitiesProvider, CitiesContext };
