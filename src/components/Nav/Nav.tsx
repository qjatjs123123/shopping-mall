import "./Nav.css";
import { useState } from "react";
import SubCategory from "./SubCategory";
import SelectNav from "../../backend/nav/SelectNav";
import ResNav from "./ResNav";
import "../../responsive.css";

interface navItem {
  category: string,
  item: string[]
}

export default function Nav() {
  const [subCategoryFlg, setSubCategoryFlg] = useState(false);
  const [gnbFlg, setGnbFlg] = useState(false);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [curNavIdx, setCurNavIdx] = useState<number>(0);
  const [curNavCategory, setCurNavCategory] = useState("");
  const [navCategory, setNavCategory] = useState<navItem[]>([]);

  const handleNavLineBar = (flg: boolean, item: string[], idx: number) => {
    setSubCategoryFlg(flg);
    setSubCategory(item);
    setCurNavIdx(idx);
  };

  const handleResNav = (category : string) => {
    if (curNavCategory === category) setCurNavCategory("");
    else setCurNavCategory(category);
  }

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
                  idx={idx}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={"navLineBar" + (subCategoryFlg ? " active" : "")}></div>

        {/* 햄버거버튼 */}
        <ResNav
          navCategory={navCategory}
          gnbFlg={gnbFlg}
          setGnbFlg={setGnbFlg}
          curNavCategory = {curNavCategory} 
          handleResNav = {handleResNav}
        />
      </div>
      <SelectNav setNavCategory={setNavCategory}/>
    </>
  );
}
