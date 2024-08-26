import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SearchPage } from "./Search";
import { busStop } from "../data/busStop-data";
import { format } from "date-fns";

jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon, className }) => (
    <i icon={icon} className={className} />
  ),
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

describe("SearchPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  it("renders without crashing both with initial or changed starredState", () => {
    localStorage.setItem("starredState", JSON.stringify({}));
    render(<SearchPage />);

    const starredState = {
      "01": true,
      "02": false,
      "03": true,
      "04": false,
      "05": true,
    };

    localStorage.setItem("starredState", JSON.stringify(starredState));
    render(<SearchPage />);
  });

  it("renders correctly with the current date and bus stops", () => {
    const currentDate = format(new Date(), "EEEE, do MMMM yyyy");
    localStorage.setItem("starredState", JSON.stringify({}));
    render(<SearchPage />);

    // Check if the title is rendered
    expect(screen.getByText("Search")).toBeInTheDocument();

    // Check if the current date is displayed
    expect(screen.getByText(currentDate)).toBeInTheDocument();

    // Check if the FontAwesomeIcon is rendered
    const starElements = screen.getAllByRole("button", {
      class: "clickable-star",
    });
    expect(starElements.length).toBe(5);

    // Check if bus stops are rendered
    busStop.forEach((bus) => {
      expect(screen.getByText(bus.name)).toBeInTheDocument();
    });
  });

  it("toggles the initial state when the star icon is clicked", () => {
    localStorage.setItem("starredState", JSON.stringify({}));
    render(<SearchPage />);

    const starElements = screen.getAllByRole("button", {
      class: "clickable-star",
    });

    // Simulate clicking on the star icon of the first bus stop
    const firstStarDiv = starElements[0];
    const firstStarIcon = firstStarDiv.querySelector("i");

    // Ensure the <i> element is found and has the initial class
    expect(firstStarIcon).toBeInTheDocument();
    expect(firstStarIcon).toHaveClass("text-gray-400");

    fireEvent.click(firstStarDiv);
    expect(firstStarIcon).toHaveClass("text-yellow-500");

    // Check localStorage if needed
    const updatedState = JSON.parse(localStorage.getItem("starredState"));
    expect(updatedState["01"]).toBe(true);
  });

  it("toggles the changed state when the starred icon is clicked", () => {
    const starredState = {
      "01": false,
      "02": true,
      "03": false,
      "04": false,
      "05": false,
    };
    localStorage.setItem("starredState", JSON.stringify(starredState));
    render(<SearchPage />);

    const starElements = screen.getAllByRole("button", {
      class: "clickable-star",
    });

    // Simulate clicking on the star icon of the first bus stop
    const secondStarDiv = starElements[0]; // Now it moves to top
    const secondStarIcon = secondStarDiv.querySelector("i");

    // Ensure the <i> element is found and has the initial class
    expect(secondStarIcon).toBeInTheDocument();
    expect(secondStarIcon).toHaveClass("text-yellow-500");

    fireEvent.click(secondStarDiv);
    expect(secondStarIcon).toHaveClass("text-gray-400");

    // Check localStorage if needed
    const updatedState = JSON.parse(localStorage.getItem("starredState"));
    expect(updatedState["02"]).toBe(false);
  });
});
