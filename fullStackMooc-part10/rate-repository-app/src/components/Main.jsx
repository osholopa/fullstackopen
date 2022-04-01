import React from "react";
import { StyleSheet, View } from "react-native";
import { Route, Switch } from "react-router-native";

import theme from "../theme";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Repository from "./Repository";
import Review from "./Review";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.body.backgroundColor,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar title="Repositories" />
      <Switch>
        <Route path="/repositories/:id" exact>
          <Repository />
        </Route>
        <Route path="/my-reviews" exact>
          <MyReviews />
        </Route>
        <Route path="/review" exact>
          <Review />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
      </Switch>
    </View>
  );
};

export default Main;
