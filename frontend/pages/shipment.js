
import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/Shipment.module.css";
import axios from "axios";
import NavBar from "../components/NavBar";


export default function shipment() {


    const [shipment, setShipment] = useState({});

    useEffect(() => {


        const orderid = localStorage.getItem("orderid");
        axios.get(`http://localhost:3005/${orderid}`).then((response) => {

            const data = response.data;
            setShipment(data);


        });
    }, []);




    return < div className={styles.Homepage}>

        <hr style={{
            width: 1,
            color: "black",
            position: "absolute",
            height: "99%",
            marginLeft: "20rem",
        }} />
        <NavBar></NavBar>

        <div className={styles.shipmentCard}>

            <img

                src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
                alt="Picture of the author"

                className={styles.ShipImage}
            />

            <h2 className={styles.ShipText}> your shipment is {shipment.ShipmentStatus}</h2>

        </div>

    </div>





}
