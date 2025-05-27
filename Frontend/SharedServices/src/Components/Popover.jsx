// shared-services/usePopover.js
import React, { useState, useRef, useEffect } from "react";

export function Popover() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef();

  const showPopover = (target, message) => {
    let rect;
    if (target.currentTarget) {
      rect = target.currentTarget.getBoundingClientRect();
    } else {
      rect = target.getBoundingClientRect();
    }
    setPosition({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
    });
    setContent(message);
    setIsOpen(true);
  };

  const hidePopover = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const PopoverUI = () =>
    isOpen ? (
      <div
        ref={popoverRef}
        className="absolute bg-white border border-gray-300 shadow-lg rounded p-3 text-sm z-50"
        style={{ top: position.top, left: position.left }}
      >
        {content}
      </div>
    ) : null;

  return { PopoverUI, showPopover, hidePopover };
}
