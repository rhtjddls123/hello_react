import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDeatilPage from "./pages/ProductDeatil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "products",
        element: <ProductsPage />
      },
      { path: "products/:productId", element: <ProductDeatilPage /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
