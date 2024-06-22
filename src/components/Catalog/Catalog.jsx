import style from './Catalog.module.scss'
import hoodie from '../../assets/HUDI BLACK 3 1.png'
import tshirt from '../../assets/t-shirt.png'
import {motion} from "framer-motion";
import {useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {useMyContext} from "../../context/useMyContext";
import {useDispatch, useSelector} from "react-redux";
import {addItem, deleteItem} from "../../store/slices/CartSlice";
import {useEffect, useState} from "react";
import convertCurrency from "../../utils/getCurrency";

const Catalog = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {blockRef1} = useMyContext();
    const dispatch = useDispatch()
    const [hoodiePrice, setHoodie] = useState(13500);
    const [pantsPrice, setPants] = useState(7900);
    const [tshirtPrice, setTshirt] = useState(4900);

    const state = useSelector(state => state.cart.items)
    const handleNavigate = (name) => {
        navigate(`/product/${name}?M`, {replace: true});
        window.scrollTo(0, 0);
    };
    const currency = localStorage.getItem('currency')
    const isHoodie = state.some(item => item.name === t("HOODIE"));
    const isTshirt = state.some(item => item.name === t("T-SHIRT"));
    const isPants = state.some(item => item.name === t("Pants"));
    let currencyValue = currency === "RUB" ? '₽' : '$'


    useEffect(() => {
        if (currency === "USD") {
            async function convertPricesToUSD() {

                const hoodiePriceUSD = await convertCurrency(hoodiePrice, 'RUB', 'USD');
                const pantsPriceUSD = await convertCurrency(pantsPrice, 'RUB', 'USD');
                const tshirtPriceUSD = await convertCurrency(tshirtPrice, 'RUB', 'USD');

                if (hoodiePriceUSD !== null) {
                    setHoodie(hoodiePriceUSD)
                } else {
                    console.log('Не удалось конвертировать цену худи в USD');
                }

                if (pantsPriceUSD !== null) {
                    setPants(pantsPriceUSD)
                } else {
                    console.log('Не удалось конвертировать цену брюк в USD');
                }

                if (tshirtPriceUSD !== null) {
                    setTshirt(tshirtPriceUSD)
                } else {
                    console.log('Не удалось конвертировать цену футболки в USD');
                }
            }
            convertPricesToUSD()
        }
    }, []);


    return (
        <div className={style.catalogWrapper} ref={blockRef1}>
            <div className={style.headerDiv}>
                <h2 className={style.title}>{t("MISSOR-PACK")}</h2>
            </div>
            <div className={style.items}>
                <motion.div
                    viewport={{once: true}}
                    whileInView={{y: 0, opacity: 1}}
                    initial={{y: 10, opacity: 0}}
                    transition={{delay: 0.4}}
                    className={style.item}
                    onClick={() => handleNavigate("hoodie")}
                >
                    <img src={hoodie} alt={'/'}/>
                    <h2>{t("HOODIE")}</h2>
                    <p>{hoodiePrice} {currencyValue}</p>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        !isHoodie ?
                            dispatch(addItem({img: hoodie, name: "HOODIE", price: hoodiePrice, quantity: 1}))
                            :
                            dispatch(deleteItem("HOODIE"))
                    }}>
                        {isHoodie ? t("Delete from cart") : t("Add to cart")}
                    </button>
                </motion.div>
                <motion.div className={style.item}
                            viewport={{once: true}}
                            whileInView={{y: 0, opacity: 1}}
                            initial={{y: 10, opacity: 0}}
                            transition={{delay: 0.6}}
                            onClick={() => handleNavigate("t-shirt")}
                >
                    <img src={tshirt} alt={'/'}/>
                    <h2>{t("T-SHIRT")}</h2>
                    <p>{tshirtPrice} {currencyValue}</p>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        !isTshirt ?
                            dispatch(addItem({img: tshirt, name: "T-SHIRT", price: tshirtPrice, quantity: 1}))
                            :
                            dispatch(deleteItem("T-SHIRT"))
                    }}>
                        {isTshirt ? t("Delete from cart") : t("Add to cart")}
                    </button>
                </motion.div>
                <motion.div
                    viewport={{once: true}}
                    whileInView={{y: 0, opacity: 1}}
                    initial={{y: 10, opacity: 0}}
                    transition={{delay: 0.8}}
                    className={style.item}
                    onClick={() => handleNavigate("pants")}
                >
                    <img src={hoodie} alt={'/'}/>
                    <h2>{t("Pants")}</h2>
                    <p>{pantsPrice} {currencyValue}</p>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        !isPants ?
                            dispatch(addItem({img: hoodie, name: "Pants", price: pantsPrice, quantity: 1}))
                            :
                            dispatch(deleteItem("Pants"))
                    }}>
                        {!isPants ? t("Add to cart") : t("Delete from cart")}
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default Catalog;
