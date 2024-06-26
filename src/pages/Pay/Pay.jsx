import style from './Pay.module.scss'
import {useForm} from 'react-hook-form';
import {useTranslation} from "react-i18next";
import {sendInfo} from "../../api/order";
import {useSelector} from "react-redux";
import {notification} from "antd";

const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const {t} = useTranslation();
    const cart = useSelector((state) => state.cart.items)

    const validatePhoneNumber = (value) => {
        const cleanedValue = value.replace(/[^\d+]/g, '');
        const phoneRegex = /^\+\d{10,15}$/;
        return phoneRegex.test(cleanedValue) || t("Enter your phone");
    };

    const onSubmit = async (data) => {
        console.log(data);
        // img: hoodie, name: t("HOODIE"), price: hoodiePrice, quantity: 1
        const text = `
        
        ORDER:
        ${cart.map((item) => `
📦<b>Product</b>: ${item.name}
💸<b>Price</b>: ${item.price}
🗓<b>Size</b>: ${item.size}
🌺<b>Color</b>: ${item.color}
👉🏻<b>Quantity</b>: ${item.quantity}
`)}
        `
        console.log(text)
        await sendInfo(text);
        notification.send({
            message: t("Thank you for your order! A manager will contact you shortly"),
            duration: 2
        })
    };

    return (
        <div className={style.contactWrapper}>
            <div className={style.contactFormDiv}>
                <h2>{t("Enter your data")}</h2>
                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.row}>
                        <div>
                            <input
                                type="text"
                                className={`${style.name} ${errors.name ? style.error : ''}`}
                                placeholder="Name"
                                {...register('name', {required: t('Name is required')})}
                            />
                            {errors.name && <p className={style.errorMessage}>{errors.name.message}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                className={`${style.name} ${errors.telegram ? style.error : ''}`}
                                placeholder="Telegram"
                                {...register('telegram', {required: t('Telegram is required')})}
                            />
                            {errors.telegram && <p className={style.errorMessage}>{errors.telegram.message}</p>}
                        </div>
                    </div>
                    <div>
                        <input
                            type="text"
                            className={`${style.phone} ${errors.phone ? style.error : ''}`}
                            placeholder="Phone number with +"
                            {...register('phone', {required: t('Phone number is required'), validate: validatePhoneNumber})}
                        />
                        {errors.phone &&
                            <p className={style.errorMessage} style={{marginBottom: "10px"}}>{errors.phone.message}</p>}
                    </div>
                    <div className={style.wrapperBtn}>
                        <button className={style.send} type="submit">
                            {t("Send")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
