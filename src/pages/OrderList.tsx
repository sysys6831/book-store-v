// src/pages/OrderList.tsx
import styled from "styled-components";
import Title from "../components/common/Title";
import Button from "../components/common/Button";
import { useOrders } from "../hooks/useOrders";
import { formatNumber } from "../utils/format";

function OrderList() {
  // 훅에서 데이터와 제어 함수를 꺼내옵니다.
  const { orders, selectedItemId, selectOrderItem } = useOrders();

  return (
    <OrderListStyle>
      <Title size="large">주문 내역</Title>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>주문일자</th>
            <th>주소</th>
            <th>수령인</th>
            <th>전화번호</th>
            <th>대표 상품명</th>
            <th>수량</th>
            <th>금액</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            // React.Fragment를 사용하여 두 개의 <tr> 태그를 묶어줍니다.
            <React.Fragment key={order.id}>
              {/* 1. 기본 주문 내역 행 */}
              <tr>
                <td>{order.id}</td>
                <td>{order.createdAt}</td>
                <td>{order.address}</td>
                <td>{order.receiver}</td>
                <td>{order.contact}</td>
                <td>{order.bookTitle}</td>
                <td>{order.totalQuantity}</td>
                <td>{formatNumber(order.totalPrice)} 원</td>
                <td>
                  <Button
                    size="small"
                    scheme="normal"
                    onClick={() => selectOrderItem(order.id)}
                  >
                    {selectedItemId === order.id ? "닫기" : "자세히"}
                  </Button>
                </td>
              </tr>

              {/* 2. 자세히 버튼을 눌렀을 때만 열리는 상세 내역 행 */}
              {selectedItemId === order.id && order.detail && (
                <tr className="detail-row">
                  {/* 열을 9칸 병합하여 전체 공간을 차지하게 만듭니다. */}
                  <td colSpan={9}>
                    <ul className="detail-list">
                      {order.detail.map((item) => (
                        <li key={item.bookId}>
                          <span className="title">{item.title}</span>
                          <span className="author">{item.author}</span>
                          <span className="price">
                            {formatNumber(item.price)} 원
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </OrderListStyle>
  );
}

// 오류 방지를 위해 상단에 import 대신 전역 React 객체를 사용하거나 최상단에 import React from "react"; 를 추가해 주세요.
import React from "react";

const OrderListStyle = styled.div`
  padding: 50px 0;
  max-width: 1020px;
  margin: 0 auto;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 24px;
    text-align: center;
    font-size: 0.875rem;

    th,
    td {
      padding: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.color?.border || "#eee"};
    }

    th {
      font-weight: bold;
      color: ${({ theme }) => theme.color?.text || "black"};
      border-top: 2px solid ${({ theme }) => theme.color?.border || "#ccc"};
      border-bottom: 1px solid ${({ theme }) => theme.color?.border || "#ccc"};
    }

    .detail-row {
      background-color: #fafafa;

      td {
        padding: 24px;
        text-align: left;
      }

      .detail-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;

        li {
          display: flex;
          gap: 16px;

          /* 가상의 점(bullet)을 추가합니다. */
          &::before {
            content: "▪";
            color: gray;
          }

          .title {
            font-weight: bold;
          }
          .author {
            color: gray;
          }
          .price {
            color: ${({ theme }) => theme.color?.primary || "red"};
            font-weight: bold;
          }
        }
      }
    }
  }
`;

export default OrderList;
