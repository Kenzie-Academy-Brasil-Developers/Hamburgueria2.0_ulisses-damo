import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { IProduct } from "../../../providers/cartContext";

interface IProductCardProps {
  product: IProduct;
  setProductsList: React.Dispatch<React.SetStateAction<IProduct | null>>;
}

const ProductCard = ({ product, setProductsList }: IProductCardProps) => {
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
          onClick={() => setProductsList(product)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
