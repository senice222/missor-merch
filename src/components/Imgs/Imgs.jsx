import React, {useState} from 'react';
import style from "../../pages/DetailedProduct/DetailedProduct.module.scss";
import {AnimatePresence, motion} from "framer-motion";
import first from "../../assets/firstImg.png";
import second from "../../assets/secondImg.png";
import third from "../../assets/third.png";
import women from "../../assets/hoodie-women.png";

const Imgs = () => {
    const [selectedImage, setSelectedImage] = useState(women);
    const [detailImages, setDetailImages] = useState([first, second, third]);

    const handleImageClick = (imgSrc) => {
        const index = detailImages.indexOf(imgSrc);
        if (index !== -1) {
            setDetailImages(prevImages => {
                const updatedImages = [...prevImages];
                updatedImages.push(selectedImage);
                setSelectedImage(imgSrc);
                updatedImages.splice(index, 1);
                return updatedImages;
            });
        }
    };

    return (
        <motion.div className={style.imgs}
                    viewport={{once: true}}
                    whileInView={{x: -10, opacity: 1}}
                    initial={{x: 0, opacity: 0}}
                    transition={{delay: 0.1}}
        >
            <AnimatePresence mode='wait'>
                <motion.img
                    key={selectedImage}
                    className={style.titleImg}
                    src={selectedImage}
                    alt="Title"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                />
            </AnimatePresence>
            <div>
                {detailImages.map((imgSrc, index) => (
                    <img
                        key={imgSrc}
                        src={imgSrc}
                        alt={`Detail-Image-${index}`}
                        onClick={() => handleImageClick(imgSrc)}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default Imgs;
