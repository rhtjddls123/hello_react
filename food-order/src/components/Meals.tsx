import { useEffect, useState } from "react";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState<MealType[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost:3000/meals");
        const meals: MealType[] = await response.json();
        setLoadedMeals(meals);
      } catch (e) {
        console.log(e);
      }
    };

    fetchMeals();
  }, []);
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
};

export default Meals;
