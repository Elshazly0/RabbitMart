import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import NavBar from "../components/NavBar";
import styles from "../styles/Start.module.css"
export default function Home() {



  return (
    <div>

      <hr style={{
        color: "blue",
        width: 1,
        height: "75rem",
        position: "absolute",
        marginLeft: "20rem"
      }} />
      <NavBar></NavBar>

      <div className={styles.card}> </div>



    </div >

  );
}
