/* eslint-disable no-unused-vars */
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
	const params = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");
	const navigate = useNavigate();

	console.log("params", "searchParams", params, searchParams, lat, typeof searchParams);

	return (
		<div className={styles.mapContainer} onClick={() => navigate("form")}>
			<h1>Map</h1>
			<h1>
				Position: {lat},{lng}
			</h1>
		</div>
	);
}

export default Map;
