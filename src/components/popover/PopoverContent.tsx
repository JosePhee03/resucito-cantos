import { AnchorRect, PopoverContext } from "@/store/popover.context";
import { useContext, useState } from "react";
import { Portal } from "@gorhom/portal";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { colors, radius } from "@/themes";

type Size = {
  width: number;
  height: number;
};

export default function PopoverContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contentSize, setContentSize] = useState<Size | null>(null);
  const { width, height } = useWindowDimensions();
  const context = useContext(PopoverContext)!;
  const anchor = context.anchor;

  if (!context.open || !anchor) {
    return null;
  }

  const position = contentSize
    ? calculatePosition(
        anchor,
        contentSize.width,
        contentSize.height,
        width,
        height,
      )
    : {
        top: anchor.y,
        left: anchor.x,
      };

  const handleClose = () => {
    context.setOpen(false);
  };

  return (
    <Portal>
      <View style={StyleSheet.absoluteFill}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />

        <Animated.View
          entering={FadeIn.duration(120)}
          exiting={FadeOut.duration(120)}
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;

            setContentSize((prev) => {
              if (prev?.width === width && prev?.height === height) {
                return prev;
              }

              return { width, height };
            });
          }}
          style={[
            styles.content,
            {
              top: position.top,
              left: position.left,
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: "hidden",
    elevation: 2,
  },
});

function calculatePosition(
  anchor: AnchorRect,
  contentWidth: number,
  contentHeight: number,
  screenWidth: number,
  screenHeight: number,
) {
  const spaceBottom = screenHeight - (anchor.y + anchor.height);

  const placement = spaceBottom >= contentHeight ? "bottom" : "top";

  const top =
    placement === "bottom"
      ? anchor.y + anchor.height
      : anchor.y - contentHeight - 8;

  let left = anchor.x + anchor.width / 2 - contentWidth / 2;

  left = Math.max(8, left);

  left = Math.min(left, screenWidth - contentWidth - 8);

  return {
    top,
    left,
    placement,
  };
}
