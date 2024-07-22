import { Route, Routes } from "react-router-dom";
import { ForYouPage } from "./components/ForYou";
import { Nav } from "./components/Nav";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="bg-gray-800 text-white text-2xl p-4">
        <h1>News App</h1>
      </header> */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<ForYouPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
      <Nav />
    </div>
  );
}

export default App;
