import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { AuthContext } from "@/context/auth_context";
import dynamic from "next/dynamic";
const Loader = dynamic(() => import("./loader"));

const ProtectedRoute = ({ children }) => {
  const [IsSuccess, setIsSuccess] = useState(false);

  const ContextUserDetails = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    //* check if user is authenticated
    const IsAuthenticated =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    const Token = IsAuthenticated;

    //! User Get Profile API Call
    const User = axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/profile`,
      { headers: { Authorization: `Bearer ${Token}` } }
    );
    User.then((response) => {
      // console.log(response, "user authenticated");
      setIsSuccess(true);
      return <>{children}</>;
    }).catch((error) => {
      //* redirect to login page
      router.push("/");
      if (!IsAuthenticated || error.response.status === 401) {
        //* redirect to login page
        router.push("/");
      }
      // console.log(error, "user not authenticated");
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      ContextUserDetails.setUserState(null);

      message.error(error.response.data.message);
    });
  }, []);

  if (!IsSuccess) {
    return (
      <>
        <div
          style={{
            height: "85vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Loader />
          <p style={{ marginTop: "45px", fontFamily: "Poppins" }}>Loading...</p>
        </div>
        ;
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
