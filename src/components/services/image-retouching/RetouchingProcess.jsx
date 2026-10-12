
import Link from "next/link";
import {
  ArrowRight,
  Upload,
  Sparkles,
  ShieldCheck,
  Download,
  Image as ImageIcon,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Share Your Images",
    description:
      "Send your images and explain the retouching requirements.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Expert Editing",
    description:
      "Our editors refine each image according to your instructions.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Quality Review",
    description:
      "We review the finished work for consistency and fine details.",
  },
  {
    number: "04",
    icon: Download,
    title: "Final Delivery",
    description:
      "Receive your edited images in the agreed file format.",
  },
];

export default function RetouchingProcess() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Our Process
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Simple Steps.
            <span className="text-amber-400"> Professional Results.</span>
          </h2>

          <p className="mt-6 leading-8 text-white/60">
            A straightforward workflow designed to keep your project
            organized from image submission to final delivery.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <article key={number} className="relative">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-black">
                  {number}
                </span>

                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/40 text-amber-400">
                  <Icon size={24} />
                </div>
              </div>

              <h3 className="mt-6 text-lg font-semibold">{title}</h3>

              <p className="mt-3 text-sm leading-7 text-white/55">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 rounded-3xl border border-amber-400/50 bg-white/[0.025] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="flex items-center gap-4">
            <div className="hidden rounded-full border border-amber-400/40 p-4 text-amber-400 sm:block">
              <ImageIcon size={28} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                Ready to Get Started?
              </p>

              <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                Let's Make Your Images Look Their Best.
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/55">
                Tell us what you need, and let's discuss your project.
              </p>
            </div>
          </div>

          <Link
            href="/quote"
            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-amber-400 px-6 py-3.5 font-semibold text-black transition-colors hover:bg-amber-300"
          >
            Get a Quote
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
