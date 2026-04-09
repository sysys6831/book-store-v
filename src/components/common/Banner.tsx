// src/components/common/Banner.tsx
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// 배너에 들어갈 가짜 이미지 데이터입니다.
const bannerItems = [
  {
    id: 1,
    img: "https://picsum.photos/id/1015/1020/300",
    title: "특별 기획전 1",
  },
  {
    id: 2,
    img: "https://picsum.photos/id/1016/1020/300",
    title: "이달의 베스트",
  },
  { id: 3, img: "https://picsum.photos/id/1018/1020/300", title: "신간 안내" },
];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 5초마다 자동으로 배너가 넘어가도록 하는 고급 로직입니다.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? bannerItems.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerItems.length);
  };

  return (
    <BannerStyle>
      <button className="nav-btn left" onClick={handlePrev}>
        <FaChevronLeft />
      </button>
      <div className="img-container">
        <img
          src={bannerItems[currentIndex].img}
          alt={bannerItems[currentIndex].title}
        />
      </div>
      <button className="nav-btn right" onClick={handleNext}>
        <FaChevronRight />
      </button>

      <div className="indicator">
        {bannerItems.map((_, idx) => (
          <span key={idx} className={idx === currentIndex ? "active" : ""} />
        ))}
      </div>
    </BannerStyle>
  );
}

const BannerStyle = styled.div`
  position: relative;
  width: 100%;
  max-width: 1020px;
  height: 300px;
  margin: 0 auto 48px auto;
  border-radius: 8px;
  overflow: hidden;

  .img-container {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &.left {
      left: 16px;
    }
    &.right {
      right: 16px;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  .indicator {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      &.active {
        background: white;
      }
    }
  }
`;

export default Banner;
