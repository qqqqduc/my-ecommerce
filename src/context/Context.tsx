import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "@/utils/firebase";

type UserContextType = {
  user: any;
  setUser: (value: any) => void;
  handleSignIn: (auth: any, email: string, password: string) => void;
  handleSignOut: (auth: any) => void;
//   handleCreateAccount: (
//     auth: any,
//     email: string,
//     password: string,
//     confirmPassword: string
//   ) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  handleSignIn: () => {},
  handleSignOut: () => {},
//   handleCreateAccount: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Nghe sự kiện đăng nhập thay đổi
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        // Người dùng đã đăng nhập
        setUser(user);
        console.log(user)
      } else {
        // Người dùng đã đăng xuất
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async (auth: any, email: string, password: string) => {
    if (email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
        })
        .catch((error) => { 
        });
    } else {
    }
  };

  const handleSignOut = async (auth: any) => {
    await signOut(auth)
      .then(() => {
        console.log("signOUt");
        router.push("/login");
      })
      .catch((error) => {});
  };

//   const handleCreateAccount = async (
//     auth: any,
//     email: string,
//     password: string,
//     confirmPassword: string
//   ) => {
//     if (
//       email !== "" &&
//       password !== "" &&
//       confirmPassword !== "" &&
//       password === confirmPassword
//     ) {
//       createUserWithEmailAndPassword(auth, email, password).then(
//         (userCredential) => {
//           setUser(null);
//           router.push("/login");
//         }
//       );
//     } else if (password !== confirmPassword) {
//     }
//   };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleSignIn,
        handleSignOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };