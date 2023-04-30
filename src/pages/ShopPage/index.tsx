import { StyledShopPage } from "./style";
import CartModal from "../../components/CartModal";
import Header from "../../components/Header";
import { ProductList } from "../../components/ProductList";

import { StyledContainer } from "../../styles/grid";
import { SetStateAction } from "react";
import { IProduct } from "../../providers/cartContext";

const ShopPage = () => (
  <StyledShopPage>
    <CartModal />
    <Header />
    <main>
      <StyledContainer containerWidth={1300}>
        <ProductList
          productsList={[]}
          setProductsList={function (
            value: SetStateAction<IProduct | null>
          ): void {
            throw new Error("Function not implemented.");
          }}
        />
      </StyledContainer>
    </main>
  </StyledShopPage>
);

export default ShopPage;
