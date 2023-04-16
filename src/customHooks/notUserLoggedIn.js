import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRequireLogin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("ecomAppToken");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [navigate, token]);

  return;
};

export default useRequireLogin;
