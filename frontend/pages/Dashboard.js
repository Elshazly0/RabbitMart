import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/DashBoard.module.css";
import NavBar from "../components/NavBar";
import Filter from "../components/Filter"
import Slider from "../components/Slider";
import axios from "axios";
import { useRouter } from "next/router";
import Card from "../components/Card";

export default function Dashboard() {
  const router = useRouter();
  const [SearchItem, SetSearchItem] = useState('')
  const [products, setProducts] = useState([]);
  const [Fruits, setFruits] = useState(false)
  const [Dairy, setDairy] = useState(false)
  const [Meat, setMeat] = useState(false)
  const [min, setMin] = useState("");
  const [max, setMax] = useState("")



  useEffect(() => {
    axios.get("http://localhost:3004/products").then((response) => {
      const data = response.data;
      setProducts(data)
    });
  }, []);

  const handleCheckbox = (event) => {

    const name = event.target.value
    if (name === "Fruits") {
      setFruits(!Fruits);
    } else if (name === "Dairy") {
      setDairy(!Dairy);
    } else if (name === "Meat") {
      setMeat(!Meat);
    }



  }

  return (
    <div className={styles.Homepage}>

      <hr style={{
        width: 1,
        color: "black",
        position: "absolute",
        height: "99%",
        marginLeft: "20rem",
      }} />
      <NavBar></NavBar>
      <Filter handleCheckbox={handleCheckbox} setMin={event => { setMin(event.target.value) }} setMax={event => { setMax(event.target.value); }} ></Filter>

      <div className={styles.wrap}>

        <div className={styles.search}>
          <input
            placeholder="What are you looking for?"
            type="text"
            onChange={event => { SetSearchItem(event.target.value) }}
            className={styles.searchTerm}
            id="input_text"
          ></input>
        </div>
      </div>
      <div className={styles.card}>
        <Slider></Slider>

        <div className={styles.category}>


          {products.filter((val) => {

            if (!Fruits && !Dairy && !Meat) {
              return val
            }
            if (Fruits == true) {


              if (val.category == "Fruits and Vegetables") {
                return val
              };
            }
            if (Dairy == true) {
              if (val.category == "Dairy and Eggs") {

                return val
              };
            }
            if (Meat == true) {
              if (val.category == "Meat Poultry and Seafood") {
                return val
              };
            }
          }).filter((val) => {
            if (SearchItem == "") {
              return val
            } else if (val.name.toLowerCase().includes(SearchItem.toLowerCase())) {
              return val
            }

          }).filter((val) => {
            if (min == "" && max == "") {
              return val
            } else if (max == "" && val.price > parseInt(min)) {
              return val
            } else if (min == "" && val.price > parseInt(min)) {
              return val
            } else {

              if (val.price < max && val.price > min) { return val }

            }

          }



          ).map((item) => {
            if (item.stock <= 0) {
              return (
                <div>
                  {/* <br> */}

                  <Card
                    id={item.id}
                    img={item.image}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                    weight={item.weight}
                    measurment={item.measurement}
                  ></Card>
                  {/* </br> */}
                </div>
              );
            }
            return (
              <Card
                id={item.id}
                img={item.image}
                name={item.name}
                price={item.price}
                category={item.category}
                weight={item.weight}
                measurment={item.measurement}
              ></Card>
            );
          })}
        </div>
      </div>
    </div >
  );
}
