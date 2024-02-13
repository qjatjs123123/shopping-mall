import LeftButtonArrow from "./LeftButtonArrow";
import RightButtonArrow from "./RightButtonArrow";

 import "./ImgSliderComponents.css";

import React, { useEffect, useRef, useState } from "react";

interface SaleImgProps {
  src: string;
  txt: string;
}

interface propsType {
  curMargin: number;
  innerWidth: number;
  cnt: number;
  saleImgList: SaleImgProps[];
  imgMaxLen: number;
  imgCnt: number;
  title: string;
}

export default function MainSaleContainer({
  curMargin,
  innerWidth,
  cnt,
  saleImgList,
  imgMaxLen,
  imgCnt,
  title,
}: propsType) {
  const [curImgIdx, setCurImgIdx] = useState<number>(cnt);
  const isTransitionRef = useRef(false);
  const eventImgContainerParent = useRef<HTMLDivElement>(null);
  const startPoint = useRef(0);
  const endPoint = useRef(0);
  const mousedown = useRef(false);
  const flg = useRef(false);
  const [delta, setDelta] = useState(0);
  const idx = useRef(1);
  const curMarginRef = useRef(1);
  const innerWidthRef = useRef(1);
  useEffect(() => {
    curMarginRef.current = curMargin;
    innerWidthRef.current = innerWidth;

  }, [curMargin, innerWidth])
  useEffect(() => {
    const element = eventImgContainerParent.current;
    if (imgMaxLen === 0 || !element) return;

    const movePos = (e: TouchEvent | MouseEvent) => {
      endPoint.current = e instanceof TouchEvent ? endPoint.current : e.pageX;
      mousedown.current = false;
      flg.current = false;
      const dist = endPoint.current - startPoint.current;
      const gap = (innerWidthRef.current - curMarginRef.current * 2) / cnt;
      let plus = 0;
      if (dist < 0) plus = Math.round((dist * -1) / gap) * -1;
      else plus = Math.round(dist / gap);
      setDelta(delta * -1);
      saleImgSlider(plus * -1);
    };

    const handleMouseOut = (e: TouchEvent | MouseEvent) => {
      if (!mousedown.current) return;
      movePos(e);
    };

    const handleMouseDown = (e: TouchEvent | MouseEvent) => {
      startPoint.current =
        e instanceof TouchEvent ? e.touches[0].pageX : e.pageX;
      mousedown.current = true;
      flg.current = true;
    };

    const handleMouseMove = (e: TouchEvent | MouseEvent) => {
      if (!mousedown.current) return;
      endPoint.current = e instanceof TouchEvent ? e.touches[0].pageX : e.pageX;
      const tmp = endPoint.current - startPoint.current;
      if (tmp === 0) return;

      setDelta(tmp);
    };

    const handleMouseUp = (e: TouchEvent | MouseEvent) => {
      movePos(e);
    };

    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseup", handleMouseUp);
    element.addEventListener("mouseout", handleMouseOut);

    element.addEventListener("touchstart", handleMouseDown);
    element.addEventListener("touchmove", handleMouseMove);
    element.addEventListener("touchend", handleMouseUp);
    element.addEventListener("touchcancel", handleMouseOut);

    // 리스너를 제거하는 함수 반환
    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseup", handleMouseUp);
      element.removeEventListener("mouseout", handleMouseOut);

      element.removeEventListener("touchstart", handleMouseDown);
      element.removeEventListener("touchmove", handleMouseMove);
      element.removeEventListener("touchend", handleMouseUp);
      element.removeEventListener("touchcancel", handleMouseOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgMaxLen]);

  const saleImgSlider = (val: number) => {
    if (isTransitionCheck()) return;
    pageNumberHandler(val);

    setCurImgIdx((curImgIdx) => {
      const newIdx = curImgIdx + val;
      flg.current = false;
      if (newIdx <= cnt - 1 && val < 0) {
          setTimeout(() => {
            flg.current = true;
            setCurImgIdx(imgCnt + newIdx);
          }, 500);
        } else if (newIdx > imgMaxLen - imgCnt && val > 0) {
          setTimeout(() => {
            flg.current = true;
            setCurImgIdx(newIdx - imgCnt);
          }, 500);
        }

      return newIdx;
    });
  };

  const isTransitionCheck = () => {
    if (isTransitionRef.current) return true;
    if (!isTransitionRef.current) {
      isTransitionRef.current = true;
      setTimeout(() => {
        isTransitionRef.current = false;
      }, 500);
    }
    return false;
  };

  const pageNumberHandler = (val: number) => {
    console.log(val);
    if (idx.current + val > imgCnt) idx.current = idx.current + val - imgCnt;
    else if (idx.current + val <= 0) idx.current = idx.current + val + imgCnt;
    else idx.current = idx.current + val;
  };

  return (
    <>
      <div className="MainSaleTitle">
        <h2>{title}</h2>
        <div className="PageNumberContainer">
          {idx.current} /<span> {imgCnt}</span>
        </div>
      </div>

      <div className="ButtonContainer">
        <LeftButtonArrow handleImgSlide={saleImgSlider} />
        <RightButtonArrow handleImgSlide={saleImgSlider} />
        <div ref={eventImgContainerParent} className="eventImgContainerParent">
          <div
            className="eventImgContainer"
            style={{
              width: `calc((${innerWidth}px - ${curMargin * 2}px) / ${cnt} * ${
                saleImgList.length
              })`,
              marginLeft: `calc(((${innerWidth}px - ${
                curMargin * 2
              }px) / ${cnt} * ${curImgIdx}*-1) + ${delta}px)`,
              transition: flg.current ? "0.0s" : "0.5s",
            }}
          >
            {saleImgList.map(({ src, txt }, idx) => (
              <div
                key={idx}
                className="eventImgInner"
                style={{
                  width: `calc((${innerWidth}px - ${
                    curMargin * 2
                  }px) / ${cnt})`,
                }}
              >
                <img
                  src={src}
                  alt=""
                  onMouseDown={(e) => e.preventDefault()}
                ></img>
                <div
                  style={{
                    width: `calc(((${innerWidth}px - ${
                      curMargin * 2
                    }px) / ${cnt}) - 20px)`,
                  }}
                >
                  {txt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
