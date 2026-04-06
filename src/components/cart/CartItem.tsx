// src/components/cart/CartItem.tsx
import styled from "styled-components";
import { type Cart } from "../../models/cart.model";
import Button from "../common/Button";
import { formatNumber } from "../../utils/format";

interface Props {
  cart: Cart;
  checkedItems: number[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
}

function CartItem({ cart, checkedItems, onCheck, onDelete }: Props) {
  // 현재 아이템의 id가 체크된 목록 배열 안에 있는지 확인합니다.
  const isChecked = checkedItems.includes(cart.id);

  return (
    <CartItemStyle>
      <div className="info">
        <div className="check">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onCheck(cart.id)}
          />
        </div>
        <div>
          <Title size="medium">{cart.title}</Title>
          <p className="summary">{cart.summary}</p>
          <p className="price">{formatNumber(cart.price)} 원</p>
          <p className="quantity">{cart.quantity} 권</p>
        </div>
      </div>
      <Button size="medium" scheme="normal" onClick={() => onDelete(cart.id)}>
        장바구니 삭제
      </Button>
    </CartItemStyle>
  );
}

// 기존에 만들었던 Title 컴포넌트를 간단하게 내부에서 사용하거나 import 해오셔도 됩니다.
const Title = styled.h2<{ size: string }>`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0 0 8px 0;
`;

const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.color?.border || "#ccc"};
  border-radius: ${({ theme }) => theme.borderRadius?.default || "4px"};
  padding: 24px;
  background-color: white;

  .info {
    display: flex;
    align-items: flex-start;
    flex: 1;

    .check {
      width: 40px;
      /* 체크박스 크기를 조금 키워줍니다. */
      input[type="checkbox"] {
        width: 20px;
        height: 20px;
      }
    }

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }

    .summary {
      color: gray;
      font-size: 0.875rem;
    }

    .price {
      font-weight: bold;
    }

    .quantity {
      color: gray;
      font-size: 0.875rem;
    }
  }
`;

export default CartItem;
