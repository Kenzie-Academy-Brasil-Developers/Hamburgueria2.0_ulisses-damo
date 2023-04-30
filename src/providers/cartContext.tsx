import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface IShopProviderProps {
  children: React.ReactNode;
}

export interface IProduct {
  img: string;
  name: string;
  id: number;
  price: number;
  category: string;
}

interface IShopContext {
  productsList: IProduct[];
  addToCartList: (productData: IProduct) => void;
  cartList: IProduct[];
  removeFromCartList: (currentProduct: number) => void;
}

export const CartContext = createContext({} as IShopContext);

export const CartProvider = ({ children }: IShopProviderProps) => {
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [cartList, setCartList] = useState<IProduct[]>([]);

  useEffect(() => {
    const loadList = async () => {
      try {
        const { data } = await api.get<IProduct[]>("/products");
        setProductsList(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadList();
  }, []);

  const addToCartList = (productData: IProduct) => {
    setCartList([...cartList, productData]);
  };
  const removeFromCartList = (ProductId: number) => {
    const newCartList = cartList.filter(
      (currentProduct) => currentProduct.id !== ProductId
    );
    setCartList(newCartList);
  };

  return (
    <CartContext.Provider
      value={{ cartList, productsList, addToCartList, removeFromCartList }}
    >
      {children}
    </CartContext.Provider>
  );
};
