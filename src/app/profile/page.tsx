"use client";
import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { AiFillCamera } from "react-icons/ai";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useSelector } from "react-redux";
import Link from "next/link";

function Profile() {
  const user = useSelector((state: any) => state.User.user);
  const [purchaseHis, setPurchaseHis] = useState<any>(null);

  // Hàm chuyển đổi thành ngày/tháng/năm
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const getUserPurchaseHistory = async (userId: string) => {
      try {
        const collectionRef = collection(db, "usersCart");
        const q = query(collectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const purchaseHistory: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          const purchaseData = doc.data();
          // Kiểm tra tồn tại và đúng định dạng đối tượng thời gian Firestore
          if (purchaseData.timeStamp && purchaseData.timeStamp.toMillis) {
            const purchaseTimeInMillis = purchaseData.timeStamp.toMillis();
            const date = new Date(purchaseTimeInMillis);
            const formattedDate = formatDate(date); // Hàm formatDate chuyển đổi thành ngày/tháng/năm

            purchaseData.timeStamp = formattedDate;
            purchaseHistory.push(purchaseData);
          }
        });

        setPurchaseHis(purchaseHistory);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy lịch sử mua hàng:", error);
      }
    };

    if (user?.uid) {
      getUserPurchaseHistory(user.uid);
    }
  }, [user]);

  return (
    <div className="container bg-white p-2" style={{ minHeight: "80vh" }}>
      <div className="profile">
        <div className="row text-secondary mt-4">
          <div className="col-md-4">
            <h3 className="text-center" style={{ fontSize: 22 }}>
              Thông tin tài khoản
            </h3>
            <div className="profile__avatar">
              <img src={user?.photoURL} alt="" />
              <span>
                <AiFillCamera />
                <p>Thay đổi</p>
              </span>
            </div>
            <small className="text-danger profile__text--danger">
              Chức năng này bị khóa với tài khoản Google/Faceook!
            </small>
            <div className="form-group mb-4">
              <label htmlFor="name">Tên</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                disabled
                value={user?.displayName}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                disabled
                value={user?.email}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Mật khẩu mới</label>
              <input
                type="text"
                name="password"
                id="password"
                className="form-control"
                disabled
                value={"Mật khẩu mới của bạn"}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="confirmPassword">Nhập lại mật khẩu mới</label>
              <input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control"
                disabled
                value={"Nhập lại mật khẩu mới"}
              />
            </div>
            <button className="btn btn-dark w-100 mb-4" disabled type="submit">Thay đổi</button>
          </div>
          <div className="col-md-8 table-responsive">
            <h3 className="text-center" style={{ fontSize: 22 }}>
              Đơn hàng
            </h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Ngày đặt</th>
                  <th>Tổng</th>
                  <th>Thanh toán</th>
                  <th>Giao hàng</th>
                  <th>Đơn hàng</th>
                </tr>
              </thead>
              <tbody>
                {purchaseHis?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="align-middle text-capitalize">
                      {item.timeStamp}
                    </td>
                    <td className="align-middle text-capitalize text-danger">
                      <strong className="text-danger">$ {item.priceTotal}</strong>
                    </td>
                    <td className="align-middle text-capitalize text-danger text-center">
                      <strong>X</strong>
                    </td>
                    <td className="align-middle text-capitalize text-danger text-center">
                      <strong>X</strong>
                    </td>
                    <td className="align-middle text-capitalize text-center">
                      <Link href={`/profile/${item.idOrder}`} >Chi tiết</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
