import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faAddressBook, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export function SettingsPage() {
    const [showEmail, setShowEmail] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const handleClearData = () => {
        localStorage.clear();
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
            navigate('/');
        }, 2000); // Adjust the delay as needed
    };

    const handleContactClick = () => {
        setShowEmail(!showEmail);
    };

    const appVersion = "1.0.0";

    return (
        <div className="App flex flex-col min-h-screen">
            <header className="bg-[#242424] pt-10 px-5 pb-3 text-white">
                <h1 className="text-3xl mb-2">Settings</h1>
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faInfoCircle} className="text-red-500 mr-3" />
                    <span>App Version: {appVersion}</span>
                </div>
            </header>

            <div className="p-5 space-y-4 flex-grow">
                {/* Clear Data Option */}
                <div
                    className="bg-white p-4 rounded shadow flex items-center justify-between cursor-pointer"
                    onClick={handleClearData}
                >
                    <span>Clear Data</span>
                    <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                </div>

                {/* Contact Us Option */}
                <div
                    className="bg-white p-4 rounded shadow flex items-center justify-between cursor-pointer"
                    onClick={handleContactClick}
                >
                    <span>Contact Us</span>
                    <FontAwesomeIcon icon={faAddressBook} className="text-gray-500" />
                </div>
                {showEmail && (
                    <div className="bg-white p-4 rounded shadow mt-2 text-gray-700">
                        gdsclatrobe@gmail.com
                    </div>
                )}
            </div>

            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow text-center">
                        <span>All data has been cleared successfully.</span>
                    </div>
                </div>
            )}

            {/* Copyright */}
            <div className="text-center text-gray-500 mb-32">
                <div>© Google Developer Club La Trobe University</div>
            </div>
        </div>
    );
}
