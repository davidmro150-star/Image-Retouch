// src/components/common/Footer.jsx

import { Link, Mail, Phone, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

          <div className="space-y-4">
            <span className="font-bold tracking-tight text-neutral-900">
              PRISM<span className="font-light text-neutral-500">STUDIO</span>
            </span>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Meticulous, 100% human-driven manual photo editing and technical clipping paths for professional studios and eCommerce entities globally.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">Core Services</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/services/image-retouching" className="text-sm text-neutral-500 hover:text-neutral-900">Image Retouching</Link></li>
              <li><Link href="/services/clipping-path" className="text-sm text-neutral-500 hover:text-neutral-900">Clipping Path</Link></li>
              <li><Link href="/services/image-masking" className="text-sm text-neutral-500 hover:text-neutral-900">Image Masking</Link></li>
              <li><Link href="/services/background-removal" className="text-sm text-neutral-500 hover:text-neutral-900">Background Removal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">Direct Support</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-neutral-500"><Mail className="h-4 w-4" /> production@prismstudio.com</li>
              <li className="flex items-center gap-2 text-sm text-neutral-500"><Phone className="h-4 w-4" /> +1 (555) 901-2384</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">Quality Guarantee</h3>
            <p className="mt-4 text-sm text-neutral-500 flex items-start gap-2">
              <ShieldCheck className="h-5 w-5 text-neutral-900 shrink-0" />
              Every image is reviewed manually by a senior retoucher. No automated AI filters or destructive compressions.
            </p>
          </div>

        </div>

        <div className="mt-12 border-t border-neutral-200/60 pt-8 text-center md:flex md:justify-between md:text-left">
          <p className="text-xs text-neutral-400">&copy; {new Date().getFullYear()} Prism Studio. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6 md:mt-0 text-xs text-neutral-400">
            <Link href="/privacy" className="hover:text-neutral-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-900">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
