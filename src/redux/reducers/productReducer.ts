import _ from "lodash";
import * as type from "../type";

const initState = {
  products: [],
  product: {},
  categories: [],
  cart: [],
  destination: {},
};

const productReducer = (state = initState, action: any) => {
  switch (action.type) {
    case type.GET_PRODUCTS:
      return { ...state, products: action.payload };

    case type.GET_PRODUCTS_BY_CATEGORY:
      return { ...state, products: action.payload };

    case type.GET_CATEGORIES:
      return { ...state, categories: action.payload };

    case type.GET_PRODUCT_DETAIL:
      return { ...state, product: action.payload };

    case type.ADD_PRODUCT:
      const existingItem = state.cart.find(
        (item: any) => item.id === action.payload.id
      );
      if (existingItem) {
        // Sản phẩm đã có trong giỏ hàng, tăng số lượng
        return {
          ...state,
          cart: state.cart.map((item: any) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

    case type.REMOVE_PRODUCT:
      return {
        ...state,
        cart: state.cart.filter(
          (element: any) => element.id !== action.payload
        ),
      };

    case type.INCREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((element: any) =>
          element.id === action.payload
            ? {
                ...element,
                quantity: element.quantity + 1,
              }
            : element
        ),
      };

    case type.DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((element: any) =>
          element.id === action.payload
            ? {
                ...element,
                quantity:
                  element.quantity > 1
                    ? element.quantity - (element.quantity > 1 ? 1 : 0)
                    : element.quantity,
              }
            : element
        ),
      };

    case type.SET_DESTINATION:
      return {
        ...state,
        destination: action.payload,
      };

    case type.SET_PAYMENT:
      return {
        ...state,
        destination: { ...state.destination, payment: action.payload },
      };

    default:
      return state;
  }
};

export default productReducer;
