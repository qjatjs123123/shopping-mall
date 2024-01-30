import "./LeftButtonArrow.css";

interface propsType {
  handleImgSlide: (param: number) => void;
}

export default function LeftButtonArrow({ handleImgSlide }: propsType) {
  return (
    <>
      <div
        className="imgLeftButton"
        onClick={() => {
          handleImgSlide(-1);
        }}
      >
        <div className="imgButtonInner">
          <button className="left-arrow">
            <i className="fa fa-arrow-left"></i>
          </button>
        </div>
      </div>
    </>
  );
}
