import { useState, useEffect, useRef } from "react";
import "./MainImgContainer.css";
import SelectMainImg from "../../backend/main/SelectMainImg";
import LeftButtonArrow from "../Common/LeftButtonArrow";
import RightButtonArrow from "../Common/RightButtonArrow";

interface mainImgList {
  src: string;
}

export default function MainImgContainer() {
  const [imgIdx, setimgIdx] = useState(1);
  const [flg, setFlg] = useState(false);
  const [stopflg, setStopflg] = useState(false);
  const [mainImgList, setMainImgList] = useState<mainImgList[]>([]);
  const [imgMaxLen, setimgMaxLen] = useState(0);

  const isTransitionRef = useRef(false);
  const isStop = useRef(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isStop.current) return;
      if (!isTransitionRef.current) handleMainImg(1);
    }, 5000);
  
    return () => {
      clearInterval(intervalId);
    };
  });

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
          setimgIdx(imgMaxLen);
        }, 700);
      } else if (newIdx === imgMaxLen + 1) {
        setTimeout(() => {
          setFlg(true);
          setimgIdx(1);
        }, 700);
      }

      return newIdx;
    });
  };

  const calWidth = () => {
    const percent = 100 / (mainImgList.length - 2);
    let mult = imgIdx;
    if (imgIdx === imgMaxLen + 1) mult = 1;
    else if (imgIdx === 0) mult = imgMaxLen;
    return percent * mult;
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
            <img src={src} key={idx} alt=""></img>
          ))}
          <div className="progressBar-container">
            <div className="progressInner">
              <div
                className="progressBar"
                style={{
                  width: calWidth() + "%",
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
        <LeftButtonArrow handleImgSlide = {handleMainImg}/>
        <RightButtonArrow handleImgSlide = {handleMainImg}/>
        
      </div>
      <SelectMainImg
        setMainImgList={setMainImgList}
        setimgMaxLen={setimgMaxLen}
      />
    </>
  );
}
