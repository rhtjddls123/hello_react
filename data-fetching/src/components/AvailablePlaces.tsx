import Places from "./Places.jsx";

interface Props {
  onSelectPlace: (place: PlaceType) => void;
}

export default function AvailablePlaces({ onSelectPlace }: Props) {
  return <Places title="Available Places" places={[]} fallbackText="No places available." onSelectPlace={onSelectPlace} />;
}
