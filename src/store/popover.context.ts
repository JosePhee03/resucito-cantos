import { createContext } from "react";

type PopoverContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  anchor: AnchorRect | null;
  setAnchor: (rect: AnchorRect) => void;
};

export type AnchorRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const PopoverContext = createContext<PopoverContextValue | null>(null);
