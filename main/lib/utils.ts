import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const enumFromArray = <T extends string>(
  strArray: T[]
): readonly T[] => {
  return strArray as readonly T[];
};
