// src/pages/Cart.tsx
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router"; // react-router 규칙 준수
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";

// ✨ 상대 경로(../)를 모두 절대 경로(@/)로 통일했습니다.
import Title from "@/components/common/Title";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { type Cart as ICart } from "@/models/cart.model";

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
    setCarts(mockCarts);
    setCheckedItems(mockCarts.map((cart) => cart.id));
  }, []);

  const isEmpty = carts.length === 0;

  const handleCheckItem = (id: number) => {
    setCheckedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleDeleteItem = (id: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setCarts(carts.filter((cart) => cart.id !== id));
      setCheckedItems(checkedItems.filter((item) => item !== id));
    }
  };

  const totalQuantity = useMemo(() => {
    return carts.reduce((total, cart) => {
      if (checkedItems.includes(cart.id)) return total + cart.quantity;
      return total;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((total, cart) => {
      if (checkedItems.includes(cart.id))
        return total + cart.price * cart.quantity;
      return total;
    }, 0);
  }, [carts, checkedItems]);

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      window.alert("주문할 상품을 선택해 주세요.");
      return;
    }

    const orderData = {
      items: checkedItems,
      totalPrice,
      totalQuantity,
      firstBookTitle:
        carts.find((cart) => cart.id === checkedItems[0])?.title || "",
    };

    navigate("/order", { state: orderData });
  };

  return (
    <CartStyle>
      <Title size="large">장바구니</Title>

      {isEmpty ? (
        <div className="empty">
          <FaShoppingCart className="icon" />
          <p>장바구니가 비었습니다</p>
        </div>
      ) : (
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

    .cart-list {
      flex: 2;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .cart-summary {
      flex: 1;
    }
  }
`;

export default Cart;
