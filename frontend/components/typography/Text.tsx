import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("leading-relaxed transition-colors", {
  variants: {
    variant: {
      lead: "text-lg md:text-[18px] leading-[1.65] font-normal",
      default: "text-base leading-[1.6] font-normal",
      small: "text-sm leading-[1.5] font-normal",
      caption: "text-xs leading-[1.4] font-normal",
    },
    color: {
      primary: "text-[#111111]",
      secondary: "text-[#666666]",
      muted: "text-[#888888]",
      inverted: "text-white",
      "inverted-muted": "text-[#A0A0A0]",
      brand: "text-[#315C45]",
      "brand-dark": "text-[#234534]",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "secondary",
    weight: "normal",
  },
});

export interface TextProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

export function Text({
  as: Component = "p",
  variant = "default",
  color = "secondary",
  weight = "normal",
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ variant, color, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
