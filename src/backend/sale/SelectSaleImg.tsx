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
  setSaleImgList: (param: saleImgList[]) => void;
  setimgMaxLen: (param: number) => void
}

export default function SelectSaleImg({ setSaleImgList, setimgMaxLen }: PropsType) {
  const { data } = useQuery<SaleImgData>(GET_SaleImg);

  useEffect(() => {
    if (data) {
      const ImgList = data?.allSaleimgs.nodes.map(({ saleimgSrc, saleimgTxt }) => ({
        src: saleimgSrc,
        txt:saleimgTxt
      }));
      ImgList.unshift(ImgList[ImgList.length - 1]);
      ImgList.unshift(ImgList[ImgList.length - 2]);
      ImgList.unshift(ImgList[ImgList.length - 3]);
      ImgList.push(ImgList[3]);
      ImgList.push(ImgList[4]);
      ImgList.push(ImgList[5]);
      setSaleImgList(ImgList);
      setimgMaxLen(ImgList.length);
    }
  }, [data, setSaleImgList, setimgMaxLen]);

  return <></>;
}
