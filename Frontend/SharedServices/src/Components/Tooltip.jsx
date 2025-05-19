import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import clsx from "clsx";
import PropTypes from "prop-types";

export function Tooltip(
  align = "center",
  defaultOpen,
  content,
  children,
  open,
  onOpenChange,
  side = "top"
) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            align={align}
            side={side}
            sideOffset={4}
            className={clsx(
              "radix-side-top:cui-animate-slide-down-fade",
              "radix-side-right:cui-animate-slide-left-fade",
              "radix-side-bottom:cui-animate-slide-up-fade",
              "radix-side-left:cui-animate-slide-right-fade",
              "cui-inline-flex cui-items-center cui-rounded-md cui-px-4 cui-py-2.5",
              "cui-bg-primary-subtle",
              "cui-max-w-xs"
            )}
          >
            <TooltipPrimitive.Arrow className="cui-fill-current cui-text-primary-subtle" />
            <span className="cui-block cui-text-xs cui-leading-none cui-text-foreground">
              {content}
            </span>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

Tooltip.propTypes = {
  align: PropTypes.oneOf(["start", "center", "end"]),
  defaultOpen: PropTypes.bool,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  side: PropTypes.oneOf(["top", "right", "bottom", "left"]),
};

export default Tooltip;
