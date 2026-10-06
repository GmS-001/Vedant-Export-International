import * as React from "react";
import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  badge?: string;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  linkText,
  linkHref,
  badge,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between rounded-[12px] border border-[#E5E5E5] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D0D0D0] hover:shadow-xs sm:p-7",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex size-11 items-center justify-center rounded-[8px] bg-[#EAF1EC] text-[#234534] transition-colors group-hover:bg-[#315C45] group-hover:text-white">
            <Icon className="size-5" />
          </div>
          {badge && (
            <span className="rounded-[4px] bg-[#EAF1EC] px-2 py-0.5 text-[11px] font-semibold tracking-wider text-[#315C45] uppercase">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-[#111111]">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-[#666666]">{description}</p>
      </div>

      {linkHref && linkText && (
        <div className="mt-4 border-t border-[#F0F0F0] pt-5">
          <Link
            href={linkHref}
            className="group/link inline-flex items-center text-xs font-semibold text-[#315C45] hover:text-[#234534]"
          >
            <span>{linkText}</span>
            <ArrowRight className="ml-1 size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
