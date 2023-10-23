"use client";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "@/components/Header/Header";
import { Provider } from "react-redux";
import store from "@/redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Header />
          {/* <FilterAndSearch /> */}
          <div className="children">{children}</div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
