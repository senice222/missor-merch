import style from './DetailedProduct.module.scss'
import second from '../../assets/secondImg.png'
import cholopok from '../../assets/chlopok.png'
import plotnost from '../../assets/plotnost.png'
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
    const { name } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { size, color } = queryString.parse(location.search);
    const [selectedSize, setSelectedSize] = useState(size || 'M');
    const [selectedColor, setSelectedColor] = useState(color || 'Black');
    const { hoodiePrice, pantsPrice, tshirtPrice } = useSelector((state) => state.prices);
    const currency = localStorage?.getItem('currency');
    const state = useSelector(state => state.cart.items);
    let currencyValue = currency === "RUB" ? "₽" : currency === "USD" ? "$" : currency === "BYN" ? "Br" : currency === "KZT" ? "₸" : currency === "KGS" ? "⃀" : currency === "AMD" ? "֏" : "";
    const [filteredProducts, setFilteredProducts] = useState([]);

    const products = [
        { name: "hoodie", src: second, link: "/product/hoodie?color=Black&size=M" },
        { name: "t-shirt", src: pants2, link: "/product/t-shirt?color=Black&size=M" },
        { name: "pants", src: pants1, link: "/product/pants?color=Black&size=M" }
    ];
    const objPrices = {
        "hoodie": {
            name: t("HOODIE"),
            price: hoodiePrice,
            isInCart: state.some(item => item.id === `hoodie-${selectedColor}-${selectedSize}`)
        },
        "t-shirt": {
            name: t("T-SHIRT"),
            price: tshirtPrice,
            isInCart: state.some(item => item.id === `t-shirt-${selectedColor}-${selectedSize}`)
        },
        "pants": {
            name: t("Pants"),
            price: pantsPrice,
            isInCart: state.some(item => item.id === `pants-${selectedColor}-${selectedSize}`)
        },
    };
    const correctPrice = objPrices[name];

    useEffect(() => {
        const filtered = products.filter(product => product.name !== name);
        setFilteredProducts(filtered);
    }, [name]);

    useEffect(() => {
        setSelectedColor('Black')
    }, [name]);
    
    useEffect(() => {
        const params = queryString.stringify({ size: selectedSize, color: selectedColor });
        navigate(`/product/${name}?${params}`, { replace: true });
    }, [selectedSize, selectedColor, name, navigate]);

    const copyToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            notification.success({
                placement: 'topRight',
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
        const id = `${name}-${selectedColor}-${selectedSize}`;
        if (!correctPrice.isInCart) {
            dispatch(addItem({ id, img: name === 'hoodie' ? hoodie : name === 't-shirt' ? tshirt : pants1, color: selectedColor, size: selectedSize, name: correctPrice.name, price: correctPrice.price, quantity }));
            notification.success({
                message: t("You successfully added item."),
                duration: 2
            });
        } else {
            dispatch(deleteItem(id));
            notification.success({
                message: t("You deleted item."),
                duration: 2
            });
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const isPink = () => {
        if (name === "hoodie" || name === "pants") {
            return false
        } else {
            return true
        }
    }
    const isTshirt = name === "t-shirt" ? true : false

    return (
        <div className={style.productWrapper}>
            <div className={style.container}>
                <div className={style.firstBlock}>
                    <Imgs selectedName={name} selectedColor={capitalizeFirstLetter(selectedColor)} />
                    <div className={style.product}>
                        <motion.div
                            className={style.wrapperTitle}
                            viewport={{ once: true }}
                            whileInView={{ y: 0, opacity: 1 }}
                            initial={{ y: -10, opacity: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className={style.title}>{correctPrice.name.toUpperCase()}</h1>
                            <h2 className={style.subtitle}>LIMITED EDITION</h2>
                        </motion.div>
                        <motion.p
                            viewport={{ once: true }}
                            whileInView={{ y: 0, opacity: 1 }}
                            initial={{ y: -10, opacity: 0 }}
                            transition={{ delay: 0.2 }}
                            className={style.price}
                        >{correctPrice.price} {currencyValue}
                        </motion.p>
                        <ItemCounters
                            setSelectedSize={setSelectedSize} setSelectedColor={setSelectedColor}
                            size={size} color={color}
                            isPink={isPink()}
                            isTshirt={isTshirt}
                        />
                        <div className={style.quantity}>
                            <motion.h2
                                viewport={{ once: true }}
                                whileInView={{ y: -10, opacity: 1 }}
                                initial={{ y: 0, opacity: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                {t("Quantity")}
                            </motion.h2>
                            <motion.div
                                viewport={{ once: true }}
                                whileInView={{ y: -10, opacity: 1 }}
                                initial={{ y: 0, opacity: 0 }}
                                transition={{ delay: 0.9 }}
                            >
                                <button onClick={decrementQuantity}>-</button>
                                <input type="text" value={quantity} readOnly />
                                <button onClick={incrementQuantity}>+</button>
                            </motion.div>
                        </div>

                        <motion.button
                            viewport={{ once: true }}
                            whileInView={{ y: -10, opacity: 1 }}
                            initial={{ y: 0, opacity: 0 }}
                            transition={{ delay: 0.9 }}
                            onClick={addToCart}
                            className={style.addToCart}
                        >
                            {correctPrice.isInCart ? t("Delete from cart") : t("Add to cart")}
                        </motion.button>
                        <motion.div className={style.materials}
                                    viewport={{ once: true }}
                                    whileInView={{ y: -10, opacity: 1 }}
                                    initial={{ y: 0, opacity: 0 }}
                                    transition={{ delay: 1 }}
                        >
                            <div>
                                <img src={cholopok} alt="/" />
                                <p>100% {t("cotton")}</p>
                            </div>
                            <div>
                                <img src={plotnost} alt="/" />
                                <p>{t("Tight")}</p>
                            </div>
                        </motion.div>
                        <motion.div className={style.share} onClick={copyToClipboard}
                                    viewport={{ once: true }}
                                    whileInView={{ y: -10, opacity: 1 }}
                                    initial={{ y: 0, opacity: 0 }}
                                    transition={{ delay: 0.1 }}
                        >
                            <ShareSVG />
                            <p>{t("Share")}</p>
                        </motion.div>
                    </div>
                </div>
                <div className={style.more}>
                    <h2>{t("You may also like")}</h2>
                    <div>
                        {filteredProducts.map(product => (
                            <img
                                key={product.name}
                                onClick={() => {
                                    navigate(product.link);
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                }}
                                src={product.src}
                                alt={product.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedProduct;
