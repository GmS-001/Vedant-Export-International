import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  kicker?: string;
  className?: string;
}

export function CTASection({
  kicker = "Direct Sourcing & Global Export",
  title = "Ready to discuss your agricultural import requirements?",
  description = "Get in touch with our export trade desk for customized specifications, container pricing (FOB / CIF / CNF), and sample requests.",
  className,
}: CTASectionProps) {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_COMPANY_WHATSAPP || "919876543210";

  return (
    <Section background="dark" spacing="large" className={className}>
      <Container size="default">
        <div className="relative overflow-hidden rounded-[16px] border border-[#23332A] bg-[#18231D] p-8 sm:p-12 md:p-16">
          <div className="flex max-w-2xl flex-col gap-4 text-left">
            <span className="text-xs font-semibold tracking-[0.16em] text-[#8CD0A4] uppercase">
              {kicker}
            </span>

            <h2 className="text-2xl leading-tight font-semibold tracking-[-0.02em] text-white sm:text-3xl md:text-4xl">
              {title}
            </h2>

            <p className="text-base leading-relaxed text-[#B0B0B0] sm:text-lg">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Button asChild variant="inverted" size="lg">
                <Link href="/request-a-quote">
                  Request a Quote
                  <ArrowRight className="ml-2 size-4 text-[#111111]" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#2F4438] bg-transparent text-white hover:bg-[#202E26] hover:text-white"
              >
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    "Hello Vedant Exports, I would like to inquire about agricultural export supplies."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="mr-2 size-4 text-[#8CD0A4]" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-3 border-t border-[#25362C] pt-6 text-xs text-[#95A59B] sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-[#8CD0A4]" />
                <span>Quote response within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-[#8CD0A4]" />
                <span>Cold storage preserved freshness</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-[#8CD0A4]" />
                <span>Custom export packaging</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
