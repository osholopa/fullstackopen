import React from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import theme from "../theme";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import useSignUp from "../hooks/useSignUp";

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

const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput
        style={styles.formController}
        secureTextEntry
        name="passwordConfirmation"
        placeholder="Password confirmation"
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
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .max(30, "Max length is 30")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Min length is 5")
    .max(50, "Max length is 50")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .min(5, "Min length is 5")
    .max(50, "Max length is 50")
    .oneOf(
      [yup.ref("password"), null],
      "Password confirmation must match the password"
    )
    .required("Password confirm is required"),
});

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;
    await signUp({ username, password });
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
