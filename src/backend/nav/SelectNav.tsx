import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
const GET_NAV = gql`
query MyQuery {
  allCategories {
    edges {
      node {
        categoryName
        itemsByCategoryId {
          nodes {
            itemName
          }
        }
      }
    }
  }
}
`;

interface NavItemData {
  allCategories: {
    edges: { 
      node: {
        categoryName: string,
        itemsByCategoryId : {
          nodes: {
            itemName: string
          }[]
        }
      },
    }[];
  };
}
interface navItem {
  category: string,
  item: string[]
}
interface PropsType {
  setNavCategory: (param: navItem[]) => void;
}


export default function SelectNav({setNavCategory}:PropsType) {
  const { loading, data } = useQuery<NavItemData>(GET_NAV);

  useEffect(() => {
    if(!loading) {
      const navCategory: navItem[]= [];

      data?.allCategories.edges.forEach(({node}) => {
        const item = node.itemsByCategoryId.nodes.map(({itemName}) => itemName);
        navCategory.push({
          category: node.categoryName,
          item: item
        });
      });

      setNavCategory(navCategory);
    }else {
  
    }
  }, [data?.allCategories.edges, loading, setNavCategory])

  

  return <></>;
}
