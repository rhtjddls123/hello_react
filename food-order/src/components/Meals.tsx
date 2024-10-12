import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";

const Meals = () => {
  const { data: loadedMeals, isLoading, error } = useHttp<MealType[]>({ url: "http://localhost:3000/meals", initialData: [] });

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  if (!loadedMeals) {
    return <p className="center">No meals...</p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
