import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BusSection } from "./BusSection";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export function ForYouPage() {
    return (
        <div className="App">
            <header className="bg-[#242424] pt-16 px-5 pb-2 text-white">
                <h1 className="text-2xl mb-2">For You</h1>
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faCalendar} className="text-red-500 mr-3" />
                    <span>{new Date().toLocaleDateString()}</span>
                </div>
            </header>

            <div className="p-5">
                <BusSection />
            </div>
        </div>
    );
}