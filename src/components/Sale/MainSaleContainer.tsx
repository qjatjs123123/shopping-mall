import "./MainSaleContainer.css";

import React, { useEffect, useState } from "react";

export default function MainSaleContainer() {
  const [innerWidth, setinnerWidth] = useState(0);
  const [cnt, setCnt] = useState(3);
  const [containerWidth, setContainerWidth] = useState(0);
  const [curImgIdx, setCurImgIdx] = useState<number>(0);
  const img = [
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906184_0.jpg",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906143_0.jpg",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906247_0.jpg",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906174_0.jpg",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1699788903_0.png",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906195_0.jpg",
  ];

  const handleResize = () => {
    console.log(window.innerWidth, window.innerWidth / 3);
    setinnerWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const saleImgSlider = () => {
    setCurImgIdx((curImgIdx) => curImgIdx + 1);
  };

  return (
    <>
      <div className="MainSaleContainer">
        <h2 onClick={() => saleImgSlider()}>이벤트</h2>
        <div
          className="eventImgContainer"
          style={{
            width: `calc((${innerWidth}px - 20%) / ${cnt} * 6)`,
            marginLeft:
              `calc((${innerWidth}px - 20%) / ${cnt} * ${curImgIdx}*-1)`,
          }}
        >
          {img.map((src, idx) => (
            <div
              key={idx}
              className="eventImgInner"
              style={{ width: `calc((${innerWidth}px - 20%) / ${cnt})` }}
            >
              <img src={src} alt=""></img>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
