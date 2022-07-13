import React, { useState, useEffect } from "react";
import { FormFeedback, Input, Label } from "reactstrap";
import styles from "../styles/Home.module.css";
import { Form, FormGroup, Button } from "reactstrap";
import axios from "axios";

export default function payment() {
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [email, setEmail] = useState("");

  const [nameOnCardState, setNameOnCardState] = useState("");
  const [cardNumberState, setCardNumberState] = useState("");
  const [expirationDateState, setExpirationDateState] = useState("");
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // Perform localStorage action
    setProduct(JSON.parse(localStorage.getItem("product")));
    setQuantity(localStorage.getItem("quantity"));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "nameONCard") {
      setNameOnCard(value);
      console.log(nameOnCard)

    } else if (name === "cardNumber") {
      setCardNumber(value);
    } else if (name === "expirationDate") {
      setExpirationDate(value);
      console.log(expirationDate)

    }
    else if (name === "EmailAddress") {
      setEmail(value);
      console.log(email)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setTimeout(() => {
      axios.post(`http://localhost:3003/payment`).then((response) => {
        const data = response.data["status"];
        console.log(data);
        console.log(product.id);
        const order = {
          id: product["id"],
          price: product["price"],
          quantity: quantity,
          CardName: nameOnCard,
          CardNumber: cardNumber,
          ExpirationDate: expirationDate,
        };
        if (data == "succeeded") {
          axios
            .get(`http://localhost:3004/products/${product["id"]}`)
            .then((responsee) => {
              console.log(responsee.data);
              if (responsee.data["stock"] > quantity) {
                console.log("instock");

                try {
                  const rand = parseInt(0 + Math.random() * (100000000000 - 0));
                  const shipment = {
                    shipmentid: rand.toString(),
                    id: product["id"],
                    price: product["price"],
                    quantity: quantity,
                    CardName: nameOnCard,
                    CardNumber: cardNumber,
                    ExpirationDate: expirationDate,
                    Email: email
                  };
                  axios
                    .post(`http://localhost:3002`, shipment)
                    .then((response) => {
                      console.log(response.data);
                      localStorage.setItem("orderid", shipment["shipmentid"]);
                      window.location.replace("http://localhost:3000/shipment");
                    });
                } catch {
                  console.log("rer");
                }
              } else {
                console.log("out");
              }
            });
        }
      });
    });
  };

  return (
    <div className={styles.Appp}>
      <Button
        style={{
          justifyContent: "right",
          backgroundColor: "#f1f1f1",
          color: "black",
        }}
        className="float-right"
        onClick={() => {
          window.location.replace("http://localhost:3000");
        }}
      >
        {" "}
        Previous Page{" "}
      </Button>
      <br></br>
      <h2 style={{ textAlign: "center" }}>Online Payment</h2>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <FormGroup>
          <Label className={styles.label} for="nameOnCard">
            {" "}
            Name{" "}
          </Label>
          <Input
            style={{
              width: "100%",
              padding: "12px 20px",
              margin: "8px 0",
            }}
            type="text"
            name="nameONCard"
            id="nameONCard"
            placeholder="Enter your Name example John Doe"
            onChange={handleChange}
            valid={nameOnCardState === "has-success"}
            invalid={nameOnCardState === "has-danger"}
          />
          <br></br>
          <FormFeedback>Name must be valid</FormFeedback>
          <br></br>
          <Label className={styles.label} for="cardNumber">
            {" "}
            The Card Number{" "}
          </Label>
          <Input
            style={{
              width: "100%",
              padding: "12px 20px",
              margin: "8px 0",
            }}
            type="text"
            name="cardNumber"
            id="cardNumber"
            placeholder="**** **** **** ****"
            onChange={handleChange}
            valid={cardNumberState === "has-success"}
            invalid={cardNumberState === "has-danger"}
          />
          <br></br>
          <FormFeedback>Number must be valid</FormFeedback>
          <br></br>
          <Label className={styles.label} for="expirationDate">
            {" "}
            Expiration Date{" "}
          </Label>
          <Input
            style={{
              width: "100%",
              padding: "12px 20px",
              margin: "8px 0",
            }}
            type="Date"
            name="expirationDate"
            id="expirationDate"
            onChange={handleChange}
            valid={expirationDateState === "has-success"}
            invalid={expirationDateState === "has-danger"}
          />
          <Label className={styles.label} for="Email">
            {" "}
            Email Address{" "}
          </Label>
          <Input
            style={{
              width: "100%",
              padding: "12px 20px",
              margin: "8px 0",
            }}
            type="string"
            name="EmailAddress"
            id="Email"
            onChange={handleChange}
            placeholder="Enter Your Email Address"
            valid={expirationDateState === "has-success"}
            invalid={expirationDateState === "has-danger"}
          />
          <br></br>
          <FormFeedback> Expiration Date must be valid </FormFeedback>
        </FormGroup>
        <br></br>
        <Button
          style={{
            backgroundColor: "greenyellow",
            width: "100px",
            height: "50px",
          }}
        >
          Submit
        </Button>
      </Form>
      <Form className={styles.form} onSubmit={handleSubmit}></Form>
    </div>
  );
}
