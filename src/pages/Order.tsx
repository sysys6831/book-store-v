// src/pages/Order.tsx
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { type DeliveryForm, type OrderSheet } from "../models/order.model";
import { order } from "../api/order.api";
import { formatNumber } from "../utils/format";

function Order() {
  const location = useLocation();
  const navigate = useNavigate();

  // 장바구니에서 navigate의 state로 넘겨준 데이터를 받아옵니다.
  const orderDataFromCart = location.state as Omit<OrderSheet, "delivery">;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliveryForm>();

  // 비정상적인 접근(장바구니를 거치지 않고 바로 URL 입력) 차단
  if (!orderDataFromCart) {
    return <div>잘못된 접근입니다. 장바구니를 통해 이동해 주세요.</div>;
  }

  // 결제하기 버튼 클릭 시 폼 검증을 통과하면 실행되는 함수입니다.
  const handlePay = (data: DeliveryForm) => {
    // 폼 데이터와 장바구니 데이터를 합쳐서 최종 주문서 객체를 만듭니다.
    const orderData: OrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.addressDetail}`,
      },
    };

    // 사진의 요구사항대로 confirm 창을 띄웁니다.
    if (window.confirm("주문을 진행하시겠습니까?")) {
      order(orderData).then(() => {
        window.alert("주문이 처리되었습니다.");
        navigate("/orderlist"); // 추후 만들 주문 내역 페이지로 이동합니다.
      });
    }
  };

  return (
    <OrderStyle>
      <Title size="large">주문서 작성</Title>

      {/* 화면 전체를 form으로 감싸서 우측 결제하기 버튼과 연결합니다. */}
      <form className="content" onSubmit={handleSubmit(handlePay)}>
        <div className="order-info">
          <div className="delivery-section">
            <Title size="medium">배송 정보</Title>
            <div className="input-group">
              <label>주소</label>
              <div className="address-input">
                <InputText
                  placeholder="주소"
                  {...register("address", { required: true })}
                />
                <Button size="medium" scheme="normal" type="button">
                  주소찾기
                </Button>
              </div>
            </div>
            <div className="input-group">
              <label>상세 주소</label>
              <InputText
                placeholder="상세 주소"
                {...register("addressDetail", { required: true })}
              />
            </div>
            <div className="input-group">
              <label>수령인</label>
              <InputText
                placeholder="수령인 이름"
                {...register("receiver", { required: true })}
              />
            </div>
            <div className="input-group">
              <label>전화번호</label>
              <InputText
                placeholder="010-0000-0000"
                {...register("contact", { required: true })}
              />
            </div>
          </div>

          <div className="items-section">
            <Title size="medium">주문 상품</Title>
            <div className="item-summary">
              <strong>{orderDataFromCart.firstBookTitle}</strong> 등 총{" "}
              {orderDataFromCart.totalQuantity} 권
            </div>
          </div>
        </div>

        {/* 우측 주문 요약 영역 */}
        <div className="summary-box">
          <div className="summary-inner">
            <h3>주문 요약</h3>
            <dl>
              <dt>총 수량</dt>
              <dd>{orderDataFromCart.totalQuantity} 권</dd>
            </dl>
            <dl>
              <dt>총 금액</dt>
              <dd>{formatNumber(orderDataFromCart.totalPrice)} 원</dd>
            </dl>
          </div>
          {/* type="submit" 이므로 폼을 전송시킵니다. */}
          <Button size="large" scheme="primary" type="submit">
            결제하기
          </Button>
        </div>
      </form>
    </OrderStyle>
  );
}

const OrderStyle = styled.div`
  padding: 50px 0;
  max-width: 1020px;
  margin: 0 auto;

  .content {
    display: flex;
    gap: 24px;
    margin-top: 24px;

    /* 왼쪽 입력 영역 설정 */
    .order-info {
      flex: 2;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* 배송 정보 및 주문 상품 공통 박스 디자인 */
    .delivery-section,
    .items-section {
      border: 1px solid ${({ theme }) => theme.color?.border || "#ccc"};
      border-radius: ${({ theme }) => theme.borderRadius?.default || "4px"};
      padding: 24px;
      background-color: white;
    }

    .input-group {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      label {
        width: 100px;
        font-weight: bold;
        color: ${({ theme }) => theme.color?.text || "black"};
      }

      input {
        flex: 1;
      }

      .address-input {
        flex: 1;
        display: flex;
        gap: 8px;

        input {
          flex: 1;
        }
        button {
          white-space: nowrap;
        }
      }
    }

    .item-summary {
      padding: 16px 0 0 0;
      color: ${({ theme }) => theme.color?.text || "black"};
    }

    /* 오른쪽 요약 박스 설정 */
    .summary-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .summary-inner {
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
    }
  }
`;

export default Order;
