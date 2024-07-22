import { BusIndicator } from "./BusIndicator";

export function BusSection() {

    const buses = [
        {
            name: 'Bus 1',
            eta: 5,
            distance: 100
        },
        {
            name: 'Bus 2',
            eta: 10,
            distance: 200
        },
        {
            name: 'Bus 3',
            eta: 15,
            distance: 300
        }
    ]

    return (
        <>
            {buses.map((bus, index) => <BusIndicator key={index} name={bus.name} eta={bus.eta} distance={bus.distance} />)}
        </>
    )
}