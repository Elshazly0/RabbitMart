import React from "react";
import styles from "../styles/NavBar.module.css";
import Image from 'next/image'


export default function NavBar() {
    return <div className={styles.NavBar}>
        <a className={styles.logo} href="">FARMERS.</a>
        <div style={{ marginLeft: "3rem" }}></div>
        <a className={styles.links} href="Dashboard">MarketPlace</a>
        <a className={styles.links} href="About">About</a>









    </div >;
}
