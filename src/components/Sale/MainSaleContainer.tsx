import React, { useState } from "react";
import SelectSaleImg from "../../backend/sale/SelectSaleImg";
import ImgSliderComponents from "../Common/ImgSliderComponents";
import "./MainSaleContainer.css";

interface SaleImgProps {
  src: string;
  txt: string;
}

interface propsType {
  saleCnt: number;
  curMargin: number;
  innerWidth: number;
}
export default function MainSaleContainer({
  saleCnt,
  curMargin,
  innerWidth,
}: propsType) {
  //MainSale
  const [saleImgList, setSaleImgList] = useState<SaleImgProps[]>([]);
  const [imgMaxLen, setimgMaxLen] = useState(0);
  const [saleimgCnt, setSaleImgCnt] = useState(0);
  return (
    <>
      <div
        className="MainSaleContainer"
        style={{
          width: `100%`,
        }}
      >
      <ImgSliderComponents
          curMargin={curMargin}
          innerWidth={innerWidth}
          cnt={saleCnt}
          saleImgList={saleImgList}
          imgMaxLen={imgMaxLen}
          imgCnt={saleimgCnt}
          title={"이벤트"}
        />
      </div>

      <SelectSaleImg
        cnt={saleCnt}
        setSaleImgList={setSaleImgList}
        setimgMaxLen={setimgMaxLen}
        setSaleImgCnt={setSaleImgCnt}
      />
    </>
  );
}
