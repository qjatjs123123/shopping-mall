interface CategoryItem {
  category: string;
  item: string[];
}

interface PropsTypes {
  navCategory: CategoryItem[];
  gnbFlg: boolean;
  setGnbFlg: (param: boolean) => void;
  curNavCategory: string;
  handleResNav: (param: string) => void;
}

export default function ResNav({
  navCategory,
  gnbFlg,
  setGnbFlg,
  curNavCategory,
  handleResNav,
}: PropsTypes) {
  return (
    <>
      <div className="trigger" onClick={() => setGnbFlg(true)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={"gnb" + (gnbFlg ? " active" : "")}>
        <div className="gnb-inner">
          <div className="gnb-title">
            <div className="logoimg1"></div>
            <div className="gnb-close" onClick={() => setGnbFlg(false)}>
              <div className="gnb-close-inner">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <div className="responsive-navItem-container">
            {navCategory.map(({ category, item }, idx) => (
              <div key={idx}>
                <h2
                  className={
                    "responsive-navItem" +
                    (curNavCategory === category ? " active" : "")
                  }
                  onClick={() => handleResNav(category)}
                >
                  {category}
                  <div
                    className={
                      "responsive-trigger" +
                      (curNavCategory === category ? " active" : "")
                    }
                  >
                    <span></span>
                    <span></span>
                  </div>
                </h2>
                <ul
                  className={
                    "responsive-SubCategory-container" +
                    (curNavCategory === category ? " active" : "")
                  }
                >
                  {item.map((name, idx) => (
                    <li key={idx}>{name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
