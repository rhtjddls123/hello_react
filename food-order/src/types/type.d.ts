interface MealType {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface CartType extends MealType {
  quantity: number;
}
