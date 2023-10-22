"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./ProductCart.scss";
import {
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/actions/productsAction";
import _ from "lodash";
import { useRouter } from "next/navigation";

interface Item {
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
  quantity: number;
}

function ProductCart(props: Item) {
  const dispatch: any = useDispatch();
  const router = useRouter();

  const handleRemoveProduct = (id: number) => {
    dispatch(removeProduct(id));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleToDetail = (id: number) => {
    router.push(`/products/${id}`)
  }

  return (
    <tr className="mb-2">
      <td className="cart-item align-middle">
        <img
          src={props.image}
          className="rounded img-thumbnail"
          alt="..."
          width="72"
          height="72"
          style={{ minWidth: 72 }}
        />
      </td>
      <td className="align-middle">
        <h5 className="cart-title" onClick={() => handleToDetail(props.id)}>{props.title}</h5>
        <h6 className="cart-price">
          <span>₫</span>
          {(props.price * 1000).toLocaleString()}
        </h6>
        <h6 className="text-secondary">Đã bán: {props.rating.count}</h6>
      </td>
      <td className="align-middle">
        <button
          className="btn btn-outline-dark"
          onClick={() => handleDecreaseQuantity(props.id)}
        >
          -
        </button>
        <span className="px-3" style={{ color: "rgb(238, 77, 45)" }}>
          {props.quantity}
        </span>
        <button
          className="btn btn-outline-dark"
          onClick={() => handleIncreaseQuantity(props.id)}
        >
          +
        </button>
      </td>
      <td className="align-middle" onClick={() => handleRemoveProduct(props.id)}>
        <RiDeleteBin6Line className="delete-icon" />
      </td>
    </tr>
  );
}

export default ProductCart;