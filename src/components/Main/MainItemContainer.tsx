import ProductListContainer from "../Product/ProductListContainer";
import MainSaleContainer from "../Sale/MainSaleContainer";
import "./MainItemContainer.css";
import React, { useEffect, useState } from "react";

export default function MainItemContainer() {
  //sale
  const [saleCnt, setSaleCnt] = useState(3);
  //product
  const [productCnt, setPoroductCnt] = useState(4);

  const [curMargin, setCurMargin] = useState(0);
  const [innerWidth, setinnerWidth] = useState(0);

  const handleResize = () => {
    setCurMargin(Math.round(document.documentElement.clientWidth / 10));
    setinnerWidth(document.documentElement.clientWidth);
    if (document.documentElement.clientWidth <= 768) {
      setSaleCnt(1);
      setPoroductCnt(2);
    }else{
      setSaleCnt(3);
      setPoroductCnt(4);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className="MainItemContainer"
        style={{
          marginLeft: curMargin,
          marginRight: curMargin,
        }}
      >
        <MainSaleContainer
          saleCnt={saleCnt}
          curMargin={curMargin}
          innerWidth={innerWidth}
        />
        <ProductListContainer
          productCnt={productCnt}
          curMargin={curMargin}
          innerWidth={innerWidth}
        />
      </div>
    </>
  );
}
