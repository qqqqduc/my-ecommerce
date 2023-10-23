import React from "react";
import { HiLocationMarker, HiMail } from "react-icons/hi";
import { BiSolidPhone, BiLogoTiktok } from "react-icons/bi";
import { FaRegHandPointRight } from "react-icons/fa";
import {
  AiFillCaretRight,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import "./Footer.scss";
import Link from "next/link";

function Footer() {
  
  return (
    <div>
      <div className="footer__top bg-secondary">
        <div className="container">
          <div className="row">
            <div className="col-md-3 pt-4 mb-4 custom-col">
              Liên hệ
              <div className="pane"></div>
              <ul>
                <li className="d-flex align-items-center">
                  <HiLocationMarker className="mx-2" />
                  Quận Cầu Giấy, Hà Nội
                </li>
                <li className="d-flex align-items-center">
                  <BiSolidPhone className="mx-2" />
                  0942 884 512
                </li>
                <li className="d-flex align-items-center">
                  <HiMail className="mx-2" />
                  cskh.mintlala@gmail.com
                </li>
              </ul>
            </div>
            <div className="col-md-3 pt-4 mb-4 custom-col">
              Về chúng tôi
              <div className="pane"></div>
              <ul>
                <li>
                  <Link href="#" className="d-flex align-items-center">
                    <FaRegHandPointRight className="mx-2" />
                    Giới thiệu MINT Lala
                  </Link>
                </li>
                <li>
                  <Link href="#" className="d-flex align-items-center">
                    <FaRegHandPointRight className="mx-2" />
                    Quy tắc sử dụng
                  </Link>
                </li>
                <li>
                  <Link href="#" className="d-flex align-items-center">
                    <FaRegHandPointRight className="mx-2" />
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link href="#" className="d-flex align-items-center">
                    <FaRegHandPointRight className="mx-2" />
                    Những câu hỏi thường gặp
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 pt-4 mb-4 custom-col">
              Dịch vụ & Hỗ trợ
              <div className="pane"></div>
              <ul>
                <li>
                  <Link href="#" className="d-flex align-items-center">
                    <AiFillCaretRight className="mx-2" />
                    Hướng dẫn mua hàng
                  </Link>
                </li>
                <li>
                  <Link href="#" className="d-flex align-items-center">
                    <AiFillCaretRight className="mx-2" />
                    Thanh toán
                  </Link>
                </li>
                <li>
                  <Link href="#" className="d-flex align-items-center">
                    <AiFillCaretRight className="mx-2" />
                    Chính sách vận chuyển
                  </Link>
                </li>
                <li>
                  <Link href="#" className="d-flex align-items-center">
                    <AiFillCaretRight className="mx-2" />
                    Chính sách đổi hàng
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 pt-4 mb-4 custom-col">
              Kết nối với chúng tôi
              <div className="pane"></div>
              <ul>
                <li>
                  <Link href="#" className="d-flex align-items-center">
                    <AiFillFacebook className="mx-2" />
                    MINT Lala
                  </Link>
                </li>
                <li>
                  <Link href="#" className="d-flex align-items-center">
                    <AiFillInstagram className="mx-2" />
                    MINT Lala Shop
                  </Link>
                </li>
                <li>
                  <Link href="#" className="d-flex align-items-center">
                    <BiLogoTiktok className="mx-2" />
                    MINT Lala
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bot bg-dark d-flex align-items-center justify-content-center">
        <span>Copyright © MINT Lala</span>
      </div>
    </div>
  );
}

export default Footer;
