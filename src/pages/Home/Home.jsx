import Catalog from "../../components/Catalog/Catalog";
import s from './Home.module.scss'
import {motion} from 'framer-motion'
import {useTranslation} from "react-i18next";
import {parseCookies} from "nookies";
import {useMyContext} from "../../context/useMyContext";
import {useEffect} from "react";

const Home = () => {
    const {t} = useTranslation();
    const {lang} = parseCookies()
    const {scrollTo, blockRef1} = useMyContext();

    useEffect(() => {
        const currency = localStorage.getItem('currency');
        if (!currency) {
            localStorage.setItem('currency', 'RUB');
        }
    }, []);

    return (
        <>
            <motion.div
                className={s.homeWrapper}
                viewport={{once: true}}
                whileInView={{y: 0, opacity: 1}}
                initial={{y: 10, opacity: 0}}
                transition={{delay: 0.42}}
            >
                <div className={s.homePhoto} onClick={() => scrollTo(blockRef1.current)}>
                    <div style={lang === "en" ? {fontSize: "24px"} : {fontSize: "19px"}}>{t("SHOP NOW")}</div>
                </div>
            </motion.div>
            <Catalog/>
        </>
    )
}

export default Home