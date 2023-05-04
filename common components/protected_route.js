import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    // check if user is authenticated
    const IsAuthenticated = sessionStorage.getItem("token"); // your authentication logic here
    const Token = IsAuthenticated;

    //! User Get Profile API Call
    const User = axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/profile`,
      { headers: { Authorization: `Bearer ${Token}` } }
    );
    User.then((response) => {
      console.log(response, "user authenticated");
    }).catch((error) => {
      if (!IsAuthenticated || error.response.status === 401) {
        // redirect to login page
        router.push("/");
      }
      console.log(error, "user not authenticated");
      message.error(error.response.data.message);
    });
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
