import CartProductCard from "./CartProductCard";

import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { useContext } from "react";
import { CartContext, IProduct } from "../../../providers/cartContext";

const CartProductList = () => {
  const { cartList, totalValue, setCartList } = useContext(CartContext);
  return (
    <StyledCartProductList>
      <ul>
        {cartList.map((cartProduct) => (
          <CartProductCard key={cartProduct.id} product={cartProduct} />
        ))}
      </ul>

      <div className="totalBox">
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className="total">
          R$ {totalValue().toFixed(2)}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize="default"
        $buttonStyle="gray"
        onClick={() => setCartList([])}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
