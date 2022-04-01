import React from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import theme from "../theme";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
  formController: {
    padding: 15,
    margin: 15,
    borderRadius: 4,
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    textAlign: "center",
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.formController}
        name="username"
        placeholder="Username"
        testID="usernameField"
      />
      <FormikTextInput
        style={styles.formController}
        secureTextEntry
        name="password"
        placeholder="Password"
        testID="passwordField"
      />
      <TouchableWithoutFeedback testID="signInBtn" onPress={onSubmit}>
        <Text
          fontWeight="bold"
          style={[styles.formController, styles.submitBtn]}
        >
          Sign in
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    await signIn({ username, password });
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
