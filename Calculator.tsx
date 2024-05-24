import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const Calculator = () => {
  const [equation, setEquation] = useState("");
  const [previewResult, setPreviewResult] = useState("");

  /**
   * Button press handler
   * @param input button pressed value
   */
  const handleButtonPress = (input: string) => {
    //   Clears the last input if value is C
    if (input === "C") {
      setEquation(equation.slice(0, -1));
    } else if (input === "AC") {
      // Reset calculations
      setEquation("");
      setPreviewResult("");
    } else if (input === "=") {
      try {
        //   Uses the eval function to process the equation
        const result = eval(equation);
        setEquation(result.toString());
        setPreviewResult("");
      } catch (error) {
        setPreviewResult("Error");
      }
    } else {
      const newEquation = equation + input;
      setEquation(newEquation);
      try {
        const result = eval(newEquation);
        setPreviewResult(result.toString());
      } catch (error) {
        setPreviewResult("Error");
      }
    }
  };

  /**
   * Creates a button
   * @param label Text to display
   * @param style Custom styles DEFAULT styles.button
   * @returns Button
   */
  const renderButton = (label: string, style: any = styles.button) => (
    <TouchableOpacity
      key={label}
      style={style}
      onPress={() => handleButtonPress(label)}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
  // Button Grid
  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.equationText}>{equation}</Text>
        <Text style={styles.previewText}>{previewResult}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          {renderButton("AC", styles.specialButton)}
          {renderButton("C", styles.specialButton)}
        </View>
        {buttons.map((row) => (
          <View style={styles.row}>
            {row.map((label) => renderButton(label))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
  },
  displayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  equationText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  previewText: {
    fontSize: 24,
    color: "#888",
  },
  buttonContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    rowGap: 5,
  },
  button: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
    margin: 5,
  },
  specialButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "orange",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
