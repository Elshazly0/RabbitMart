import React, { useReducer, useState } from "react";
import styles from "../styles/Filte.module.css";
import Image from 'next/image'
import { loadGetInitialProps } from "next/dist/shared/lib/utils";


export default function Filter(props) {


    return <div className={styles.filter}>
        <h1>Filter</h1>

        <hr style={{
            width: "17rem",
            color: "red",
            backgroundColor: "dimgray",
            height: 1,
        }} />
        <h2>Category</h2>

        <div className={styles.category}>

            Fruits and Vegetables <input onChange={props.handleCheckbox} type="checkbox" name="languages" value="Fruits" /><br /><br />
            Dairy and Eggs <input onChange={props.handleCheckbox} type="checkbox" name="languages" value="Dairy" /><br /><br />
            Meat Poultry and Seafood  <input onChange={props.handleCheckbox} type="checkbox" name="languages" value="Meat" /><br /><br />
        </div>

        <hr style={{
            width: "17rem",
            color: "red",
            backgroundColor: "dimgray",
            height: 1,
        }} />


        <h2>Price Range</h2>


        <div className={styles.priceRange}>
            <input
                placeholder="Min"
                type="text"
                onChange={props.setMin}
                className={styles.searchTerm}
                id="input_text"
            ></input>

            <input
                placeholder="Max"
                type="text"
                onChange={props.setMax}
                className={styles.searchTerm}
                id="input_text"
            ></input>
        </div>

        <hr style={{
            width: "17rem",
            color: "red",
            backgroundColor: "dimgray",
            height: 1,
        }} />

        <div className={styles.Share}>

        </div>


        <div className={styles.bigText}>
            <h3>Share With you Friends</h3>
            <p style={{ textAlign: "start" }}>Share the application with firends and both of you will get 50$ on the upcoming order share out through the link </p>
        </div>




    </div >;
}
