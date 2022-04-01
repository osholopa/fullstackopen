import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { Link, useHistory } from "react-router-native";
import theme from "../theme";

import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { AUTHORIZED_USER } from "../graphql/queries";
import AuthStorageContext from "../contexts/AuthStorageContext";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBar.backgroundColor,
    height: 100,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  tab: {
    color: theme.colors.white,
    fontSize: 24,
    padding: 15,
  },
});

const AppBar = ({ title }) => {
  const { data, loading } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
  });
  const [loggedIn, setLoggedin] = useState(false);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();

  useEffect(() => {
    if (data) {
      data.authorizedUser && setLoggedin(true);
    }
  }, [loading]);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push("/");
    setLoggedin(false);
  };

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <ScrollView horizontal>
          <Link to="/">
            <Text style={styles.tab}>{title}</Text>
          </Link>
          <Link to="/review">
            <Text style={styles.tab}>Create a review</Text>
          </Link>
          <Link to="/my-reviews">
            <Text style={styles.tab}>My reviews</Text>
          </Link>
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.tab}>Sign out</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView horizontal>
          <Link to="/">
            <Text style={styles.tab}>{title}</Text>
          </Link>
          <Link to="/signin">
            <Text style={styles.tab}>Sign in</Text>
          </Link>
          <Link to="/signup">
            <Text style={styles.tab}>Sign up</Text>
          </Link>
        </ScrollView>
      )}
    </View>
  );
};

export default AppBar;
