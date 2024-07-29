import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { busStop } from '../data/busStop-data';

export function MapPage() {

    const defaultIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    // Extract detailed route coordinates from bus stops 1 to 5
    const detailedRouteCoordinates = busStop.map(stop => [stop.latitude, stop.longitude]);

    // Create bounds based on bus stops 1 to 5
    const bounds = L.latLngBounds(detailedRouteCoordinates);

    return (
        <div className="relative flex flex-col h-[89.5vh]">
            <MapContainer
                bounds={bounds}
                zoom={15}
                minZoom={13}
                maxZoom={17}
                maxBounds={bounds}
                maxBoundsViscosity={1.0}
                zoomControl={false}
                style={{ height: "calc(100vh - 6rem)", width: "100%" }}
                className="flex-1 z-0"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {busStop.map((stop) => (
                    <Marker
                        key={stop.id}
                        position={[stop.latitude, stop.longitude]}
                        icon={defaultIcon}
                    >
                        <Popup>{stop.name}</Popup>
                    </Marker>
                ))}
                <Polyline positions={detailedRouteCoordinates} color="blue" />
            </MapContainer>
        </div>
    );
}
