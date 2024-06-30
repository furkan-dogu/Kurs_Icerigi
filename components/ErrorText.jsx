import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

const ErrorText = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.title}>HATA!</Text>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "white"
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold"
  },
  message: {
    textAlign: "center",
    marginTop: 10
  }
});

export default ErrorText;