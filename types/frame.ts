export interface FrameData {
  image: File;
  buttons: ButtonData[];
}

export enum ButtonType {
  Add = "add",
  NextFrame = "next-frame",
  PreviousFrame = "previous-frame",
  Mint = "mint",
  Link = "link",
}

export interface ButtonData {
  label: string;
  type: ButtonType;
  target?: string;
}