// src/components/cart/CartSummary.tsx
import styled from "styled-components";
import { formatNumber } from "../../utils/format";
import Button from "../common/Button";

interface Props {
  totalQuantity: number;
  totalPrice: number;
  onOrder: () => void;
}

function CartSummary({ totalQuantity, totalPrice, onOrder }: Props) {
  return (
    <CartSummaryStyle>
      <div className="summary-box">
        <h3>주문 요약</h3>
        <dl>
          <dt>총 수량</dt>
          <dd>{totalQuantity} 권</dd>
        </dl>
        <dl>
          <dt>총 금액</dt>
          <dd>{formatNumber(totalPrice)} 원</dd>
        </dl>
      </div>
      <Button size="large" scheme="primary" onClick={onOrder}>
        주문하기
      </Button>
    </CartSummaryStyle>
  );
}

const CartSummaryStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .summary-box {
    border: 1px solid ${({ theme }) => theme.color?.border || "#ccc"};
    border-radius: ${({ theme }) => theme.borderRadius?.default || "4px"};
    padding: 24px;
    background-color: white;

    h3 {
      font-size: 1.125rem;
      font-weight: bold;
      margin: 0 0 16px 0;
    }

    dl {
      display: flex;
      justify-content: space-between;
      margin: 0 0 12px 0;

      dt {
        color: gray;
      }
      dd {
        font-weight: bold;
      }
    }
  }

  button {
    width: 100%;
  }
`;

export default CartSummary;
