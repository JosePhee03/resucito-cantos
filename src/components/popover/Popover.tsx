import { AnchorRect, PopoverContext } from "@/store/popover.context";
import { useState } from "react";

export function Popover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);
  return (
    <PopoverContext.Provider
      value={{
        open,
        setOpen,
        anchor,
        setAnchor,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}
