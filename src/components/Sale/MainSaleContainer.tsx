import LeftButtonArrow from "../Common/LeftButtonArrow";
import RightButtonArrow from "../Common/RightButtonArrow";
import SelectSaleImg from "../../backend/sale/SelectSaleImg";

import "./MainSaleContainer.css";

import React, { useEffect, useRef, useState } from "react";

interface SaleImgProps {
  src: string;
  txt: string;
}

export default function MainSaleContainer() {
  const [innerWidth, setinnerWidth] = useState(0);
  const [cnt, setCnt] = useState(1);
  const [curMargin, setCurMargin] = useState(0);
  const [curImgIdx, setCurImgIdx] = useState<number>(1);
  const [saleImgList, setSaleImgList] = useState<SaleImgProps[]>([]);
  const [imgMaxLen, setimgMaxLen] = useState(0);
  const isTransitionRef = useRef(false);
  const eventImgContainerParent = useRef<HTMLDivElement>(null);
  const startPoint = useRef(0);
  const endPoint = useRef(0);
  const mouseup = useRef(true);
  const flg = useRef(false);
  const [delta, setDelta] = useState(0);

  const handleResize = () => {
    setCurMargin(Math.round(document.documentElement.clientWidth / 10));
    setinnerWidth(document.documentElement.clientWidth);
    if (document.documentElement.clientWidth <= 768) setCnt(1);
    else setCnt(3);
  };
  useEffect(() => {
    const element = eventImgContainerParent.current;
    if (imgMaxLen === 0 || !element) return;

    const handleMouseDown = (e: MouseEvent) => {
      startPoint.current = e.pageX; // 마우스 드래그 시작 위치 저장
      mouseup.current = false;
      flg.current = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseup.current) return;
      endPoint.current = e.pageX;
      const tmp = endPoint.current - startPoint.current;
      if (tmp === 0) return;
      setDelta(tmp);
    };

    const handleMouseUp = (e: MouseEvent) => {
      setDelta(delta * -1);
      mouseup.current = true;
      flg.current = false;
      const tmp = endPoint.current - startPoint.current;
      const gap = (innerWidth - curMargin * 2) / cnt;
      let plus = 0;
      if (tmp < 0) plus = Math.round((tmp * -1) / gap) * -1;
      else plus = Math.round(tmp / gap);
      saleImgSlider(plus * -1);
    };

    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseup", handleMouseUp);

    // 리스너를 제거하는 함수 반환
    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseup", handleMouseUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgMaxLen]);

  useEffect(() => {
    setCnt(1);
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

      flg.current = false;
      if (newIdx <= 0) {
        setTimeout(() => {
          flg.current = true;
          setCurImgIdx(imgMaxLen - 6);
        }, 500);
      } else if (newIdx >= imgMaxLen - 3) {
        setTimeout(() => {
          flg.current = true;
          setCurImgIdx(3);
        }, 500);
      }

      return newIdx;
    });
  };

  const pageNumberHandler = () => {
    if (curImgIdx > imgMaxLen - 6) return curImgIdx - (imgMaxLen - 6);
    else if (curImgIdx === 0) return imgMaxLen - 6;
    return curImgIdx;
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
        <div className="MainSaleTitle">
          <h2>이벤트</h2>
          <div className="PageNumberContainer">
            {pageNumberHandler()} /<span> {imgMaxLen - 6}</span>
          </div>
        </div>

        <div className="ButtonContainer">
          <LeftButtonArrow handleImgSlide={saleImgSlider} />
          <RightButtonArrow handleImgSlide={saleImgSlider} />
          <div
            ref={eventImgContainerParent}
            className="eventImgContainerParent"
          >
            <div
              className="eventImgContainer"
              style={{
                width: `calc((${innerWidth}px - ${
                  curMargin * 2
                }px) / ${cnt} * ${saleImgList.length})`,
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
      </div>
      <SelectSaleImg
        setSaleImgList={setSaleImgList}
        setimgMaxLen={setimgMaxLen}
      />
    </>
  );
}
