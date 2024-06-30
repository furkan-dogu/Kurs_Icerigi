import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function Input({ label, textInputConfig, style, invalid }) {
  const inputStyle = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiline);
  }

  if(invalid) {
    inputStyle.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyle} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    color: "blue",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "pink",
    padding: 6,
    borderRadius: 10,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "red",
  },
  invalidInput: {
    backgroundColor: "red",
  }
});
