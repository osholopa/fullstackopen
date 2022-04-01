import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-native";
import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const history = useHistory();
  const [ mutate ] = useMutation(CREATE_REVIEW, {
    onError: (error) => console.log(error),
  });

  const review = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const { data } = await mutate({
        variables: {
          ownerName: ownerName,
          repositoryName: repositoryName,
          rating: rating,
          text: text,
        },
      });
      
      history.push(`repositories/${data.createReview.repositoryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return [review];
};

export default useReview;
