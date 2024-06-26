import axios from "axios";
import {notification} from "antd";
import {useTranslation} from "react-i18next";

export const sendInfo = async (text) => {
    const token = "7148579726:AAH0mUh5rSB1b5AUBR3aBBNCIKTgOCi_GAs";
    const chatId = "-1002227375673";
    const {t} = useTranslation()

    try {
        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
            chat_id: chatId,
            text,
            parse_mode: 'html',
        });
        notification.send({
            message: t("Thank you for your order! A manager will contact you shortly"),
            duration: 2
        })
    } catch (error) {
        console.log(error)
    }
}