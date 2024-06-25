import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import DetailedProduct from "./pages/DetailedProduct/DetailedProduct";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import convertCurrency from "./utils/getCurrency";
import {setHoodiePrice, setPantsPrice, setTshirtPrice} from "./store/slices/PricesSlice";

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
    const dispatch = useDispatch();
    const { hoodiePrice, pantsPrice, tshirtPrice } = useSelector((state) => state.prices);

    const currency = localStorage?.getItem('currency')

    useEffect(() => {
        async function convertPrices(currency) {
            const hoodiePriceConverted = await convertCurrency(13500, 'RUB', currency);
            const pantsPriceConverted = await convertCurrency(7900, 'RUB', currency);
            const tshirtPriceConverted = await convertCurrency(4900, 'RUB', currency);

            if (hoodiePriceConverted !== null) {
                dispatch(setHoodiePrice(hoodiePriceConverted));
            } else {
                console.log(`Не удалось конвертировать цену худи в ${currency}`);
            }

            if (pantsPriceConverted !== null) {
                dispatch(setPantsPrice(pantsPriceConverted));
            } else {
                console.log(`Не удалось конвертировать цену брюк в ${currency}`);
            }

            if (tshirtPriceConverted !== null) {
                dispatch(setTshirtPrice(tshirtPriceConverted));
            } else {
                console.log(`Не удалось конвертировать цену футболки в ${currency}`);
            }
        }

        if (currency === "USD" || currency === "BYN" || currency === "KZT" || currency === "KGS" || currency === "AMD") {
            convertPrices(currency);
        }
    }, [currency, dispatch, hoodiePrice, pantsPrice, tshirtPrice]);
    return (
        <RouterProvider router={router} />
    );
}

export default App;
