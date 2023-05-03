import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../providers/userContext";
import { CartProvider } from "../../providers/cartContext";

export const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return user ? (
    <CartProvider>
      <Outlet />
    </CartProvider>
  ) : (
    <Navigate to="/" />
  );
};
