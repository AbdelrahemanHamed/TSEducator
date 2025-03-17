import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./AllSignalStyle";
import Header from "../Components/header/Header";

const BASE_URL = "https://laravelapi.tradingsociety.net/api/v1";
const ENDPOINT = "/instructor/app/signls";

const SignalsScreen = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  // Fetch signals on component mount
  useEffect(() => {
    fetchSignals();
  }, []);

  // Refresh when navigating back to this screen
  useFocusEffect(
    useCallback(() => {
      fetchSignals();
    }, [])
  );

  // Fetch signals from API
  const fetchSignals = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BASE_URL}${ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status && response.data.result) {
        setSignals(response.data.result.data || []);
      } else {
        console.warn("Unexpected API response:", response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching signals:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchSignals();
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.header}>All Signals</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={signals}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <View style={styles.signalContainer}>
              <View style={styles.signalItem}>
                <View>
                  <Text style={styles.signalText}>
                    Pair: {item.pair} | Status: {item.order_status}
                  </Text>
                  <Text style={styles.signalText}>
                    Type: {item.order_type}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate("EditSignal", { signalId: item.id })}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SignalsScreen;
