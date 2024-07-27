import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

export function MapPage() {
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [permissionDenied, setPermissionDenied] = useState(false);

    useEffect(() => {
        const handleGeolocation = (position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]);
            setLoading(false);
        };

        const handleGeolocationError = (error) => {
            console.error(error);
            setPermissionDenied(true);
            setLoading(false);
        };

        navigator.geolocation.getCurrentPosition(
            handleGeolocation,
            handleGeolocationError,
            { timeout: 10000 }
        );
    }, []);

    const latrobeUniversityPosition = [-37.724, 144.990];

    return (
        <div className="relative flex flex-col h-[89.5vh]">
            {/* Loading animation */}
            {loading && (
                <div className="absolute inset-0 flex justify-center items-center bg-white z-10">
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
            )}

            {/* Map container */}
            <MapContainer
                center={permissionDenied ? latrobeUniversityPosition : (position || latrobeUniversityPosition)}
                zoom={13}
                style={{ height: "calc(100vh - 6rem)", width: "100%" }}
                className="flex-1 z-0"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                    position={permissionDenied ? latrobeUniversityPosition : (position || latrobeUniversityPosition)}
                    icon={L.icon({ iconUrl: 'path-to-your-icon.png' })}
                >
                    <Popup>
                        {permissionDenied ? 'La Trobe University' : 'Your location'}
                    </Popup>
                </Marker>
            </MapContainer>

            {/* Permission request message */}
            {!position && !loading && !permissionDenied && (
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-white z-10">
                    <p className="text-lg mb-4">We need your location to show it on the map. Please allow location access.</p>
                </div>
            )}
        </div>
    );
}
