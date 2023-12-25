import "./SubCategory.css";

interface PropsTypes {
  item: string[];
  subCategoryFlg: boolean;
  curNavIdx: number;
  idx: number;
}

export default function SubCategory({
  item,
  subCategoryFlg,
  curNavIdx,
  idx,
}: PropsTypes) {
  return (
    <>
      <div
        className={
          "subCategoryContainer" +
          (subCategoryFlg && curNavIdx === idx ? " active" : "")
        }
      >
        <ul>
          {item.map((name, idx) => (
            <li key={idx}>
              <span className="navSubItemSpan">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
