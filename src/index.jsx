import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import App from "./App.jsx";
// import HomePage from "./Pages/homePage";
import ErrorPage from "./Pages/errorPage";
import Category from "./Pages/category";
// import Recipe from "./Pages/recipe";
import RecipeYouTube from "./Components/RecipeYouTube/RecipeYouTube.jsx";
import RecipeIngredients from "./Components/RecipeIngredients/RecipeIngredients.jsx";
import RecipeInstructions from "./Components/RecipeInstructions/RecipeInstructions.jsx";
// import AuthGuard from "./Components/AuthGuard/AuthGuard.jsx";
import { ENDPOINTS } from "./utils/api/endpoints.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const LazyRecipe = React.lazy(() => import("./Pages/recipe"));

const catalogRouter = [
  {
    path: "/catalogo",
    element: <Navigate to={"/"} />,
  },
  {
    path: "/catalogo/:categoryName",
    children: [
      {
        path: "",
        element: <Category />,
        loader: ({ params }) => {
          return fetch(`${ENDPOINTS.FILTER}?c=${params?.categoryName}`);
        },
      },
      {
        path: ":recipeName/:id",
        element: (
          <React.Suspense fallback="loading recipe...">
            <LazyRecipe />
          </React.Suspense>
        ),
        children: [
          { path: "", element: <div>Pagina principale</div> },
          { path: "ingredienti", element: <RecipeIngredients /> },
          { path: "istruzioni", element: <RecipeInstructions /> },
          { path: "youtube", element: <RecipeYouTube /> },
        ],
      },
    ],
  },
];

const LazyHome = React.lazy(() => import("./Pages/homePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <React.Suspense fallback="loading home...">
            <LazyHome />
          </React.Suspense>
        ),
        loader: async () => {
          return fetch(ENDPOINTS.CATEGORIES);
        },
      },
      ...catalogRouter,

      { path: "*", element: <ErrorPage status={404} /> },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
