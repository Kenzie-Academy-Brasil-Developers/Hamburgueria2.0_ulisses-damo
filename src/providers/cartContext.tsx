import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

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
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  totalValue: () => number;
  setCartList: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export const CartContext = createContext({} as IShopContext);

export const CartProvider = ({ children }: IShopProviderProps) => {
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [cartList, setCartList] = useState<IProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const loadList = async () => {
      try {
        const { data } = await api.get<IProduct[]>("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductsList(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadList();
  }, []);

  const addToCartList = (productData: IProduct) => {
    const productExists = cartList.some((product) => {
      return product.id === productData.id;
    });
    if (productExists) {
      toast.error("Item já adicionado no carrinho");
    } else {
      toast.success("Item adicionado no carrinho");
      setCartList([...cartList, productData]);
    }
  };
  const removeFromCartList = (ProductId: number) => {
    const newCartList = cartList.filter(
      (currentProduct) => currentProduct.id !== ProductId
    );
    setCartList(newCartList);
  };
  const totalValue = () => {
    const Total = cartList.map((money) => {
      return money.price;
    });
    const TotalValue = Total.reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );
    return TotalValue;
  };

  return (
    <CartContext.Provider
      value={{
        setCartList,
        cartList,
        productsList,
        addToCartList,
        removeFromCartList,
        isOpen,
        setIsOpen,
        totalValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
