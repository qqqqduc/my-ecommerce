"use client";
import React, { useState } from "react";
import { ImCheckmark } from "react-icons/im";
import "./Payment.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { SET_PAYMENT } from "@/redux/type";

function Payment() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch()
  const router = useRouter();
  const destination = useSelector((state: any) => state.Product.destination);

  console.log(destination);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleContinue = () => {
    console.log(selectedValue)
    if(selectedValue === "cod") {
      dispatch({type: SET_PAYMENT, payload: "Thanh toán khi nhận hàng"})
    }
    else if(selectedValue === "transfer") {
      dispatch({type: SET_PAYMENT, payload: "Chuyển khoản"})
    }
    else if(selectedValue === "paypal") {
      dispatch({type: SET_PAYMENT, payload: "Paypal"})
    }
    router.push("/order");
  };

  return (
    <div className="container bg-white p-4" style={{ minHeight: "80vh" }}>
      <div className="col-md-12 px-4">
        <div className="d-flex align-items-center justify-content-center">
          <div className="step-node">
            <div className="circle" style={{ background: "#007bff" }}>
              <span style={{ top: 1, left: "22%", fontSize: 18 }}>
                <ImCheckmark />
              </span>
              <p className="separate"></p>
            </div>
            <p>Đăng nhập</p>
          </div>
          <div className="step-node">
            <div className="circle" style={{ background: "#007bff" }}>
              <span style={{ top: 1, left: "22%", fontSize: 18 }}>
                <ImCheckmark />
              </span>
              <p className="separate"></p>
            </div>
            <p>Địa chỉ đặt hàng</p>
          </div>
          <div className="step-node">
            <div className="circle" style={{ background: "#007bff" }}>
              <span>3</span>
              <p className="separate"></p>
            </div>
            <p>Phương thức thanh toán</p>
          </div>
          <div className="step-node">
            <div className="circle">
              <span>4</span>
            </div>
            <p>Đặt hàng</p>
          </div>
        </div>
      </div>
      <div className="payment">
        <h5 className="payment__title">Phương thức thanh toán</h5>
        <div className="payment__method">
          <input
            type="radio"
            name="exampleRadios"
            value="cod"
            className="payment__method--checked"
            checked={selectedValue === "cod"}
            onChange={handleRadioChange}
          />
          <label htmlFor="payment__method--checked">
            Thanh toán khi nhận hàng
          </label>
        </div>
        <div className="payment__method">
          <input
            type="radio"
            name="exampleRadios"
            value="transfer"
            className="payment__method--checked"
            checked={selectedValue === "transfer"}
            onChange={handleRadioChange}
          />
          <label htmlFor="payment__method--checked">Chuyển khoản</label>
        </div>
        <div className="payment__method">
          <input
            type="radio"
            name="exampleRadios"
            value="paypal"
            className="payment__method--checked"
            checked={selectedValue === "paypal"}
            onChange={handleRadioChange}
          />
          <label htmlFor="payment__method--checked">PayPal</label>
        </div>
        <button
          className="btn btn-secondary w-100 mt-4 mb-2"
          onClick={() => handleContinue()}
        >
          Tiếp tục
        </button>
        <Link href="/shipping" className="btn btn-primary w-100">
          Trở về
        </Link>
      </div>
    </div>
  );
}

export default Payment;
