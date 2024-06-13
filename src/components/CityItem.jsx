import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import useCities from "../contexts/useCities";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
		weekday: "long",
	}).format(new Date(date));

function CityItem({ city }) {
	const {
		cityName,
		emoji,
		date,
		id,
		position: { lat, lng },
	} = city;

	const { currentCity, deleteCity } = useCities();

	function handleDeleteCity(event) {
		event.preventDefault();
		deleteCity(id);
	}

	return (
		<li>
			<Link
				className={`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : ""}`}
				to={`${id}?lat=${lat}&lng=${lng}`}
			>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>{formatDate(date)}</time>
				<button className={styles.deleteBtn} onClick={handleDeleteCity}>
					&times;
				</button>
			</Link>
		</li>
	);
}
export default CityItem;
