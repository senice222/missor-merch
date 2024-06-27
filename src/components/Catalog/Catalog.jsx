import style from './Catalog.module.scss'
import hoodie from '../../assets/HUDI BLACK 3 1.png'
import tshirt from '../../assets/t-shirt.png'
import {motion} from "framer-motion";
import pants from '../../assets/photo_2024.jpg'
import {useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {useMyContext} from "../../context/useMyContext";
import {useDispatch, useSelector} from "react-redux";
import {addItem, deleteItem} from "../../store/slices/CartSlice";
import {useEffect, useState} from "react";
import convertCurrency from "../../utils/getCurrency";
import {notification} from "antd";

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
    const currency = localStorage?.getItem('currency')
    const isHoodie = state.some(item => item.name === t("HOODIE"));
    const isTshirt = state.some(item => item.name === t("T-SHIRT"));
    const isPants = state.some(item => item.name === t("Pants"));
    let currencyValue = currency === "RUB" ? "₽" : currency === "USD" ? "$" : currency === "BYN" ? "Br" : currency === "KZT" ? "₸" : currency === "KGS" ? "⃀" : currency === "AMD" ? "֏" : ""


    useEffect(() => {
        async function convertPrices(currency) {
            const hoodiePriceConverted = await convertCurrency(hoodiePrice, 'RUB', currency);
            const pantsPriceConverted = await convertCurrency(pantsPrice, 'RUB', currency);
            const tshirtPriceConverted = await convertCurrency(tshirtPrice, 'RUB', currency);

            if (hoodiePriceConverted !== null) {
                setHoodie(hoodiePriceConverted);
            } else {
                console.log(`Не удалось конвертировать цену худи в ${currency}`);
            }

            if (pantsPriceConverted !== null) {
                setPants(pantsPriceConverted);
            } else {
                console.log(`Не удалось конвертировать цену брюк в ${currency}`);
            }

            if (tshirtPriceConverted !== null) {
                setTshirt(tshirtPriceConverted);
            } else {
                console.log(`Не удалось конвертировать цену футболки в ${currency}`);
            }
        }

        if (currency === "USD" || currency === "BYN" || currency === "KZT" || currency === "KGS" || currency === "AMD") {
            convertPrices(currency);
        }
    }, [currency]);


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
                        e.stopPropagation();
                        if (!isHoodie) {
                            dispatch(addItem({ img: hoodie, color: "Black", size: "M", name: t("HOODIE"), price: hoodiePrice, quantity: 1 }));
                            notification.success({
                                message: t("You successfully added item."),
                                duration: 2
                            });
                        } else {
                            dispatch(deleteItem(t(`all ${t('HOODIE')}`)));
                            notification.success({
                                message: t("You deleted item."),
                                duration: 2
                            });
                        }
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
                        e.stopPropagation();

                        if (!isTshirt) {
                            dispatch(addItem({ img: tshirt, color: "Black", size: "M", name: t("T-SHIRT"), price: tshirtPrice, quantity: 1 }));
                            notification.success({
                                message: t("You successfully added item."),
                                duration: 2
                            });
                        } else {
                            dispatch(deleteItem(t(`all ${t('T-SHIRT')}`)));
                            notification.success({
                                message: t("You deleted item."),
                                duration: 2
                            });
                        }
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
                    <img src={pants} alt={'/'}/>
                    <h2>{t("Pants")}</h2>
                    <p>{pantsPrice} {currencyValue}</p>
                    <button onClick={(e) => {
                        e.stopPropagation();

                        if (!isPants) {
                            dispatch(addItem({ img: hoodie, color: "Black", size: "M", name: t("Pants"), price: pantsPrice, quantity: 1 }));
                            notification.success({
                                message: t("You successfully added item."),
                                duration: 2
                            });
                        } else {
                            dispatch(deleteItem(t(`all ${t('Pants')}`)));
                            notification.success({
                                message: t("You deleted item."),
                                duration: 2
                            });
                        }
                    }}>
                        {!isPants ? t("Add to cart") : t("Delete from cart")}
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default Catalog;
