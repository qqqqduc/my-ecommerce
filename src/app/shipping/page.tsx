"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ImCheckmark } from "react-icons/im";
import "./Shipping.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProvince,
  getDistrict,
  getWard,
} from "@/redux/actions/provinceAction";
import { SET_DESTINATION } from "@/redux/type";
import { useRouter } from "next/navigation";
import _ from "lodash";

function Shipping() {
  const [fullName, setFullName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [provinceName, setProvinceName] = useState("all");
  const [districtName, setDistrictName] = useState("all");
  const [wardName, setWardName] = useState("all");
  const province = useSelector((state: any) => state.Province.province);
  const district = useSelector((state: any) => state.Province.district);
  const ward = useSelector((state: any) => state.Province.ward);
  const dispatch: any = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: SET_DESTINATION,
      payload: {
        fullName,
        number,
        provinceName,
        districtName,
        wardName,
        address,
      },
    });
    router.push("/payment");
  };

  const handleChangeProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    setProvinceName(e.target.value);
  };

  const handleChangeDistrict = (e: ChangeEvent<HTMLSelectElement>) => {
    setDistrictName(e.target.value);
  };

  const handleChangeWard = (e: ChangeEvent<HTMLSelectElement>) => {
    setWardName(e.target.value);
  };

  useEffect(() => {
    if (provinceName === "all") {
      dispatch(getAllProvince());
    } else {
      const foundObject = _.find(province, { province_name: provinceName });
      dispatch(getDistrict(foundObject.province_id));
      setWardName("all");
    }
    if (districtName === "all") {
      return;
    } else {
      const foundObject = _.find(district, { district_name: districtName });
      dispatch(getWard(foundObject.district_id));
    }
  }, [dispatch, provinceName, districtName]);

  return (
    <div className="container bg-white p-4">
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
              <span>2</span>
              <p className="separate"></p>
            </div>
            <p>Địa chỉ đặt hàng</p>
          </div>
          <div className="step-node">
            <div className="circle">
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
      <div className="col-md-12 row">
        <form
          className="mx-auto my-4 col-md-8"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h4 className="text-info mb-4">THÔNG TIN THANH TOÁN</h4>
          <div className="col-md-12 row px-4 mb-4">
            <div className="form-group col-md-6">
              <label htmlFor="fullName" className="nameInput">
                Họ và Tên *
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                placeholder="Nhập tên đầy đủ của bạn"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="phone" className="nameInput">
                Số điện thoại *
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại của bạn"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-12 row px-4 mb-4">
            <div className="form-group col-md-6">
              <label htmlFor="city" className="nameInput">
                Tỉnh/Thành phố *
              </label>
              <select
                className="custom-select"
                onChange={(e) => handleChangeProvince(e)}
              >
                <option value="all">Chọn Tỉnh/Thành phố</option>
                {province?.map((element: any, index: number) => (
                  <option value={element.province_name} key={index}>
                    {element.province_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="phone" className="nameInput">
                Quận/Huyện *
              </label>
              <select
                className="custom-select"
                onChange={(e) => handleChangeDistrict(e)}
              >
                <option value="all">Chọn Quận/Huyện</option>
                {district.map((element: any, index: number) => (
                  <option value={element.district_name} key={index}>
                    {element.district_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-12 row px-4 mb-4">
            <div className="form-group col-md-6">
              <label htmlFor="village" className="nameInput">
                Xã/Phường *
              </label>
              <select
                className="custom-select"
                onChange={(e) => handleChangeWard(e)}
              >
                <option value="all">Chọn Phường/Xã</option>
                {ward.map((element: any, index: number) => (
                  <option value={element.ward_name} key={index}>
                    {element.ward_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="address" className="nameInput">
                Địa chỉ *
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Nhập địa chỉ của bạn"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
              <button
                className="btn btn-dark"
                style={{ minWidth: 300 }}
                type="submit"
              >
                Tiếp tục
              </button>
              <Link
                href="/cart"
                className="btn btn-primary mt-2"
                style={{ minWidth: 300 }}
              >
                Quay lại
              </Link>
            </div>
          </div>
        </form>
        <div className="my-4 col-md-4">
          <h4 className="text-info mb-4">ĐƠN HÀNG CỦA BẠN</h4>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
