import PersistentFile from "formidable/PersistentFile";

export interface FrameData {
  image: PersistentFile;
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