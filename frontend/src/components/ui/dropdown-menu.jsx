import React, { useState } from "react";

export function DropdownMenu({ children }) {
  return <div className="relative">{children}</div>;
}

export function DropdownMenuTrigger({ children, asChild = false }) {
  return asChild ? children : <button>{children}</button>;
}

export function DropdownMenuContent({ children, align = "end" }) {
  return (
    <div
      className={`absolute mt-2 ${align === "end" ? "right-0" : "left-0"} bg-white border rounded shadow-md`}
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ children }) {
  return <div className="px-4 py-2 text-gray-500 text-sm font-bold">{children}</div>;
}

export function DropdownMenuItem({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
    >
      {children}
    </div>
  );
}

export function DropdownMenuCheckboxItem({ children, checked, onCheckedChange }) {
  return (
    <div className="px-4 py-2 flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      {children}
    </div>
  );
}

export function DropdownMenuSeparator() {
  return <div className="border-t border-gray-200" />;
}