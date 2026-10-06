import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[120px] w-full rounded-[8px] border border-[#DADADA] bg-white p-3.5 text-base leading-relaxed text-[#111111] transition-colors outline-none placeholder:text-[#888888] md:text-sm",
        "focus-visible:border-[#315C45] focus-visible:ring-2 focus-visible:ring-[#315C45]/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F7F7F5] disabled:text-[#888888]",
        "aria-invalid:border-[#D32F2F] aria-invalid:ring-2 aria-invalid:ring-[#D32F2F]/20",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
