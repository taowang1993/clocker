import FontAwesome from "@expo/vector-icons/FontAwesome";
import { forwardRef } from "react";
import { Button } from "@clockie/ui";

export const HeaderButton = forwardRef<unknown, { onPress?: () => void }>(
  ({ onPress }, ref) => {
    return (
      <Button
        ref={ref as React.Ref<never>}
        onPress={onPress}
        size="$3"
        mr="$2"
        ghost
        theme={undefined}
        icon={<FontAwesome name="info-circle" size={20} color="$color" />}
      />
    );
  },
);
