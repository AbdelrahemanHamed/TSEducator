import React, { useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "./AutoCompeletStyle"; // Import styles

const AutoCompletePair = ({ onSelect }) => {
  const tradingPairs = [
    { label: "AUDUSD", name: "AUDUSD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "AUDUSD", name: "AUDUSD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "AUDCAD", name: "AUDCAD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "AUDJPY", name: "AUDJPY", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "AUDCHF", name: "AUDCHF", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "AUDNZD", name: "AUDNZD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "EURUSD", name: "EURUSD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "EURJPY", name: "EURJPY", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "EURAUD", name: "EURAUD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "EURGBP", name: "EURGBP", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "EURCAD", name: "EURCAD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "EURNZD", name: "EURNZD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "EURCHF", name: "EURCHF", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "USDJPY", name: "USDJPY", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "USDCAD", name: "USDCAD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "USDCHF", name: "USDCHF", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "CADJPY", name: "CADJPY", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "CADCHF", name: "CADCHF", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "GBPUSD", name: "GBPUSD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "GBPJPY", name: "GBPJPY", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "GBPCAD", name: "GBPCAD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "GBPAUD", name: "GBPAUD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "GBPCHF", name: "GBPCHF", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "GBPNZD", name: "GBPNZD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "CHFJPY", name: "CHFJPY", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "NZDUSD", name: "NZDUSD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "NZDCAD", name: "NZDCAD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "NZDJPY", name: "NZDJPY", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "NZDCHF", name: "NZDCHF", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "XAUUSD", name: "XAUUSD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "XAGUSD", name: "XAGUSD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "NASDAQ", name: "NAS100USD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "US30", name: "US30USD", Broker: "OANDA", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "WTI", name: "WTI", Broker: "BLACKBULL", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "SPX500", name: "SPX500", Broker: "FOREXCOM", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "UK100", name: "UK100", Broker: "ICMARKETS", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "GER40", name: "GER40", Broker: "THINKMARKETS", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "FRA40", name: "FRA40", Broker: "FOREXCOM", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "BTCUSD", name: "BTCUSD", Broker: "BINANCE", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "ETHUSD", name: "ETHUSD", Broker: "BINANCE", img: require("../../assets/Pairs/AUDUSD.png") },
    { label: "XRPUSD", name: "XRPUSD", Broker: "BINANCE", img: require("../../assets/Pairs/AUDUSD.png") },
  ];

  const [query, setQuery] = useState("");
  const [filteredPairs, setFilteredPairs] = useState([]);

  // Search & Filter Function
  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 0) {
      const filtered = tradingPairs.filter((pair) =>
        pair.label.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPairs(filtered);
    } else {
      setFilteredPairs([]);
    }
  };

  return (
    <View>
      {/* Search Input Box */}
      <TextInput
        style={styles.input}
        placeholder="Search Trading Pair"
        placeholderTextColor="#ccc"
        value={query}
        onChangeText={handleSearch}
      />

      {/* Filtered Results List */}
      {filteredPairs.length > 0 && (
        <FlatList
          data={filteredPairs}
          keyExtractor={(item) => item.label}
          style={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                onSelect(item.label); // Pass only the label as a string
                setQuery(item.label); // Set selected pair
                setFilteredPairs([]); // Hide list
              }}
            >
              <Image source={item.img} style={styles.pairImage} />
              <Text style={styles.pairText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default AutoCompletePair;
