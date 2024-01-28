import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { Button } from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

export function Map({ setSidebarHidden, sidebarHidden }) {
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();
    const [currLat, currLng] = useUrlPosition();

    useEffect(
        function () {
            if (currLat && currLng) setMapPosition([currLat, currLng]);
        },
        [currLat, currLng]
    );

    useEffect(
        function () {
            if (geolocationPosition) setMapPosition(geolocationPosition);
        },
        [geolocationPosition]
    );

    return (
        <div className={styles.mapContainer}>
            {geolocationPosition !== mapPosition && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? " Loading..." : "Use your position"}
                </Button>
            )}
            <MapContainer
                center={mapPosition}
                zoom={10}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick sidebarHidden={sidebarHidden} setSidebarHidden={setSidebarHidden} />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position, 10);
    return null;
}

function DetectClick({ sidebarHidden, setSidebarHidden }) {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
            setSidebarHidden(!sidebarHidden);
        },
    });
}
