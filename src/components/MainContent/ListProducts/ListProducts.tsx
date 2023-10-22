"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { getProducts } from "@/redux/actions/productsAction";
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
  const dispatch: any = useDispatch();
  const products = useSelector((state: any) => state.Product.products);

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, []);

  console.log(products)

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
