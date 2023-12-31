"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ListProducts from "@/components/MainContent/ListProducts/ListProducts";
import { getProductsByCategory } from "@/redux/actions/productsAction";

function ProductType({ params }: { params: { product: string } }) {
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (params.product) {
      dispatch(getProductsByCategory(params.product));
    }
  }, [dispatch, params.product]);

  return (
    <div className="container bg-white p-2">
      <ListProducts />
    </div>
  );
}

export default ProductType;
