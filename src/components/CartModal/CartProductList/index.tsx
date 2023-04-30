import CartProductCard from "./CartProductCard";

import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { useContext } from "react";
import { CartContext, IProduct } from "../../../providers/cartContext";

interface IProductCartProps {
  cartListProducts: IProduct[];
  setCartList: React.Dispatch<React.SetStateAction<IProduct | null>>;
}

const CartProductList = ({
  cartListProducts,
  setCartList,
}: IProductCartProps) => {
  return (
    <StyledCartProductList>
      <ul>
        {/* {cartListProducts.map((cartProduct) => { */}
        {/* <CartProductCard />;})} */}
      </ul>

      <div className="totalBox">
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className="total">R$ 14,00</StyledParagraph>
      </div>
      <StyledButton $buttonSize="default" $buttonStyle="gray">
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
