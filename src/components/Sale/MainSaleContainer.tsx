import LeftButtonArrow from "../Common/LeftButtonArrow";
import RightButtonArrow from "../Common/RightButtonArrow";
import "./MainSaleContainer.css";

import React, { useEffect, useRef, useState } from "react";

export default function MainSaleContainer() {
  const [innerWidth, setinnerWidth] = useState(0);
  const [cnt, setCnt] = useState(1);
  const [curMargin, setCurMargin] = useState(0);
  const [curImgIdx, setCurImgIdx] = useState<number>(3);
  const [saleImgList, setSaleImgList] = useState<string[]>([]);
  const [imgMaxLen, setimgMaxLen] = useState(0);
  const [flg, setFlg] = useState(false);
  const isTransitionRef = useRef(false);

  const img = [
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906174_0.jpg",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1699788903_0.png",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906195_0.jpg",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906184_0.jpg",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906143_0.jpg",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906247_0.jpg",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906174_0.jpg",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1699788903_0.png",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906195_0.jpg",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906184_0.jpg",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906143_0.jpg",
    "https://atimg.sonyunara.com/files/attrangs/new_banner/1705906247_0.jpg",
  ];

  const handleResize = () => {
    setCurMargin(Math.round(document.documentElement.clientWidth / 10));
    setinnerWidth(document.documentElement.clientWidth);
    if (document.documentElement.clientWidth <= 768) setCnt(1);
    else setCnt(3);
  };

  useEffect(() => {
    setCnt(1);
    setSaleImgList(img);
    setimgMaxLen(img.length);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const saleImgSlider = (val: number) => {
    if (isTransitionRef.current) return;
    if (!isTransitionRef.current) {
      isTransitionRef.current = true;
      setTimeout(() => {
        isTransitionRef.current = false;
      }, 500);
    }

    setCurImgIdx((curImgIdx) => {
      const newIdx = curImgIdx + val;

      setFlg(false);

      if (newIdx === 0) {
        setTimeout(() => {
          setFlg(true);
          setCurImgIdx(imgMaxLen - 6);
        }, 500);
      } else if (newIdx === imgMaxLen - 3) {
        setTimeout(() => {
          setFlg(true);
          setCurImgIdx(3);
        }, 500);
      }

      return newIdx;
    });
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
          <LeftButtonArrow handleImgSlide={saleImgSlider} />
          <RightButtonArrow handleImgSlide={saleImgSlider} />
          <div className="eventImgContainerParent">
            <div
              className="eventImgContainer"
              style={{
                width: `calc((${innerWidth}px - ${
                  curMargin * 2
                }px) / ${cnt} * ${saleImgList.length})`,
                marginLeft: `calc((${innerWidth}px - ${
                  curMargin * 2
                }px) / ${cnt} * ${curImgIdx}*-1)`,
                transition: flg ? "0.0s" : "0.5s",
              }}
            >
              {saleImgList.map((src, idx) => (
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
      </div>
    </>
  );
}
