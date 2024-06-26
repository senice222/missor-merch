import style from './Cart.module.scss'
import {useState} from "react";
import hoodieImage from '../../assets/third.png'
import trash from '../../assets/trash-1-svgrepo-com 1.png'
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {changeQuantity, deleteItem} from "../../store/slices/CartSlice";

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const items = useSelector((state) => state.cart.items)
    const {t} = useTranslation();
    const currency = localStorage.getItem('currency')
    let currencyValue = currency === "RUB" ? "₽" : currency === "USD" ? "$" : currency === "BYN" ? "Br" : currency === "KZT" ? "₸" : currency === "KGS" ? "⃀" : currency === "AMD" ? "֏" : ""

    return (
        <div className={style.cart}>
            {
                items.length > 0 ? (
                        <>
                            <table>
                                <thead>
                                <tr>
                                    <th>{t("PRODUCT")}</th>
                                    {/*<th></th>*/}
                                    <th>{t("QUANTITY")}</th>
                                    <th>{t("TOTAL")}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    items.map((item) => <tr>
                                        <td className={style.tdInfo}>
                                            <img src={item.img} alt="Hoodie"/>
                                            <div className={style.product}>
                                                <h2>{item.name}</h2>
                                                <p>{item.price} {currencyValue}</p>
                                                <p>Size: {item.size}</p>
                                                <p>Color: {item.color}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={style.wrappQuantity}>
                                                <div className={style.quantity}>
                                                    <button onClick={() => dispatch(changeQuantity({
                                                        id: item.id,
                                                        quantity: item.quantity - 1
                                                    }))}>-
                                                    </button>
                                                    <input type="text" value={item.quantity} readOnly/>
                                                    <button onClick={() => dispatch(changeQuantity({
                                                        id: item.id,
                                                        quantity: item.quantity + 1
                                                    }))}>+
                                                    </button>
                                                </div>
                                                <span className={style.delete}
                                                      onClick={() => dispatch(deleteItem(item.id))}
                                                >
                                                        <img className={style.img} src={trash} alt={'/'}/>
                                                </span>
                                            </div>
                                        </td>
                                        <td>{item.price * item.quantity}</td>
                                    </tr>)
                                }
                                </tbody>
                            </table>
                            <div className={style.payButton}>
                                <button onClick={() => navigate('/pay')}>{t("PAY")}</button>
                            </div>
                        </>
                    ) :
                    <div className={style.emptyDiv}>
                        <h2>{t("YOUR CART IS EMPTY")}</h2>
                        <button onClick={() => navigate("/")}>{t("Continue shopping")}</button>
                    </div>
            }

        </div>
    );
};

export default Cart;
