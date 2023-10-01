import { cn } from "../lib/cls.js";

export function Button(props) {
  return (
    <button
      {...props}
      className={cn(
        "border border-gray-300 text-sm px-3 py-1 rounded-md bg-gradient-to-t from-gray-50 to-white font-medium",
        "dark:from-gray-900 dark:to-gray-800 dark:border-gray-700",
        "active:bg-gradient-to-b active:from-gray-100 active:to-white",
        props.className,
      )}
    >
      {props.children}
    </button>
  );
}
