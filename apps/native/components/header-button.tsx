import FontAwesome from "@expo/vector-icons/FontAwesome";
import { forwardRef } from "react";
import { type View } from "react-native";
import { Button } from "tamagui";

export const HeaderButton = forwardRef<View, { onPress?: () => void }>(({ onPress }, ref) => {
  return (
    <Button
      ref={ref}
      onPress={onPress}
      size="$3"
      mr="$2"
      chromeless
      icon={<FontAwesome name="info-circle" size={20} color="$color" />}
    />
  );
});
