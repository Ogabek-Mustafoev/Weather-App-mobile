import AnimatedLoader from "react-native-animated-loader";
import { StyleSheet, Text } from "react-native";

export const Loader = () => {
  return (
    <AnimatedLoader
      visible={true}
      overlayColor="#fdf6aa"
      source={require("../assets/loader.json")}
      animationStyle={styles.lottie}
      speed={1}
    >
      <Text>Loading...</Text>
    </AnimatedLoader>
  )
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
});