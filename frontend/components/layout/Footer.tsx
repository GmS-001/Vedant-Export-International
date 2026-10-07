import * as React from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Mail, Phone, MapPin, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#1C2620] bg-[#111814] text-[#F7F7F5]">
      <Container size="default">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 md:gap-12 md:py-20 lg:grid-cols-5">
          {/* Company Brief (2 columns on large screens) */}
          <div className="flex flex-col gap-5 pr-0 lg:col-span-2 lg:pr-8">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-[8px] bg-[#315C45] text-white">
                <span className="text-base font-semibold tracking-wider">
                  V
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg leading-none font-semibold tracking-tight text-white">
                  Vedant Exports
                </span>
                <span className="mt-1 text-[11px] font-medium tracking-[0.18em] text-[#8CD0A4] uppercase">
                  International
                </span>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[#A0A0A0]">
              Modern agricultural sourcing and export company backed by 20+
              years of domestic trading experience and a dedicated 3-lakh packet
              cold-storage facility in Agra, North India.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-medium text-[#8CD0A4]">
              <Shield className="size-4 shrink-0" />
              <span>
                Registered with APEDA, FSSAI & Export Inspection Council
              </span>
            </div>

            <div className="pt-2">
              <Button asChild variant="inverted" size="sm">
                <Link href="/request-a-quote">
                  Start an Export Inquiry
                  <ArrowUpRight className="ml-1 size-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Navigation Column 1: Company */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-[0.14em] text-white uppercase">
              Company
            </span>
            <ul className="flex flex-col gap-2.5 text-sm text-[#A0A0A0]">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  About the Company
                </Link>
              </li>
              <li>
                <Link
                  href="/sourcing"
                  className="transition-colors hover:text-white"
                >
                  Sourcing Network
                </Link>
              </li>
              <li>
                <Link
                  href="/quality"
                  className="transition-colors hover:text-white"
                >
                  Quality & Cold Storage
                </Link>
              </li>
              <li>
                <Link
                  href="/markets"
                  className="transition-colors hover:text-white"
                >
                  Global Markets
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  Contact Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Products */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-[0.14em] text-white uppercase">
              Core Products
            </span>
            <ul className="flex flex-col gap-2.5 text-sm text-[#A0A0A0]">
              <li>
                <Link
                  href="/products/potatoes"
                  className="transition-colors hover:text-white"
                >
                  Fresh Potatoes
                </Link>
              </li>
              <li>
                <Link
                  href="/products/onions"
                  className="transition-colors hover:text-white"
                >
                  Red & White Onions
                </Link>
              </li>
              <li>
                <Link
                  href="/products/green-chilies"
                  className="transition-colors hover:text-white"
                >
                  Green Chilies
                </Link>
              </li>
              <li>
                <Link
                  href="/products/tomatoes"
                  className="transition-colors hover:text-white"
                >
                  Fresh Tomatoes
                </Link>
              </li>
              <li>
                <Link
                  href="/products/moringa-powder"
                  className="transition-colors hover:text-white"
                >
                  Moringa Powder
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1 pt-1 font-medium text-[#8CD0A4] hover:underline"
                >
                  View Full Catalog →
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Contact & Storage */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-[0.14em] text-white uppercase">
              Direct Contact
            </span>
            <ul className="flex flex-col gap-3 text-sm text-[#A0A0A0]">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#8CD0A4]" />
                <a
                  href="https://www.google.com/maps/place/Pushpanjali+Seasons/@27.2395469,78.0017425,223m/data=!3m1!1e3!4m6!3m5!1s0x39747960bc2d5ced:0x4cb06bfe78af1b8a!8m2!3d27.2392233!4d78.0020607!16s%2Fg%2F11qmqxjb20!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MTAwNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-snug transition-colors hover:text-white hover:underline"
                  title="Open Export Office in Google Maps"
                >
                  Export Office, Agra, Uttar Pradesh, India - 282005
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#8CD0A4]" />
                <a
                  href="https://www.google.com/maps/place/Shri+Balvir+Singh+Cold+storage+and+Ice+factory/@27.1150435,77.8886177,7255m/data=!3m1!1e3!4m10!1m2!2m1!1sbalveer+sing+ice+and+cold+storage+agra!3m6!1s0x39738b0010beb83f:0xf1ef79308b182007!8m2!3d27.115042!4d77.9168516!15sCiZiYWx2ZWVyIHNpbmcgaWNlIGFuZCBjb2xkIHN0b3JhZ2UgYWdyYZIBCXdhcmVob3VzZeABAA!16s%2Fg%2F11nvymkd2d!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MTAwNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-snug transition-colors hover:text-white hover:underline"
                  title="Open Cold Storage Facility in Google Maps"
                >
                  Balveer Singh Ice and Cold Storage Pvt. Ltd., Malpura, Agra, Uttar Pradesh, India
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-[#8CD0A4]" />
                <a
                  href="mailto:vedantexportd4@gmail.com"
                  className="truncate transition-colors hover:text-white"
                >
                  vedantexportd4@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-[#8CD0A4]" />
                <a
                  href="tel:+919412167091"
                  className="transition-colors hover:text-white"
                >
                  +91 9412167091
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-[#8CD0A4]" />
                <a
                  href="tel:+916396635684"
                  className="transition-colors hover:text-white"
                >
                  +91 6396635684
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-[#8CD0A4]" />
                <a
                  href="tel:+917456882038"
                  className="transition-colors hover:text-white"
                >
                  +91 7456 882 038
                </a>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="transition-colors hover:text-white"
                >
                  Export Insights & FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#1F2B23] py-6 text-xs text-[#808080] sm:flex-row">
          <p>
            © {new Date().getFullYear()} Vedant Exports International. All
            rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms & Conditions
            </Link>
            <Link
              href="/sitemap.xml"
              className="transition-colors hover:text-white"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
