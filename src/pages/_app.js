import "@/styles/globals.css";
import Header from "../../common components/header";
import Footer from "../../common components/footer";
import AuthProvider from "@/context/auth_context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </>
  );
}
