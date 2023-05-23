import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { message } from "antd";
import { AuthContext } from "@/context/auth_context";

const ProtectedRoute = ({ children }) => {
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

  return children;
};

export default ProtectedRoute;
