// src/components/book/AddToCart.tsx
import { useState } from "react";
// 1. 페이지 이동을 위해 useNavigate를 반드시 react-router에서 불러옵니다.
import { useNavigate } from "react-router";
import styled from "styled-components";
import { type BookDetail } from "../../models/book.model";
import Button from "../common/Button";
import InputText from "../common/InputText";

interface Props {
  book: BookDetail;
}

function AddToCart({ book }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate(); // 2. 네비게이트 함수를 활성화합니다.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCart = () => {
    // 실제로는 여기서 장바구니에 데이터를 넣는 API를 호출합니다.
    console.log("장바구니 추가 데이터:", { book_id: book.id, quantity });

    // 3. 사용자에게 확인을 받고 장바구니 페이지로 넘겨줍니다.
    const isGoCart = window.confirm(
      "장바구니에 추가되었습니다.\n장바구니로 이동하시겠습니까?",
    );

    if (isGoCart) {
      navigate("/cart");
    }
  };

  return (
    <AddToCartStyle>
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
    </AddToCartStyle>
  );
}

const AddToCartStyle = styled.div`
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
`;

export default AddToCart;
