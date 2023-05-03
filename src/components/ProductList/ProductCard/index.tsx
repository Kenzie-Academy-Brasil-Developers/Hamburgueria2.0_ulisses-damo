import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { CartContext, IProduct } from "../../../providers/cartContext";
import { useContext } from "react";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCardProps) => {
  const { addToCartList } = useContext(CartContext);
  return (
    <StyledProductCard>
      <div className="imageBox">
        <img src={product.img} alt="Hamburguer" />
      </div>
      <div className="content">
        <StyledTitle tag="h3" $fontSize="three">
          {product.name}
        </StyledTitle>
        <StyledParagraph className="category">
          {product.category}
        </StyledParagraph>
        <StyledParagraph className="price">R${product.price}</StyledParagraph>
        <StyledButton
          $buttonSize="medium"
          $buttonStyle="green"
          onClick={() => addToCartList(product)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
