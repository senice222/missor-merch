import style from './DetailedProduct.module.scss'
import women from '../../assets/hoodie-women.png'
import first from '../../assets/firstImg.png'
import second from '../../assets/secondImg.png'
import third from '../../assets/third.png'
import cholopok from '../../assets/chlopok.png'
import plotnost from '../../assets/plotnost.png'
import share from '../../assets/share.png'
import pants1 from '../../assets/pants1.png'
import pants2 from '../../assets/pants2.png'
import {useEffect, useState} from "react";
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import queryString from 'query-string';
import {notification} from 'antd';
import {useTranslation} from "react-i18next";
import {AnimatePresence, motion} from "framer-motion";
import Imgs from "../../components/Imgs/Imgs";
import {useDispatch, useSelector} from "react-redux";
import {addItem, deleteItem} from "../../store/slices/CartSlice";
import hoodie from "../../assets/HUDI BLACK 3 1.png";
import tshirt from "../../assets/t-shirt.png";
import ItemCounters from "../../components/ItemCounters/ItemCounters";
import {ShareSVG} from "../../components/Svgs/Svg";

const DetailedProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const {name} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const currency = localStorage?.getItem('currency')
    const {size, color} = queryString.parse(location.search);
    const [selectedSize, setSelectedSize] = useState(size || 'M');
    const [selectedColor, setSelectedColor] = useState(color || 'Black');
    const {hoodiePrice, pantsPrice, tshirtPrice} = useSelector((state) => state.prices);
    const state = useSelector(state => state.cart.items)
    let currencyValue = currency === "RUB" ? "₽" : currency === "USD" ? "$" : currency === "BYN" ? "Br" : currency === "KZT" ? "₸" : currency === "KGS" ? "⃀" : currency === "AMD" ? "֏" : ""

    const objPrices = {
        "hoodie": {
            name: t("HOODIE"),
            price: hoodiePrice,
            isInCart: state.some(item => item.name === t("HOODIE"))
        },
        "t-shirt": {
            name: t("T-SHIRT"),
            price: tshirtPrice,
            isInCart: state.some(item => item.name === t("T-SHIRT"))
        },
        "pants": {
            name: t("Pants"),
            price: pantsPrice,
            isInCart: state.some(item => item.name === t("Pants"))
        },
    }
    const correctPrice = objPrices[name]

    useEffect(() => {
        const params = queryString.stringify({size: selectedSize, color: selectedColor});
        navigate(`/product/${name}?${params}`, {replace: true});
    }, [selectedSize, selectedColor, name, navigate]);

    const copyToClipboard = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url).then(() => {
            notification.success({
                message: t("Link copied to clipboard."),
                duration: 1.5,
            });
        }).catch(err => {
            console.error('Ошибка при копировании в буфер обмена: ', err);
        });
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
    const addToCart = () => {
        if (name === 'hoodie') {
            dispatch(addItem({img: hoodie, name: t("HOODIE"), price: 13500, quantity}))
        } else if (name === "t-shirt") {
            dispatch(addItem({img: tshirt, name: t("T-SHIRT"), price: 4900, quantity}))
        } else if (name === "pants") {
            dispatch(addItem({img: hoodie, name: t("Pants"), price: 7900, quantity}))
        }
        notification.success({
            message: t("You successfully added item."),
            duration: 2
        })
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className={style.productWrapper}>
            <div className={style.container}>
                <div className={style.firstBlock}>
                    <Imgs selectedName={name} selectedColor={capitalizeFirstLetter(selectedColor)}/>
                    <div className={style.product}>
                        <motion.div
                            className={style.wrapperTitle}
                            viewport={{once: true}}
                            whileInView={{y: 0, opacity: 1}}
                            initial={{y: -10, opacity: 0}}
                            transition={{delay: 0.1}}
                        >
                            <h1 className={style.title}>{correctPrice.name.toUpperCase()}</h1>
                            <h2 className={style.subtitle}>LIMITED EDITION</h2>
                        </motion.div>
                        <motion.p
                            viewport={{once: true}}
                            whileInView={{y: 0, opacity: 1}}
                            initial={{y: -10, opacity: 0}}
                            transition={{delay: 0.2}}
                            className={style.price}
                        >{correctPrice.price} {currencyValue}
                        </motion.p>
                        <ItemCounters
                            setSelectedSize={setSelectedSize} setSelectedColor={setSelectedColor}
                            size={size} color={color}
                        />
                        <div className={style.quantity}>
                            <motion.h2
                                viewport={{once: true}}
                                whileInView={{y: -10, opacity: 1}}
                                initial={{y: 0, opacity: 0}}
                                transition={{delay: 0.8}}
                            >
                                {t("Quantity")}
                            </motion.h2>
                            <motion.div
                                viewport={{once: true}}
                                whileInView={{y: -10, opacity: 1}}
                                initial={{y: 0, opacity: 0}}
                                transition={{delay: 0.9}}
                            >
                                <button onClick={decrementQuantity}>-</button>
                                <input type="text" value={quantity} readOnly/>
                                <button onClick={incrementQuantity}>+</button>
                            </motion.div>
                        </div>

                        <motion.button
                            viewport={{once: true}}
                            whileInView={{y: -10, opacity: 1}}
                            initial={{y: 0, opacity: 0}}
                            transition={{delay: 0.9}}
                            onClick={() => {
                                if (!correctPrice.isInCart) {
                                    addToCart();
                                } else {
                                    dispatch(deleteItem(correctPrice.name));
                                    notification.success({
                                        message: t("You deleted item."),
                                        duration: 2
                                    })
                                }
                            }}
                            className={style.addToCart}
                        >
                            {correctPrice.isInCart ? t("Delete from cart") : t("Add to cart")}
                        </motion.button>
                        <motion.div className={style.materials}
                                    viewport={{once: true}}
                                    whileInView={{y: -10, opacity: 1}}
                                    initial={{y: 0, opacity: 0}}
                                    transition={{delay: 1}}
                        >
                            <div>
                                <img src={cholopok} alt="/"/>
                                <p>100% {t("cotton")}</p>
                            </div>
                            <div>
                                <img src={plotnost} alt="/"/>
                                <p>{t("Tight")}</p>
                            </div>
                        </motion.div>
                        <motion.div className={style.share} onClick={copyToClipboard}
                                    viewport={{once: true}}
                                    whileInView={{y: -10, opacity: 1}}
                                    initial={{y: 0, opacity: 0}}
                                    transition={{delay: 0.1}}
                        >
                            <ShareSVG />
                            <p>{t("Share")}</p>
                        </motion.div>
                    </div>
                </div>
                <div className={style.more}>
                    <h2>{t("You may also like")}</h2>
                    <div>
                        <img onClick={() => {
                            navigate("/product/t-shirt")
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                        }} src={pants2} alt="/"/>
                        <img onClick={() => {
                            navigate("/product/pants")
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                        }} src={pants1} alt="/"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedProduct;
