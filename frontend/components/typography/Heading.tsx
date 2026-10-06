import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-semibold text-[#111111] transition-colors", {
  variants: {
    level: {
      display:
        "text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.08]",
      h1: "text-3xl sm:text-4xl md:text-5xl lg:text-[56px] tracking-[-0.025em] leading-[1.12]",
      h2: "text-2xl sm:text-3xl md:text-4xl lg:text-[40px] tracking-[-0.02em] leading-[1.2]",
      h3: "text-xl sm:text-2xl md:text-[26px] tracking-[-0.015em] leading-[1.3]",
      h4: "text-lg sm:text-xl md:text-[22px] tracking-[-0.01em] leading-[1.35]",
    },
    color: {
      default: "text-[#111111]",
      secondary: "text-[#666666]",
      muted: "text-[#888888]",
      inverted: "text-white",
      brand: "text-[#315C45]",
    },
  },
  defaultVariants: {
    level: "h2",
    color: "default",
  },
});

export interface HeadingProps
  extends
    Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

export function Heading({
  as,
  level = "h2",
  color = "default",
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag =
    as || (level === "display" ? "h1" : (level as "h1" | "h2" | "h3" | "h4"));

  return (
    <Tag
      className={cn(headingVariants({ level, color }), className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
