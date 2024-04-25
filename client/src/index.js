import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DistributorCards from "./components/DistributorCards";

// import App from "./components/App";



const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/mydistributors',
                element: <DistributorCards />
            }
        ]
    }
])








const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
