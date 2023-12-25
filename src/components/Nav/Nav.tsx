import "./Nav.css";
import { useState } from "react";
import SubCategory from "./SubCategory";

export default function Nav() {
  const [subCategoryFlg, setSubCategoryFlg] = useState(false);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [curNavIdx, setCurNavIdx] = useState<number>(0);
  const navCategory = [
    { category: "상의", item: ["아우터2", "패딩", "ㅁㅁ"] },
    { category: "하의", item: ["아우터1", "패딩1", "ㅁㅁ1"] },
    { category: "신발", item: ["아우터3", "패딩", "ㅁㅁ2"] },
    { category: "모자", item: ["아우터4", "패딩", "ㅁㅁ32",'GHJGJH'] },
    { category: "가방", item: ["아우터5", "패딩", "ㅁㅁ4"] },
    { category: "시계", item: ["아우터6", "패딩", "ㅁㅁ65"] },
    { category: "양말", item: ["아우터", "패딩", "ㅁㅁ7"] },
    { category: "악세서리", item: ["아우터", "패딩", "ㅁㅁ9"] },
  ];

  const handleNavLineBar = (flg: boolean, item: string[], idx:number) => {
    setSubCategoryFlg(flg);
    setSubCategory(item);
    setCurNavIdx(idx);
  };

  return (
    <>
      <div className="navContainer">
        <div className="logoimg"></div>

        <div className="navItem">
          <ul>
            {navCategory.map(({ category, item }, idx) => (
              <li
                key={idx}
                onMouseEnter={() => {
                  handleNavLineBar(true, item, idx);
                }}
                onMouseLeave={() => {
                  handleNavLineBar(false, item, idx);
                }}
              >
                <span className="navItemSpan">{category}</span>
                <SubCategory
                  item={subCategory}
                  subCategoryFlg={subCategoryFlg}
                  curNavIdx={curNavIdx}
                  idx = {idx}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={"navLineBar" + (subCategoryFlg ? " active" : "")}></div>
      </div>
    </>
  );
}
