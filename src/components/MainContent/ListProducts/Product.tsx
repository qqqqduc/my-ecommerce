import React from "react";
import { useDispatch } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { addProduct } from "@/redux/actions/productsAction";
import "./ListProducts.scss";
import _ from "lodash";
import { useRouter } from "next/navigation";

interface IProps {
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
}

function Product(props: IProps) {
  const { id, image, title, price, rating } = props;
  const router = useRouter();
  const dispatch: any = useDispatch();

  const handleAddCart = () => {
    dispatch(addProduct(props));
  };

  return (
    <div className="card my-2 product" style={{ width: "16.5rem" }}>
      <div
        className="product__image"
        style={{ backgroundImage: `url('${image}')` }}
        onClick={() => router.push(`/products/${id}`)}
      ></div>
      <div className="card-body">
        <h5
          className="card-title card__title"
          onClick={() => router.push(`/products/${id}`)}
        >
          {title}
        </h5>
        <p className="card-text card__text text-center">
          <strong>${price}</strong>
        </p>
        <button
          className="btn btn-dark card__btn"
          onClick={() => handleAddCart()}
        >
          <FaCartPlus className="card__btn-icon" />
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}

export default Product;
