import { useState } from "react";
import './MainImgContainer.css';
import '../../responsive.css';

export default function MainImgContainer() {
  const [imgIdx, setimgIdx] = useState(1);

  const mainImgList = [
    { src: 'https://atimg.sonyunara.com/files/attrangs/new_banner/1705387347_1.jpg'},
    { src: 'https://atimg.sonyunara.com/files/attrangs/new_banner/1703232790_0.jpg'},
    { src: 'https://atimg.sonyunara.com/files/attrangs/new_banner/1705463928_0.jpg' },
    { src: 'https://atimg.sonyunara.com/files/attrangs/new_banner/1705387292_0.jpg' },
    { src: 'https://atimg.sonyunara.com/files/attrangs/new_banner/1705387347_1.jpg' },
    { src: 'https://atimg.sonyunara.com/files/attrangs/new_banner/1703232790_0.jpg'},
  ];

  const handleMainImg = (val: number) => {
    setimgIdx(imgIdx + val);
    if (imgIdx == 1 && val == -1) {
      setTimeout(() => {
        setimgIdx(5);
      }, 500);
    } else if (imgIdx == 4 && val == 1) {
      setTimeout(() => {
        setimgIdx(1);
      }, 500);
    }
  }

  return (
    <>
      <div className='MainImgContainer' >
        <div className="MainImgInner" style={{ marginLeft: -(100 * imgIdx) + 'vw' }}>
          {mainImgList.map(({ src }, idx) => 
            <img src={src} key={idx}></img>
          )}
        </div>
        <div className='imgLeftButton'>
          <div className='imgButtonInner' onClick={() => { handleMainImg(-1) }}>
            <button className='left-arrow'>
              <i className="fa fa-arrow-left"></i>
            </button>
          </div>
        </div>

        <div className='imgRightButton'>
          <div className='imgButtonInner' onClick={() => { handleMainImg(1) }}>
            <button className='right-arrow'>
              <i className="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>

      </div>
    </>
  );
}