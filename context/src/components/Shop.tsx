import { DUMMY_PRODUCTS } from "../dummy-products.ts";
import Product from "./Product.jsx";

interface Props {
  onAddItemToCart: (id: string) => void;
}

export default function Shop({ onAddItemToCart }: Props) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}
