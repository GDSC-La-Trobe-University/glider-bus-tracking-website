import { Route, Routes } from "react-router-dom";
import { ForYouPage } from "./pages/ForYou";
import { Nav } from "./components/Nav";
import { SearchPage } from "./pages/Search";
import { MapPage } from "./pages/Map";
import { SettingsPage } from "./pages/Settings";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<ForYouPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
      <Nav />
    </div>
  );
}

export default App;
