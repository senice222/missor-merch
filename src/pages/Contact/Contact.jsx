import style from './Contact.module.scss'
import {useForm} from 'react-hook-form';
import {useTranslation} from "react-i18next";

const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const { t } = useTranslation();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className={style.contactWrapper}>
            <div className={style.contactFormDiv}>
                <h2>{t("CONTACT")}</h2>
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
                            placeholder="Phone number"
                            {...register('phone', {required: t('Phone number is required')})}
                        />
                        {errors.phone && <p className={style.errorMessage} style={{marginBottom: "10px"}}>{errors.phone.message}</p>}
                    </div>
                    <div>
                        <textarea
                            className={errors.comment ? style.error : ''}
                            className={style.textarea}
                            placeholder="Comment"
                            rows="4"
                            {...register('comment', {required: t('Comment is required')})}
                        ></textarea>
                        {errors.comment && <p className={style.errorMessage}>{errors.comment.message}</p>}
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
