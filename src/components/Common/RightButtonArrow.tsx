import "./RightButtonArrow.css";

interface propsType {
  handleImgSlide: (param: number) => void;
}

export default function RightButtonArrow({ handleImgSlide }: propsType) {
  return (
    <>
      <div
        className="imgRightButton"
        onClick={() => {
          handleImgSlide(1);
        }}
      >
        <div className="imgButtonInner">
          <button className="right-arrow">
            <i className="fa fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
