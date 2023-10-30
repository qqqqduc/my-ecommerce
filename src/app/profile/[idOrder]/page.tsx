"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "firebase/firestore";
import { db } from "@/utils/firebase";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "./DetailOrder.scss";
import _ from "lodash";
import { useRouter } from "next/navigation";

function DetailOrder({ params }: { params: { idOrder: string } }) {
  const [detailOrder, setDetailOrder] = useState<any>(null);
  const [listOrder, setListOrder] = useState<any>(null);
  const router = useRouter()
  const dispatch: any = useDispatch();

  useEffect(() => {
    const getDocumentByIdOder = async (idOrder: string) => {
      try {
        if (!idOrder) {
          console.log(idOrder);
          return;
        }
        const collectionRef = collection(db, "usersCart");
        const q = query(collectionRef, where("idOrder", "==", idOrder));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("Không tìm thấy tài liệu");
        } else {
          querySnapshot.forEach((doc: any) => {
            const documentData = doc.data();
            // Xử lý dữ liệu tài liệu ở đây
            console.log("Dữ liệu tài liệu:", documentData);
            setDetailOrder(documentData);
            setListOrder(
              _.slice(
                _.values(documentData),
                0,
                _.values(documentData).length - 5
              )
            );
          });
        }
      } catch (error) {
        console.error("Lỗi khi lấy tài liệu:", error);
      }
    };

    getDocumentByIdOder(params.idOrder);
  }, [dispatch, params.idOrder]);

  return (
    <div className="container p-2 bg-white pt-4" style={{ minHeight: "80vh" }}>
      <div>
        <button className="btn btn-secondary" onClick={() => router.back()}>Trở lại</button>
      </div>
      <div className="my-4 mx-auto">
        <div>
          <h2>
            <strong>Chi tiết đơn hàng</strong>
          </h2>
          <p>
            <strong>Tên: </strong>
            {detailOrder?.destination.fullName}
          </p>
          <p>
            <strong>Địa chỉ: </strong>
            {detailOrder?.destination.address},{" "}
            {detailOrder?.destination.wardName},{" "}
            {detailOrder?.destination.districtName},{" "}
            {detailOrder?.destination.provinceName}
          </p>
          <p>
            <strong>Số điện thoại: </strong>
            {detailOrder?.destination.number}
          </p>
          <p>
            <strong>Tổng số tiền cần thanh toán: </strong>
            <strong className="text-danger">${detailOrder?.priceTotal}</strong>
          </p>
          <p>
            <strong>Phương thức thanh toán: </strong>
            {detailOrder?.destination.payment}
          </p>
          <p>
            <strong>Trạng thái: </strong><span className="text-danger">Chưa thanh toán</span>
          </p>
        </div>
        <div
          className="alert alert-danger d-flex justify-content-between align-items-center"
          role="alert"
          style={{ maxWidth: 600 }}
        >
          Chưa giao hàng
        </div>
        <h3 className="text-center">Chi tiết sản phẩm</h3>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {listOrder?.map((item: any, index: number) => (
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
                  <td className="align-middle text-capitalize profile__title" onClick={() => router.push(`/products/${item.id}`)}><strong>{item.title}</strong></td>
                  <td className="align-middle text-capitalize">
                    {item.quantity}
                  </td>
                  <td className="align-middle text-capitalize text-danger">
                    <strong className="text-danger">${item.price * item.quantity}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DetailOrder;
