import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors.js";

const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        padding: insets.top,
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;
