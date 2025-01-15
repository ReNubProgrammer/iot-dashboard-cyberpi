import React from "react";
import { cn } from "../../lib/utils.js";

export const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
        className
      )}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";