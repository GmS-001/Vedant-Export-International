import * as React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
}

export function FormField({
  label,
  htmlFor,
  required,
  error,
  hint,
  className,
  children,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="flex items-center gap-1 text-sm font-medium text-[#111111]"
        >
          {label}
          {required && (
            <span className="font-semibold text-[#315C45]" title="Required">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-xs leading-normal text-[#888888]">{hint}</p>
      )}
      {error && (
        <p
          className="text-xs leading-normal font-medium text-[#D32F2F]"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
