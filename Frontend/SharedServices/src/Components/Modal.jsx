import React from "react";

export function Modal({ isOpen, title, children, Btns, closeBtn }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        
          {title && (
            <div className="flex items-center p-4 border-b justify-center">
              <h2 className="text-xl font-semibold ">{title}</h2>
              {closeBtn && <button
                onClick={() =>
                  window.setModalData((prev) => ({ ...prev, isOpen: false }))
                }
                className="text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                ×
              </button>}
            </div>
          )}
        

        {/* Body */}
        <div className="p-4">{children}</div>
        {Btns && (
          <div className="flex justify-end gap-2">
            {Btns.map((btn, idx) => (
              <button
                onClick={() => {
                  window.setModalData((prev) => ({ ...prev, isOpen: false }));
                  btn.function?.();
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                {btn.Name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
