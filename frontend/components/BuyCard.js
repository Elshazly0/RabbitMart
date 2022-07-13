import React from "react";
import Image from 'next/image'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';
import styles from '../styles/Home.module.css'

export default function BuyCard(props) {

    return <div className={styles.BuyCard}>



        <div className={styles.buyCardInfo}>
            <MDBCardImage src={props.image} fluid alt='...' style={{ margin: '4.5vw', height: '30vh', width: '30vh', maxHeight: '70vh', maxWidth: '70vw', borderRadius: '2em' }} />
            <h1 className={styles.BuycardTitle} >{props.name}</h1>
            <h1 className={styles.BuycardTitle}>{props.price}</h1>


        </div>


    </div >


}
