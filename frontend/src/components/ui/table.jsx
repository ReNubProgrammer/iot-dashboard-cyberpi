import React from "react";

export function Table({ children }) {
  return <table className="w-full border-collapse">{children}</table>;
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children, className, ...props }) {
  return (
    <tr className={`border-b ${className}`} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ children }) {
  return (
    <th className="px-4 py-2 text-left text-gray-600 text-sm font-medium">
      {children}
    </th>
  );
}

export function TableCell({ children }) {
  return <td className="px-4 py-2">{children}</td>;
}