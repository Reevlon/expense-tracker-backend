import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function DashboardScreen() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from the backend
    const fetchExpenses = async () => {
      try {
        const response = await fetch("https://your-backend-url/api/expenses", {
          headers: {
            Authorization: `Bearer YOUR_JWT_TOKEN`,
          },
        });
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const renderExpense = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.item_name}</Text>
      <Text style={styles.itemText}>Amount: ${item.amount}</Text>
      <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemText}>Date: {new Date(item.date).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses Dashboard</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderExpense}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  list: { marginTop: 16 },
  item: { padding: 16, borderBottomWidth: 1, borderColor: "#ccc" },
  itemText: { fontSize: 16 },
});