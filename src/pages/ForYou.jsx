import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { busStop } from '../data/busStop-data';

export function ForYouPage() {
    const loadStarredState = () => {
        const savedState = localStorage.getItem('starredState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            // Ensure the state includes all busStop IDs
            const initialState = busStop.reduce((acc, bus) => {
                acc[bus.id] = parsedState[bus.id] || false;
                return acc;
            }, {});
            return initialState;
        }
        // Initialize state if nothing in localStorage
        return busStop.reduce((acc, bus) => {
            acc[bus.id] = false;
            return acc;
        }, {});
    };

    const [starred, setStarred] = useState(loadStarredState);

    useEffect(() => {
        localStorage.setItem('starredState', JSON.stringify(starred));
    }, [starred]);

    const toggleStarred = (id) => {
        setStarred(prevStarred => ({
            ...prevStarred,
            [id]: !prevStarred[id],
        }));
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
                    <div key={bus.id} className='flex items-center space-y-2 mb-6'>
                        <div className='rounded-full bg-[#242424] p-2 mr-5'>
                            <svg width="30" height="30" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M38.5 12.25V28C38.5 29.2425 37.835 30.38 36.75 31.01V33.6875C36.75 34.405 36.155 35 35.4375 35H34.5625C33.845 35 33.25 34.405 33.25 33.6875V31.5H21V33.6875C21 34.405 20.405 35 19.6875 35H18.8125C18.095 35 17.5 34.405 17.5 33.6875V31.01C16.4325 30.38 15.75 29.2425 15.75 28V12.25C15.75 7 21 7 27.125 7C33.25 7 38.5 7 38.5 12.25ZM22.75 26.25C22.75 25.2875 21.9625 24.5 21 24.5C20.0375 24.5 19.25 25.2875 19.25 26.25C19.25 27.2125 20.0375 28 21 28C21.9625 28 22.75 27.2125 22.75 26.25ZM35 26.25C35 25.2875 34.2125 24.5 33.25 24.5C32.2875 24.5 31.5 25.2875 31.5 26.25C31.5 27.2125 32.2875 28 33.25 28C34.2125 28 35 27.2125 35 26.25ZM35 12.25H19.25V19.25H35V12.25ZM12.25 16.625C12.1975 14.21 10.2025 12.25 7.78749 12.3375C7.21292 12.3489 6.64623 12.4733 6.11977 12.7038C5.59332 12.9342 5.11742 13.2661 4.71927 13.6805C4.32111 14.0949 4.0085 14.5837 3.7993 15.119C3.59009 15.6542 3.48839 16.2254 3.49999 16.8C3.52285 17.7926 3.88131 18.7482 4.51692 19.5109C5.15253 20.2736 6.02779 20.7985 6.99999 21V35H8.74999V21C10.815 20.58 12.25 18.7425 12.25 16.625Z" fill="#F2F2F2"/>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className='text-sm'>{bus.name}</div>
                            <div className="flex items-center">
                                <div className="text-xs text-gray-400 font-light mr-3">{bus.eta} mins away</div>
                                <div className="text-xs text-gray-400 font-light mr-3">{bus.distance} meters away</div>
                            </div>
                        </div>
                        <div onClick={() => toggleStarred(bus.id)}>
                            <FontAwesomeIcon icon={faStar} className={starred[bus.id] ? "text-yellow-500" : "text-gray-400"} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
