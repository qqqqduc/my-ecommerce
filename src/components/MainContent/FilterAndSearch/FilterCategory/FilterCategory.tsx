"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductsByCategory,
} from "@/redux/actions/productsAction";
import "./FilterCategory.scss";

function FilterCategory() {
  const [selectCategory, setSelectCategory] = useState("all");
  const dispatch: any = useDispatch();

  const handleFilterCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectCategory(e.target.value);
  };

  useEffect(() => {
    if (selectCategory === "all") {
      dispatch(getProducts());
    }
    if (selectCategory !== "all") {
      dispatch(getProductsByCategory(selectCategory));
    }
  }, [dispatch, selectCategory]);

  return (
    <select
      className="filter--category bg-info"
      onChange={(e) => handleFilterCategory(e)}
    >
      <option value="all">Danh mục</option>
      <option value="men's clothing">Quần áo nam</option>
      <option value="women's clothing">Quần áo nữ</option>
      <option value="jewelery">Trang sức</option>
      <option value="electronics">Đồ điện tử</option>
    </select>
  );
}

export default FilterCategory;
