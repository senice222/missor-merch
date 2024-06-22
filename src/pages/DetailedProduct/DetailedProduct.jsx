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
import {useDispatch} from "react-redux";
import {addItem} from "../../store/slices/CartSlice";
import hoodie from "../../assets/HUDI BLACK 3 1.png";
import tshirt from "../../assets/t-shirt.png";

const DetailedProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const {name} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const {size, color} = queryString.parse(location.search);
    const [selectedSize, setSelectedSize] = useState(size || 'M');
    const [selectedColor, setSelectedColor] = useState(color || 'black');

    useEffect(() => {
        const params = queryString.stringify({size: selectedSize, color: selectedColor});
        navigate(`/product/${name}?${params}`, {replace: true});
    }, [selectedSize, selectedColor, name, navigate]);

    const copyToClipboard = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url).then(() => {
            notification.success({
                message: 'Ссылка скопирована в буфер обмена.',
                duration: 1.5,
            });
        }).catch(err => {
            console.error('Ошибка при копировании в буфер обмена: ', err);
        });
    };

    const handleSizeClick = (selectedSize) => {
        setSelectedSize(selectedSize);
    };
    const handleColorClick = (selectedColor) => {
        setSelectedColor(selectedColor);
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
            dispatch(addItem({img : hoodie, name: "HOODIE", price: 13500, quantity: 1}))
        }
        else if (name === "t-shirt") {
            dispatch(addItem({img : tshirt, name: "T-SHIRT", price: 4900, quantity: 1}))
        }
        else if (name === "pants") {
            dispatch(addItem({img : hoodie, name: "Pants", price: 7900, quantity: 1}))
        }
        navigate('/cart')
    }
    const getColorClass = (color) => {
        switch (color) {
            case 'Черный':
            case 'Black':
                return style.black;
            case 'Розовый':
            case 'Pink':
                return style.pink;
            case 'Серый':
            case 'Gray':
                return style.gray;
            default:
                return '';
        }
    };

    return (
        <div className={style.productWrapper}>
            <div className={style.container}>
                <div className={style.firstBlock}>
                    <Imgs />
                    <div className={style.product}>
                        <motion.div
                            className={style.wrapperTitle}
                            viewport={{once: true}}
                            whileInView={{y: 0, opacity: 1}}
                            initial={{y: -10, opacity: 0}}
                            transition={{delay: 0.1}}
                        >
                            <h1 className={style.title}>{name.toUpperCase()}</h1>
                            <h2 className={style.subtitle}>LIMITED EDITION</h2>
                        </motion.div>
                        <motion.p
                            viewport={{once: true}}
                            whileInView={{y: 0, opacity: 1}}
                            initial={{y: -10, opacity: 0}}
                            transition={{delay: 0.2}}
                            className={style.price}
                        >13500 RUB
                        </motion.p>
                        <div>
                            <motion.p
                                viewport={{once: true}}
                                whileInView={{y: 0, opacity: 1}}
                                initial={{y: -10, opacity: 0}}
                                transition={{delay: 0.3}}
                                className={style.label}
                            >
                                {t("Size")}
                            </motion.p>
                            <div className={style.options}>
                                {['M', 'L', 'XL'].map((s) => (
                                    <motion.div
                                        viewport={{once: true}}
                                        whileInView={{y: -10, opacity: 1}}
                                        initial={{y: 0, opacity: 0}}
                                        transition={{delay: 0.4}}
                                        key={s}
                                        className={`${style.option} ${size === s ? style.selected : ''}`}
                                        onClick={() => handleSizeClick(s)}
                                    >
                                        {s}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <motion.p
                                viewport={{once: true}}
                                whileInView={{y: 0, opacity: 1}}
                                initial={{y: -10, opacity: 0}}
                                transition={{delay: 0.6}}
                                className={style.label}
                            >
                                {t("Color")}
                            </motion.p>
                            <div className={style.options}>
                                {[t("Black"), t("Pink"), t("Gray")].map((c) => (
                                    <motion.div
                                        viewport={{once: true}}
                                        whileInView={{y: -10, opacity: 1}}
                                        initial={{y: 0, opacity: 0}}
                                        transition={{delay: 0.7}}
                                        key={c}
                                        className={`${style.option} ${getColorClass(c)} ${color === c ? style.selected : ''}`}
                                        onClick={() => handleColorClick(c)}
                                    >
                                        {c}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

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
                            onClick={addToCart}
                            className={style.addToCart}>
                            {t("Add to cart")}
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
                            <img src={share} alt="/"/>
                            <p>{t("Share")}</p>
                        </motion.div>
                    </div>
                </div>
                <div className={style.more}>
                    <h2>{t("You may also like")}</h2>
                    <div>
                        <img src={pants2} alt="/"/>
                        <img src={pants1} alt="/"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedProduct;
