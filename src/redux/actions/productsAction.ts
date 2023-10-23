import axios from "axios";
import { Dispatch } from "redux";
import * as type from "../type";

interface IProduct {
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
}

const productsApi = "https://fakestoreapi.com/products";

export const getProducts = () => async (dispatch: Dispatch) => {
  await axios
    .get(productsApi)
    .then((res) => {
      dispatch({ type: type.GET_PRODUCTS, payload: res.data });
    })
    .catch((err) => console.log("Lỗi"));
};

export const getProductsByCategory =
  (category: string) => async (dispatch: Dispatch) => {
    await axios
      .get(`${productsApi}/category/${category}`)
      .then((res) => {
        dispatch({ type: type.GET_PRODUCTS_BY_CATEGORY, payload: res.data });
      })
      .catch((err) => console.log("Lỗi"));
  };

export const getCategories =
  (category: string) => async (dispatch: Dispatch) => {
    await axios
      .get(`${productsApi}/categories/${category}`)
      .then((res) => {
        dispatch({ type: type.GET_CATEGORIES, payload: res.data });
      })
      .catch((err) => console.log("Lỗi"));
  };

export const getProductDetail =
  (id: number) => async (dispatch: Dispatch) => {
    await axios
      .get(`${productsApi}/${id}`)
      .then((res) => {
        dispatch({ type: type.GET_PRODUCT_DETAIL, payload: res.data });
      })
      .catch((err) => console.log("Lỗi"));
  };

export const addProduct = (product: IProduct) => (dispatch: Dispatch) => {
  dispatch({ type: type.ADD_PRODUCT, payload: product });
};

export const removeProduct = (id: number) => (dispatch: Dispatch) => {
  dispatch({ type: type.REMOVE_PRODUCT, payload: id });
};

export const increaseQuantity = (id: number) => (dispatch: Dispatch) => {
  dispatch({ type: type.INCREASE_QUANTITY, payload: id });
};

export const decreaseQuantity = (id: number) => (dispatch: Dispatch) => {
  dispatch({ type: type.DECREASE_QUANTITY, payload: id });
};