import styles from "./Map.module.css";
import {useNavigate} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../../contexts/CitiesContext.jsx";
import {useGeolocation} from "../../hooks/useGeolocation.jsx";
import Button from "../Button/Button.jsx";
import {useUrlPosition} from "../../hooks/useUrlPosition.jsx";

export default function Map() {
    const {cities} = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();
    const [mapLat, mapLng] = useUrlPosition();

    useEffect(() => {
        if (mapLng && mapLng) setMapPosition([+mapLat, +mapLng]);
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }, [geolocationPosition]);
    
    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && <Button type="position"
                                             onClick={getPosition}>{isLoadingPosition ? "Loading" : "Use your position"}</Button>}
            <MapContainer className={styles.map}
                          center={mapPosition}
                          zoom={6}
                          scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city, index) => <Marker key={index}
                                                     position={[city.position.lat, city.position.lng]}>
                        <Popup>
                            <span>
                                {city.emoji}
                            </span>
                            <span>
                                {city.cityName}
                            </span>
                        </Popup>
                    </Marker>,
                )}

                <ChangeCenter position={mapPosition}/>
                <DetectClick/>
            </MapContainer>
        </div>
    );
}

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (event) => {
            navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`);
        },
    });
}