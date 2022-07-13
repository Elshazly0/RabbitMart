import Error from "next/error";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import styles from "../styles/Home.module.css";
import BuyCard from "../components/BuyCard";
import BuyPart from "../components/BuyPart";
import { FormFeedback, Input, Label } from "reactstrap";
import { Button } from "reactstrap";

function ProductPageContainer({ product }) {
  const [Quantity, setQuantity] = useState(0);

  const BuyHandler = (event) => {
    localStorage.setItem("product", JSON.stringify(product));
    localStorage.setItem("quantity", Quantity);

    window.location.replace("http://localhost:3000/payment");
  };

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.Homepage}>
      <div className={styles.NavBar1}>
        <h1 className={styles.hello}>Products.</h1>
        <h1 className={styles.Hellotitle}>products</h1>
      </div>
      <div className={styles.BuyLayout}>
        <BuyCard
          image={product.image}
          name={product.name}
          price={product.price}
        ></BuyCard>
        <div className={styles.buyPart}>
          <Input
            style={{
              width: "100%",
              borderRadius: "20px",
              height: "60px",

              padding: "12px 20px",
              margin: "8px 0",
            }}
            name="nameOnCard"
            id="nameOnCard"
            placeholder="quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Button
            style={{
              width: "60%",
              height: "45px",
              backgroundColor: "#f5f5dc",
              marginLeft: "100px"


            }}
            color="primary" size="sm" onClick={BuyHandler}>
            Submit
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const productSlug = params.slug;
  const response = await fetch(
    `https://se-lecture-8-node-vercel-h814dy0vt-desoukya-gmailcom.vercel.app/api/products/${productSlug}`
  );
  const data = await response.text();
  const product = JSON.parse(data);
  return {
    props: {
      product,
    },
  };
}

// pages/products/[slug]
export async function getStaticPaths() {
  const response = await fetch(
    "https://se-lecture-8-node-vercel-h814dy0vt-desoukya-gmailcom.vercel.app/api/products"
  );
  const data = await response.text();
  const products = JSON.parse(data);
  const paths = products.map((product) => ({
    params: { slug: String(product.id) },
  }));
  return {
    paths,
    fallback: false,
  };
}
export default ProductPageContainer;
