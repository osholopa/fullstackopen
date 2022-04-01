import React from "react";
import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from '../theme';

//eslint-disable-next-line
const styles = StyleSheet.create({
    default: {
        borderWidth: 1,
        borderColor: theme.colors.textSecondary,
    },
    error: {
        borderColor: 'red',
    }
});

//eslint-disable-next-line
const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.default,
    error && styles.error,
    style
  ];

  return <NativeTextInput secureTextEntry={props.secureTextEntry && true} style={textInputStyle} {...props} />;
};

export default TextInput;
