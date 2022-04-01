import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";

import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useReview from "../hooks/useReview";

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

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.formController}
        name="ownerName"
        placeholder="Repository owner name"
      />
      <FormikTextInput
        style={styles.formController}
        name="repositoryName"
        placeholder="Repository name"
      />
      <FormikTextInput
        style={styles.formController}
        name="rating"
        placeholder="Rating between 0 and 100"
      />
      <FormikTextInput
        style={styles.formController}
        name="text"
        placeholder="Review"
        multiline
      />
      <TouchableWithoutFeedback testID="signInBtn" onPress={onSubmit}>
        <Text
          fontWeight="bold"
          style={[styles.formController, styles.submitBtn]}
        >
          Create a review
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup
  .object()
  .shape({
    ownerName: yup.string().required("Repository owner name is required"),
    repositoryName: yup.string().required("Repository name is required"),
    rating: yup
      .number()
      .required("Rating is required")
      .min(0, "Minimum value is ${min}")
      .max(100, "Maximum value is ${max}")
      .integer(),
    text: yup.string(),
  });

export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const Review = () => {
  const [review] = useReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = validationSchema.cast(values);
    await review({ ownerName, repositoryName, rating, text });
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default Review;
