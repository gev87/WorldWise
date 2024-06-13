import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { delay } from "../utils";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	async function getCity(id) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			await delay(500);
			const data = await res.json();
			setCurrentCity(data);
		} catch {
			alert("There was an error loading current city.");
		} finally {
			setIsLoading(false);
		}
	}

	async function createCity(newCity) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: { "Content-Type": "application/json" },
			});
			await delay(500);
			const data = await res.json();
			setCities((cities) => [...cities, data]);
		} catch {
			alert("There was an error creating current city.");
		} finally {
			setIsLoading(false);
		}
	}

	async function deleteCity(id) {
		try {
			setIsLoading(true);
			await fetch(`${BASE_URL}/cities/${id}`,{ method: "DELETE" });
			await delay(500);
			setCities((cities) => cities.filter((city) => city.id !== id));
		} catch {
			alert("There was an error on deleting city.");
		} finally {
			setIsLoading(false);
		}
	}

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
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

export { CitiesProvider, CitiesContext };
