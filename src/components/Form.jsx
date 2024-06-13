import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import Message from "./Message";
import Spinner from "./Spinner";
import { useUrlPosition } from "../hooks/useUrlPosition";
import useCities from "../contexts/useCities";
import { convertToEmoji } from "../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
	const [lat, lng] = useUrlPosition();
	const { createCity,isLoading } = useCities();
	const navigate = useNavigate();
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState();
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [emoji, setEmoji] = useState("");
	const [geocodingError, setGeocodingError] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		if (!cityName || !date) return;
		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};
		await createCity(newCity);
		navigate("/app/cities");
	}

	useEffect(() => {
		async function fetchCityData() {
			try {
				setIsLoadingGeocoding(true);
				const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
				const data = await res.json();
				if (!data.countryCode) {
					throw new Error("That does't seem to be a city. Click somewhere else😉");
				}
				setGeocodingError("");
				setCityName(data.city || data.locality || "");
				setCountry(data.countryName);
				setEmoji(convertToEmoji(data.countryCode));
			} catch (err) {
				setGeocodingError(err.message);
			} finally {
				setIsLoadingGeocoding(false);
			}
		}
		if (lat && lng) {
			fetchCityData();
		}
	}, [lat, lng]);

	if (isLoadingGeocoding) {
		return <Spinner />;
	}

	if (!lat && !lng) {
		return <Message message="Start by clicking somewhere on the map" />;
	}

	if (geocodingError) {
		return <Message message={geocodingError} />;
	}

	return (
		<form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker
					id="date"
					selected={date}
					onChange={(newDate) => setDate(newDate)}
					dateFormat="dd/MM/yyyy"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
			</div>

			<div className={styles.buttons}>
				<Button>Add</Button>
				<ButtonBack />
			</div>
		</form>
	);
}

export default Form;
