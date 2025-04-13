import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function CaptureExpenseScreen() {
  const [image, setImage] = useState(null);
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemName, setItemName] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSaveExpense = () => {
    // TODO: Add API call to save expense
    console.log("Saving expense:", { amount, quantity, itemName, image });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Capture Expense</Text>
      <Button title="Take a Picture" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <Button title="Save Expense" onPress={handleSaveExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  image: { width: 200, height: 200, alignSelf: "center", marginVertical: 16 },
  input: { borderWidth: 1, padding: 8, marginBottom: 16 },
});