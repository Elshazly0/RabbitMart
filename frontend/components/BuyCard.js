import React from "react";
import styles from '../styles/product.module.css'

export default function BuyCard(props) {

    return <div className={styles.BuyCard}>



        <img src={props.image} fluid alt='...' className={styles.imageCard} />

        <div className={styles.CardInfo}>
            <h1 className={styles.Cardtitle} style={{ fontSize: "5rem" }}>{props.name}</h1>
            <h3 className={styles.Cardtitle} >{props.category}</h3>

            <h2 className={styles.Cardtitle} style={{ marginTop: "6vh", fontSize: "2rem" }}>measurement : {props.weight} {props.measurement}</h2>

            <h2 className={styles.Cardtitle} style={{ marginTop: "2vh", fontSize: "2rem" }}>Price :  EGP {props.price}</h2>


            <h4>Description :<br /> <br />

                Final Price Of Weighted Items may differ slightly depending on exact weight
            </h4>

            <button className={styles.Quantity} onClick={() => props.Increment()}  >
                +
            </button>
            <h1 style={{ marginLeft: "2rem", display: "inline" }}>{props.quantity}</h1>

            <button className={styles.Quantity} onClick={() => props.Decrement()}  >
                -
            </button>

            <button className={styles.Checkout} onClick={props.handleSubmit}  >
                Checkout
            </button>

        </div >

    </div >


}
