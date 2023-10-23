"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import "./ListProducts.scss";

interface IProduct {
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
}

function ListProducts() {
  const products = useSelector((state: any) => state.Product.products);

  return (
    <div className="row my-5">
      {products?.map((product: IProduct, index: number) => (
        <div className="col-xl-3 col-md-6" key={index}>
          <Product
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating}
          />
        </div>
      ))}
    </div>
  );
}

export default ListProducts;
