import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide" | "prose" | "full";
  as?: React.ElementType;
}

export function Container({
  size = "default",
  as: Component = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full",
        // Horizontal padding according to Section 5: Mobile 16-20px (px-4/5), Tablet 24-32px (px-6/8), Desktop 32-48px (px-8/12)
        "px-4 sm:px-6 md:px-8 lg:px-12",
        // Container max widths
        size === "default" && "max-w-[1280px]",
        size === "narrow" && "max-w-[1024px]",
        size === "prose" && "max-w-[768px]",
        size === "wide" && "max-w-[1440px]",
        size === "full" && "max-w-none px-0 sm:px-0 md:px-0 lg:px-0",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
