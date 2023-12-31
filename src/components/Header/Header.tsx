"use client"
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import "./Header.scss";
import _ from "lodash";
import { Dropdown } from "react-bootstrap";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { LOGOUT_SUCCESS } from "@/redux/type";

function Header() {
  const user = useSelector((state: any) => state.User.user)
  const cart = useSelector((state: any) => state.Product.cart);
  const dispatch: any = useDispatch()
  const router = useRouter();

  

  const handleLogOut = async(e: any) => {
    e.preventDefault();
    await signOut(auth)
    .then(() => {
      dispatch({type: LOGOUT_SUCCESS})
      router.push('/')
    })
    .catch((error) => {});
  }

  return (
    <div className="header">
      <div className="container custom-container">
        <span className="header__title" style={{cursor: "pointer"}} onClick={() => router.push('/')}>MINT Lala</span>
        <div className="header__nav">
          <ul className="header__nav--link d-flex align-items-center">
            <li className="nav__cart">
              <Link href="/cart">
                <span className="nav__cart--link">
                  <AiOutlineShoppingCart />
                  <span>
                    {_.uniqBy(cart, (obj) => JSON.stringify(obj)).length}
                  </span>
                </span>
                Giỏ hàng
              </Link>
            </li>
            {user !== null ? (
              <li className="nav__user">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" className="user__dropdown--togle">
                    <div
                      style={user.photoURL ? {
                        width: 30,
                        display: "inline-block",
                        marginRight: 4,
                      } : {
                        width: 0,
                        display: "inline-block",
                        marginRight: 4,
                      }}
                    >
                      <img src={user.photoURL} alt="" />
                    </div>
                    <span>{user.email}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="user__dropdown--menu">
                    <Dropdown.Item onClick={() => router.push('/profile')}>
                      Tài khoản
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleLogOut(e)}>
                      Đăng xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              <li className="nav__signin">
                <Link href="/signin">
                  <span>
                    <AiOutlineUser />
                  </span>
                  Đăng nhập
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
