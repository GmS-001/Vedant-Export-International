import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-[8px] border border-[#DADADA] bg-white px-4 py-3 text-base text-[#111111] transition-colors outline-none placeholder:text-[#888888] md:text-sm",
        "focus-visible:border-[#315C45] focus-visible:ring-2 focus-visible:ring-[#315C45]/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F7F7F5] disabled:text-[#888888]",
        "aria-invalid:border-[#D32F2F] aria-invalid:ring-2 aria-invalid:ring-[#D32F2F]/20",
        className
      )}
      {...props}
    />
  );
}

export { Input };
