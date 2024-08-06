import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { busStop } from "../data/busStop-data";
import { loadStarredState } from "../utils/storage";
import { BusStopItem } from "./BusStopItem";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function SearchPage() {
  const defaultIcon = L.icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  // Extract detailed route coordinates from bus stops 1 to 5
  const detailedRouteCoordinates = busStop.map((stop) => [
    stop.latitude,
    stop.longitude,
  ]);

  // Create bounds based on bus stops 1 to 5
  const bounds = L.latLngBounds(detailedRouteCoordinates);

  const starred = loadStarredState();
  const sortedBusStops = [...busStop]
    .filter((bus) => starred[bus.id] === true) // Filter only those with starred state true
    .sort((a, b) => {
      const aStarred = starred[a.id];
      const bStarred = starred[b.id];
      return bStarred - aStarred; // bStarred first (true > false)
    });

  return (
    <div className="App">
      <MapContainer
        bounds={bounds}
        zoom={15}
        minZoom={13}
        maxZoom={17}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        style={{ height: "50vh", width: "100%" }}
        className="flex-1 z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {sortedBusStops.map((stop) => (
          <Marker
            key={stop.id}
            position={[stop.latitude, stop.longitude]}
            icon={defaultIcon}
          >
            <Popup>{stop.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <header className="pt-10 px-5 pb-3">
        <h1 className="text-3xl mb-2">Stops Nearby</h1>
      </header>

      <div className="p-5">
        {sortedBusStops.map((bus) => (
          <BusStopItem key={bus.id} bus={bus} clickable={false} />
        ))}
      </div>
    </div>
  );
}
