import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names or class name objects into a single class name string.
 * Utilizes clsx for conditional class names and tailwind-merge for Tailwind CSS optimization.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
