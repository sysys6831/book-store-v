// src/components/book/AddToCart.tsx
import { useState } from "react";
import styled from "styled-components";
import { type BookDetail } from "../../models/book.model";
import Button from "../common/Button";
import InputText from "../common/InputText";

interface Props {
  book: BookDetail;
}

function AddToCart({ book }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [cartAdded, setCartAdded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);

  const handleDecrease = () => {
    if (quantity === 1) return; // 1개 밑으로는 내려가지 않게 막습니다!
    setQuantity((prev) => prev - 1);
  };

  const addToCart = () => {
    console.log("장바구니 추가:", { book_id: book.id, quantity });
    setCartAdded(true);
    // 3초 뒤에 알림을 자동으로 숨깁니다.
    setTimeout(() => {
      setCartAdded(false);
    }, 3000);
  };

  return (
    <AddToCartStyle $added={cartAdded}>
      <div className="quantity">
        <InputText type="number" value={quantity} onChange={handleChange} />
        <Button size="medium" scheme="normal" onClick={handleIncrease}>
          +
        </Button>
        <Button size="medium" scheme="normal" onClick={handleDecrease}>
          -
        </Button>
      </div>
      <Button size="medium" scheme="primary" onClick={addToCart}>
        장바구니 담기
      </Button>
      {cartAdded && (
        <div className="added-alert">장바구니에 추가되었습니다.</div>
      )}
    </AddToCartStyle>
  );
}

const AddToCartStyle = styled.div<{ $added: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-top: 16px;

  .quantity {
    display: flex;
    gap: 4px;
    input {
      width: 60px;
      text-align: center;
    }
  }

  .added-alert {
    position: absolute;
    bottom: -24px;
    right: 0;
    color: green;
    font-size: 0.875rem;
  }
`;

export default AddToCart;
