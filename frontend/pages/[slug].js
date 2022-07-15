import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import styles from "../styles/product.module.css";
import BuyCard from "../components/BuyCard";
import Head from 'next/head';



function ProductPageContainer({ product }) {
  const [Quantity, setQuantity] = useState(0);


  const BuyHandler = (event) => {
    if (Quantity != 0) {
      localStorage.setItem("product", JSON.stringify(product));
      localStorage.setItem("quantity", Quantity);

      window.location.replace("http://localhost:3000/payment");
    }

  };

  const Increment = () => {
    if (product.stock > Quantity) {
      setQuantity(Quantity + 1);

    }


  };
  const Decrement = () => {
    if (Quantity > 0) {
      setQuantity(Quantity - 1);

    }

  };

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <>
    <Head>
      <title>{product.name}</title>
    </Head>
    <div className={styles.Homepage}>

      <NavBar></NavBar>

      <BuyCard image={product.image}
        name={product.name}
        category={product.category}
        weight={product.weight}
        measurement={product.measurement}
        price={product.price}
        quantity={Quantity}
        Increment={Increment}
        Decrement={Decrement}
        handleSubmit={BuyHandler}
      >

      </BuyCard>
      {product.stock == 0 &&
        <h2 style={{ marginLeft: "130rem", color: "green" }} >
          This Item is out of Stock cheack back later
        </h2>
      }
      {product.stock == Quantity && Quantity != 0 &&
        <h2 style={{ marginLeft: "130rem", color: "green" }} >
          Only {product.stock} items left in the Stock check back later for more
        </h2>
      }
    </div >
  </>




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
