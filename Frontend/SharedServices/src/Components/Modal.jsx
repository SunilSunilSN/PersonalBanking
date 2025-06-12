import React from "react";
import { Button } from "./Button";
export function Modal({ isOpen, title, children, Btns, closeBtn }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}

        {title && (
          <div class="relative flex items-center justify-between p-4 border-b">
            <h2 class="text-xl font-semibold mx-auto">{title}</h2>
            {closeBtn && (
              <button
                onClick={() =>
                  window.setModalData((prev) => ({ ...prev, isOpen: false }))
                }
                className="absolute right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-4">{children}</div>
        {Btns && Btns.length !== 0 && (
          <div className="flex justify-center gap-4 p-4">
            {Btns.map((btn, idx) => (
              <div>
                {" "}
                <Button
                  variant="secondary"
                  size="login"
                  className="gap-2"
                  onClick={(e) => {
                    window.setModalData((prev) => ({ ...prev, isOpen: false }));
                    btn.function?.();
                  }}
                >
                  {btn.Name}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
