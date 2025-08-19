import { useCallback, useState } from "react";
import { Alert } from "react-native";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState();

  // const API_URL = "http://localhost:8000/api";
  const API_URL = "https://native-wallet-app-pbz1.onrender.com/api";

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();

      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary", error);
    }
  }, [userId]);

  const loadData = useCallback(
    async (params) => {
      if (!userId) return;

      setIsLoading(true);

      try {
        await Promise.all([fetchTransactions(), fetchSummary()]);
      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchTransactions, fetchSummary, userId]
  );

  const deleteTransactions = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete transactions");

      await loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transactions", error);
      Alert.alert("Error", error.message);
    }
  };

  return { transactions, summary, isLoading, deleteTransactions, loadData };
};
