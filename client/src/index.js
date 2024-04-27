import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DistributorCards from "./components/CustomersDistributor";
import CustomersDistributors from "./components/CustomersDistributor";
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

// import App from "./components/App";



const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/mydistributors',
                element: <CustomersDistributors />
            },
            {
                path: '/login',
                element: <LoginForm />
            },
            {
                path: '/signup',
                element: <SignupForm />
            }
        ]
    }
])








const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
