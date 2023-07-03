import "@/styles/globals.css";
import Header from "../../common components/header";
import Footer from "../../common components/footer";
import AuthProvider from "@/context/auth_context";
import React from "react";
import { SSRProvider } from "react-bootstrap";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SSRProvider>
        <AuthProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </AuthProvider>
      </SSRProvider>
    </>
  );
}
