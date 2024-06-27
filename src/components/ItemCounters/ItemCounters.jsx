import React from 'react';
import {motion} from "framer-motion";
import style from "../../pages/DetailedProduct/DetailedProduct.module.scss";
import {useTranslation} from "react-i18next";

const ItemCounters = ({setSelectedSize, setSelectedColor, size, color, isPink, isTshirt}) => {
    const {t} = useTranslation()

    const handleSizeClick = (selectedSize) => {
        setSelectedSize(selectedSize);
    };
    const handleColorClick = (selectedColor) => {
        setSelectedColor(selectedColor);
    };
    const colors = isPink ? ["Black", "Pink", "Gray"] : ["Black", "Gray"]
    const sizes = isTshirt ? ["M", "L"] : ["M", "L", "XL"]

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
        <>
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
                    {sizes.map((s) => (
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
                    {colors.map((c) => (
                        <motion.div
                            viewport={{once: true}}
                            whileInView={{y: -10, opacity: 1}}
                            initial={{y: 0, opacity: 0}}
                            transition={{delay: 0.7}}
                            key={c}
                            className={`${style[c]} ${getColorClass(c)} ${color === c ? style[`selected${c}`] : ''}`}
                            onClick={() => handleColorClick(c)}
                        >
                            {c}
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ItemCounters;
