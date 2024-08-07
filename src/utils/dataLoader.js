import { busStop } from "../data/busStop-data";

// Load starred state of bus stops
export const loadStarredState = () => {
  const savedState = localStorage.getItem("starredState");
  const parsedState = savedState ? JSON.parse(savedState) : {};

  const initialState = busStop.reduce((acc, bus) => {
    acc[bus.id] = parsedState[bus.id] || false;
    return acc;
  }, {});

  return initialState;
};
