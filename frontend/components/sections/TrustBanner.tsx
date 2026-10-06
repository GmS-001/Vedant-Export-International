import * as React from "react";
import { Container } from "@/components/layout/Container";
import { ShieldCheck, Warehouse, History, Globe2 } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: History,
    title: "20+ Years Heritage",
    subtitle: "Built on family agricultural trading experience in North India",
  },
  {
    icon: Warehouse,
    title: "3 Lakh Packets Cold Storage",
    subtitle: "State-of-the-art climate-controlled facility in Agra, UP",
  },
  {
    icon: ShieldCheck,
    title: "Certified Export Quality",
    subtitle: "APEDA, FSSAI & Export Inspection Council accredited",
  },
  {
    icon: Globe2,
    title: "Global Compliance",
    subtitle: "FOB/CIF shipments tailored to US, EU, AU, and Asian standards",
  },
];

export function TrustBanner() {
  return (
    <div className="w-full border-y border-[#E5E5E5] bg-[#F7F7F5] py-8 sm:py-10">
      <Container size="default">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex items-start gap-3.5 transition-transform duration-200"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[8px] border border-[#E5E5E5] bg-white text-[#315C45] shadow-xs transition-colors group-hover:border-[#315C45]">
                  <Icon className="size-5" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold tracking-tight text-[#111111]">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#666666]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
