"use client";
import React, { useContext } from "react";
import { ImCheckmark } from "react-icons/im";
import { MdKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import "./Order.scss";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { v4 as uuidv4 } from "uuid";

function Order() {
  const cart = useSelector((state: any) => state.Product.cart);
  const destination = useSelector((state: any) => state.Product.destination);
  const user = useSelector((state: any) => state.User.user);

  const router = useRouter();

  const handleOrder = async () => {
    try {
      // Tham chiếu đến collection "usersCart"
      const collectionRef = collection(db, "usersCart");

      // Dữ liệu của tài liệu mới
      const newDocData = {
        idOrder: uuidv4(),
        userId: user.uid,
        ...cart,
        destination,
        priceTotal: (
          (_.floor(
            _.reduce(
              cart,
              (acc, value) => acc + value.quantity * value.price,
              0
            ),
            2
          ) +
            (destination.provinceName === "Thành phố Hồ Chí Minh" ? 0 : 35)) *
          1000
        ).toLocaleString(),
        timeStamp: serverTimestamp(),
      };

      // Thêm tài liệu mới vào Firestore
      await addDoc(collectionRef, newDocData);

      console.log("Tài liệu mới đã được thêm vào Firestore!");

      router.push("/profile");
    } catch (error) {
      console.error("Đã xảy ra lỗi khi thêm tài liệu vào Firestore:", error);
    }
  };

  return (
    <div className="container bg-white p-2" style={{ minHeight: "80vh" }}>
      <div className="col-md-12 px-4 pt-4">
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
              <span style={{ top: 1, left: "22%", fontSize: 18 }}>
                <ImCheckmark />
              </span>
              <p className="separate"></p>
            </div>
            <p>Phương thức thanh toán</p>
          </div>
          <div className="step-node">
            <div className="circle" style={{ background: "#007bff" }}>
              <span>4</span>
            </div>
            <p>Đặt hàng</p>
          </div>
        </div>
      </div>
      <div className="my-3">
        <div>
          <button
            className="btn btn-secondary container__btn--back"
            onClick={() => router.back()}
          >
            <MdKeyboardBackspace />
            Trở lại
          </button>
        </div>
        <div className="my-4 mx-auto row">
          <div className="col-md-9">
            <div>
              <h2>Chi tiết đơn hàng</h2>
              <p>
                <strong>Tên người nhận: </strong>
                {destination.fullName}
              </p>
              <p>
                <strong>Địa chỉ giao hàng: </strong>
                {destination.address}, {destination.wardName},{" "}
                {destination.districtName}, {destination.provinceName}
              </p>
              <p>
                <strong>Số điện thoại: </strong>
                {destination.number}
              </p>
            </div>
            <div>
              <strong>Phương thức thanh toán: </strong>
              {destination.payment}
            </div>
            <div className="mt-4">
              <strong>Phí vận chuyển: </strong>
              <strong className="text-danger">$5</strong>
            </div>
          </div>
          <div className="col-md-3 my-4">
            <div className="card p-3">
              <h5>Thông tin đặt hàng</h5>
              <div className="d-flex justify-content-between">
                <span>Sản phẩm:</span>
                <strong className="text-danger">
                  $
                  {_.reduce(
                    cart,
                    (acc, value) => acc + value.quantity * value.price,
                    0
                  )}
                </strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Vận chuyển: </span>
                <strong className="text-danger">$5</strong>
              </div>
              <div className="dropdown-divider"></div>
              <div className="d-flex justify-content-between mb-4">
                <strong>Tổng:</strong>
                <strong className="text-danger">
                  $
                  {_.reduce(
                    cart,
                    (acc, value) => acc + value.quantity * value.price,
                    0
                  ) + 5}
                </strong>
              </div>
              <button
                className="btn btn-dark w-100"
                onClick={() => handleOrder()}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
        <h3 className="text-center my-4">Chi tiết sản phẩm</h3>
        <div className="table-responsive my-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {_.uniqBy(cart, (obj) => JSON.stringify(obj))?.map(
                (item: any, index: number) => (
                  <tr key={index}>
                    <td className="align-middle">
                      <img
                        src={item.image}
                        className="rounded img-thumbnail"
                        alt="..."
                        width="72"
                        height="72"
                        style={{ minWidth: 72 }}
                        onClick={() => router.push(`/products/${item.id}`)}
                      />
                    </td>
                    <td className="align-middle text-capitalize product__title" onClick={() => router.push(`/products/${item.id}`)}>
                      <strong>{item.title}</strong>
                    </td>
                    <td className="align-middle text-capitalize">
                      {item.quantity}
                    </td>
                    <td className="align-middle text-capitalize text-danger">
                      <strong>${item.price * item.quantity}</strong>
                    </td>
                    <td className="align-middle text-capitalize text-danger">
                      <strong>${item.price * item.quantity}</strong>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Order;
