import { useQuery } from "@apollo/react-hooks";
import { AUTHORIZED_USER } from "../graphql/queries";

const useMyReviews = (variables) => {
  const { data } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  return { myReviews: data ? data.authorizedUser.reviews : undefined };
};

export default useMyReviews;
