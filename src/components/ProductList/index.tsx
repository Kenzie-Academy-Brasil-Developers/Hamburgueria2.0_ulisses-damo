import ProductCard from "./ProductCard";
import { StyledProductList } from "./style";
import { CartContext, IProduct } from "../../providers/cartContext";
import { useContext } from "react";

export const ProductList = () => {
  const { productsList } = useContext(CartContext);
  return (
    <StyledProductList>
      {productsList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
