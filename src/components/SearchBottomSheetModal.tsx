import { colors, CONSTANT, radius } from "@/themes";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ReactNode, Ref, useCallback, useMemo, useRef } from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

type SearchBottomSheetPros = {
  bottomSheetRef: Ref<BottomSheetModal>;
  children: ReactNode;
};

export default function SearchBottomSheetModal({
  bottomSheetRef,
  children,
}: SearchBottomSheetPros) {
  const { top } = useSafeAreaInsets();
  const topRef = useRef(top);

  const snapPoints = useMemo(() => ["100%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} opacity={0.2} />
    ),
    [],
  );

  return (
    <BottomSheetModal
      topInset={topRef.current}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      handleIndicatorStyle={{
        backgroundColor: colors.foregroundSecondary,
        width: CONSTANT.BUTTON,
      }}
      handleStyle={{
        backgroundColor: colors.background,
        borderRadius: radius.lg,
      }}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView
        style={{
          height: "100%",
          backgroundColor: colors.background,
        }}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}
