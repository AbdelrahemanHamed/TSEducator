import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./HomeStyle";
import Header from "../Components/header/Header";
import AutoCompletePair from "../Components/AutoCompelet/AutoCompelet";

const BASE_URL = "https://laravelapi.tradingsociety.net/api/v1";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedPair, setSelectedPair] = useState(""); 
  const [selectedOrderType, setSelectedOrderType] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit1, setTakeProfit1] = useState("");
  const [takeProfit2, setTakeProfit2] = useState("");
  const [takeProfit3, setTakeProfit3] = useState("");
  const [takeProfit4, setTakeProfit4] = useState("");
  const [takeProfit5, setTakeProfit5] = useState("");
  const [notes, setNotes] = useState("");
  const [chartImage, setChartImage] = useState(null);

  const orderTypes = ["Market Execution", "Pending Order"];
  const MarketExecution = ["Market Execution Buy", "Market Execution Sell"];
  const PendingOrder = ["Buy Limit", "Sell Limit", "Buy Stop", "Sell Stop"];

  // Update options when order type changes
  const getOptions = () => {
    return selectedOrderType === "Market Execution"
      ? MarketExecution
      : selectedOrderType === "Pending Order"
      ? PendingOrder
      : [];
  };

  // Handle Order Type Selection
  const handleOrderTypeChange = (value) => {
    setSelectedOrderType(value);
    setSelectedAction(""); // Reset action when order type changes
  };

  // Pick Image from Gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setChartImage(result.assets[0].uri);
    }
  };

  // Submit Order to API
  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Error", "No authentication token found. Please log in.");
        return;
      }

      const formData = new FormData();
      formData.append("order_status", "active");
      formData.append("pair", selectedPair.toString());
      formData.append("price", entryPrice);
      formData.append("order_type", selectedAction); // ✅ Send selected action
      formData.append("sl", stopLoss);
      formData.append("tp1", takeProfit1);
      formData.append("tp2", takeProfit2);
      formData.append("tp3", takeProfit3);
      formData.append("tp4", takeProfit4);
      formData.append("tp5", takeProfit5);
      formData.append("description", notes);

      // Append Image File if Selected
      if (chartImage) {
        const uriParts = chartImage.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("chart", {
          uri: chartImage,
          name: `chart.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await axios.post(`${BASE_URL}/instructor/app/signls`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response.data);

      if (response.status === 200) {
        Alert.alert("Success", "Signal Submitted Successfully!");
      } else {
        Alert.alert("Error", "Something went wrong.");
      }
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      Alert.alert("Error", "Failed to submit signal.");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <View style={styles.Layout}>
        <Header onLogout={() => Alert.alert("Logout", "You have successfully logged out.")} />
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
          <Text style={styles.text}>Select Trading Pair</Text>
          <AutoCompletePair onSelect={setSelectedPair} />

          <Text style={styles.text}>Select Order Type</Text>
          <Picker
            selectedValue={selectedOrderType} // ✅ Now properly updates
            onValueChange={handleOrderTypeChange} // ✅ Updates action on change
            style={styles.picker}
          >
            <Picker.Item label="Select Order Type" value="" />
            {orderTypes.map((type, index) => (
              <Picker.Item key={index} label={type} value={type} />
            ))}
          </Picker>

          <Text style={styles.text}>Select Action</Text>
          <Picker
            selectedValue={selectedAction} 
            onValueChange={setSelectedAction}
            style={styles.picker}
            enabled={selectedOrderType !== ""} // ✅ Disabled until order type is selected
          >
            <Picker.Item label="Select Action" value="" />
            {getOptions().map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>

          <Text style={styles.text}>Entry Price</Text>
          <TextInput style={styles.input} placeholder="Entry Price" value={entryPrice} onChangeText={setEntryPrice} />

          <Text style={styles.text}>Stop Loss</Text>
          <TextInput style={styles.input} placeholder="Stop Loss" value={stopLoss} onChangeText={setStopLoss} />

          <Text style={styles.text}>Take Profit 1</Text>
          <TextInput style={styles.input} placeholder="Take Profit 1" value={takeProfit1} onChangeText={setTakeProfit1} />
         
          <Text style={styles.text}>Take Profit 2</Text>
          <TextInput style={styles.input} placeholder="Take Profit 2" value={takeProfit2} onChangeText={setTakeProfit2} />

          <Text style={styles.text}>Take Profit 3</Text>
          <TextInput style={styles.input} placeholder="Take Profit 3" value={takeProfit3} onChangeText={setTakeProfit3} />

          <Text style={styles.text}>Take Profit 4</Text>
          <TextInput style={styles.input} placeholder="Take Profit 4" value={takeProfit4} onChangeText={setTakeProfit4} />

          <Text style={styles.text}>Take Profit 5</Text>
          <TextInput style={styles.input} placeholder="Take Profit 5" value={takeProfit5} onChangeText={setTakeProfit5} />

          <Text style={styles.text}>Notes</Text>
          <TextInput style={styles.input} placeholder="Notes" value={notes} onChangeText={setNotes} />

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Upload Chart</Text>
          </TouchableOpacity>

          {chartImage && <Image source={{ uri: chartImage }} style={{ width: 100, height: 100, marginTop: 10 }} />}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
