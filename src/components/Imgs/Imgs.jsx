import React, {useEffect, useState} from 'react';
import style from "../../pages/DetailedProduct/DetailedProduct.module.scss";
import {AnimatePresence, motion} from "framer-motion";
import first from "../../assets/firstImg.png";
import second from "../../assets/secondImg.png";
import third from "../../assets/third.png";
import women from "../../assets/hoodie-women.png";
import pants2 from "../../assets/pants2.png";
import pants1 from "../../assets/pants1.png";
import pinkFirst from "../../assets/pink-tshirt2.jpg";
import pinkSecond from "../../assets/pink-tshirt.jpg";
import tshirtFirst from "../../assets/tshirtFirst.jpg";

const Imgs = ({selectedName, selectedColor}) => {

    const titleInfo = {
        "hoodie": {
            "Pink": pinkFirst,
            "Black": women,
            "Gray": [],
        },
        "t-shirt": {
            "Pink": pinkFirst,
            "Black": tshirtFirst,
            "Gray": [],
        },
        "pants": {
            "Pink": pinkFirst,
            "Black": pants2,
            "Gray": [],
        }
    }
    const detailedInfo = {
        "hoodie": {
            "Pink": [pinkSecond],
            "Black": [first, second, third],
            "Gray": [],
        },
        "t-shirt": {
            "Pink": [pinkSecond],
            "Black": [pants2],
            "Gray": [],
        },
        "pants": {
            "Pink": [pinkSecond],
            "Black": [pants1, tshirtFirst],
            "Gray": [],
        }
    }
    const [selectedImage, setSelectedImage] = useState(titleInfo[selectedName][selectedColor])
    const [detailImages, setDetailImages] = useState(detailedInfo[selectedColor]);

    useEffect(() => {
        setSelectedImage(titleInfo[selectedName][selectedColor]);
        setDetailImages(detailedInfo[selectedName][selectedColor]);
    }, [selectedName, selectedColor]);

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
                {detailImages?.map((imgSrc, index) => (
                    <motion.img
                        initial={{ opacity: 0, scale: 0.95, filter: 'brightness(0)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
                        exit={{ opacity: 0, scale: 0.95, filter: 'brightness(0)' }}
                        transition={{ duration: 0.7 }}
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
