import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("ecomAppToken");

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return null;
};
