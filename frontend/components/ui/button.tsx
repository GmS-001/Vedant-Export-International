import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[8px] text-sm font-medium transition-all duration-200 select-none outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#315C45] focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        // Primary Brand CTA: Solid #315C45 -> hover #234534
        default:
          "bg-[#315C45] text-white hover:bg-[#234534] shadow-sm hover:shadow",
        // Secondary: Transparent, 1px border #D5D5D5, primary text, hover light bg
        secondary:
          "bg-transparent text-[#111111] border border-[#D5D5D5] hover:bg-[#F7F7F5] hover:border-[#BBBBBB]",
        // Outline: subtle neutral border
        outline:
          "border border-[#E5E5E5] bg-white text-[#111111] hover:bg-[#F7F7F5] hover:border-[#D5D5D5]",
        // Ghost: for minimal nav links or icon triggers
        ghost:
          "bg-transparent text-[#111111] hover:bg-[#F7F7F5] hover:text-[#315C45]",
        // White/Inverted: for dark sections (hero/footer/banners)
        inverted:
          "bg-white text-[#111111] hover:bg-[#F7F7F5] shadow-sm font-medium",
        // Subtle Brand Accent: light green background with dark green text
        accent:
          "bg-[#EAF1EC] text-[#234534] hover:bg-[#DCE7E0] border border-[#D6E3DA]",
        // Link style
        link: "text-[#315C45] underline-offset-4 hover:underline p-0 h-auto font-normal",
        destructive: "bg-[#D32F2F] text-white hover:bg-[#B71C1C] shadow-sm",
      },
      size: {
        // Design system standard: 44-48px height, 20-24px padding
        default: "h-11 px-5 py-2.5 text-sm gap-2",
        sm: "h-9 px-3.5 py-1.5 text-xs gap-1.5 rounded-[6px]",
        lg: "h-12 px-6 py-3 text-base gap-2.5 rounded-[8px]",
        icon: "size-10 p-0 rounded-[8px]",
        "icon-sm": "size-8 p-0 rounded-[6px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
