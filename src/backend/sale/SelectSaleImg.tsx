import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";

const GET_SaleImg = gql`
query MyQuery {
  allSaleimgs {
    nodes {
      saleimgSrc
      saleimgTxt
    }
  }
}
`;

interface SaleImgData {
  allSaleimgs: {
    nodes: {
      saleimgSrc: string;
      saleimgTxt: string;
    }[];
  };
}
interface saleImgList {
  src: string;
  txt: string;
}
interface PropsType {
  cnt : number,
  setSaleImgList: (param: saleImgList[]) => void;
  setimgMaxLen: (param: number) => void,
  setSaleImgCnt: (param: number) => void,
}

export default function SelectSaleImg({ cnt, setSaleImgList, setimgMaxLen, setSaleImgCnt }: PropsType) {
  const { data } = useQuery<SaleImgData>(GET_SaleImg);

  useEffect(() => {
    if (data) {
      const ImgList = data?.allSaleimgs.nodes.map(({ saleimgSrc, saleimgTxt }) => ({
        src: saleimgSrc,
        txt:saleimgTxt
      }));
      setSaleImgCnt(ImgList.length);
      for (let i = 1; i <= cnt; i++) ImgList.unshift(ImgList[ImgList.length - i]);
      for (let i = 0; i < cnt; i++ ) ImgList.push(ImgList[cnt + i]);
      setSaleImgList(ImgList);
      setimgMaxLen(ImgList.length);
    }
  }, [cnt, data, setSaleImgCnt, setSaleImgList, setimgMaxLen]);

  return <></>;
}
