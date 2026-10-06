import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "hero" | "large" | "normal" | "small" | "none";
  background?: "white" | "light" | "accent" | "dark";
  border?: "top" | "bottom" | "both" | "none";
  as?: "section" | "div" | "article" | "aside";
}

export function Section({
  spacing = "normal",
  background = "white",
  border = "none",
  as: Component = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        "relative w-full overflow-hidden transition-colors",
        // Spacing according to Section 4
        spacing === "hero" && "py-16 sm:py-20 md:py-28 lg:py-36",
        spacing === "large" && "py-16 md:py-24 lg:py-28",
        spacing === "normal" && "py-12 md:py-16 lg:py-20",
        spacing === "small" && "py-8 md:py-12 lg:py-16",
        spacing === "none" && "py-0",
        // Background palette according to Section 3
        background === "white" && "bg-white text-[#111111]",
        background === "light" && "bg-[#F7F7F5] text-[#111111]",
        background === "accent" && "bg-[#EAF1EC] text-[#234534]",
        background === "dark" && "bg-[#111814] text-white",
        // Border options
        border === "top" && "border-t border-[#E5E5E5]",
        border === "bottom" && "border-b border-[#E5E5E5]",
        border === "both" && "border-y border-[#E5E5E5]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
