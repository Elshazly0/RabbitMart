import React from "react";
import Image from "next/image";
import {
  MDBCardImage,
} from "mdb-react-ui-kit";
import styles from "../styles/Card.module.css";

export default function Card(props) {
  return (
    <div className={styles.Card}>

      <div className={styles.infoContainer}>
        <MDBCardImage
          src={props.img}
          fluid
          alt="..."
          style={{
            marginTop: "2rem",
            maxHeight: "17rem", maxWidth: "19rem", borderRadius: "2em", display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        <h2 className={styles.cardTitle}>{props.name}</h2>
        <h3 className={styles.cardTitle}>{props.category}</h3>
        <h3 className={styles.cardTitle}>{props.weight}{props.measurment}</h3>
        <h2 className={styles.cardPrice}> price  <br />
          EGP {props.price} <br /></h2>
      </div >
      <a href={`/${props.id}`}>
        <button className={styles.BuyButton}  >
          Buy
        </button>
      </a>

    </div >
  );
}
