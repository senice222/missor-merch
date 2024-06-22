import s from './Header.module.scss'
import {NavLink, useNavigate} from "react-router-dom";
import logo from '../../assets/missor_header.png'
import monkey from '../../assets/monkey.png'
import basket from '../../assets/basket.png'
import ruen from '../../assets/ruen.png'
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeRegion} from "../../store/slices/RegionSlice";
import {setCookie} from "nookies";
import {useTranslation} from "react-i18next";
import menu from '../../assets/menu.png'
import {BurgerMenu} from "../BurgerMenu/BurgerMenu";

export const Header = ({scrollTo, blockRef1}) => {
    const [openned, setOpenned] = useState(false)
    const [langOpened, setLangOpened] = useState(false)
    const [isBurger, setBurger] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation();
    const currency = localStorage.getItem("currency")

    const handleRegion = (obj) => {
        dispatch(changeRegion(obj))
        localStorage.setItem("currency", obj.currency)
        setOpenned(false)
        window.location.reload()
    }

    const handleNavLinkClick = () => {
        if (blockRef1 && blockRef1.current) {
            scrollTo(blockRef1.current);
        }
    };

    return (
        <>
            <BurgerMenu scrollTo={scrollTo} blockRef1={blockRef1} isOpened={isBurger}
                        setOpened={() => setBurger(!isBurger)}/>
            <div className={s.headerWrapper}>
                <div className={s.Header}>
                    <div onClick={() => setBurger(!isBurger)} className={s.burger}>
                        <img src={menu} alt={'menu'}/>
                    </div>
                    <div className={s.links}>
                        <NavLink className={s.link} to={'/'}>{t("Home")}</NavLink>
                        <NavLink className={s.link} to={'/'} onClick={handleNavLinkClick}>{t("Catalog")}</NavLink>
                        <NavLink className={s.link} to={'/contact'}>{t("Contact")}</NavLink>
                    </div>
                    <div onClick={() => navigate('/')} className={s.logoContainer}>
                        <img src={logo} alt={'logo'}/>
                    </div>
                    <div className={s.right}>
                        <div className={s.select}>
                            <p className={s.title}>{t("Country/region")}</p>
                            <div onClick={() => setOpenned((prev) => !prev)}
                                 className={`${s.selectCountry} ${openned ? s.selectBoxOpened : ""}`}>
                                <p>{currency === "RUB" ? "Россия" : "USA"}</p>
                                <p>|</p>
                                <p>{currency}</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={9}
                                    height={6}
                                    viewBox="0 0 6 3"
                                    fill="none"
                                >
                                    <path
                                        d="M1.08518 0.433967C0.939341 0.579796 0.939341 0.816252 1.08518 0.962077L2.91207 2.78718C3.2038 3.07861 3.67649 3.0785 3.96806 2.78696L5.79425 0.960733C5.94011 0.814908 5.94011 0.578451 5.79425 0.432619C5.64842 0.286783 5.41197 0.286783 5.26614 0.432619L3.70311 1.99566C3.55729 2.14152 3.32083 2.14148 3.175 1.99566L1.61329 0.433967C1.46745 0.288131 1.23101 0.288131 1.08518 0.433967Z"
                                        fill="black"
                                    />
                                </svg>
                            </div>
                            <div className={`${s.selectCont} ${openned ? s.selectOpened : ""}`}>
                                {
                                    currency === "USD" ? null :
                                        <div onClick={() => handleRegion({country: 'USA', currency: 'USD'})}
                                             className={s.item}>
                                            <p>USA</p>
                                            <p>|</p>
                                            <p>Usd</p>
                                        </div>
                                }
                                {
                                    currency === "RUB" ? null :
                                        <div onClick={() => handleRegion({country: 'Russia', currency: 'RUB'})}
                                             className={s.item}>
                                            <p>Россия</p>
                                            <p>|</p>
                                            <p>Rub</p>
                                        </div>
                                }
                            </div>
                        </div>
                        <img src={monkey} onClick={() => navigate('/contact')} alt={'monkey'}/>
                        <img src={basket} alt={'basket'} onClick={() => navigate('/cart')}/>
                        <div className={s.ruEn}>
                            <img onClick={() => setLangOpened((prev) => !prev)} src={ruen} alt={'ruen'}/>
                            <div className={`${s.langChange} ${langOpened ? s.langOpened : ''}`}>
                                <p onClick={() => {
                                    setCookie(null, 'lang', "ru", {
                                        path: '/'
                                    })
                                    window.location.reload()
                                }}>RU</p>
                                <p onClick={() => {
                                    setCookie(null, 'lang', "en", {
                                        path: '/'
                                    })
                                    window.location.reload()
                                }}>EN</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}