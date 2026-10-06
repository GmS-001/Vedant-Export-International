import * as React from "react";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  action?: React.ReactNode;
  inverted?: boolean;
}

export function SectionHeader({
  kicker,
  title,
  description,
  align = "left",
  action,
  inverted = false,
  className,
  ...props
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCentered
          ? "mx-auto items-center text-center"
          : "items-start text-left",
        action && !isCentered
          ? "md:flex-row md:items-end md:justify-between"
          : "",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex flex-col gap-2.5",
          isCentered ? "max-w-3xl" : "max-w-2xl"
        )}
      >
        {kicker && (
          <span
            className={cn(
              "text-xs font-semibold tracking-[0.12em] uppercase",
              inverted ? "text-[#8CD0A4]" : "text-[#315C45]"
            )}
          >
            {kicker}
          </span>
        )}

        <Heading
          level="h2"
          color={inverted ? "inverted" : "default"}
          className="text-2xl sm:text-3xl md:text-4xl"
        >
          {title}
        </Heading>

        {description && (
          <Text
            variant="lead"
            color={inverted ? "inverted-muted" : "secondary"}
            className={cn(
              "mt-1 text-base leading-relaxed sm:text-lg",
              isCentered && "mx-auto"
            )}
          >
            {description}
          </Text>
        )}
      </div>

      {action && <div className="mt-4 shrink-0 md:mt-0">{action}</div>}
    </div>
  );
}
