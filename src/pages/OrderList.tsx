// src/pages/OrderList.tsx
import React from "react";
import styled from "styled-components";

// ✨ 상대 경로(../)를 모두 절대 경로(@/)로 통일했습니다.
import Title from "@/components/common/Title";
import Button from "@/components/common/Button";
import { useOrders } from "@/hooks/useOrders";
import { formatNumber } from "@/utils/format";

function OrderList() {
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
            <React.Fragment key={order.id}>
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

              {selectedItemId === order.id && order.detail && (
                <tr className="detail-row">
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
