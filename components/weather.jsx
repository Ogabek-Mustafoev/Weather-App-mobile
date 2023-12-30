import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { weatherOptions } from "../constants";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

export const Weather = ({ temp, name, condition, setWeatherByLocation }) => {
  const [query, setQuery] = useState("");

  return (
    <LinearGradient
      style={styles.mainContainer}
      colors={weatherOptions[condition]?.gradient || ["#808080", "#d3d3d3"]}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <MaterialCommunityIcons
          color="#fff"
          size={96}
          name={weatherOptions[condition]?.iconName}
        />
        <View style={styles.flex}>
          <Text style={styles.temp}>{temp}°C </Text>
          <Text style={styles.temp}>| {name}</Text>
        </View>
      </View>
      <View style={{ ...styles.container, ...styles.textContainer }}>
        <Text style={styles.title}>{weatherOptions[condition]?.title}</Text>
        <Text style={styles.description}>
          {weatherOptions[condition]?.description}
        </Text>
        <View style={styles.searchContainer}>
          <TextInput
            value={query}
            onChangeText={(text) => setQuery(text.trim())}
            placeholder="Enter your city..."
            style={styles.searchInput}
          />
          <Button
            title="Search"
            style={styles.searchBtn}
            onPress={() => setWeatherByLocation(query)}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    fontSize: 42,
    color: "white",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 10,
    textAlign: "left",
  },
  description: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  searchContainer: {
    backgroundColor: "#e8e8e8e8",
    width: "100%",
    padding: 10,
    marginTop: 10,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 7,
  },
  searchInput: {
    width: "70%",
  },
  searchBtn: {
    width: "30%",
  },
});
