import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { useState } from "react";
import Input from "./Input";
import { getFormattedDate } from "../helpers/date";

export default function CourseForm({
  handleCancel,
  onSubmit,
  buttonLabel,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const handleAddOrUpdate = () => {
    const courseData = {
      amount: Number(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value.trim(),
    };

    const amountIsValid = courseData.amount > 0;
    const dateIsValid = courseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = courseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => {
        return {
          amount: {
            value: Number(currentInputs.amount.value),
            isValid: amountIsValid,
          },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(courseData);
  };

  const inputChange = (inputIdentifier, enteredValue) => {
    setInputs((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Kurs Bilgileri</Text>
      <View style={styles.priceAndDate}>
        <Input
          style={styles.flexAll}
          label="Tutar"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChange.bind(this, "amount"),
            value: inputs.amount.value.toString(),
          }}
        />
        <Input
          style={styles.flexAll}
          label="Tarih"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YIL-AY-GÜN",
            maxLength: 10,
            onChangeText: inputChange.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Başlık"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChange.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      <View style={styles.error}>
        {!inputs.amount.isValid && (
          <Text>Lütfen tutarı doğru formatta giriniz!</Text>
        )}
        {!inputs.date.isValid && (
          <Text>Lütfen tarihi doğru formatta giriniz!</Text>
        )}
        {!inputs.description.isValid && (
          <Text>Lütfen başlığı doğru formatta giriniz!</Text>
        )}
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={handleCancel}>
          <View style={[styles.button, styles.cancel]}>
            <Text style={styles.buttonText}>İptal Et</Text>
          </View>
        </Pressable>
        <Pressable onPress={handleAddOrUpdate}>
          <View style={[styles.button, styles.addOrDelete]}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginVertical: 20,
  },
  priceAndDate: {
    flexDirection: "row",
  },
  flexAll: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    minWidth: 120,
    padding: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  cancel: {
    backgroundColor: "red",
  },
  addOrDelete: {
    backgroundColor: "blue",
  },
  error: {
    alignItems: "center",
    marginBottom: 10
  }
});
