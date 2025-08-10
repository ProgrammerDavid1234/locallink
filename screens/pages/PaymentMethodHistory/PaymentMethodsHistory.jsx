import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function PaymentMethodsHistory({ navigation }) {
  const paymentMethods = [
    { id: 1, type: "Credit Card", details: "**** 1234", expiry: "Expires 12/26" },
    { id: 2, type: "Paystack Linked", details: "Primary Account" },
  ];

  const transactions = [
    { id: 1, title: "Haircut Service Booking", date: "July 26, 2024", amount: "$45.00", status: "Completed" },
    { id: 2, title: "Plumbing Repair Service", date: "July 18, 2024", amount: "$120.00", status: "Completed" },
    { id: 3, title: "Refund: Dog Walking Service", date: "July 16, 2024", amount: "$25.00", status: "Completed" },
    { id: 4, title: "Massage Service Booking", date: "July 14, 2024", amount: "$75.00", status: "Pending" },
    { id: 5, title: "Car Wash Service", date: "July 10, 2024", amount: "$30.00", status: "Failed" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods & History</Text>
        <Ionicons name="notifications-outline" size={24} color="#000" />
      </View>

      {/* Payment Methods */}
      <Text style={styles.sectionTitle}>My Payment Methods</Text>
      {paymentMethods.map((method) => (
        <TouchableOpacity key={method.id} style={styles.methodCard}>
          <MaterialIcons name="credit-card" size={24} color="#3F370F" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.methodTitle}>
              {method.type} {method.details ? method.details : ""}
            </Text>
            {method.expiry && <Text style={styles.methodSubtitle}>{method.expiry}</Text>}
            {method.details && !method.expiry && <Text style={styles.methodSubtitle}>{method.details}</Text>}
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      ))}

      {/* Add New Method */}
      <TouchableOpacity style={styles.addMethod}>
        <Ionicons name="add-circle-outline" size={20} color="#3F370F" />
        <Text style={styles.addMethodText}>Add New Method</Text>
      </TouchableOpacity>

      {/* Transaction History */}
      <Text style={styles.sectionTitle}>Transaction History</Text>
      {transactions.map((tx) => (
        <View key={tx.id} style={styles.transactionRow}>
          <View>
            <Text style={styles.transactionTitle}>{tx.title}</Text>
            <Text style={styles.transactionDate}>{tx.date}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.transactionAmount}>{tx.amount}</Text>
            <Text style={[styles.status, styles[tx.status.toLowerCase()]]}>{tx.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 14,
    marginVertical: 30,
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  methodTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular'
  },
  methodSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  addMethod: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  addMethodText: {
    marginLeft: 6,
    color: "#3F370F",
    fontFamily: 'Poppins_700Bold',
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  transactionTitle: {
    fontSize: 17,
    fontFamily: 'Poppins_700Bold'
  },
  transactionDate: {
    fontSize: 16,
    color: "#666",
    fontFamily: 'Poppins_400Regular'
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  status: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 4,
    overflow: "hidden",
    fontFamily: 'Poppins_700Bold'
  },
  completed: {
    backgroundColor: "#D4EDDA",
    color: "#155724",
  },
  pending: {
    backgroundColor: "#FFF3CD",
    color: "#856404",
  },
  failed: {
    backgroundColor: "#F8D7DA",
    color: "#721C24",
  },
});
