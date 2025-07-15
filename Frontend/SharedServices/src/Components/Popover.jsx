// shared-services/usePopover.js
import React, { useState, useRef, useEffect } from "react";

export function Popover() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef();

  const showPopover = (target, message, posit) => {
    let rect;
    if (target.currentTarget) {
      rect = target.currentTarget.getBoundingClientRect();
    } else {
      rect = target.getBoundingClientRect();
    }
    setContent(message);
    setIsOpen(true);
    setTimeout(() => {
    const popoverWidth = popoverRef.current?.offsetWidth || 0; 
    const positionsMap = {
      bottom: {
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      },
      top: {
        top: rect.top + window.scrollY - 8, // above the element
        left: rect.left + window.scrollX,
      },
      left: {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX - popoverWidth - 8, // to the left of the element
      },
      right: {
        top: rect.top + window.scrollY,
        left: rect.right + window.scrollX + 8, // to the right of the element
      },
      
    };

    if (positionsMap[posit]) {
      setPosition(positionsMap[posit]);
    }
    //   setContent(message);
    // setIsOpen(true);  
  }, 0);
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
        style={{ top: position.top, left: position.left, position: "absolute" }}
      >
        {content}
      </div>
    ) : null;

  return { PopoverUI, showPopover, hidePopover };
}
