import { useState, useEffect, useRef } from "react";
import "./MainImgContainer.css";

export default function MainImgContainer() {
  const [imgIdx, setimgIdx] = useState(1);
  const [flg, setFlg] = useState(false);
  const [stopflg, setStopflg] = useState(false);
  const isTransitionRef = useRef(false);
  const isStop = useRef(false);
  useEffect(() => {
    setInterval(() => {
      if (isStop.current) return;
      if (!isTransitionRef.current) handleMainImg(1);
    }, 5000);
  }, []);

  const mainImgList = [
    {
      src: "https://atimg.sonyunara.com/files/attrangs/new_banner/1705387347_1.jpg",
    },
    {
      src: "https://atimg.sonyunara.com/files/attrangs/new_banner/1703232790_0.jpg",
    },
    {
      src: "https://atimg.sonyunara.com/files/attrangs/new_banner/1705463928_0.jpg",
    },
    {
      src: "https://atimg.sonyunara.com/files/attrangs/new_banner/1705387292_0.jpg",
    },
    {
      src: "https://atimg.sonyunara.com/files/attrangs/new_banner/1705387347_1.jpg",
    },
    {
      src: "https://atimg.sonyunara.com/files/attrangs/new_banner/1703232790_0.jpg",
    },
  ];

  const handleMainImg = (val: number) => {
    if (isTransitionRef.current) return;
    if (!isTransitionRef.current) {
      isTransitionRef.current = true;
      setTimeout(() => {
        isTransitionRef.current = false;
      }, 700);
    }

    // 클로저 회피
    setimgIdx((imgIdx) => {
      const newIdx = imgIdx + val;
      setFlg(false);

      if (newIdx === 0) {
        setTimeout(() => {
          setFlg(true);
          setimgIdx(4);
        }, 700);
      } else if (newIdx === 5) {
        setTimeout(() => {
          setFlg(true);
          setimgIdx(1);
        }, 700);
      }

      return newIdx;
    });
  };

  return (
    <>
      <div className="MainImgContainer">
        <div
          className="MainImgInner"
          style={{
            marginLeft: -(100 * imgIdx) + "vw",
            transition: flg ? "0.0s" : "0.7s",
          }}
        >
          {mainImgList.map(({ src }, idx) => (
            <img src={src} key={idx}></img>
          ))}
          <div className="progressBar-container">
            <div className="progressInner">
              <div
                className="progressBar"
                style={{
                  width: (100 / (mainImgList.length - 2)) * imgIdx + "%",
                }}
              ></div>
            </div>
            <div className="stopButton">
              {stopflg ? (
                <i
                  onClick={() => {
                    setStopflg(false);
                    isStop.current = false;
                  }}
                  className="fa fa-play"
                ></i>
              ) : (
                <i
                  onClick={() => {
                    setStopflg(true);
                    isStop.current = true;
                  }}
                  className="fa fa-pause"
                ></i>
              )}
            </div>
          </div>
        </div>
        <div className="imgLeftButton">
          <div
            className="imgButtonInner"
            onClick={() => {
              handleMainImg(-1);
            }}
          >
            <button className="left-arrow">
              <i className="fa fa-arrow-left"></i>
            </button>
          </div>
        </div>

        <div className="imgRightButton">
          <div
            className="imgButtonInner"
            onClick={() => {
              handleMainImg(1);
            }}
          >
            <button className="right-arrow">
              <i className="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
