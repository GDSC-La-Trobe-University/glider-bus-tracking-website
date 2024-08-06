import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { busStop } from "../data/busStop-data";
import { loadStarredState } from "../utils/storage";
import { BusStopItem } from "./BusStopItem";

export function ForYouPage() {
  const [starred, setStarred] = useState(loadStarredState);

  useEffect(() => {
    localStorage.setItem("starredState", JSON.stringify(starred));
  }, [starred]);

  const toggleStarred = (id) => {
    setStarred((prevStarred) => ({
      ...prevStarred,
      [id]: !prevStarred[id],
    }));
    console.log(starred);
  };

  const formattedDate = format(new Date(), "EEEE, do MMMM yyyy");

  // Sort bus stops with starred items first
  const sortedBusStops = [...busStop].sort((a, b) => {
    const aStarred = starred[a.id];
    const bStarred = starred[b.id];
    return bStarred - aStarred; // bStarred first (true > false)
  });

  return (
    <div className="App">
      <header className="bg-[#242424] pt-10 px-5 pb-3 text-white">
        <h1 className="text-3xl mb-2">For You</h1>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faCalendar} className="text-red-500 mr-3" />
          <span>{formattedDate}</span>
        </div>
      </header>

      <div className="p-5">
        {sortedBusStops.map((bus) => (
          <BusStopItem
            key={bus.id}
            bus={bus}
            starred={starred}
            handleToggleStarred={toggleStarred}
            clickable={true}
          />
        ))}
      </div>
    </div>
  );
}
