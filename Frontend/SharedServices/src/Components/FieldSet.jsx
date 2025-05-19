import React from "react";

export function Field({ children }) {
  return <div className="space-y-2">{children}</div>;
}

export function Label({ children }) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}
export function ErrorMessage({ children }) {
  return (
    <p className="text-sm text-red-600">
      {children}
    </p>
  );
}
