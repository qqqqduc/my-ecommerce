"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import "./ProductDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getProductDetail } from "@/redux/actions/productsAction";
import { FaCartPlus } from "react-icons/fa";

function page({ params }: { params: { id: number } }) {
  const productDetail = useSelector((state: any) => state.Product.product);
  const dispatch: any = useDispatch();

  const handleAddToCart = () => {
    dispatch(addProduct(productDetail));
  }

  useEffect(() => {
    if (params.id) {
      dispatch(getProductDetail(params.id));
    }
  }, []);

  return (
    <div className="container bg-white p-4" style={{minHeight: '80vh'}}>
      <div className="nav-group">
        <Link href="/" className="nav-detail">
          Trang chủ{" "}
        </Link>
        / {productDetail.title}
      </div>
      <div className="row" style={{padding: '20px 0'}}>
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src={productDetail.image}
            className="rounded img-thumbnail"
            alt="..."
            width="308"
            height="308"
          />
        </div>
        <div className="col-md-6">
          <h3 className="text-capitalize">{productDetail.title}</h3>
          <p className="card-text" style={{color: '#6c757d'}}>
            <span style={{fontSize: 12}}>₫</span>
            {(productDetail.price * 1000).toLocaleString()}
          </p>
          <p className="card-text" style={{color: '#6c757d'}}>
            <span>Đã bán: </span>
            {productDetail.rating?.count}
          </p>
          <p className="card-text">
            {productDetail.description}
          </p>
          <div className="row d-flex mx-0 justify-content-between mt-4">
            <button className="btn btn-danger d-flex justify-content-center align-items-center mx-2 py-2" style={{flex: 1}} onClick={() => handleAddToCart()}>
              <FaCartPlus style={{ marginRight: 16 }} />
              Thêm vào giỏ hàng
            </button>
            <button className="btn btn-primary mx-2" style={{flex: 1}}>
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
