import { useEffect, useState } from "react";
import Places from "./Places.tsx";
import ShowError from "./ShowError.tsx";
import { sortPlacesByDistance } from "../loc.ts";
import { fetchAvailablePlaces } from "../http.ts";

interface Props {
  onSelectPlace: (place: PlaceType) => void;
}

export default function AvailablePlaces({ onSelectPlace }: Props) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState<PlaceType[]>([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError({ ...error, message: error.message || "Could not fetch places, please try again later." });
          setIsFetching(false);
        }
      }
    };

    fetchPlaces();
  }, []);

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
