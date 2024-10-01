import Places from "./Places.tsx";
import ShowError from "./ShowError.tsx";
import { sortPlacesByDistance } from "../loc.ts";
import { fetchAvailablePlaces } from "../http.ts";
import useFetch from "../hooks/useFetch.ts";

async function fetchSortedPlaces(): Promise<PlaceType[]> {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);

      resolve(sortedPlaces);
    });
  });
}

interface Props {
  onSelectPlace: (place: PlaceType) => void;
}

export default function AvailablePlaces({ onSelectPlace }: Props) {
  const { fetchedData: availablePlaces, error, isFetching } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <ShowError title="An error occurred" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
