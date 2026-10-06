import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1 text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        // Subtle Brand Green: for certifications, highlights, verified status
        default: "bg-[#EAF1EC] text-[#234534] border border-[#D3E2D8]",
        // Solid Brand Green
        primary: "bg-[#315C45] text-white",
        // Neutral clean outline: for category tags, specifications
        outline: "bg-white text-[#111111] border border-[#E5E5E5]",
        // Subtle gray
        secondary: "bg-[#F7F7F5] text-[#666666] border border-[#EBEBEA]",
        // Highlight / Dark
        dark: "bg-[#111814] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
