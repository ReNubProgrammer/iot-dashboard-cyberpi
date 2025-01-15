import React from "react";

export function Input({ className, ...props }) {
  return (
    <input
      className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none ${className}`}
      {...props}
    />
  );
}