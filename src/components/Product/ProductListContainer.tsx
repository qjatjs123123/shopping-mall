import ImgSliderComponents from "../Common/ImgSliderComponents";
import "./ProductListContainer.css";

interface propsType {
  productCnt: number;
  curMargin: number;
  innerWidth: number;
}
export default function ProductListContainer({
  productCnt,
  curMargin,
  innerWidth,
}: propsType) {

  const productImgList = [
    {src: "https://img.goodwearmall.com/goods/MSE1JP/MSE1JP2002IV_M.jpg?AR=0&RS=344", txt:"여성)스마트 발열 오버핏 퀄팅 점퍼"},
    {src: "https://img.goodwearmall.com/goods/MSE1KG/MSE1KG1004BGR_M.jpg?AR=0&RS=344", txt:"남성)비건 레더 트러커"},
    {src: "https://img.goodwearmall.com/goods/MSE5TR/MSE5TR3901BK_M.jpg?AR=0&RS=344", txt:"공용)테리 베이직 스웨트 셔츠"},
    {src: "https://img.goodwearmall.com/goods/MSE1TH/MSE1TH3901MGR_M.jpg?AR=0&RS=344", txt:"공용)테리 그래픽 스웨트 후디"},
    {src: "https://img.goodwearmall.com/goods/MKE1IP/MKE1IP3002LGR_M.jpg?AR=0&RS=344", txt:"아동)더블니트 하프넥 배색 셋업"},
    {src: "https://img.goodwearmall.com/goods/MKE1IP/MKE1IP3002BE_M.jpg?AR=0&RS=344", txt:"아동)더블니트 하프넥 배색 셋업"},
    {src: "https://img.goodwearmall.com/goods/MSE5PT/MSE5PT1901BK_M.jpg?AR=0&RS=344", txt:"남성)테리 스트레이트 스웨트 팬츠"},
    {src: "https://img.goodwearmall.com/goods/MKE1PT/MKE1PT3001BK_M.jpg?AR=0&RS=344", txt:"아동)소프트 테리 조거 니트팬츠"},
    {src: "https://img.goodwearmall.com/goods/MSE5PT/MSE5PT2901BK_M.jpg?AR=0&RS=344", txt:"여성)테리 스트레이트 스웨트팬츠"},
    {src: "https://img.goodwearmall.com/goods/MSE5PT/MSE5PT2901MGR_M.jpg?AR=0&RS=344", txt:"여성)테리 스트레이트 스웨트팬츠"},
    {src: "https://img.goodwearmall.com/goods/MSE1JP/MSE1JP2002IV_M.jpg?AR=0&RS=344", txt:"여성)스마트 발열 오버핏 퀄팅 점퍼"},
    {src: "https://img.goodwearmall.com/goods/MSE1KG/MSE1KG1004BGR_M.jpg?AR=0&RS=344", txt:"남성)비건 레더 트러커"},
    {src: "https://img.goodwearmall.com/goods/MSE5TR/MSE5TR3901BK_M.jpg?AR=0&RS=344", txt:"공용)테리 베이직 스웨트 셔츠"},
    {src: "https://img.goodwearmall.com/goods/MSE1TH/MSE1TH3901MGR_M.jpg?AR=0&RS=344", txt:"공용)테리 그래픽 스웨트 후디"},
    {src: "https://img.goodwearmall.com/goods/MKE1IP/MKE1IP3002LGR_M.jpg?AR=0&RS=344", txt:"아동)더블니트 하프넥 배색 셋업"},
    {src: "https://img.goodwearmall.com/goods/MKE1IP/MKE1IP3002BE_M.jpg?AR=0&RS=344", txt:"아동)더블니트 하프넥 배색 셋업"},
    {src: "https://img.goodwearmall.com/goods/MSE5PT/MSE5PT1901BK_M.jpg?AR=0&RS=344", txt:"남성)테리 스트레이트 스웨트 팬츠"},
    {src: "https://img.goodwearmall.com/goods/MKE1PT/MKE1PT3001BK_M.jpg?AR=0&RS=344", txt:"아동)소프트 테리 조거 니트팬츠"},
    
  ]
  return (
    <>
      <div className="productListContainer">
        <ImgSliderComponents
          curMargin={curMargin}
          innerWidth={innerWidth}
          cnt={productCnt}
          saleImgList={productImgList}
          imgMaxLen={productImgList.length}
          imgCnt={10}
          title={"랭킹"}
        />
      </div>
    </>
  );
}
