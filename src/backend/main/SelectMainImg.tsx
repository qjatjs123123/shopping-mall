import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";

const GET_MainImg = gql`
  query MyQuery {
    allMainimgs {
      nodes {
        mainimgSrc
      }
    }
  }
`;

interface MainImgData {
  allMainimgs: {
    nodes: {
      mainimgSrc: string;
    }[];
  };
}
interface mainImgList {
  src: string;
}
interface PropsType {
  setMainImgList: (param: mainImgList[]) => void;
  setimgMaxLen: (param: number) => void
}

export default function SelectMainImg({ setMainImgList, setimgMaxLen }: PropsType) {
  const { data } = useQuery<MainImgData>(GET_MainImg);

  useEffect(() => {
    if (data) {
      const ImgList = data?.allMainimgs.nodes.map(({ mainimgSrc }) => ({
        src: mainimgSrc
      }));
      ImgList.unshift(ImgList[ImgList.length - 1]);
      ImgList.push(ImgList[1]);
      setMainImgList(ImgList);
      setimgMaxLen(ImgList.length-2);
    }
  }, [data, setMainImgList, setimgMaxLen]);

  return <></>;
}
