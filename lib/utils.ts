import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Shift an array item to the left
export function shiftLeft(arr: Array<any>, index: number) {
  if (index > 0 && index < arr.length) {
    const item = arr.splice(index, 1)[0];
    arr.splice(index - 1, 0, item);
  }
  return arr;
}

// Shift an array item to the right
export function shiftRight(arr: Array<any>, index: number) {
  if (index >= 0 && index < arr.length - 1) {
    const item = arr.splice(index, 1)[0];
    arr.splice(index + 1, 0, item);
  }
  return arr;
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}
