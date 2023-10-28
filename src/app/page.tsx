"use client";
import React, { useEffect, useState } from "react";
import ListProducts from "@/components/MainContent/ListProducts/ListProducts";
import { useDispatch } from "react-redux";
import "./globals.scss";
import { getProducts, getProductsByCategory } from "@/redux/actions/productsAction";

export default function Home() {
  const [proType, setProType] = useState("All")
  const dispatch: any = useDispatch()

  const handleClassify = (type: string) => {
    setProType(type)
  }

  useEffect(() => {
    if(proType === "All") {
      dispatch(getProducts())
    }
    if(proType !== "All") {
      dispatch(getProductsByCategory(proType))
    }
  }, [dispatch, proType])

  return (
    <div>
      <div className="image-introduce">
      </div>
    <div className="container p-4" style={{ minHeight: "80vh", marginTop: 32 }}>
      <h3 className="text-center"><strong>Sản phẩm</strong></h3>
      <div className="content-separate"></div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-outline-dark filter__btn" onClick={() => handleClassify("All")}>All</button>
        <button className="btn btn-outline-dark mx-2 filter__btn" onClick={() => handleClassify("men's clothing")}>Men's clothing</button>
        <button className="btn btn-outline-dark filter__btn" onClick={() => handleClassify("women's clothing")}>Women's clothing</button>
        <button className="btn btn-outline-dark mx-2 filter__btn" onClick={() => handleClassify("jewelery")}>Jewelery</button>
        <button className="btn btn-outline-dark filter__btn" onClick={() => handleClassify("electronics")}>Electronic</button>
      </div>
      <ListProducts />
    </div>
    </div>
  );
}