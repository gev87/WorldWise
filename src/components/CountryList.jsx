import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message";
import CountryItem from "./CountryItem";
import useCities from "../contexts/useCities";

function CountryList() {
	const { cities, isLoading } = useCities();
	
	if (isLoading) return <Spinner />;

	if (!cities.length)
		return <Message message="Add your first city by clicking on a city on the map" />;

	const countrySet = new Set();

	const countries = cities.filter(({ country: countryName }) => {
		if (countrySet.has(countryName)) {
			return false;
		}
		countrySet.add(countryName);
		return true;
	});

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.id} />
			))}
		</ul>
	);
}

export default CountryList;
