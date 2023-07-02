import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CapitalQuiz from "./components/CapitalQuiz.tsx";
import CurrencyQuiz from "./components/CurrencyQuiz.tsx";
import Welcome from "./components/Welcome.tsx";
import FlagQuiz from "./components/FlagQuiz.tsx";
const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    ),
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "capital",
        element: <CapitalQuiz />,
      },
      {
        path: "currency",
        element: <CurrencyQuiz />,
      },
      {
        path: "flag",
        element: <FlagQuiz />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
