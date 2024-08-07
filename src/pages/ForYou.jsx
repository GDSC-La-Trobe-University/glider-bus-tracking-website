import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { busStop } from "../data/busStop-data";
import { loadStarredState } from "../utils/dataLoader";
import { BusStopItem } from "../components/BusStopItem";

export function ForYouPage() {
  const navigate = useNavigate();
  const starred = loadStarredState();
  const sortedBusStops = [...busStop]
    .filter((bus) => starred[bus.id] === true) // Filter only those with starred state true
    .sort((a, b) => {
      const aStarred = starred[a.id];
      const bStarred = starred[b.id];
      return bStarred - aStarred; // bStarred first (true > false)
    });
  const formattedDate = format(new Date(), "EEEE, do MMMM yyyy");
  const EmptyStateAddButton = (
    <div className="mt-36 flex flex-col items-center justify-center h-full text-gray-500">
      <p>Click to add Favourites</p>
      <button
        className="mt-1 px-3 py-1 border border-gray-500 rounded-md bg-transparent text-gray-500 flex items-center text-sm"
        onClick={() => navigate("/search")}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-1" /> Add
      </button>
    </div>
  );

  return (
    <div className="App">
      <header className="bg-[#242424] pt-10 px-5 pb-3 text-white">
        <h1 className="text-3xl mb-2">For You</h1>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faCalendar} className="text-red-500 mr-3" />
          <span>{formattedDate}</span>
        </div>
      </header>
      {sortedBusStops.length === 0 ? (
        EmptyStateAddButton
      ) : (
        <div className="p-5">
          {sortedBusStops.map((bus) => (
            <BusStopItem key={bus.id} bus={bus} clickable={false} />
          ))}
        </div>
      )}
    </div>
  );
}
