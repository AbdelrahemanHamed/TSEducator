import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./HomeStyle";
import Header from "../Components/header/Header";

const BASE_URL = "https://laravelapi.tradingsociety.net/api/v1";
const ENDPOINT = "/instructor/app/signls/";

export default function EditSignalScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { signalId } = route.params; // Get signal ID from params

  const [selectedOrderType, setSelectedOrderType] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit1, setTakeProfit1] = useState("");
  const [takeProfit2, setTakeProfit2] = useState("");
  const [takeProfit3, setTakeProfit3] = useState("");
  const [takeProfit4, setTakeProfit4] = useState("");
  const [takeProfit5, setTakeProfit5] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [entryPrice, stopLoss, takeProfit1, takeProfit2, takeProfit3, takeProfit4, takeProfit5, notes]);

  const orderTypes = ["Active", "Cancelled", "Hit Tp1", "Hit Tp2", "Hit Tp3", "Hit Tp4", "Hit Tp5", "Hit SL"];

  const handleUpdateSignal = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Error", "No authentication token found.");
        setLoading(false);
        return;
      }

      // ✅ Validate Required Fields
      if (!selectedOrderType || !entryPrice || !stopLoss) {
        Alert.alert("Error", "Please fill in all required fields.");
        setLoading(false);
        return;
      }

      // ✅ Convert string values to numbers where necessary
      const updateData = {
        order_status: selectedOrderType,
        price: parseFloat(entryPrice) || 0,
        stop_loss: parseFloat(stopLoss) || 0,
        tp1: parseFloat(takeProfit1) || 0,
        tp2: parseFloat(takeProfit2) || 0,
        tp3: parseFloat(takeProfit3) || 0,
        tp4: parseFloat(takeProfit4) || 0,
        tp5: parseFloat(takeProfit5) || 0,
        chart: "",
        description: notes,
      };

      // ✅ Send API request (Use PATCH if only updating some fields)
      const response = await axios.patch(`${BASE_URL}${ENDPOINT}${signalId}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status) {
        Alert.alert("Success", "Signal updated successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to update the signal.");
      }
    } catch (error) {
      // ✅ Log API response for debugging
      if (error.response) {
        console.error("Error updating signal:", error.response.data);
        Alert.alert("Error", `Failed to update signal: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error("Error updating signal:", error);
        Alert.alert("Error", "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.Layout}>
      <Header />
      <ScrollView
        ref={scrollViewRef}
        style={{ ...styles.container }}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <Text style={styles.text}>Edit Your Signal</Text>

        <Text style={styles.text}>Update Order Status</Text>
        <Picker selectedValue={selectedOrderType} onValueChange={setSelectedOrderType} style={styles.picker}>
          {orderTypes.map((type, index) => (
            <Picker.Item key={index} label={type} value={type} />
          ))}
        </Picker>

        <Text style={styles.text}>Update Entry Price</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Entry Price" 
          keyboardType="numeric"
          value={entryPrice} 
          onChangeText={setEntryPrice} 
        />

        <Text style={styles.text}>Update Stop Loss</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Stop Loss" 
          keyboardType="numeric"
          value={stopLoss} 
          onChangeText={setStopLoss} 
        />

        {["Update Take Profit 1", "Update Take Profit 2", "Update Take Profit 3", "Update Take Profit 4", "Update Take Profit 5"].map((label, index) => (
          <View key={index}>
            <Text style={styles.text}>{label}</Text>
            <TextInput
              style={styles.input}
              placeholder={label}
              keyboardType="numeric"
              value={
                index === 0 ? takeProfit1 :
                index === 1 ? takeProfit2 :
                index === 2 ? takeProfit3 :
                index === 3 ? takeProfit4 :
                takeProfit5
              }
              onChangeText={(value) => {
                switch (index) {
                  case 0:
                    setTakeProfit1(value);
                    break;
                  case 1:
                    setTakeProfit2(value);
                    break;
                  case 2:
                    setTakeProfit3(value);
                    break;
                  case 3:
                    setTakeProfit4(value);
                    break;
                  case 4:
                    setTakeProfit5(value);
                    break;
                  default:
                    break;
                }
              }}
            />
          </View>
        ))}

        <Text style={styles.text}>Update Notes</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Notes" 
          multiline
          value={notes} 
          onChangeText={setNotes} 
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleUpdateSignal}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
