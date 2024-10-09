import { LiHTMLAttributes } from "react";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";

interface MealItemProps extends LiHTMLAttributes<HTMLLIElement> {
  meal: MealType;
}

const MealItem = ({ meal, ...props }: MealItemProps) => {
  return (
    <li className="meal-item" {...props}>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(+meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
