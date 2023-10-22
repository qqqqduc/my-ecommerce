"use client";
import React, { useEffect, useState } from "react";
import ListProducts from "@/components/MainContent/ListProducts/ListProducts";
import { auth, db } from "@/utils/firebase";
import { useDispatch } from "react-redux";
import { FaAward, FaExchangeAlt, FaHeadset, FaShippingFast } from 'react-icons/fa'
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
  }, [proType])

  return (
    <div className="container p-4" style={{ minHeight: "80vh" }}>
      <h3 className="text-center"><strong>Latest products</strong></h3>
      <div className="content-separate"></div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-outline-dark" onClick={() => handleClassify("All")}>All</button>
        <button className="btn btn-outline-dark mx-2" onClick={() => handleClassify("men's clothing")}>Men's clothing</button>
        <button className="btn btn-outline-dark" onClick={() => handleClassify("women's clothing")}>Women's clothing</button>
        <button className="btn btn-outline-dark mx-2" onClick={() => handleClassify("jewelery")}>Jewelery</button>
        <button className="btn btn-outline-dark" onClick={() => handleClassify("electronics")}>Electronic</button>
      </div>
      <ListProducts />
    </div>
  );
}
