import LeftButtonArrow from "../Common/LeftButtonArrow";
import RightButtonArrow from "../Common/RightButtonArrow";
import "./MainSaleContainer.css";


import React, { useEffect, useState } from "react";

export default function MainSaleContainer() {
  const [innerWidth, setinnerWidth] = useState(0);
  const [cnt, setCnt] = useState(3);
  const [curMargin, setCurMargin] = useState(0);
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
    setCurMargin(Math.round(window.innerWidth / 10));
    setinnerWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    setCnt(3);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const saleImgSlider = (val: number) => {
    setCurImgIdx((curImgIdx) => curImgIdx + val);
  };

  return (
    <>
      <div
        className="MainSaleContainer"
        style={{
          marginLeft: curMargin,
          marginRight: curMargin,
          width: `calc(100% - ${curMargin * 2}px)`,
        }}
      >
        <h2>이벤트</h2>
        <div className="ButtonContainer">
          <LeftButtonArrow handleImgSlide = {saleImgSlider}/>
          <RightButtonArrow handleImgSlide = {saleImgSlider}/>
          <div
            className="eventImgContainer"
            style={{
              width: `calc((${innerWidth}px - ${
                curMargin * 2
              }px) / ${cnt} * 6)`,
              marginLeft: `calc((${innerWidth}px - ${
                curMargin * 2
              }px) / ${cnt} * ${curImgIdx}*-1)`,
            }}
          >
            {img.map((src, idx) => (
              <div
                key={idx}
                className="eventImgInner"
                style={{
                  width: `calc((${innerWidth}px - ${
                    curMargin * 2
                  }px) / ${cnt})`,
                }}
              >
                <img src={src} alt=""></img>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
