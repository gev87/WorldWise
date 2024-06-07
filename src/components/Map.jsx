import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";
import useCities from "../contexts/useCities";

function Map() {
	const { cities } = useCities();
	
	const [mapPosition] = useState([40,0]);


	return (
		<div className={styles.mapContainer}>
			<MapContainer center={mapPosition} zoom={13} scrollWheelZoom className={styles.map}>
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
			</MapContainer>
		</div>
	);
}

export default Map;
