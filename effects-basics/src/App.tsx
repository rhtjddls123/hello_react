import { useCallback, useEffect, useRef, useState } from "react";

import { AVAILABLE_PLACES } from "./data.ts";
import logoImg from "./assets/logo.png";
import Modal from "./components/Modal.tsx";
import DeleteConfirmation from "./components/DeleteConfirmation.tsx";
import Places from "./components/Places.tsx";
import { sortPlacesByDistance } from "./loc.ts";

const storedIds: PlaceType["id"][] = localStorage.getItem("selectedPlaces") ? JSON.parse(localStorage.getItem("selectedPlaces")!) : [];
const storedPlaces = AVAILABLE_PLACES.filter((place) => storedIds.includes(place.id));

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectedPlace = useRef<string | null>(null);
  const [pickedPlaces, setPickedPlaces] = useState<PlaceType[]>(storedPlaces);
  const [availablePlaces, setAvailablePlaces] = useState<PlaceType[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlace = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
      setAvailablePlaces(sortedPlace);
    });
  }, []);

  function handleStartRemovePlace(id: PlaceType["id"]) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id: PlaceType["id"]) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      if (!place) return prevPickedPlaces;
      return [place, ...prevPickedPlaces];
    });

    const storedIds: PlaceType["id"][] = localStorage.getItem("selectedPlaces") ? JSON.parse(localStorage.getItem("selectedPlaces")!) : [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem("selectedPlaces", JSON.stringify([id, ...storedIds]));
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current));
    const storedIds: PlaceType["id"][] = localStorage.getItem("selectedPlaces") ? JSON.parse(localStorage.getItem("selectedPlaces")!) : [];
    localStorage.setItem("selectedPlaces", JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)));
    setModalIsOpen(false);
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation onCancel={handleStopRemovePlace} onConfirm={handleRemovePlace} />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>Create your personal collection of places you would like to visit or you have visited.</p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          fallbackText="Sorting places by distance..."
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
