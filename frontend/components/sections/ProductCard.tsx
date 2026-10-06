import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface ProductCardProps {
  title: string;
  slug: string;
  category: string;
  description: string;
  specs?: Array<{ label: string; value: string }>;
  badge?: string;
  imageUrl?: string;
}

export function ProductCard({
  title,
  slug,
  category,
  description,
  specs = [],
  badge,
  imageUrl,
}: ProductCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-[12px] border border-[#E5E5E5] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D0D0D0] hover:shadow-sm">
      {/* Product Image Area with Editorial Aspect Ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[#EFEFEF] bg-[#F7F7F5]">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-103"
            loading="lazy"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center bg-[#F4F6F4] p-6 text-center">
            <span className="mb-1 text-3xl font-light text-[#315C45]">VEI</span>
            <span className="text-xs font-medium tracking-wider text-[#666666] uppercase">
              {category}
            </span>
          </div>
        )}

        {badge && (
          <div className="absolute top-3 left-3">
            <Badge variant="default" className="shadow-xs backdrop-blur-xs">
              {badge}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-semibold tracking-wider text-[#315C45] uppercase">
            {category}
          </span>

          <h3 className="text-lg font-semibold tracking-tight text-[#111111] transition-colors group-hover:text-[#315C45]">
            <Link href={`/products/${slug}`}>{title}</Link>
          </h3>

          <p className="line-clamp-2 text-sm leading-relaxed text-[#666666]">
            {description}
          </p>

          {/* Key Specifications Table/List */}
          {specs.length > 0 && (
            <div className="my-3 flex flex-col gap-1.5 border-y border-[#F0F0F0] py-3 text-xs">
              {specs.slice(0, 3).map((spec, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="font-normal text-[#888888]">
                    {spec.label}
                  </span>
                  <span className="font-medium text-[#111111]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Row */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <Button asChild size="sm" variant="default" className="flex-1">
            <Link href={`/request-a-quote?product=${slug}`}>Request Quote</Link>
          </Button>

          <Button asChild size="sm" variant="outline" className="px-3">
            <Link
              href={`/products/${slug}`}
              aria-label={`View details for ${title}`}
            >
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
