import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/typography/SectionHeader";
import { Building2, Cpu, Scale, CheckCircle2 } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  profession: string;
  professionIcon: React.ComponentType<{ className?: string }>;
  tag: string;
  description: string;
  image: string;
  highlights: string[];
}

export const LEADERSHIP_TEAM: TeamMember[] = [
  {
    name: "Er. Man Singh Deshwar",
    role: "Proprietor & Cold Storage Owner",
    profession: "Civil Engineer by Profession",
    professionIcon: Building2,
    tag: "Executive Leadership & Infrastructure",
    description:
      "Proprietor of Vedant Exports International and owner of our large-scale cold storage facility in Agra. Brings civil engineering precision to post-harvest climate-controlled storage, facility longevity, and commodity preservation.",
    image: "/team/man-singh-deshwar.jpg",
    highlights: [
      "Owner, 3 Lakh Packets Cold Storage (Agra)",
      "20+ Years Agricultural Trading Heritage",
      "Civil Infrastructure & Facility Engineering",
    ],
  },
  {
    name: "Garvit Man Singh",
    role: "Procurement Head",
    profession: "AI / Data Science Engineer by Profession",
    professionIcon: Cpu,
    tag: "Procurement & Supply Chain Tech",
    description:
      "Directs farm-gate procurement networks and supplier clusters across North India. Combines direct agricultural roots with an AI and Data Science engineering background to drive data-backed quality control and export supply efficiency.",
    image: "/team/garvit-man-singh.jpg",
    highlights: [
      "Direct Farm-Gate Sourcing Operations",
      "Data-Driven Grading & Yield Analytics",
      "Tech-Enabled Multi-Region Supply Chain",
    ],
  },
  {
    name: "Advocate Kanwaljeet Singh",
    role: "Relationship & Logistics Manager",
    profession: "Advocate by Profession in India",
    professionIcon: Scale,
    tag: "Global Relations & Compliance",
    description:
      "Oversees international client partnerships, multi-modal container logistics, and statutory trade documentation. A practicing advocate in India, ensuring strict legal compliance with APEDA, FSSAI, customs, and global trade treaties.",
    image: "/team/kanwaljeet-singh.jpg",
    highlights: [
      "International Trade Law & Documentation",
      "Port Logistics & Reefer Container Freight",
      "Institutional Buyer Relationship Management",
    ],
  },
];

export function LeadershipSection() {
  return (
    <Section spacing="large" background="white" border="top" id="leadership">
      <Container size="default">
        <SectionHeader
          align="center"
          kicker="Core Leadership & Governance"
          title="The Leadership Behind Our Export Operations"
          description="Combining multi-generational agricultural trade heritage with civil engineering precision, data-driven procurement, and legal compliance."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {LEADERSHIP_TEAM.map((member) => {
            const ProfessionIcon = member.professionIcon;
            return (
              <div
                key={member.name}
                className="group flex flex-col justify-between rounded-[12px] border border-[#E5E5E5] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D0D0D0] hover:shadow-xs sm:p-7"
              >
                <div className="flex flex-col">
                  {/* Photo Container */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-[10px] border border-[#EFEFEF] bg-[#F7F7F5]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                      priority={false}
                    />
                  </div>

                  {/* Header info */}
                  <div className="mt-5 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-[4px] bg-[#EAF1EC] px-2 py-0.5 text-[11px] font-semibold tracking-wider text-[#315C45] uppercase">
                        {member.tag}
                      </span>
                    </div>

                    <h3 className="mt-1 text-xl font-semibold tracking-tight text-[#111111]">
                      {member.name}
                    </h3>

                    <p className="text-sm font-medium text-[#315C45]">
                      {member.role}
                    </p>

                    <div className="inline-flex items-center gap-1.5 text-xs text-[#666666]">
                      <ProfessionIcon className="size-3.5 shrink-0 text-[#888888]" />
                      <span>{member.profession}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-[#666666]">
                    {member.description}
                  </p>
                </div>

                {/* Core Competency Highlights */}
                <div className="mt-6 border-t border-[#F0F0F0] pt-4">
                  <span className="text-[11px] font-semibold tracking-wider text-[#888888] uppercase">
                    Key Focus & Responsibility
                  </span>
                  <ul className="mt-2.5 flex flex-col gap-2 text-xs text-[#555555]">
                    {member.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#315C45]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Accountability & Trust Statement Banner */}
        <div className="mt-12 rounded-[12px] border border-[#E5E5E5] bg-[#F7F7F5] p-6 text-center sm:p-8">
          <p className="text-xs font-semibold tracking-[0.14em] text-[#315C45] uppercase">
            Executive Accountability
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[#444444] sm:text-base">
            Every export contract is directly managed and supervised by our
            leadership. From farm-gate lot selection and cold-storage grading in
            Agra to phytosanitary inspection and port transit, our principals are
            personally accountable for delivery standards.
          </p>
        </div>
      </Container>
    </Section>
  );
}
