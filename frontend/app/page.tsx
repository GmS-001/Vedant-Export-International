import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { SectionHeader } from "@/components/typography/SectionHeader";
import { TrustBanner } from "@/components/sections/TrustBanner";
import { ProductCard } from "@/components/sections/ProductCard";
import { FeatureCard } from "@/components/sections/FeatureCard";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Warehouse, Network, ShieldCheck } from "lucide-react";

const FEATURED_PRODUCTS = [
  {
    title: "Fresh Potatoes (Table & Processing)",
    slug: "potatoes",
    category: "Root Vegetables",
    description:
      "Graded Agra potatoes sourced directly from North India farm clusters. Maintained in our climate-controlled cold-storage.",
    badge: "Primary Trade",
    specs: [
      { label: "Origin", value: "Agra, North India" },
      { label: "Packaging", value: "25kg / 50kg Jute & Mesh Bags" },
      { label: "Storage", value: "3 Lakh Packets Cold Facility" },
    ],
  },
  {
    title: "Fresh Red & White Onions",
    slug: "onions",
    category: "Fresh Produce",
    description:
      "Hand-sorted, export-grade onions with high pungency and extended shelf-life suitable for container transit.",
    badge: "Export Standard",
    specs: [
      { label: "Size Grade", value: "45mm - 65mm+" },
      { label: "Transit", value: "Reefer & Dry Container Ready" },
      { label: "Packaging", value: "Red/Yellow Leno Mesh Bags" },
    ],
  },
  {
    title: "Premium Green Chilies (G4 / Teja)",
    slug: "green-chilies",
    category: "Fresh Vegetables",
    description:
      "Freshly harvested green chilies with uniform size, rich green color, and certified pesticide-residue compliance.",
    badge: "Air / Sea Reefer",
    specs: [
      { label: "Varieties", value: "G4, Teja, Local Cultivars" },
      { label: "Packing", value: "3kg / 5kg Corrugated Boxes" },
      { label: "Temperature", value: "8°C - 10°C Reefer" },
    ],
  },
  {
    title: "Pure Moringa Leaf Powder",
    slug: "moringa-powder",
    category: "Dehydrated & Botanicals",
    description:
      "Organically shade-dried moringa leaf powder. Fine mesh, bright green color, rich nutrient retention.",
    badge: "High Grade",
    specs: [
      { label: "Mesh Size", value: "80 - 100 Mesh" },
      { label: "Certification", value: "Phytosanitary & Lab Tested" },
      { label: "Packaging", value: "Vacuum Pouches in Drums" },
    ],
  },
];

const CORE_CAPABILITIES = [
  {
    icon: Warehouse,
    title: "3 Lakh Packets Cold Storage",
    description:
      "Our owned climate-controlled cold-storage infrastructure in Agra ensures peak product freshness, round-the-year availability, and strict temperature maintenance.",
    linkHref: "/quality",
    linkText: "Explore Storage Capabilities",
    badge: "Agra Hub",
  },
  {
    icon: Network,
    title: "Direct North Indian Sourcing",
    description:
      "Over 20 years of domestic agricultural trade gives us unmatched direct farm access across Uttar Pradesh, Punjab, and North Indian agricultural belts without intermediaries.",
    linkHref: "/sourcing",
    linkText: "View Farm Sourcing Network",
    badge: "Direct Farm",
  },
  {
    icon: ShieldCheck,
    title: "Certified Global Export Execution",
    description:
      "Registered with APEDA, FSSAI, and Export Inspection Council (EIC). Rigorous batch grading, phytosanitary inspection, and seamless port dispatch.",
    linkHref: "/about",
    linkText: "Learn About Compliance",
    badge: "Accredited",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* --- Hero Section --- */}
        <Section
          spacing="hero"
          background="white"
          className="pt-12 md:pt-20 lg:pt-28"
        >
          <Container size="default">
            <div className="flex max-w-3xl flex-col items-start gap-6">
              <Badge
                variant="default"
                className="px-3 py-1 text-xs font-semibold tracking-wider uppercase"
              >
                Agricultural Trading Heritage & Export Division
              </Badge>

              <Heading
                level="display"
                className="text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Reliable Indian Agricultural Sourcing for Global Buyers.
              </Heading>

              <Text
                variant="lead"
                color="secondary"
                className="max-w-2xl text-lg leading-relaxed sm:text-xl"
              >
                Backed by 20+ years of agricultural trading experience and a
                dedicated 3-lakh packet cold-storage facility in Agra. We supply
                high-grade potatoes, onions, fresh vegetables, and agro
                commodities to international markets.
              </Text>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button asChild size="lg">
                  <Link href="/request-a-quote">
                    Request a Quote
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>

                <Button asChild variant="secondary" size="lg">
                  <Link href="/products">View Product Catalog</Link>
                </Button>
              </div>

              <div className="flex w-full items-center gap-6 border-t border-[#EFEFEF] pt-4 text-xs font-medium text-[#666666]">
                <span>Agra Cold Storage Hub</span>
                <span>•</span>
                <span>FSSAI & APEDA Registered</span>
                <span>•</span>
                <span>Direct North India Farm Clusters</span>
              </div>
            </div>
          </Container>
        </Section>

        {/* --- Trust Banner --- */}
        <TrustBanner />

        {/* --- Products Showcase Section --- */}
        <Section spacing="large" background="white">
          <Container size="default">
            <SectionHeader
              kicker="Export Catalog"
              title="Core Agricultural Commodities"
              description="Directly sourced, graded, and packaged to meet stringent international quality, phytosanitary, and logistics standards."
              action={
                <Button asChild variant="secondary" size="sm">
                  <Link href="/products">
                    View All Products
                    <ArrowRight className="ml-1.5 size-4" />
                  </Link>
                </Button>
              }
            />

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4">
              {FEATURED_PRODUCTS.map((product) => (
                <ProductCard key={product.slug} {...product} />
              ))}
            </div>
          </Container>
        </Section>

        {/* --- Capabilities & Infrastructure Section --- */}
        <Section spacing="large" background="light" border="top">
          <Container size="default">
            <SectionHeader
              align="center"
              kicker="Infrastructure & Sourcing"
              title="Engineered for Export Reliability"
              description="We bridge the gap between large-scale North Indian farm production and international importer requirements."
            />

            <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
              {CORE_CAPABILITIES.map((capability, idx) => (
                <FeatureCard key={idx} {...capability} />
              ))}
            </div>
          </Container>
        </Section>

        {/* --- Reusable Conversion CTA Section --- */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
