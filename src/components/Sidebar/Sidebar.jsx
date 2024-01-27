import styles from "./Sidebar.module.css";
import AppNav from "../AppNav/AppNav.jsx";
import Logo from "../Logo/Logo.jsx";
import Footer from "../Footer/Footer.jsx";
import {Outlet} from "react-router-dom";

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>

            <Outlet/>

            <Footer/>
        </div>
    )
}