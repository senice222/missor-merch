import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import DetailedProduct from "./pages/DetailedProduct/DetailedProduct";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import {useEffect} from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/product/:name',
                element: <DetailedProduct />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '*',
                element: <Navigate to="/" />
            }
        ]
    },
]);

function App() {

    return (
        <RouterProvider router={router} />
    );
}

export default App;
