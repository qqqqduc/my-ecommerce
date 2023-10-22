"use client";
import React, { useContext, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import "./SignIn.scss";
import { useDispatch } from "react-redux";
import { auth, provider } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { SIGNIN_SUCCESS } from "@/redux/type";
import Link from "next/link";
import { UserContext } from "@/context/Context";

function Signin() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const dispatch: any = useDispatch();
  const router = useRouter();

  const { setUser } = useContext(UserContext);

  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const handleSignInWithGoogle = async (e: any) => {
    e.preventDefault();
    await signInWithPopup(auth, provider)
      .then((result) => {
        var user = result.user;
        setUser(user)
        router.push("/");
      })
      .catch((error) =>
        // Xác thực thất bại, xử lý lỗi tại đây
        console.log("Đăng nhập bằng tài khoản Google thất bại:", error)
      );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (regexEmail.test(inputEmail)) {
      await signInWithEmailAndPassword(auth, inputEmail, inputPassword)
        .then((userCredential: any) => {
          // Đăng nhập thành công, xử lý tại đây
          const user = userCredential.user;
          setUser(user)
          router.push("/");
        })
        .catch((error: any) => {
          // Xử lý lỗi đăng nhập
          console.log(error);
        });
    }
  };

  return (
    <div className="container bg-white p-4" style={{ minHeight: "80vh" }}>
      <div className="col-md-12 px-4">
        <div className="d-flex justify-content-center align-items-center">
          <div className="step-node">
            <div className="circle" style={{ background: "#007bff" }}>
              <span>1</span>
              <p className="separate"></p>
            </div>
            <p>Đăng nhập</p>
          </div>
          <div className="step-node">
            <div className="circle">
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
      <form
        className="mx-auto my-4 custom-form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-center mb-4 text-uppercase">Đăng nhập</h2>
        <div className="position-relative">
          <div className="mb-2">
            <img src="./assets/img/logoGG.svg" alt="" />
            <button
              className="signin-google"
              onClick={(e) => handleSignInWithGoogle(e)}
            >
              Đăng nhập với Google
            </button>
          </div>
          <button className="btn signin-facebook">
            <FaFacebookF className="signin-facebook-icon" />
            Đăng nhập với Facebook
          </button>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleFormControlInput1">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="VD: name@example.com"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleFormControlInput2">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="Nhập mật khẩu"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-dark w-100 mt-2" type="submit">
          Đăng nhập
        </button>
        <Link href="#" className="text-info">
          Quên mật khẩu?
        </Link>
        <p className="mt-2">
          Bạn không có tài khoản?{" "}
          <Link href="#" className="create-account">
            Tạo ngay
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;
