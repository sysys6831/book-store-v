// src/pages/Cart.tsx
import { useState, useMemo, useEffect } from "react";
// 규정에 따라 react-router에서 임포트합니다.
import { useNavigate } from "react-router";
import styled from "styled-components";

import Title from "../components/common/Title";
import CartItem from "../components/cart/cartItem";
import CartSummary from "../components/cart/CartSummary";
import { type Cart as ICart } from "../models/cart.model";
import { FaShoppingCart } from "react-icons/fa";

// 화면을 테스트하기 위한 임시 가짜 데이터입니다.
const mockCarts: ICart[] = [
  {
    id: 1,
    book_id: 1,
    title: "별을 여행하는 아이",
    summary: "별을 여행하는 이야기",
    price: 15000,
    quantity: 1,
  },
  {
    id: 2,
    book_id: 2,
    title: "시간의 정원",
    summary: "시간을 주제로 한 시집",
    price: 12000,
    quantity: 1,
  },
  {
    id: 3,
    book_id: 3,
    title: "빛의 파도",
    summary: "빛에 관한 과학적 탐구",
    price: 22000,
    quantity: 1,
  },
];

function Cart() {
  const [carts, setCarts] = useState<ICart[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 실제로는 API 통신으로 데이터를 불러옵니다.
    setCarts(mockCarts);
    // 처음에 모든 아이템을 체크된 상태로 만듭니다.
    setCheckedItems(mockCarts.map((cart) => cart.id));
  }, []);

  // 장바구니가 비었는지 확인
  const isEmpty = carts.length === 0;

  // 체크박스 클릭 핸들러
  const handleCheckItem = (id: number) => {
    setCheckedItems((prev) => {
      // 이미 체크되어 있다면 배열에서 빼고, 없다면 배열에 추가합니다.
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  // 개별 아이템 삭제 핸들러
  const handleDeleteItem = (id: number) => {
    // 경고창으로 한 번 더 물어봅니다.
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setCarts(carts.filter((cart) => cart.id !== id));
      setCheckedItems(checkedItems.filter((item) => item !== id));
    }
  };

  // 총수량, 총금액 계산 로직 (useMemo로 최적화)
  const totalQuantity = useMemo(() => {
    return carts.reduce((total, cart) => {
      if (checkedItems.includes(cart.id)) {
        return total + cart.quantity;
      }
      return total;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((total, cart) => {
      if (checkedItems.includes(cart.id)) {
        return total + cart.price * cart.quantity;
      }
      return total;
    }, 0);
  }, [carts, checkedItems]);

  // 주문하기 버튼 핸들러
  const handleOrder = () => {
    if (checkedItems.length === 0) {
      window.alert("주문할 상품을 선택해 주세요.");
      return;
    }

    // 선택된 아이템만 모아서 주문서 데이터로 만듭니다.
    const orderData = {
      items: checkedItems,
      totalPrice,
      totalQuantity,
      firstBookTitle:
        carts.find((cart) => cart.id === checkedItems[0])?.title || "",
    };

    // 사진 속 로직과 동일하게 주문 페이지로 데이터를 들고 이동합니다.
    navigate("/order", { state: orderData });
  };

  return (
    <CartStyle>
      <Title size="large">장바구니</Title>

      {isEmpty ? (
        // 1. 장바구니가 비어있을 때 화면
        <div className="empty">
          <FaShoppingCart className="icon" />
          <p>장바구니가 비었습니다</p>
        </div>
      ) : (
        // 2. 장바구니에 아이템이 있을 때 화면
        <div className="content">
          <div className="cart-list">
            {carts.map((cart) => (
              <CartItem
                key={cart.id}
                cart={cart}
                checkedItems={checkedItems}
                onCheck={handleCheckItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
          <div className="cart-summary">
            <CartSummary
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
              onOrder={handleOrder}
            />
          </div>
        </div>
      )}
    </CartStyle>
  );
}

const CartStyle = styled.div`
  padding: 50px 0;
  max-width: 1020px;
  margin: 0 auto;

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 0;
    color: gray;

    .icon {
      font-size: 4rem;
      color: #ccc;
      margin-bottom: 16px;
    }

    p {
      font-size: 1.25rem;
      font-weight: bold;
    }
  }

  .content {
    display: flex;
    gap: 24px;
    margin-top: 24px;

    /* 왼쪽 리스트 영역이 더 넓게 차지하도록 설정합니다. */
    .cart-list {
      flex: 2;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* 오른쪽 요약 박스 영역 */
    .cart-summary {
      flex: 1;
    }
  }
`;

export default Cart;
