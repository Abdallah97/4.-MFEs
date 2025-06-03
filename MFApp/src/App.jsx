import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VeuJs from "./components/VueJs.jsx";
import FoodList from "./components/FoodList.jsx";
import ProductList from "./components/ProductList.jsx";
import Layout from "./components/Layout.jsx";
import NotFound from "./components/NotFound.jsx";

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
              path: "/vue-js",
              element: <VeuJs />
            },
           
            {
              path: "/to-do-app",
              element: <ProductList />
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
