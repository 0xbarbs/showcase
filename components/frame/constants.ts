import { ButtonType } from "@/types/frame";

export const Buttons = [
  {
    type: ButtonType.Mint,
    label: "Mint",
  },
  {
    type: ButtonType.Link,
    label: "Link",
  },
  {
    type: ButtonType.NextFrame,
    label: "Next frame",
  },
  {
    type: ButtonType.PreviousFrame,
    label: "Previous frame",
  },
];

export const TargetButtons = [
  ButtonType.Mint,
  ButtonType.Link,
];

export const UniqueButtons = [
  ButtonType.NextFrame,
  ButtonType.PreviousFrame,
];