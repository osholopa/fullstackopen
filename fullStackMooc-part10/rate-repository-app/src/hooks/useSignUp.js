import { useMutation } from "@apollo/react-hooks";
import { SIGN_UP } from "../graphql/mutations";
import useSignIn from "./useSignIn";

const useSignUp = () => {
  const [signIn] = useSignIn();
  const [mutate, result] = useMutation(SIGN_UP, {
    onError: (error) => console.log(error),
  });

  const signUp = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { username: username, password: password },
      });
      if (data.createUser.id) {
        await signIn({ username, password });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [signUp, result];
};

export default useSignUp;
