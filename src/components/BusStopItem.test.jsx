import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BusStopItem } from "./BusStopItem";

// Mock FontAwesomeIcon for testing
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon, className, onClick }) => (
    <i
      className={className}
      data-testid={`fa-icon-${icon.iconName}`}
      onClick={onClick}
    />
  ),
}));
describe("BusStopItem", () => {
  const mockBus = {
    id: "01",
    name: "Bus Terminus (Plenty Road)",
    eta: 5,
    distance: 100,
    longitude: 145.044908,
    latitude: -37.717574,
  };

  const mockStarredState = {
    "01": true,
    "02": false,
  };

  const mockHandleToggleStarred = jest.fn();

  it("renders the bus stop details correctly", () => {
    render(
      <BusStopItem
        bus={mockBus}
        starred={mockStarredState}
        handleToggleStarred={mockHandleToggleStarred}
        clickable={true}
      />
    );

    // Check that the bus stop name, ETA, and distance are rendered correctly
    expect(screen.getByText("Bus Terminus (Plenty Road)")).toBeInTheDocument();
    expect(screen.getByText("5 mins away")).toBeInTheDocument();
    expect(screen.getByText("100 meters away")).toBeInTheDocument();

    // Check that the star icon has the correct color based on the starred state
    const starIcon = screen.getByTestId("fa-icon-star");
    expect(starIcon).toHaveClass("text-yellow-500");
  });

  it("calls handleToggleStarred when the star icon is clicked and clickable is true", () => {
    render(
      <BusStopItem
        bus={mockBus}
        starred={mockStarredState}
        handleToggleStarred={mockHandleToggleStarred}
        clickable={true}
      />
    );

    // Simulate a click on the star icon
    const starIcon = screen.getByTestId("fa-icon-star");
    fireEvent.click(starIcon);

    // Check that handleToggleStarred is called with the correct bus ID
    expect(mockHandleToggleStarred).toHaveBeenCalledWith("01");
  });

  it("does not call handleToggleStarred when clickable is false", () => {
    render(
      <BusStopItem
        bus={mockBus}
        starred={mockStarredState}
        handleToggleStarred={mockHandleToggleStarred}
        clickable={false}
      />
    );

    expect(screen.getByText("Bus Terminus (Plenty Road)")).toBeInTheDocument();

    const starIcon = screen.queryByTestId("fa-icon-star");
    expect(starIcon).not.toBeInTheDocument();
  });
});
