"use client";
import React from "react";
import ProductCart from "@/components/MainContent/ProductCart/ProductCart";
import { useSelector } from "react-redux";
import _ from "lodash";
import Link from "next/link";
import "./Cart.scss";

function Cart() {
  const user = useSelector((state: any) => state.User.user);
  const cart = useSelector((state: any) => state.Product.cart);

  return (
    <div className="container bg-white p-2" style={{ minHeight: "80vh" }}>
      {cart.length > 0 ? (
        <div className="d-flex mx-auto flex-wrap">
          <div className="col-md-8 table-responsive my-3">
            <h3 className="text-uppercase mb-4 title text-center">Giỏ hàng</h3>
            <table className="table">
              <tbody>
                {_.uniqBy(cart, (obj) => JSON.stringify(obj))?.map(
                  (item: any, index: number) => (
                    <ProductCart
                      key={index}
                      id={item.id}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                      title={item.title}
                      quantity={item.quantity}
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="col-md-4 my-3 text-right order-product">
            <h3 className="text-uppercase mb-4 title">Đơn hàng</h3>
            <h4>
              Tổng({_.sumBy(cart, "quantity")} sản phẩm):{" "}
              <strong>  
                $
                {_.reduce(
                  cart,
                  (acc, value) => acc + value.quantity * value.price,
                  0
                )}
              </strong>
            </h4>
            <Link
              href={user ? "/shipping" : "/signin"}
              className="btn btn-dark w-50 mt-4 py-1"
            >
              Đặt hàng
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h4 className="cart--empty">
            Giỏ hàng trống.{" "}
            <Link href="/" className="text">
              Xem sản phẩm ngay
            </Link>
          </h4>
          <img src="/assets/img/emptycart1.png" alt="" width="100%" />
        </div>
      )}
    </div>
  );
}

export default Cart;
