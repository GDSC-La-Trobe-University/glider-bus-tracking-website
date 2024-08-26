import { render, screen, fireEvent } from "@testing-library/react";
import { ForYouPage } from "./ForYou";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { format } from "date-fns";

// Mock data
jest.mock("../data/busStop-data", () => ({
  busStop: [
    {
      id: "01",
      name: "Bus Terminus (Plenty Road)",
      eta: 5,
      distance: 100,
      longitude: 145.044908,
      latitude: -37.717574,
    },
    {
      id: "02",
      name: "Jenny Graves Building (Sci. Drive)",
      eta: 10,
      distance: 200,
      longitude: 145.046423,
      latitude: -37.720791,
    },
    {
      id: "03",
      name: "Chisholm College (College Drive)",
      eta: 15,
      distance: 300,
      longitude: 145.050869,
      latitude: -37.723968,
    },
    {
      id: "04",
      name: "La Trobe Apartment- LAN & LAS (College Drive)",
      eta: 20,
      distance: 400,
      longitude: 145.053794,
      latitude: -37.721361,
    },
    {
      id: "05",
      name: "Polaris Town Centre (Copernicus Crescent)",
      eta: 25,
      distance: 500,
      longitude: 145.048047,
      latitude: -37.713629,
    },
  ],
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => (store[key] = value),
    removeItem: (key) => delete store[key],
    clear: () => (store = {}),
  };
})();
global.localStorage = localStorageMock;

// Mock react-router-dom's useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("ForYouPage Component", () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
  });
  it("renders without crashing", () => {
    localStorage.setItem("starredState", JSON.stringify({})); // Set initial value
    render(
      <Router>
        <ForYouPage />
      </Router>
    );
  });

  it("displays formatted date", () => {
    localStorage.setItem("starredState", JSON.stringify({}));
    render(
      <Router>
        <ForYouPage />
      </Router>
    );
    const date = format(new Date(), "EEEE, do MMMM yyyy");
    expect(screen.getByText(date)).toBeInTheDocument();
  });

  it("shows empty state when no starred bus stops", () => {
    localStorage.setItem("starredState", JSON.stringify({})); // No starred bus stops
    render(
      <Router>
        <ForYouPage />
      </Router>
    );
    expect(screen.getByText(/Click to add Favourites/i)).toBeInTheDocument();
  });

  it("displays bus stop items when there are starred bus stops", () => {
    localStorage.setItem(
      "starredState",
      JSON.stringify({ "01": true, "02": true })
    ); // All bus stops are starred
    render(
      <Router>
        <ForYouPage />
      </Router>
    );
    expect(screen.getByText("Bus Terminus (Plenty Road)")).toBeInTheDocument();
    expect(
      screen.getByText("Jenny Graves Building (Sci. Drive)")
    ).toBeInTheDocument();
  });

  it("navigates to /search when 'Add' button is clicked", () => {
    // Setting local storage to simulate no starred bus stops
    localStorage.setItem("starredState", JSON.stringify({}));

    render(
      <Router>
        <ForYouPage />
      </Router>
    );

    // Verify that the "Add" button is present
    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).toBeInTheDocument();

    // Click the "Add" button
    fireEvent.click(addButton);

    // Verify that the navigation function was called with the expected argument
    expect(mockNavigate).toHaveBeenCalledWith("/search");
  });
});
