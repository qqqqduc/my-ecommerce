import axios from "axios";
import { Dispatch } from "redux";
import * as type from "../type";
import { signInWithEmailAndPassword } from "firebase/auth";

// export const handleSignIn = async (auth: any, email: string, password: string) => {
//     if (email !== "" && password !== "") {
//       await signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           setUser(userCredential.user);
//         })
//         .catch((error) => { 
//         });
//     } else {
//     }
//   };