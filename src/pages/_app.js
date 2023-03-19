import "@/styles/globals.css";
import Header from "../../common components/header";
import Footer from "../../common components/footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
