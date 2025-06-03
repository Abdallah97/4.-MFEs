import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VeuJs from "./components/VueJs.jsx";
import FoodList from "./components/FoodList.jsx";
import Layout from "./components/Layout.jsx";
import NotFound from "./components/NotFound.jsx";
import CheckoutContainer from "./components/Checkout.jsx";
import "./style.css";


const App = () => {
  const router = createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          errorElement: <NotFound />,
          children: [
            {
              path: "/",
              element: <FoodList />
            },
            {
              path: "/cart-app",
              element: <VeuJs />
            },

            {
              path: "/checkout",
              element: <CheckoutContainer />
            }
          ]
        }
      ]
   );

  return (
    <RouterProvider router = {router}></RouterProvider>
  )
}

export default App;
