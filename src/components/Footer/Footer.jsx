import s from './Footer.module.scss'
import {NavLink} from "react-router-dom";
import logo from '../../assets/missor_header.png'

import ws from "../../assets/ws.png";
import inst from "../../assets/inst.png";
import telegram from "../../assets/tg.png";
import {useState} from "react";
import {changeRegion} from "../../store/slices/RegionSlice";
import {useDispatch, useSelector} from "react-redux";
import {t} from "i18next";

export const Footer = () => {
    const [openned, setOpenned] = useState(false)
    const dispatch = useDispatch()
    const currency = localStorage.getItem("currency")

    const handleRegion = (obj) => {
        dispatch(changeRegion(obj))
        localStorage.setItem("currency", obj.currency)
        setOpenned(false)
        window.location.reload()
    }

    return (
        <div className={s.headerWrapper}>
            <div className={s.Header}>
                <div className={s.select}>
                    <p className={s.title}>{t("Country/region")}</p>
                    <div onClick={() => setOpenned((prev) => !prev)}
                         className={`${s.selectCountry} ${openned ? s.selectBoxOpened : ""}`}>
                        <p>{currency === "RUB" ? "Россия" : currency === "USD" ? "USA" : currency === "BYN" ? "Беларусь" : currency === "KZT" ? "Казахстан" : currency === "KGS" ? "Кыргызстан" : currency === "AMD" ? "Армения" : ""}</p>
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
                <div className={s.logoContainer}>
                    <img src={logo} alt={'logo'}/>
                </div>
                <div className={s.right}>
                    <div className={s.rightItem}>
                        <img src={ws}/>
                        <p>+8 911 701 022 2</p>
                    </div>
                    <div className={s.rightItem}>
                        <img src={telegram}/>
                        <p>+8 911 701 022 2</p>
                    </div>
                    <div className={s.rightItem}>
                        <img src={inst}/>
                        <p>@1missor</p>
                    </div>
                </div>
            </div>
            <h2>© 2024  Missor</h2>
        </div>
    )
}