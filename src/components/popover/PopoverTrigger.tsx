import { PopoverContext } from "@/store/popover.context";
import { useContext, useRef } from "react";
import { Pressable, PressableProps, View } from "react-native";

export function PopoverTrigger({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: PressableProps["style"];
}) {
  const context = useContext(PopoverContext)!;
  const triggerRef = useRef<View>(null);

  const handlePress = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      context.setAnchor({
        x,
        y,
        width,
        height,
      });

      context.setOpen(true);
    });
  };
  return (
    <Pressable style={style} ref={triggerRef} onPress={handlePress}>
      {children}
    </Pressable>
  );
}
