import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
const cn = (...classes) => classes.filter(Boolean).join(" ");

export function Alert({ open, onClose, children }) {
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-zinc-900 relative"
        >
          <button
            onClick={() => onClose(false)}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          {children}
        </div>
      </div>
    </Dialog>
  );
}

export function AlertTitle({ children, className }) {
  return (
    <h2
      id="dialog-title"
      className={cn(
        "text-lg font-semibold text-zinc-900 dark:text-white",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function AlertDescription({ children, className }) {
  return (
    <div
      className={cn("mt-2 text-sm text-zinc-600 dark:text-zinc-300", className)}
    >
      {children}
    </div>
  );
}

export function AlertActions({ children, className }) {
  return (
    <div className={cn("mt-4 flex justify-end gap-2", className)}>
      {children}
    </div>
  );
}
