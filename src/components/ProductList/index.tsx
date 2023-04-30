import ProductCard from "./ProductCard";
import { StyledProductList } from "./style";
import { IProduct } from "../../providers/cartContext";

interface IProductsListProps {
  productsList: IProduct[];
  setProductsList: React.Dispatch<React.SetStateAction<IProduct | null>>;
}

export const ProductList = ({
  productsList,
  setProductsList,
}: IProductsListProps) => {
  return (
    <StyledProductList>
      {productsList.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          setProductsList={setProductsList}
        />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
