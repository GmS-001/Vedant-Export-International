"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Sourcing", href: "/sourcing" },
  { label: "Quality", href: "/quality" },
  { label: "Markets", href: "/markets" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Monitor scroll for subtle shadow/border elevation
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md transition-all duration-200",
        isScrolled
          ? "border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "border-[#EFEFEF]"
      )}
    >
      <Container size="default">
        <div className="flex h-18 items-center justify-between sm:h-20">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-md p-1 outline-none focus-visible:ring-2 focus-visible:ring-[#315C45]"
          >
            <div className="flex size-9 items-center justify-center rounded-[8px] bg-[#315C45] text-white shadow-sm transition-transform duration-200 group-hover:scale-105 sm:size-10">
              <span className="text-base font-semibold tracking-wider">V</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base leading-none font-semibold tracking-tight text-[#111111] sm:text-lg">
                Vedant Exports
              </span>
              <span className="mt-1 text-[10px] font-medium tracking-[0.18em] text-[#666666] uppercase sm:text-[11px]">
                International
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-sm py-1 text-sm font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-[#315C45]",
                    isActive
                      ? "font-semibold text-[#315C45]"
                      : "text-[#666666] hover:text-[#111111]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / CTA */}
          <div className="hidden items-center gap-3.5 lg:flex">
            <Button asChild size="default">
              <Link href="/request-a-quote">
                Request a Quote
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button asChild size="sm" className="h-9 px-3 text-xs">
              <Link href="/request-a-quote">Quote</Link>
            </Button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex size-10 items-center justify-center rounded-[8px] border border-[#E5E5E5] text-[#111111] outline-none hover:bg-[#F7F7F5] focus-visible:ring-2 focus-visible:ring-[#315C45]"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="animate-in fade-in-50 fixed inset-0 top-18 z-40 flex flex-col justify-between overflow-y-auto bg-white p-6 duration-200 lg:hidden">
          <div className="flex flex-col gap-1 pt-2">
            <div className="mb-4 border-b border-[#E5E5E5] pb-2">
              <span className="text-xs font-semibold tracking-wider text-[#888888] uppercase">
                Navigation
              </span>
            </div>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-[8px] px-3 py-3 text-base font-medium transition-colors",
                    isActive
                      ? "bg-[#EAF1EC] font-semibold text-[#234534]"
                      : "text-[#111111] hover:bg-[#F7F7F5]"
                  )}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="size-4 text-[#888888]" />
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 border-t border-[#E5E5E5] pt-6 pb-8">
            <div className="mb-1 flex items-center gap-2 text-xs text-[#666666]">
              <ShieldCheck className="size-4 text-[#315C45]" />
              <span>APEDA, FSSAI & EIC Certified Agro Exporter</span>
            </div>
            <Button asChild size="lg" className="w-full justify-center">
              <Link href="/request-a-quote" onClick={() => setIsOpen(false)}>
                Request a Quote
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
