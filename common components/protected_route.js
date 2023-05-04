import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // check if user is authenticated
    const isAuthenticated = sessionStorage.getItem("token"); // your authentication logic here

    console.log(isAuthenticated);
    if (!isAuthenticated) {
      // redirect to login page
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
