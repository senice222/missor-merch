import s from './Header.module.scss'
import {NavLink, useNavigate} from "react-router-dom";
import logo from '../../assets/missor_header.png'
import monkey from '../../assets/monkey.svg'
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
    const count = useSelector((state) => state.cart.items).length
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
                                <p>{currency === "RUB" ? "Россия" : currency === "USD" ? "USA" : currency === "BYN" ? "Беларусь" : currency === "KZT" ? "Казахстан" : currency === "KGS" ? "Кыргызстан" : currency === "AMD" ? "Армения" : "Россия"}</p>
                                <p>|</p>
                                <p>{currency ? currency : "RUB"}</p>
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
                                    currency === "RUB" ? null :
                                        <div onClick={() => handleRegion({country: 'Russia', currency: 'RUB'})}
                                             className={s.item}>
                                            <p>Россия</p>
                                            <p>|</p>
                                            <p>Rub</p>
                                        </div>
                                }
                                {
                                    currency === "BYN" ? null :
                                        <div onClick={() => handleRegion({country: 'Belarus', currency: 'BYN'})}
                                             className={s.item}>
                                            <p>Беларусь | BYN</p>
                                            {/*<p></p>*/}
                                            {/*<p>Rub</p>*/}
                                        </div>
                                }
                                {
                                    currency === "KZT" ? null :
                                        <div onClick={() => handleRegion({country: 'Kazakhstan', currency: 'KZT'})}
                                             className={s.item}>
                                            <p style={{fontSize: '14px'}}>Казахстан | KZT</p>
                                            {/*<p></p>*/}
                                            {/*<p>Rub</p>*/}
                                        </div>
                                }
                                {
                                    currency === "KGS" ? null :
                                        <div onClick={() => handleRegion({country: 'Kyrgyzstan', currency: 'KGS'})}
                                             className={s.item}>
                                            <p style={{fontSize: '14px'}}>Кыргызстан | KGS</p>
                                            {/*<p></p>*/}
                                            {/*<p>Rub</p>*/}
                                        </div>
                                }
                                {
                                    currency === "AMD" ? null :
                                        <div onClick={() => handleRegion({country: 'Armenia', currency: 'AMD'})}
                                             className={s.item}>
                                            <p style={{fontSize: '14px'}}>Армения | AMD</p>
                                            {/*<p></p>*/}
                                            {/*<p>Rub</p>*/}
                                        </div>
                                }

                            </div>
                        </div>
                        {/* <div>
                            <Monkey
                        </div> */}
                        <img src={monkey} onClick={() => navigate('/contact')} alt={'monkey'}/>
                        <div onClick={() => navigate('/cart')} className={s.cartDiv}>
                            {count === 0 ? null : <div className={s.circle}>
                                <p>{count}</p>
                            </div>}
                            <svg
                                className={s.cart}
                                width={26}
                                height={25}
                                viewBox="0 0 26 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.866693 0.359863C0.636832 0.359863 0.416385 0.443868 0.253849 0.593397C0.0913121 0.742926 0 0.945731 0 1.1572C0 1.36866 0.0913121 1.57147 0.253849 1.721C0.416385 1.87053 0.636832 1.95453 0.866693 1.95453H2.79075L3.48584 4.51716L6.08245 17.2506C6.11963 17.4333 6.22504 17.5983 6.38044 17.7171C6.53585 17.8359 6.73149 17.901 6.93355 17.9012H8.66693C7.74749 17.9012 6.8657 18.2372 6.21556 18.8353C5.56541 19.4334 5.20016 20.2447 5.20016 21.0905C5.20016 21.9364 5.56541 22.7476 6.21556 23.3457C6.8657 23.9438 7.74749 24.2799 8.66693 24.2799C9.58638 24.2799 10.4682 23.9438 11.1183 23.3457C11.7685 22.7476 12.1337 21.9364 12.1337 21.0905C12.1337 20.2447 11.7685 19.4334 11.1183 18.8353C10.4682 18.2372 9.58638 17.9012 8.66693 17.9012H20.8006C19.8812 17.9012 18.9994 18.2372 18.3493 18.8353C17.6991 19.4334 17.3339 20.2447 17.3339 21.0905C17.3339 21.9364 17.6991 22.7476 18.3493 23.3457C18.9994 23.9438 19.8812 24.2799 20.8006 24.2799C21.7201 24.2799 22.6019 23.9438 23.252 23.3457C23.9022 22.7476 24.2674 21.9364 24.2674 21.0905C24.2674 20.2447 23.9022 19.4334 23.252 18.8353C22.6019 18.2372 21.7201 17.9012 20.8006 17.9012H22.534C22.7361 17.901 22.9317 17.8359 23.0871 17.7171C23.2425 17.5983 23.3479 17.4333 23.3851 17.2506L25.9852 4.49324C26.0086 4.37816 26.0042 4.25976 25.9723 4.14643C25.9403 4.0331 25.8817 3.92763 25.8004 3.83752C25.7192 3.7474 25.6174 3.67485 25.5022 3.62502C25.387 3.57519 25.2614 3.54931 25.1341 3.5492H5.00949L4.30747 0.964242C4.26068 0.791673 4.15252 0.63845 4.00019 0.528937C3.84786 0.419425 3.6601 0.359912 3.46677 0.359863H0.866693ZM7.6529 16.3065L5.37697 5.14386H24.0906L21.8147 16.3065H7.6529ZM10.4003 21.0905C10.4003 21.5135 10.2177 21.9191 9.89262 22.2181C9.56755 22.5172 9.12666 22.6852 8.66693 22.6852C8.20721 22.6852 7.76632 22.5172 7.44125 22.2181C7.11617 21.9191 6.93355 21.5135 6.93355 21.0905C6.93355 20.6676 7.11617 20.262 7.44125 19.9629C7.76632 19.6639 8.20721 19.4959 8.66693 19.4959C9.12666 19.4959 9.56755 19.6639 9.89262 19.9629C10.2177 20.262 10.4003 20.6676 10.4003 21.0905ZM22.534 21.0905C22.534 21.5135 22.3514 21.9191 22.0263 22.2181C21.7013 22.5172 21.2604 22.6852 20.8006 22.6852C20.3409 22.6852 19.9 22.5172 19.575 22.2181C19.2499 21.9191 19.0673 21.5135 19.0673 21.0905C19.0673 20.6676 19.2499 20.262 19.575 19.9629C19.9 19.6639 20.3409 19.4959 20.8006 19.4959C21.2604 19.4959 21.7013 19.6639 22.0263 19.9629C22.3514 20.262 22.534 20.6676 22.534 21.0905Z"
                                    fill="#4C4C4C"
                                />
                            </svg>
                        </div>

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