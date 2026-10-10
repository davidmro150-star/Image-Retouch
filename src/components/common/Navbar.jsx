// src/components/common/Navbar.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";

const servicesList = [
  { name: "Image Retouching", href: "/services/image-retouching" },
  { name: "Clipping Path", href: "/services/clipping-path" },
  { name: "Image Masking", href: "/services/image-masking" },
  { name: "Background Removal", href: "/services/background-removal" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">

          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold tracking-tight text-lg text-neutral-900">
              PRISM<span className="font-light text-neutral-500">STUDIO</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              About
            </Link>

            {/* Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors py-2">
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 w-56 rounded-xl border border-neutral-100 bg-white p-2 shadow-xl ring-1 ring-black/5">
                  {servicesList.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block rounded-lg px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/portfolio" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              Portfolio
            </Link>
            <Link href="/contact" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              Contact
            </Link>
          </div>

          {/* Action CTAs with Visible Signup Button Link */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="text-sm font-semibold text-neutral-950 hover:text-neutral-600 transition-colors">
              Register
            </Link>
            <Link
              href="/quote"
              className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors shadow-sm"
            >
              Get a Quote
            </Link>
          </div>

          {/* Hamburger Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer view */}
      {isOpen && (
        <div className="md:hidden border-b border-neutral-100 bg-white px-4 pt-2 pb-6 space-y-2">
          <Link onClick={() => setIsOpen(false)} href="/" className="block rounded-lg px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50">Home</Link>
          <Link onClick={() => setIsOpen(false)} href="/about" className="block rounded-lg px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50">About</Link>

          <div className="px-3 py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Our Services</span>
            <div className="mt-2 pl-2 border-l border-neutral-200 space-y-1">
              {servicesList.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <Link onClick={() => setIsOpen(false)} href="/portfolio" className="block rounded-lg px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50">Portfolio</Link>
          <Link onClick={() => setIsOpen(false)} href="/contact" className="block rounded-lg px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-50">Contact</Link>

          <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2">
            <Link onClick={() => setIsOpen(false)} href="/login" className="text-center text-sm font-medium py-2 text-neutral-600">Sign In</Link>
            <Link onClick={() => setIsOpen(false)} href="/register" className="text-center text-sm font-semibold py-2 text-neutral-950">Register Account</Link>
            <Link onClick={() => setIsOpen(false)} href="/quote" className="block text-center rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white">Get a Quote</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
