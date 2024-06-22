import {Outlet} from "react-router-dom";
import {Header} from "../components/Header/Header";
import AnimatedPage from "./AnimatedPage";
import {Footer} from "../components/Footer/Footer";
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import {useRef} from "react";
import { MyContext } from '../context/useMyContext';

const Layout = () => {
    gsap.registerPlugin(ScrollToPlugin)
    const blockRef1 = useRef(null)
    const scrollTo = (target) => gsap.to(window, {duration: 1, scrollTo: target})

    return (
        <AnimatedPage>
            <Header scrollTo={scrollTo} blockRef1={blockRef1}/>
            <MyContext.Provider value={{blockRef1, scrollTo}}>
                <Outlet/>
            </MyContext.Provider>
            <Footer/>
        </AnimatedPage>
    );
};

export default Layout;
