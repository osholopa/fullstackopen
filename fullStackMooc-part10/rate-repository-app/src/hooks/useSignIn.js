import { useContext } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { useHistory } from "react-router-native";
import { LOGIN } from "../graphql/mutations";
import AuthStorageContext from "../contexts/AuthStorageContext";

const useSignIn = () => {
  const history = useHistory();
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(LOGIN, {
    onError: (error) => console.log(error),
  });

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { username: username, password: password },
      });
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return [signIn, result];
};

export default useSignIn;
