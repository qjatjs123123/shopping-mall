import { useQuery, gql } from "@apollo/client";

const GET_NAV = gql`
  query MyQuery {
    allCategories {
      edges {
        node {
          itemsByCategoryId {
            edges {
              node {
                itemName
              }
            }
          }
          categoryName
        }
      }
    }
  }
`;

export default function SelectNav() {
  const { loading, data } = useQuery(GET_NAV);

  if(!loading) {
    console.log(data);
  }else {

  }

  return <></>;
}
