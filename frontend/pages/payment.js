import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { useState, useEffect } from "react";
import styles from "../styles/payment.module.css";
import axios from "axios";
import NavBar from "../components/NavBar";

export default function Register() {
  const [email, setEmail] = useState("");
  const [CardNumber, setCardNumber] = useState("");
  const [NameOnCard, setNameOnCard] = useState("");
  const [emailState, setEmailState] = useState("");
  const [CardNumberState, setCardNumberState] = useState("");
  const [NameOnCardState, setNameOnCardState] = useState("");
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [expirationDate, setExpirationDate] = useState("");


  useEffect(() => {
    // Perform localStorage action
    setProduct(JSON.parse(localStorage.getItem("product")));
    setQuantity(localStorage.getItem("quantity"));
  }, []);


  const validateEmail = (value) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let emailState;
    if (emailRegex.test(value)) {
      emailState = "has-success";
    } else {
      emailState = "has-danger";
    }
    setEmailState(emailState);
  };

  const validateCardNumber = (value) => {
    let CardNumberState;
    if (value.length == 16) {
      CardNumberState = "has-success";
    } else {
      CardNumberState = "has-danger";
    }
    setCardNumberState(CardNumberState);
  };

  const validateNameOnCard = (value) => {
    let NameOnCardState;
    if (value.length > 5) {
      NameOnCardState = "has-success";
    } else {
      NameOnCardState = "has-danger";
    }
    setNameOnCardState(NameOnCardState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      validateEmail(value);
      setEmail(value);
    } else if (name === "NameOnCard") {
      validateNameOnCard(value);
      setNameOnCard(value);
    } else if (name === "CardNumber") {
      validateCardNumber(value);
      setCardNumber(value);
    } else if (name === "ExpirationDate") {
      setExpirationDate(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmail(email);
    validateCardNumber(CardNumber);
    validateNameOnCard(NameOnCard);

    if (
      emailState === "has-success" &&
      CardNumberState === "has-success" &&
      NameOnCardState === "has-success"
    ) {


      setTimeout(() => {
        axios.post(`http://localhost:3003/payment`).then((response) => {
          const data = response.data["status"]
          if (data == "succeeded") {

            try {
              const rand = parseInt(0 + Math.random() * (100000000000 - 0));
              const shipment = {
                shipmentid: rand.toString(),
                id: product["id"],
                price: product["price"],
                quantity: quantity,
                CardName: NameOnCard,
                CardNumber: CardNumber,
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


      });
    }
  };

  return (
    <div>
      <div className={styles.page}>
        <hr style={{
          width: 1,
          color: "black",
          position: "absolute",
          height: "99%",
          marginLeft: "20rem",
        }} />
        <NavBar></NavBar>
        <div className={styles.App}>
          <h2 style={{ marginTop: "2rem", marginLeft: "1rem" }}>Procced Your Payment</h2>
          <Form className={styles.form} onSubmit={handleSubmit}>
            <FormGroup>
              <Label className={styles.label} for="email">
                Email Address
              </Label>

              <Input
                type="text"
                name="email"
                id="email"
                placeholder="example@example.com"
                onChange={handleChange}
                valid={emailState === "has-success"}
                invalid={emailState === "has-danger"}
              />
              <FormFeedback>Please input a correct email.</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label className={styles.label} for="NameOnCard">
                Name On Card
              </Label>
              <Input
                type="text"
                name="NameOnCard"
                id="NameOnCard"
                placeholder="********"
                onChange={handleChange}
                valid={NameOnCardState === "has-success"}
                invalid={NameOnCardState === "has-danger"}
              />
              <FormFeedback>Please Enter A Real Name</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label className={styles.label} for="CardNumber">
                Card Number
              </Label>
              <Input
                type="CardNumber"
                name="CardNumber"
                id="CardNumber"
                placeholder="1234-5678-****-****"
                onChange={handleChange}
                valid={CardNumberState === "has-success"}
                invalid={CardNumberState === "has-danger"}
              />
              <FormFeedback>
                CardNumber must be 16 characters long.
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label className={styles.label} for="ExpirationDate">
                ExpirationDate
              </Label>
              <Input
                type="date"
                name="ExpirationDate"
                id="ExpirationDate"
                onChange={handleChange}
                valid={NameOnCardState === "has-success"}
                invalid={NameOnCardState === "has-danger"}
              />
              <FormFeedback>Incorrect Expiration Date</FormFeedback>
            </FormGroup>
            <div style={{ marginTop: "5rem" }}></div>
            <Button color="success">Submit</Button>
          </Form>
        </div>
      </div>
      <div className={styles.page}>

      </div>
    </div>


  );
}