import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import useCities from "../contexts/useCities";
import { useNavigate, useSearchParams } from "react-router-dom";

function Map() {
	const { cities } = useCities();
	const [searchParams] = useSearchParams();
	const mapLat = searchParams.get("lat");
	const mapLng = searchParams.get("lng");

	const [mapPosition, setMapPosition] = useState([40, 0]);

	useEffect(() => {
		if (mapLat && mapLng) {
			setMapPosition([mapLat, mapLng]);
		}
	}, [mapLat, mapLng]);

	return (
		<div className={styles.mapContainer}>
			<MapContainer center={mapPosition} zoom={6} scrollWheelZoom className={styles.map}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
						<Popup>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}
function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (event) => navigate(`form?lat:${event.latlng.lat}&lng:${event.latlng.lng}`),
	});
}

export default Map;
