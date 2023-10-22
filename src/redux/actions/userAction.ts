import axios from "axios";
import { Dispatch } from "redux";
import * as type from "../type";
import { useEffect } from "react";
import { auth } from "@/utils/firebase";
import React from "react";

React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in");
        dispatch({ type: type.SIGNIN_SUCCESS, payload: user });
      } else {
        console.log("da dang xuat");
        dispatch({
            type: type.LOGOUT_SUCCESS,
            payload: undefined
        });
      }
    });

    // cleanup
    return () => unsubscribe();
  }, []);

function dispatch(arg0: { type: any; payload: any; }) {
    throw new Error("Function not implemented.");
}
